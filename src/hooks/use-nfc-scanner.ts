import {Dispatch, SetStateAction, useState} from 'react'
import {CardSeries} from '../../convex/cards/d'
import {
  UseNFCReaderOptions,
  UseNFCReaderReturn,
  useNFCReaderV2,
} from './use-nfc-reader-v2'
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
  setSeries: Dispatch<SetStateAction<CardSeries>>
  setGroup: Dispatch<SetStateAction<string>>
  setBatch: Dispatch<SetStateAction<string>>
  series: CardSeries
  group: string
  batch: string
}

export const useNFCScanner = (options: UseNFCOptions = {}): UseNFCReturn => {
  const [series, setSeries] = useState<CardSeries>('individual')
  const [group, setGroup] = useState('indv')
  const [batch, setBatch] = useState(Date.now().toString())

  const readerOptions: UseNFCReaderOptions = {
    ...options,
    series,
    group,
    batch,
  }

  const reader = useNFCReaderV2(readerOptions)
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
