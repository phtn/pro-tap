'use client'

import {KLoader} from '@/components/kokonutui/loader'
import {MiniVerifier} from '@/components/kokonutui/verifier'
import {Navbar} from '@/components/ui/navbar'
import TextAnimate from '@/components/ui/text-animate'
import {useAuthCtx} from '@/ctx/auth'
import {useCardId} from '@/hooks/use-card-id'
import {Icon} from '@/lib/icons'
import {useSearchParams} from 'next/navigation'
import {useMemo} from 'react'
import {NeobrutalistCard} from './card'
import ProfileView from './view'

interface ContentProps {
  username: string
}

export const Content = ({username}: ContentProps) => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const {user} = useAuthCtx()

  const {userProfile, isValidToken, activationLink} = useCardId(username, token)

  const detailItems = useMemo(
    () => [
      {
        id: 'validation',
        label: 'Validation',
        value: isValidToken ? '☑️' : 'INVALID',
      },
      {id: 'auth', label: 'Auth', value: user?.uid ? '☑️' : 'NO'},
      {id: 'profile', label: 'Profile', value: ''},
    ],
    [isValidToken, user?.uid],
  )

  return (
    <main className='max-w-6xl mx-auto'>
      <Navbar>
        <TextAnimate className='text-lg mr-4 font-doto'>
          {username.split('-').pop()}
        </TextAnimate>
      </Navbar>

      {userProfile ? (
        <ProfileView profile={userProfile} />
      ) : isValidToken ? (
        <div className='relative flex justify-center border'>
          <NeobrutalistCard
            actionLink={activationLink}
            action={isValidToken ? 'Activate' : 'Validating'}
            title={<Icon name='protap' className='h-10 w-32' />}
            description='Status'
            details={detailItems}
            tag='Activation'>
            {/*{profileError ? (
                    <p className='mt-4 text-sm text-red-500'>{profileError}</p>
                  ) : null}*/}
            <MiniVerifier isGood={isValidToken} />
          </NeobrutalistCard>
        </div>
      ) : (
        <div>
          <KLoader subtitle={'Please wait a moment.'} />
        </div>
      )}
    </main>
  )
}
