'use client'

import {useAuthCtx} from '@/ctx/auth'
import {onSuccess, onWarn} from '@/ctx/toast'
import {createBulkQRCodes, ProtapActivationInfo} from '@/lib/firebase/cards'
import {User} from 'firebase/auth'
import {Timestamp} from 'firebase/firestore'
import {Dispatch, SetStateAction, useCallback, useState} from 'react'

interface UseQRGen {
  qrCodeGens: string[]
  isGenerating: boolean
  generatedCount: number
  series: string
  group: string
  batch: string
  createdAt: Timestamp | null
  handleStartGeneration: (coll?: string) => Promise<string[] | undefined>
  handleClearGens: VoidFunction
  openCardItem: boolean
  selectedItem: ProtapActivationInfo | null
  handleOpenCardItem: (item: ProtapActivationInfo | null) => void
  handleSheetOpenChange: (open: boolean) => void
  setSelectedQuantity: Dispatch<SetStateAction<number>>
  selectedQuantity: number
  setSeries: Dispatch<SetStateAction<string>>
  setGroup: Dispatch<SetStateAction<string>>
  setBatch: Dispatch<SetStateAction<string>>
}

export const useQrGen = (): UseQRGen => {
  const {user} = useAuthCtx()
  const [qrCodeGens, setQrCodeGens] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCount, setGeneratedCount] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(5)
  const [series, setSeries] = useState('individual')
  const [group, setGroup] = useState('indv')
  const [batch, setBatch] = useState(Date.now().toString())
  const [createdAt, setCreatedAt] = useState<Timestamp | null>(null)
  const [openCardItem, setOpenCardItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ProtapActivationInfo | null>(
    null,
  )

  const generateQr = useCallback(
    async (coll: string, count: number) => {
      if (isGenerating) return

      setIsGenerating(true)

      try {
        const {createdIds, createdAt} = await createBulkQRCodes(
          coll,
          count,
          series,
          group,
          batch,
          user as User,
        )

        setQrCodeGens((prev) => [...prev, ...createdIds])
        setCreatedAt(createdAt)
        setGeneratedCount(createdIds.length)
        return createdIds
      } catch (error) {
        console.error('Bulk QR generation failed:', error)
        onWarn(
          `Failed to generate QR codes: ${error instanceof Error ? error.message : 'Unknown error'}`,
        )
      } finally {
        setIsGenerating(false)
      }
    },
    [isGenerating, series, group, batch, user, onSuccess, onWarn],
  )

  const handleStartGeneration = useCallback(
    async (coll?: string) => {
      if (isGenerating) return

      if (user && !coll) {
        setGroup(user.uid.substring(-4).trim())
        return generateQr(group, selectedQuantity)
      }

      if (selectedQuantity <= 0) {
        onWarn('Please select a valid quantity')
        return
      }

      if (selectedQuantity > 10000) {
        onWarn('Maximum quantity allowed is 10,000')
        return
      }

      await generateQr('general', selectedQuantity)
    },
    [isGenerating, user, selectedQuantity, generateQr, onWarn],
  )

  const handleClearGens = useCallback(() => {
    setQrCodeGens([])
    setGeneratedCount(0)
  }, [])

  const handleOpenCardItem = (item: ProtapActivationInfo | null) => {
    if (item) {
      setSelectedItem(item)
      setOpenCardItem(true)
    } else {
      setOpenCardItem((prev) => !prev)
    }
  }

  const handleSheetOpenChange = (open: boolean) => {
    setOpenCardItem(open)
    if (!open) {
      setSelectedItem(null)
    }
  }

  return {
    group,
    batch,
    series,
    setBatch,
    setGroup,
    createdAt,
    setSeries,
    qrCodeGens,
    openCardItem,
    isGenerating,
    selectedItem,
    generatedCount,
    handleClearGens,
    selectedQuantity,
    handleOpenCardItem,
    handleStartGeneration,
    handleSheetOpenChange,
    setSelectedQuantity,
  }
}
