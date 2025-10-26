import {VoidPromise} from '@/app/types'
import {onInfo, onSuccess, onWarn} from '@/ctx/toast'
import {ServerTime} from '@/lib/firebase/types/user'
import {moses, secureRef} from '@/utils/crypto'
import {ParsedRecord, parseRecord} from '@/utils/ndef'
import {serverTimestamp} from 'firebase/firestore'
import {useCallback, useEffect, useRef, useState} from 'react'
import {CardSeries} from '../../convex/cards/d'

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

export interface NFCData {
  serialNumber: string
  records: Array<{
    id: string
    data: string
    recordType: string
    mediaType: string | null
  }>
  timestamp: ServerTime
}

export interface UseNFCReaderOptions {
  onScan?: (data: NFCData) => void
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
  lastScan: NFCData | null
  scanDetails: NFCData | null
  scanHistory: NFCData[]
  startScanning: VoidPromise
  stopScanning: VoidFunction
  clearHistory: VoidFunction
  isLoading: boolean
  parsed: ParsedRecord | null
  payload: NFCRecord | null
}

export const useNFCReader = (
  options: UseNFCReaderOptions = {},
): UseNFCReaderReturn => {
  const {
    onScan,
    onError,
    maxHistorySize = 1000,
    autoStop = true,
    withWrite = false,
    baseUrl = 'https://protap.ph',
    series = 'individual',
    group = 'indv',
    batch = Date.now().toString(),
    secmos = '',
  } = options

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [lastScan, setLastScan] = useState<NFCData | null>(null)
  const [scanDetails, setScanDetails] = useState<NFCData | null>(null)
  const [scanHistory, setScanHistory] = useState<NFCData[]>([])
  const nfcReaderRef = useRef<NDEFReader | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const autoStoppedRef = useRef<boolean>(false)
  const [parsed, setParsed] = useState<ParsedRecord | null>(null)
  const [payload, setPayload] = useState<NFCRecord | null>(null)

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
    (event: NDEFReadingEvent): void => {
      const {serialNumber, message} = event

      const recordId = `nfc-${moses(secureRef(16))}`
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
          mediaType: record.mediaType ?? null,
        }
      })

      const nfcData: NFCData = {
        records,
        serialNumber,
        timestamp: serverTimestamp(),
      }

      setLastScan(nfcData)
      setScanDetails(nfcData)
      setScanHistory((prev) => [nfcData, ...prev.slice(0, maxHistorySize - 1)])

      if (onScan) {
        onScan(nfcData)
      }

      const payloadRecord: NFCRecord = {
        data: `${baseUrl}/api/verify/?id=${recordId}&series=${series}&group=${group}&batch=${batch}&qb=${secmos}`,
        mediaType: null,
        recordType: 'url',
        id: recordId,
      }

      // If withWrite is enabled, write the data back to the tag
      if (withWrite && payloadRecord) {
        ;(async () => {
          try {
            const ndef = new window.NDEFReader()
            await ndef.write({
              records: nfcData.records.map((r) => ({
                recordType: r.recordType,
                data: r.data,
                mediaType: r.mediaType ?? null,
                id: r.id,
              })),
            })
            await ndef.write({records: [payloadRecord]}, {overwrite: true})
            setPayload(payloadRecord)
            onSuccess('Write Successful')
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error(`Write back error: ${error.message}`)
            } else {
              console.error('Unknown write back error')
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
      series,
      group,
      batch,
      secmos,
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
    parsed,
    payload,
  }
}
