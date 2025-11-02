'use client'

import {setCookie} from '@/app/actions'
import {KLoader} from '@/components/kokonutui/loader'
import {Navbar} from '@/components/ui/navbar'
import TextAnimate from '@/components/ui/text-animate'
import {useAuthCtx} from '@/ctx/auth'
import {useActivation} from '@/hooks/use-activation'
import {useQuery} from 'convex/react'
import {useRouter, useSearchParams} from 'next/navigation'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {api} from '../../../../convex/_generated/api'
import {UserProfileProps} from '../../../../convex/userProfiles/d'
import ProfileView from './view'

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
  const [profileFound, setProfileFound] = useState(false)

  const isUuidUsername = useMemo(() => isUuid(username), [username])

  const userProfile = useQuery(api.userProfiles.q.getByCardId, {
    cardId: username,
  })
  const userProfileByUsername = useQuery(api.userProfiles.q.getByUsername, {
    username,
  })

  const setProtapActivation = useCallback(
    async () => setCookie('protapActivation', {cardId: username}),
    [username],
  )

  useEffect(() => {
    if (userProfileByUsername) {
      console.log(userProfileByUsername)
      setProfileFound(true)
    }

    if (!isUuidUsername) {
      setProfileError(null)
      return
    }

    if (typeof userProfile === 'undefined') {
      return
    }

    if (userProfile) {
      console.log(userProfile)
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

  const detailItems = useMemo(
    () => [
      {
        id: 'validation',
        label: 'Validation',
        value: isValid ? '☑️' : 'INVALID',
      },
      {id: 'auth', label: 'Auth', value: user?.uid ? '☑️' : 'NO'},
      {id: 'profile', label: 'Profile', value: profileStatus},
    ],
    [isValid, profileStatus, user?.uid],
  )

  return (
    <main className='max-w-6xl mx-auto'>
      {/*<ProfileView profile={profile} />*/}
      <Navbar>
        <TextAnimate className='text-lg mr-4 font-doto'>
          {username.split('-').pop()}
        </TextAnimate>
      </Navbar>
      {profileFound ? (
        <ProfileView profile={userProfileByUsername as UserProfileProps} />
      ) : (
        <div>
          <KLoader subtitle={'Please wait a moment.'} />
        </div>
      )}
      {isUuidUsername && !profileFound && (
        <div>
          <KLoader
            title={isGood ? 'Validated' : 'Invalid Token'}
            subtitle={
              isGood
                ? detailItems[0].label + activationLink
                : (profileError ?? '')
            }
          />
        </div>
      )}
    </main>
  )
}

/*
<div className='relative flex justify-center border'>
          <NeobrutalistCard
            actionLink={activationLink}
            action={isGood ? 'Activate' : 'Validating'}
            title={<Icon name='protap' className='h-10 w-32' />}
            description='Status'
            details={detailItems}
            tag='Activation'>
            {profileError ? (
              <p className='mt-4 text-sm text-red-500'>{profileError}</p>
            ) : null}
            <MiniVerifier isGood={isGood} />
          </NeobrutalistCard>
        </div>
*/
