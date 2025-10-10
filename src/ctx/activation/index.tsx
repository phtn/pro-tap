'use client'

import {NFCData} from '@/hooks/use-nfc'
import {useToggle} from '@/hooks/use-toggle'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface ActivationProviderProps {
  children: ReactNode
}

interface ActivationCtxValues {
  openProgress: boolean
  toggleOpenProgress: VoidFunction
  nfcData: NFCData | null
  qrcData: string | null
  setQrcData: Dispatch<SetStateAction<string | null>>
  setNfcData: Dispatch<SetStateAction<NFCData | null>>
}

const ActivationCtx = createContext<ActivationCtxValues | null>(null)

const ActivationCtxProvider = ({children}: ActivationProviderProps) => {
  const {on: openProgress, toggle: toggleOpenProgress} = useToggle()

  const [qrcData, setQrcData] = useState<string | null>(null)
  const [nfcData, setNfcData] = useState<NFCData | null>(null)

  const value = {
    openProgress,
    toggleOpenProgress,
    qrcData,
    setQrcData,
    nfcData,
    setNfcData,
  }

  return <ActivationCtx value={value}>{children}</ActivationCtx>
}

const useActivationCtx = () => {
  const ctx = useContext(ActivationCtx)
  if (!ctx) throw new Error('ActivationCtxProvider is missing')
  return ctx
}

export {ActivationCtx, ActivationCtxProvider, useActivationCtx}
