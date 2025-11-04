import {setCookie} from '@/app/actions'
import {useAuthCtx} from '@/ctx/auth'
import {useQuery} from 'convex/react'
import {usePathname, useRouter} from 'next/navigation'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {api} from '../../convex/_generated/api'
import {UserProfileProps} from '../../convex/userProfiles/d'
import {useActivation} from './use-activation'

// More permissive UUID regex that matches any valid UUID format (including v7, v8, etc.)
// Format: 8-4-4-4-12 hex characters separated by hyphens
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

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
  const router = useRouter()
  const pathname = usePathname()
  const {user} = useAuthCtx()
  const navigationHandled = useRef(false)

  const activationLink = useMemo(
    () => (user?.uid ? '/account/profile/subscriptions' : '/sign'),
    [user?.uid],
  )

  // Determine if cardId is a UUID or username
  const isUuidCardId = useMemo(
    () => Boolean(cardId && isUuid(cardId)),
    [cardId],
  )

  // Conditionally run queries based on cardId type (more efficient)
  const queryArgsByCardId = useMemo(
    () => (cardId && isUuidCardId ? {cardId} : 'skip'),
    [cardId, isUuidCardId],
  )
  const queryArgsByUsername = useMemo(
    () => (cardId && !isUuidCardId ? {username: cardId} : 'skip'),
    [cardId, isUuidCardId],
  )

  const profileByCardId = useQuery(
    api.userProfiles.q.getByCardId,
    queryArgsByCardId,
  )
  const profileByUsername = useQuery(
    api.userProfiles.q.getByUsername,
    queryArgsByUsername,
  )

  // Debug logging (remove in production)
  useEffect(() => {
    console.log('[useCardId] Hook state:', {
      cardId,
      isUuidCardId,
      queryArgsByCardId,
      queryArgsByUsername,
      profileByCardId,
      profileByUsername,
      cardIdQueryStatus: profileByCardId === undefined ? 'loading' : profileByCardId === null ? 'not-found' : 'found',
      usernameQueryStatus: profileByUsername === undefined ? 'loading' : profileByUsername === null ? 'not-found' : 'found',
    })
  }, [cardId, isUuidCardId, queryArgsByCardId, queryArgsByUsername, profileByCardId, profileByUsername])

  // Get the appropriate profile result
  // When a query is skipped, it returns undefined, so we need to check which query is active
  const userProfile = useMemo(() => {
    if (isUuidCardId) {
      // When querying by cardId, only trust profileByCardId
      // profileByUsername will be undefined (skipped), so ignore it
      return profileByCardId
    } else {
      // When querying by username, only trust profileByUsername
      // profileByCardId will be undefined (skipped), so ignore it
      return profileByUsername
    }
  }, [isUuidCardId, profileByCardId, profileByUsername])

  const [isValidToken, setIsValidToken] = useState(false)
  const [forActivation, setForActivation] = useState(false)

  // Only initialize activation hook if we have both token and cardId
  const {validateToken} = useActivation(token ?? '', cardId ?? '')

  const setProtapActivation = useCallback(async () => {
    if (cardId) {
      await setCookie('protapActivation', {cardId})
    }
  }, [cardId])

  // Handle navigation and validation logic
  useEffect(() => {
    console.log('[useCardId] Navigation effect running:', {
      navigationHandled: navigationHandled.current,
      cardId,
      userProfile,
      userProfileType: userProfile === undefined ? 'undefined (loading)' : userProfile === null ? 'null (not found)' : 'profile object',
      pathname,
      token: token ? 'present' : 'absent',
    })

    // Prevent multiple navigations or if no cardId
    if (navigationHandled.current || !cardId) {
      console.log('[useCardId] Skipping navigation - already handled or no cardId')
      return
    }

    // Check if we're already on a profile page
    const isOnProfilePage = pathname?.startsWith('/u/')
    const currentProfileSlug = pathname?.split('/u/')[1]
    const isViewingByCardId = isOnProfilePage && cardId && currentProfileSlug === cardId

    // If query is still loading, wait - CRITICAL: Don't navigate until query completes
    if (userProfile === undefined) {
      console.log('[useCardId] Query still loading, waiting...')
      return
    }

    // If profile exists (truthy and not null)
    if (userProfile !== null && userProfile !== undefined) {
      console.log('[useCardId] Profile found!', {
        isViewingByCardId,
        isOnProfilePage,
        currentProfileSlug,
        profileUsername: userProfile.username,
        isPublic: userProfile.isPublic,
      })

      // Permanent redirect: If viewing by cardId UUID and profile has a username, redirect to username URL
      if (isViewingByCardId && userProfile.username) {
        const usernameUrl = `/u/${userProfile.username}`
        console.log('[useCardId] Redirecting from cardId to username permanently:', usernameUrl)
        navigationHandled.current = true
        // Use replace() for permanent redirect (replaces history entry, removes query params)
        router.replace(usernameUrl)
        return
      }

      // If we're already viewing by cardId UUID but no username, don't navigate - just display the profile
      if (isViewingByCardId) {
        console.log('[useCardId] Already viewing by cardId, displaying profile without navigation (no username)')
        navigationHandled.current = true
        return
      }

      // Only navigate if we're NOT already on the correct profile page
      const shouldNavigate = !isOnProfilePage || 
        (userProfile.isPublic && userProfile.username && currentProfileSlug !== userProfile.username) ||
        (!userProfile.isPublic && currentProfileSlug !== 'user-profile-is-private')

      if (shouldNavigate) {
        console.log('[useCardId] Navigating to profile:', userProfile.isPublic && userProfile.username ? `/u/${userProfile.username}` : '/u/user-profile-is-private')
        navigationHandled.current = true
        if (userProfile.isPublic && userProfile.username) {
          // Use replace() for permanent redirect when redirecting to username URL
          router.replace(`/u/${userProfile.username}`)
        } else {
          router.push(`/u/user-profile-is-private`)
        }
      } else {
        // We're already on the correct page, just mark as handled
        console.log('[useCardId] Already on correct profile page')
        navigationHandled.current = true
      }
      return
    }

    // Profile is null (doesn't exist) - if we have a token, validate for activation
    if (token && userProfile === null) {
      console.log('[useCardId] No profile found, but token exists - validating for activation')
      navigationHandled.current = true
      validateToken()
        .then((res) => {
          console.log('[useCardId] Token validation result:', res)
          setIsValidToken(res)
          setForActivation(res)
          setProtapActivation().catch(console.error)
          router.push(activationLink)
        })
        .catch((error) => {
          console.error('[useCardId] Token validation failed:', error)
          setIsValidToken(false)
          setForActivation(false)
          // Reset navigation flag on error so user can retry
          navigationHandled.current = false
        })
    } else if (userProfile === null && !token) {
      console.log('[useCardId] No profile found and no token - nothing to do')
    }
  }, [
    userProfile,
    cardId,
    token,
    validateToken,
    activationLink,
    router,
    setProtapActivation,
    pathname,
  ])

  // Reset navigation flag when cardId changes
  useEffect(() => {
    navigationHandled.current = false
  }, [cardId])

  return {forActivation, userProfile, activationLink, isValidToken}
}
