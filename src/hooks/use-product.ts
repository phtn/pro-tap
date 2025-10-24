import {CardStatus, checkCardStatus} from '@/lib/firebase/cards'
import {getVisiblePublicUsers, PublicProfile} from '@/lib/firebase/public/u'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

export const useProduct = (id: string | undefined) => {
  const router = useRouter()
  const [cardStatus, setCardStatus] = useState<CardStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [visiblePublicProfiles, setVisiblePublicProfiles] = useState<
    PublicProfile[]
  >([])

  const ownership = useCallback(
    (users: PublicProfile[]) =>
      users.length > 0 && users.find((u) => u.id === id),
    [id],
  )

  const fetchVisiblePublicProfiles = useCallback(async () => {
    if (!id) {
      setVisiblePublicProfiles([])
      return
    }

    try {
      const users = await getVisiblePublicUsers('id')
      setVisiblePublicProfiles(users)
    } catch (error) {
      console.error('Failed to fetch public users:', error)
      setVisiblePublicProfiles([])
    }
  }, [id])

  useEffect(() => {
    fetchVisiblePublicProfiles()
  }, [fetchVisiblePublicProfiles])

  useEffect(() => {
    if (ownership(visiblePublicProfiles)) {
      // Handle the case when a user is found
      router.push('/u/' + id)
    }
  }, [visiblePublicProfiles, id, router, ownership])

  const runFetch = useCallback(async () => {
    if (!id && ownership(visiblePublicProfiles)) {
      setCardStatus(null)
      setLoading(false)
      return router.push('/u/' + id)
    }

    setLoading(true)
    try {
      if (id && !ownership(visiblePublicProfiles)) {
        const result = await checkCardStatus(id, 'general')
        setCardStatus(result)
        setLoading(false)
      }
    } catch (error) {
      console.error('Failed to fetch card status:', error)
      setCardStatus(null)
      setLoading(false)
    }
  }, [id, visiblePublicProfiles, ownership])

  useEffect(() => {
    runFetch()
  }, [runFetch])

  return {loading, cardStatus}
}
