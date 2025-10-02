import {VoidPromise} from '@/app/types'
import {useCallback, useEffect, useRef, useState} from 'react'

// NFC Web API TypeScript definitions
interface NDEFMessage {
  records: NDEFRecord[]
}

interface NDEFRecord {
  recordType: string
  mediaType?: string
  id?: string
  data?: BufferSource
  encoding?: string
  lang?: string
}

interface NDEFReader extends EventTarget {
  scan(options?: {signal?: AbortSignal}): Promise<void>
  write(
    message: string | BufferSource | NDEFMessage,
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
  timestamp: Date
}

export interface UseNFCOptions {
  onScan?: (data: NFCData) => void
  onError?: (error: string) => void
  maxHistorySize?: number
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
}

export const useNFC = (options: UseNFCOptions = {}): UseNFCReturn => {
  const {onScan, onError, maxHistorySize = 10} = options

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [lastScan, setLastScan] = useState<NFCData | null>(null)
  const [scanDetails, setScanDetails] = useState<NFCData | null>(null)
  const [scanHistory, setScanHistory] = useState<NFCData[]>([])
  const nfcReaderRef = useRef<NDEFReader | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const autoStoppedRef = useRef<boolean>(false)

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

        if (record.data) {
          const decoder = new TextDecoder(record.encoding || 'utf-8')
          data = decoder.decode(record.data)
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
        timestamp: new Date(),
      }

      setLastScan(nfcData)
      setScanDetails(nfcData)
      setScanHistory((prev) => [nfcData, ...prev.slice(0, maxHistorySize - 1)])

      if (onScan) {
        onScan(nfcData)
      }

      // Auto-stop scanning after a successful read
      autoStoppedRef.current = true
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
    },
    [onScan, maxHistorySize, handleNFCError],
  )

  const startScanning = useCallback(async (): Promise<void> => {
    if (!isSupported) {
      const errorMsg = 'NFC is not supported on this device/browser'
      if (onError) {
        onError(errorMsg)
      }
      return
    }

    try {
      const reader = new window.NDEFReader()
      const controller = new AbortController()

      nfcReaderRef.current = reader
      abortControllerRef.current = controller
      setIsScanning(true)

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
