'use client'

import {CardRequest} from '@/app/api/card/generate/route'
import {VoidPromise} from '@/app/types'
import {onWarn} from '@/ctx/toast'
import {ProtapActivationInfo} from '@/lib/firebase/cards'
import {TokenMetadata} from '@/lib/jwt/tok.types'
import {Dispatch, SetStateAction, useCallback, useState} from 'react'
import {CardSeries} from '../../convex/cards/d'
import {useCardGen} from './use-card-gen'

interface UseQRGen {
  tokens: TokenMetadata[]
  generateQRCode: VoidPromise
  qrCodeGens: string[]
  generatedCount: number
  series: string
  group: string
  batch: string
  handleClearGens: VoidFunction
  openCardItem: boolean
  isGenerating: boolean
  selectedCard: TokenMetadata | null
  handleOpenCardItem: (item: ProtapActivationInfo | null) => void
  handleSelectCard: (card: TokenMetadata | null) => void
  handleSheetOpenChange: (open: boolean) => void
  setSelectedQuantity: Dispatch<SetStateAction<number>>
  selectedQuantity: number
  setSeries: Dispatch<SetStateAction<CardSeries>>
  setGroup: Dispatch<SetStateAction<string>>
  setBatch: Dispatch<SetStateAction<string>>
}

export const useQrGen = (): UseQRGen => {
  const [qrCodeGens, setQrCodeGens] = useState<string[]>([])
  const [generatedCount, setGeneratedCount] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(5)
  const [series, setSeries] = useState<CardSeries>('individual')
  const [group, setGroup] = useState('indv')
  const [batch, setBatch] = useState(Date.now().toString())
  const [openCardItem, setOpenCardItem] = useState(false)
  const [tokens, setTokens] = useState<TokenMetadata[]>([])
  const [selectedCard, setSelectedCard] = useState<TokenMetadata | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleClearGens = useCallback(() => {
    setQrCodeGens([])
    setTokens([])
    setGeneratedCount(0)
  }, [])

  const handleOpenCardItem = (item: ProtapActivationInfo | null) => {
    if (item) {
      setOpenCardItem(true)
    } else {
      setOpenCardItem((prev) => !prev)
    }
  }

  const handleSelectCard = (card: TokenMetadata | null) => {
    if (card) {
      setSelectedCard(card)
      setOpenCardItem(true)
    } else {
      setOpenCardItem((prev) => !prev)
    }
  }

  const handleSheetOpenChange = (open: boolean) => {
    setOpenCardItem(open)
    if (!open) {
      setSelectedCard(null)
    }
  }

  /*
  New function to generate QR code
  */

  const {generate} = useCardGen()

  const generateQRCode = useCallback(async () => {
    setIsGenerating(true)
    const body: CardRequest = {
      type: 'qr',
      body: {
        series,
        group,
        batch,
      },
      userId: series,
      count: selectedQuantity,
    }
    try {
      const response = await generate(body)
      if (response.length !== 0) {
        setTokens(response)
        setGeneratedCount((prev) => prev + response.length)
      } else {
        onWarn('Failed to generate QR code')
      }

      setIsGenerating(false)
    } catch (error) {
      setIsGenerating(false)
      onWarn('Failed to generate QR code')
    }
  }, [generate, selectedQuantity, series, batch, group])

  return {
    tokens,
    generateQRCode,
    selectedCard,
    handleSelectCard,
    isGenerating,
    group,
    batch,
    series,
    setBatch,
    setGroup,
    setSeries,
    qrCodeGens,
    openCardItem,
    generatedCount,
    handleClearGens,
    selectedQuantity,
    handleOpenCardItem,
    handleSheetOpenChange,
    setSelectedQuantity,
  }
}
