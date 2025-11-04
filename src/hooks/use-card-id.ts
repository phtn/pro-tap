import {setCookie} from '@/app/actions'
import {useAuthCtx} from '@/ctx/auth'
import {useQuery} from 'convex/react'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {api} from '../../convex/_generated/api'
import {UserProfileProps} from '../../convex/userProfiles/d'
import {useActivation} from './use-activation'

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const isUuid = (value: string) => UUID_REGEX.test(value)

interface UseCardIdReturn {
  forActivation: boolean
  userProfile: UserProfileProps | null | undefined
  activationLink: string
  isValidToken: boolean
}

export const useCardId = (
  cardId: string | null,
  token: string | null,
): UseCardIdReturn => {
  if (!cardId) return {} as UseCardIdReturn
  const router = useRouter()

  const {user} = useAuthCtx()
  const activationLink = useMemo(
    () => (user?.uid ? '/account/profile/subscriptions' : '/sign'),
    [user],
  )

  const {validateToken} = useActivation(String(token), cardId)

  const [userProfile, setUserProfile] = useState<UserProfileProps | null>()
  const [forActivation, setForActivation] = useState(false)

  const isUuidUsername = useMemo(() => cardId && isUuid(cardId), [cardId])
  const profileByCardId = useQuery(api.userProfiles.q.getByCardId, {cardId})
  const profileByUsername = useQuery(api.userProfiles.q.getByUsername, {
    username: cardId,
  })
  const [isValidToken, setIsValidToken] = useState(false)

  const setProtapActivation = useCallback(
    async () => setCookie('protapActivation', {cardId}),
    [cardId],
  )

  useEffect(() => {
    isUuidUsername
      ? setUserProfile(profileByCardId)
      : setUserProfile(profileByUsername)
  }, [profileByCardId, profileByUsername])

  useEffect(() => {
    if (userProfile) {
      if (userProfile.isPublic) {
        router.push(`/u/${userProfile.username}`)
      } else {
        router.push(`/u/user-profile-is-private`)
      }
    } else {
      validateToken()
        .then((res) => {
          setIsValidToken(res)
          setProtapActivation().catch(console.error)
          return setForActivation(res)
        })
        .catch(console.error)
    }
  }, [userProfile, validateToken])

  return {forActivation, userProfile, activationLink, isValidToken}
}
