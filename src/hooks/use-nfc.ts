import {Dispatch, SetStateAction, useState} from 'react'
import {
  useNFCReader,
  UseNFCReaderOptions,
  UseNFCReaderReturn,
} from './use-nfc-reader'
import {
  useNFCWriter,
  UseNFCWriterOptions,
  UseNFCWriterReturn,
} from './use-nfc-writer'

// Re-export NFCData for backward compatibility
export type {NFCData} from './use-nfc-reader'

export interface UseNFCOptions
  extends UseNFCReaderOptions,
    UseNFCWriterOptions {
  // Additional options if needed
}

export interface UseNFCReturn extends UseNFCReaderReturn, UseNFCWriterReturn {
  setSeries: Dispatch<SetStateAction<string>>
  setGroup: Dispatch<SetStateAction<string>>
  setBatch: Dispatch<SetStateAction<string>>
  series: string
  group: string
  batch: string
}

export const useNFC = (options: UseNFCOptions = {}): UseNFCReturn => {
  const [series, setSeries] = useState<string>('individual')
  const [group, setGroup] = useState('indv')
  const [batch, setBatch] = useState(Date.now().toString())

  const readerOptions: UseNFCReaderOptions = {
    ...options,
    series,
    group,
    batch,
  }

  const reader = useNFCReader(readerOptions)
  const writer = useNFCWriter(options)

  return {
    ...reader,
    ...writer,
    setSeries,
    setGroup,
    setBatch,
    series,
    group,
    batch,
  }
}
