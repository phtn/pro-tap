import {VoidPromise} from '@/app/types'
import {secureRef} from '@/utils/crypto'
import {macStr} from '@/utils/macstr'
import {useState} from 'react'

export interface UseNFCWriterOptions {
  onError?: (error: string) => void
}

export interface UseNFCWriterReturn {
  writeToTag: VoidPromise
  writeSmartPoster: VoidPromise
  makeReadOnly: VoidPromise
  messages: string[]
  writeText: string
  writeUrl: string
  posterTitle: string
  posterUrl: string
  posterAction: string
  status: string
  setWriteText: (text: string) => void
  setWriteUrl: (url: string) => void
  setPosterTitle: (title: string) => void
  setPosterUrl: (url: string) => void
  setPosterAction: (action: string) => void
}

export const useNFCWriter = (
  options: UseNFCWriterOptions = {},
): UseNFCWriterReturn => {
  const {onError} = options

  const [messages, setMessages] = useState<string[]>([])
  const [writeText, setWriteText] = useState<string>('')
  const [writeUrl, setWriteUrl] = useState('')
  const [posterTitle, setPosterTitle] = useState('Protap Activation')
  const [posterUrl, setPosterUrl] = useState('https://protap.ph/api/verify')
  const [posterAction, setPosterAction] = useState<string>('exec')
  const [status, setStatus] = useState<string>('Ready')

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
      const records: {
        recordType: string
        data: string
        mediaType: string | null
        id: string
      }[] = []

      if (writeText) {
        records.push({
          recordType: 'text',
          data: writeText,
          mediaType: 'text',
          id: secureRef(8),
        })
      }

      if (writeUrl) {
        records.push({
          recordType: 'url',
          data: writeUrl,
          mediaType: null,
          id: secureRef(8),
        })
      }

      setStatus('Hold an NFC tag near your device to write...')

      await ndef.write({records}, {overwrite: true})

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
      if (onError) {
        onError(status)
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

      await ndef.write(
        {
          records: [
            {
              recordType: 'smart-poster',
              data: {records: smartPosterRecords},
              mediaType: 'application/smart-poster',
              id: secureRef(8),
            },
          ],
        },
        {overwrite: true},
      )

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
      if (onError) {
        onError(status)
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
      const records: {
        recordType: string
        data: string
        mediaType: string
        id: string
      }[] = []

      if (writeText) {
        records.push({
          recordType: 'text',
          data: writeText,
          mediaType: 'text',
          id: secureRef(8),
        })
      }

      if (writeUrl) {
        records.push({
          recordType: 'url',
          data: writeUrl,
          mediaType: 'text',
          id: secureRef(8),
        })
      }

      setStatus('Hold an NFC tag to make it read-only...')

      await ndef.write({records}, {overwrite: true})

      setStatus('✅ Tag is now read-only!')
      setMessages((prev) => ['🔒 Made tag read-only', ...prev])
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`)
      } else {
        setStatus('Unknown error occurred')
      }
      if (onError) {
        onError(status)
      }
    }
  }

  return {
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
    setWriteText,
    setWriteUrl,
    setPosterTitle,
    setPosterUrl,
    setPosterAction,
  }
}
