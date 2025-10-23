import {VoidPromise} from '@/app/types'
import {onWarn} from '@/ctx/toast'
import {ServerTime} from '@/lib/firebase/types/user'
import {macStr} from '@/utils/macstr'
import {serverTimestamp} from 'firebase/firestore'
import {useCallback, useEffect, useRef, useState} from 'react'

// NFC Web API TypeScript definitions
// Reading types (from NDEFReadingEvent)
interface NDEFRecordRead {
  recordType: string
  mediaType?: string
  id?: string
  data?: DataView | BufferSource | string | unknown
  encoding?: string
  lang?: string
}

interface NDEFMessage {
  records: NDEFRecordRead[]
}

// Writing types (for ndef.write)
interface NDEFRecordInit {
  recordType: string
  mediaType?: string
  id?: string
  data?:
    | string
    | BufferSource
    | DataView
    | {records: NDEFRecordInit[]}
    | unknown
  encoding?: string
  lang?: string
}

interface NDEFMessageInit {
  records: NDEFRecordInit[]
}

type NDEFMessageSource = string | BufferSource | NDEFMessageInit

interface NDEFReader extends EventTarget {
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

interface NDEFReadingEvent extends Event {
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

export interface NFCData {
  serialNumber: string
  records: Array<{
    recordType: string
    data: string
    mediaType?: string
    id?: string
  }>
  timestamp: ServerTime
}

export interface UseNFCOptions {
  onScan?: (data: NFCData) => void
  onError?: (error: string) => void
  maxHistorySize?: number
  autoStop?: boolean
}

export interface UseNFCReturn {
  isScanning: boolean
  isSupported: boolean
  lastScan: NFCData | null
  scanDetails: NFCData | null
  scanHistory: NFCData[]
  startScanning: VoidPromise
  stopScanning: VoidFunction
  clearHistory: VoidFunction
  formatRecordData: (record: NFCData['records'][0]) => string
  isLoading: boolean

  // Write APIs
  writeToTag: VoidPromise
  writeSmartPoster: VoidPromise
  makeReadOnly: VoidPromise

