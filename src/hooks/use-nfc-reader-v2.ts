import {CardRequest} from '@/app/api/card/generate/route'
import {VoidPromise} from '@/app/types'
import {onInfo, onSuccess, onWarn} from '@/ctx/toast'
import {moses, secureRef} from '@/utils/crypto'
import {ParsedRecord, parseRecord} from '@/utils/ndef'
import {useCallback, useEffect, useRef, useState} from 'react'
import {v7 as uuidV7} from 'uuid'
import {CardSeries, Tokens} from '../../convex/cards/d'
import {useCardGen} from './use-card-gen'
import {useNodeEnv} from './use-node-env'

// NFC Web API TypeScript definitions for reading
export interface NDEFRecordRead {
  recordType: string
  mediaType: string | null
  id: string
  data?: DataView | BufferSource | string | unknown
  encoding?: string
  lang?: string
}

export interface NDEFMessage {
  records: NDEFRecordRead[]
}

export interface NDEFRecordInit {
  recordType: string
  mediaType: string | null
  id: string
  data?:
    | string
    | BufferSource
    | DataView
    | {records: NDEFRecordInit[]}
    | unknown
  encoding?: string
  lang?: string
}

export interface NDEFMessageInit {
  records: NDEFRecordInit[]
}

export type NDEFMessageSource = string | BufferSource | NDEFMessageInit

export interface NDEFReader extends EventTarget {
  scan(options?: {signal?: AbortSignal}): Promise<void>
  write(
    message: NDEFMessageSource,
    options?: {overwrite?: boolean; signal?: AbortSignal},
  ): Promise<void>
  addEventListener(
    type: 'reading',
    listener: (event: NDEFReadingEvent) => void,
  ): void
  addEventListener(type: 'readingerror', listener: (event: Event) => void): void
  removeEventListener(
    type: 'reading',
    listener: (event: NDEFReadingEvent) => void,
  ): void
  removeEventListener(
    type: 'readingerror',
    listener: (event: Event) => void,
  ): void
}

export interface NDEFReadingEvent extends Event {
  serialNumber: string
  message: NDEFMessage
}

// Extend the global Window interface to include NDEFReader
declare global {
  interface Window {
    NDEFReader: {
      new (): NDEFReader
    }
  }
}

interface NFCRecord {
  id: string
  data: string
  recordType: string
  mediaType: string | null
}

export interface NFCDataV2 {
  serialNumber: string
  records: Array<{
    id: string
    data: string
    recordType: string
    mediaType: string | null
  }>
}

export interface UseNFCReaderOptions {
  onScan?: (data: NFCDataV2) => void
  onError?: (error: string) => void
  maxHistorySize?: number
  autoStop?: boolean
  withWrite?: boolean
  baseUrl?: string
  series?: CardSeries
  group?: string
  batch?: string
  secmos?: string
}

export interface UseNFCReaderReturn {
  isScanning: boolean
  isSupported: boolean
  lastScan: NFCDataV2 | null
  scanDetails: NFCDataV2 | null
  scanHistory: NFCDataV2[]
  startScanning: VoidPromise
  stopScanning: VoidFunction
  clearHistory: VoidFunction
  generatedCount: number
  isGenerating: boolean
  isLoading: boolean
  token: Tokens | null
  parsed: ParsedRecord | null
  payload: NFCRecord | null
}

