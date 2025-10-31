'use client'

import {setCookie} from '@/app/actions'
import {MiniVerifier} from '@/components/kokonutui/verifier'
import {Navbar} from '@/components/ui/navbar'
import TextAnimate from '@/components/ui/text-animate'
import {useAuthCtx} from '@/ctx/auth'
import {useActivation} from '@/hooks/use-activation'
import {Icon} from '@/lib/icons'
import {useQuery} from 'convex/react'
import {useRouter, useSearchParams} from 'next/navigation'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {api} from '../../../../convex/_generated/api'
import {NeobrutalistCard} from './card'

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const isUuid = (value: string) => UUID_REGEX.test(value)

interface ContentProps {
  username: string
}

export const Content = ({username}: ContentProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const {user} = useAuthCtx()

  const [isValid, setIsValid] = useState(false)
  const [isGood, setIsGood] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  const isUuidUsername = useMemo(() => isUuid(username), [username])

  const userProfile = useQuery(api.userProfiles.get.getByCardId, {
    cardId: username,
  })

  const setProtapActivation = useCallback(
    async () => setCookie('protapActivation', {cardId: username}),
    [username],
  )

  useEffect(() => {
    if (!isUuidUsername) {
      setProfileError(null)
      return
    }

    if (typeof userProfile === 'undefined') {
      return
    }

    if (userProfile !== null) {
      setProfileError(null)
      router.push(`/u/${userProfile.username ?? userProfile.cardId}`)
      setProtapActivation().catch(console.error)
      return
    }

    setProfileError(
      'This card could not be found. Please check your link or contact support.',
    )
  }, [isUuidUsername, router, setProtapActivation, userProfile])

  const {validateToken} = useActivation(String(token), username)

  useEffect(() => {
    if (token) {
      validateToken().then(setIsValid).catch(console.error)
    }
  }, [validateToken])

  useEffect(() => {
    if (isValid) {
      setIsGood(true)
    }
  }, [isValid])

  const activationLink = useMemo(
    () => (user?.uid ? '/account/profile/subscriptions' : '/sign'),
    [user],
  )

  const profileStatus = useMemo(() => {
    if (!isUuidUsername) {
      return '☑️'
    }

    if (typeof userProfile === 'undefined') {
      return '...'
    }

    if (userProfile === null) {
      return 'UNKNOWN'
    }

    return '☑️'
  }, [isUuidUsername, userProfile])

  return (
    <main className='max-w-6xl mx-auto'>
      {/*<ProfileView profile={profile} />*/}
      <Navbar>
        <TextAnimate className='text-lg mr-4 font-doto'>
          {username.split('-').pop()}
        </TextAnimate>
      </Navbar>
      <div className='relative flex justify-center border'>
        <NeobrutalistCard
          actionLink={activationLink}
          tag='activation'
          title={<Icon name='protap' className='h-10 w-32' />}
          description='Status'
          details={[
            {label: 'Validation', value: isValid ? '☑️' : 'INVALID'},
            {label: 'Auth', value: user?.uid ? '☑️' : 'NO'},
            {label: 'Profile', value: profileStatus},
          ]}
          action='Activate'>
          {profileError ? (
            <p className='mt-4 text-sm text-red-500'>{profileError}</p>
          ) : null}
          <MiniVerifier isGood={isGood} />
        </NeobrutalistCard>
      </div>
    </main>
  )
}
