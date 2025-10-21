import {CardStatus, checkCardStatus} from '@/lib/firebase/cards'
import {useCallback, useEffect, useState} from 'react'

export const useProduct = (id: string | undefined) => {
  const [cardStatus, setCardStatus] = useState<CardStatus | null>(null)
  const [loading, setLoading] = useState(false)

  const runFetch = useCallback(async () => {
    if (!id) {
      setCardStatus(null)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const result = await checkCardStatus(id, 'general')
      setCardStatus(result)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch card status:', error)
      setCardStatus(null)
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    runFetch()
  }, [runFetch])

  return {loading, cardStatus}
}