  // UI state for writing
  messages: string[]
  writeText: string
  writeUrl: string
  posterTitle: string
  posterUrl: string
  posterAction: string
  status: string
}

export const useNFC = (options: UseNFCOptions = {}): UseNFCReturn => {
  const {onScan, onError, maxHistorySize = 1000, autoStop = true} = options

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [lastScan, setLastScan] = useState<NFCData | null>(null)
  const [scanDetails, setScanDetails] = useState<NFCData | null>(null)
  const [scanHistory, setScanHistory] = useState<NFCData[]>([])
  const nfcReaderRef = useRef<NDEFReader | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const autoStoppedRef = useRef<boolean>(false)
  const [messages, setMessages] = useState<string[]>([])
  const [writeText, setWriteText] = useState<string>('')
  const [writeUrl, setWriteUrl] = useState('')
  const [posterTitle, setPosterTitle] = useState('Protap Activation')
  const [posterUrl, setPosterUrl] = useState('https://protap.ph/activate/')
  const [posterAction, setPosterAction] = useState<string>('exec')
  const [status, setStatus] = useState<string>('Ready')

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

      const records = message.records.map((record): NFCData['records'][0] => {
        let data = ''

        if (record.data !== undefined) {
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
          recordType: record.recordType,
          data,
          mediaType: record.mediaType,
          id: record.id,
        }
      })

      const nfcData: NFCData = {
        serialNumber,
        records,
        timestamp: serverTimestamp(),
      }

      setLastScan(nfcData)
      setScanDetails(nfcData)
      setScanHistory((prev) => [nfcData, ...prev.slice(0, maxHistorySize - 1)])

      if (onScan) {
        onScan(nfcData)
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
    [onScan, maxHistorySize, handleNFCError, autoStop],
  )

  const startScanning = useCallback(async (): Promise<void> => {
    if (!isSupported) {
      const errorMsg = 'NFC is not supported on this device/browser'
      if (onError) {
        onError(errorMsg)
      }
      console.log('[use-nfc]: ', errorMsg)
      onWarn('NFC is not supported.')

      return
    }

    // Prevent starting a new scan if already scanning to avoid multiple listeners and infinite loops
    if (isScanning) {
      console.warn(
        'NFC scanning is already in progress. Ignoring start request.',
      )
      return
    }

    // Clean up any existing reader and controller before starting a new one
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
              // Reset flag; this abort was triggered by our auto-stop after a successful read.
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

  const formatRecordData = useCallback(
    (record: NFCData['records'][0]): string => {
      if (record.recordType === 'text') {
        return record.data
      } else if (record.recordType === 'url') {
        return record.data
      } else {
        return `${record.recordType}: ${record.data.slice(0, 50)}${record.data.length > 50 ? '...' : ''}`
      }
    },
    [],
  )

  const writeToTag = async (): Promise<void> => {
    if (!('NDEFReader' in window)) {
      setStatus('NFC not supported')
      return
    }

    if (!writeText && !writeUrl) {
      setStatus('Please enter text or URL to write')
      return
    }

    try {
      const ndef = new window.NDEFReader()
      const records: {recordType: string; data: string}[] = []

      if (writeText) {
        records.push({recordType: 'text', data: writeText})
      }

      if (writeUrl) {
        records.push({recordType: 'url', data: writeUrl})
      }

      setStatus('Hold an NFC tag near your device to write...')

      await ndef.write({records})

      setStatus('✅ Successfully wrote to NFC tag!')
      setMessages((prev) => [
        `✍️ Wrote: ${writeText ? `Text: "${writeText}"` : ''} ${writeUrl ? `URL: "${writeUrl}"` : ''}`,
        ...prev,
      ])
      setWriteText('')
      setWriteUrl('')
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setStatus('Write cancelled - no tag was detected')
        } else if (error.name === 'NotAllowedError') {
          setStatus('NFC permission denied')
        } else if (error.name === 'NotSupportedError') {
          setStatus('Tag is not writable or incompatible')
        } else {
          setStatus(`Write error: ${error.message}`)
        }
      } else {
        setStatus('Unknown write error occurred')
      }
    }
  }

  const writeSmartPoster = async (serialNumber?: string): Promise<void> => {
    if (!('NDEFReader' in window)) {
      setStatus('NFC not supported')
      return
    }

    if (!posterUrl) {
      setStatus('Please enter a URL for the Smart Poster')
      return
    }

    try {
      const ndef = new window.NDEFReader()

      // Create the Smart Poster payload with nested records
      const smartPosterRecords: Array<{
        recordType: string
        data: string
        lang?: string
      }> = [
        {
          recordType: 'url',
          data:
            posterUrl +
            '?id=' +
            (serialNumber ? serialNumber.toString() : macStr('id')),
        },
      ]

      if (posterTitle) {
        smartPosterRecords.push({
          recordType: 'text',
          data: posterTitle,
          lang: 'en',
        })
      }

      // Action record: 0x00 = exec (default), 0x01 = save, 0x02 = edit
      const actionByte =
        posterAction === 'save'
          ? '\x01'
          : posterAction === 'edit'
            ? '\x02'
            : '\x00'
      smartPosterRecords.push({
        recordType: ':act',
        data: actionByte,
      })

      setStatus('Hold an NFC tag near your device to write Smart Poster...')

      await ndef.write({
        records: [
          {
            recordType: 'smart-poster',
            data: {records: smartPosterRecords},
          },
        ],
      })

      setStatus('✅ Successfully wrote Smart Poster to NFC tag!')
      setMessages((prev) => [
        `📋 Wrote Smart Poster: "${posterTitle || 'No title'}" → ${posterUrl} (${posterAction})`,
        ...prev,
      ])
      setPosterTitle('')
      setPosterUrl('')
      setPosterAction('')
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setStatus('Write cancelled - no tag was detected')
        } else if (error.name === 'NotAllowedError') {
          setStatus('NFC permission denied')
        } else if (error.name === 'NotSupportedError') {
          setStatus('Tag is not writable or incompatible')
        } else {
          setStatus(`Write error: ${error.message}`)
        }
      } else {
        setStatus('Unknown write error occurred')
      }
    }
  }

  const makeReadOnly = async (): Promise<void> => {
    if (!('NDEFReader' in window)) {
      setStatus('NFC not supported')
      return
    }

    if (
      !window.confirm('This will make the tag READ-ONLY permanently. Continue?')
    ) {
      return
    }

    try {
      const ndef = new window.NDEFReader()
      const records: {recordType: string; data: string}[] = []

      if (writeText) {
        records.push({recordType: 'text', data: writeText})
      }

      if (writeUrl) {
        records.push({recordType: 'url', data: writeUrl})
      }

      setStatus('Hold an NFC tag to make it read-only...')

      await ndef.write({records}, {overwrite: false})

      setStatus('✅ Tag is now read-only!')
      setMessages((prev) => ['🔒 Made tag read-only', ...prev])
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`)
      } else {
        setStatus('Unknown error occurred')
      }
    }
  }

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
    formatRecordData,
    writeToTag,
    writeSmartPoster,
    makeReadOnly,
    messages,
    writeText,
    writeUrl,
    posterTitle,
    posterUrl,
    posterAction,
    status,
  }
}

/*
Returns the record type of the record.
Records must have either a standardized
well-known type name such as

"empty", "text", "url", "smart-poster",
"absolute-url", "mime", or "unknown"

or else an external type name, which
consists of a domain name and custom
type name separated by a colon (":").
*/