export const useNFCReaderV2 = (
  options: UseNFCReaderOptions = {},
): UseNFCReaderReturn => {
  const {baseUrl} = useNodeEnv()
  const {
    onScan,
    onError,
    maxHistorySize = 1000,
    autoStop = true,
    withWrite = false,
    series = 'individual',
    group = 'indv',
    batch = Date.now().toString(),
    secmos = '',
  } = options

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [lastScan, setLastScan] = useState<NFCDataV2 | null>(null)
  const [scanDetails, setScanDetails] = useState<NFCDataV2 | null>(null)
  const [scanHistory, setScanHistory] = useState<NFCDataV2[]>([])
  const nfcReaderRef = useRef<NDEFReader | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const autoStoppedRef = useRef<boolean>(false)
  const [parsed, setParsed] = useState<ParsedRecord | null>(null)
  const [payload, setPayload] = useState<NFCRecord | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [token, setToken] = useState<Tokens | null>(null)
  const [generatedCount, setGeneratedCount] = useState(0)

  const {generate} = useCardGen()

  const generateQRCode = useCallback(async (): Promise<Tokens | null> => {
    setIsGenerating(true)
    const body: CardRequest = {
      type: 'nfc',
      body: {
        series,
        group,
        batch,
      },
      userId: series,
      count: 1,
    }
    try {
      const response = await generate(body)
      if (response.length !== 0) {
        const generatedToken = response[0] as Tokens
        setToken(generatedToken)
        setGeneratedCount((prev) => prev + response.length)
        setIsGenerating(false)
        return generatedToken
      } else {
        onWarn('Failed to generate QR code')
        setIsGenerating(false)
        return null
      }
    } catch (error) {
      setIsGenerating(false)
      onWarn('Failed to generate QR code')
      return null
    }
  }, [generate, series, batch, group])

  useEffect(() => {
    if (secmos) {
      onInfo(secmos + `: ${secmos.length}`)
    }
  }, [secmos])

  // Check NFC support on mount
  useEffect(() => {
    setIsLoading(true)
    const supported =
      typeof window !== 'undefined' &&
      window.isSecureContext &&
      'NDEFReader' in window

    setIsSupported(supported)

    if (!supported && onError) {
      setIsLoading(false)
      if (typeof window !== 'undefined' && !window.isSecureContext) {
        onError(
          'Web NFC requires a secure context (HTTPS or http://localhost). Using non-secure origins (e.g., http://192.168.x.x) hides the API.',
        )
      } else {
        onError('Web NFC API is not available in this browser.')
      }
    }
    setIsLoading(false)
  }, [onError])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
    }
  }, [])

  const handleNFCError = useCallback(
    (event: Event): void => {
      const errorMessage = `NFC reading error: ${event.type}`
      console.error(errorMessage, event)

      if (onError) {
        onError(errorMessage)
      }
    },
    [onError],
  )

  const handleNFCReading = useCallback(
    async (event: NDEFReadingEvent) => {
      const {serialNumber, message} = event

      // Generate a unique cardId for each scan
      const cardId = uuidV7()
      const recordId = `${moses(secureRef(16))}`
      const records = message.records.map((record) => {
        let data = ''

        if (record.data !== undefined) {
          setParsed(parseRecord(record as any))

          const maybeData = record.data
          const isArrayBuffer = maybeData instanceof ArrayBuffer
          const isView = ArrayBuffer.isView(maybeData as unknown)
          if (isArrayBuffer || isView) {
            const decoder = new TextDecoder(
              (record.encoding as string) || 'utf-8',
            )
            data = decoder.decode(maybeData as BufferSource)
          } else if (typeof maybeData === 'string') {
            data = maybeData
          } else {
            try {
              data = JSON.stringify(maybeData as unknown)
            } catch {
              onWarn('Unsupported record data')
              data = '[Unsupported record data]'
            }
          }
        }

        return {
          data,
          id: record.id ?? null,
          recordType: record.recordType ?? 'empty',
          mediaType: null,
        }
      })

      const generatedToken = await generateQRCode()

      const nfcData: NFCDataV2 = {
        records,
        serialNumber,
      }

      setLastScan(nfcData)
      setScanDetails(nfcData)
      setScanHistory((prev) => [nfcData, ...prev.slice(0, maxHistorySize - 1)])

      if (onScan) {
        onScan(nfcData)
      }

      // If withWrite is enabled, write the data back to the tag
      if (withWrite && generatedToken) {
        ;(async () => {
          try {
            // For URL records, don't include mediaType - it's only for mime records
            const payloadRecord = {
              recordType: 'url' as const,
              data: `${baseUrl}/u/${cardId}&token=${generatedToken.token}`,
              id: recordId,
              mediaType: null,
            }

            // Create a new NDEFReader instance for writing
            // The tag must still be in range for this to work
            const ndefWriter = new window.NDEFReader()

            // Write the payload record (this will overwrite existing data)
            await ndefWriter.write(
              {records: [payloadRecord]},
              {overwrite: true},
            )

            // Store payload with mediaType for internal state (null for URL records)
            setPayload({
              ...payloadRecord,
              mediaType: null,
            })
            onSuccess('Write Successful')
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error(`Write back error: ${error.message}`)
              onWarn(`Failed to write to NFC tag: ${error.message}`)
            } else {
              console.error('Unknown write back error')
              onWarn('Failed to write to NFC tag: Unknown error')
            }
          }
        })()
      }

      // Auto-stop scanning after a successful read if configured
      if (autoStop) {
        autoStoppedRef.current = true
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
          abortControllerRef.current = null
        }
        if (nfcReaderRef.current) {
          nfcReaderRef.current.removeEventListener('reading', handleNFCReading)
          nfcReaderRef.current.removeEventListener(
            'readingerror',
            handleNFCError,
          )
          nfcReaderRef.current = null
        }
        setIsScanning(false)
      }
    },
    [
      onScan,
      maxHistorySize,
      handleNFCError,
      autoStop,
      withWrite,
      baseUrl,
      generateQRCode,
      onSuccess,
      onWarn,
    ],
  )

  const startScanning = useCallback(async (): Promise<void> => {
    if (!isSupported) {
      const errorMsg = 'NFC is not supported on this device/browser'
      if (onError) {
        onError(errorMsg)
      }
      console.log('[use-nfc-reader]: ', errorMsg)
      onWarn('NFC is not supported.')
      return
    }

    // Prevent starting a new scan if already scanning
    if (isScanning) {
      console.warn(
        'NFC scanning is already in progress. Ignoring start request.',
      )
      return
    }

    // Clean up any existing reader and controller
    if (nfcReaderRef.current) {
      nfcReaderRef.current.removeEventListener('reading', handleNFCReading)
      nfcReaderRef.current.removeEventListener('readingerror', handleNFCError)
      nfcReaderRef.current = null
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    try {
      const reader = new window.NDEFReader()
      const controller = new AbortController()

      nfcReaderRef.current = reader
      abortControllerRef.current = controller
      setIsScanning(true)
      autoStoppedRef.current = false

      reader.addEventListener('reading', handleNFCReading)
      reader.addEventListener('readingerror', handleNFCError)

      await reader.scan({signal: controller.signal})
    } catch (error: unknown) {
      let errorMessage = 'Failed to start NFC scanning: Unknown error'

      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            errorMessage =
              'Web NFC requires a user gesture (e.g., button tap) to start scanning.'
            break
          case 'SecurityError':
            errorMessage =
              'Web NFC blocked by security requirements (use HTTPS or http://localhost, avoid iframes).'
            break
          case 'NotSupportedError':
            errorMessage =
              'Web NFC not supported on this platform or browser build.'
            break
          case 'AbortError': {
            if (autoStoppedRef.current) {
              autoStoppedRef.current = false
              return
            }
            errorMessage = 'Scanning aborted.'
            break
          }
          case 'NotReadableError':
            errorMessage = 'NFC hardware busy or unavailable. Try again.'
            break
          default:
            errorMessage = `Failed to start NFC scanning: ${error.name}`
        }
      } else if (error instanceof Error) {
        errorMessage = `Failed to start NFC scanning: ${error.message}`
      }

      console.error(errorMessage, error)
      setIsScanning(false)

      if (onError) {
        onError(errorMessage)
      }
    }
  }, [isSupported, onError, handleNFCReading, handleNFCError])

  const stopScanning = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }

    if (nfcReaderRef.current) {
      nfcReaderRef.current.removeEventListener('reading', handleNFCReading)
      nfcReaderRef.current.removeEventListener('readingerror', handleNFCError)
      nfcReaderRef.current = null
    }

    setIsScanning(false)
  }, [handleNFCReading, handleNFCError])

  const clearHistory = useCallback((): void => {
    setScanHistory([])
    setLastScan(null)
    setScanDetails(null)
  }, [])

  useEffect(() => {
    if (scanDetails) {
      console.log(JSON.stringify(scanDetails, null, 2))
    }
  }, [scanDetails])

  return {
    lastScan,
    isLoading,
    isScanning,
    isSupported,
    scanDetails,
    scanHistory,
    stopScanning,
    clearHistory,
    startScanning,
    generatedCount,
    isGenerating,
    parsed,
    payload,
    token,
  }
}
