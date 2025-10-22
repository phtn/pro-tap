import {CardStatus, checkCardStatus} from '@/lib/firebase/cards'
import {getVisiblePublicUsers, PublicUser} from '@/lib/firebase/public/u'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

export const useProduct = (id: string | undefined) => {
  const router = useRouter()
  const [cardStatus, setCardStatus] = useState<CardStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [visiblePublicUsers, setVisiblePublicUsers] = useState<PublicUser[]>([])

  const ownership = useCallback(
    (users: PublicUser[]) => users.length > 0 && users.find((u) => u.id === id),
    [id],
  )

  const fetchVisiblePublicUsers = useCallback(async () => {
    if (!id) {
      setVisiblePublicUsers([])
      return
    }

    try {
      const users = await getVisiblePublicUsers('id')
      setVisiblePublicUsers(users)
    } catch (error) {
      console.error('Failed to fetch public users:', error)
      setVisiblePublicUsers([])
    }
  }, [id])

  useEffect(() => {
    fetchVisiblePublicUsers()
  }, [fetchVisiblePublicUsers])

  useEffect(() => {
    if (ownership(visiblePublicUsers)) {
      // Handle the case when a user is found
      router.push('/u/' + id)
    }
  }, [visiblePublicUsers, id, router, ownership])

  const runFetch = useCallback(async () => {
    if (!id && ownership(visiblePublicUsers)) {
      setCardStatus(null)
      setLoading(false)
      return router.push('/u/' + id)
    }

    setLoading(true)
    try {
      if (id && !ownership(visiblePublicUsers)) {
        const result = await checkCardStatus(id, 'general')
        setCardStatus(result)
        setLoading(false)
      }
    } catch (error) {
      console.error('Failed to fetch card status:', error)
      setCardStatus(null)
      setLoading(false)
    }
  }, [id, visiblePublicUsers, ownership])

  useEffect(() => {
    runFetch()
  }, [runFetch])

  return {loading, cardStatus}
}
