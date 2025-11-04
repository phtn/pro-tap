'use client'

import {KLoader} from '@/components/kokonutui/loader'
import {MiniVerifier} from '@/components/kokonutui/verifier'
import {Navbar} from '@/components/ui/navbar'
import TextAnimate from '@/components/ui/text-animate'
import {useCardId} from '@/hooks/use-card-id'
import {useSearchParams} from 'next/navigation'
import ProfileView from './view'
import PrivateProfileView from './private-view'

interface ContentProps {
  username: string
}

export const Content = ({username}: ContentProps) => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const {userProfile, isValidToken, forActivation} = useCardId(username, token)

  return (
    <main className='max-w-6xl mx-auto'>
      <Navbar>
        <TextAnimate className='text-lg mr-4 font-doto font-bold max-w-[25ch] truncate'>
          {userProfile
            ? userProfile.username || userProfile.displayName || username.split('-').pop()
            : username.split('-').pop()}
        </TextAnimate>
      </Navbar>

      {userProfile ? (
        userProfile.isPublic ? (
          <ProfileView profile={userProfile} />
        ) : (
          <PrivateProfileView />
        )
      ) : forActivation ? (
        <div className='relative flex justify-center'>
          <MiniVerifier isGood={isValidToken} />
        </div>
      ) : (
        <div>
          <KLoader subtitle={'Please wait a moment.'} />
        </div>
      )}
    </main>
  )
}

/*
<NeobrutalistCard
            actionLink={activationLink}
            action={isValidToken ? 'Activate' : 'Validating'}
            title={<Icon name='protap' className='h-10 w-32' />}
            description='Status'
            details={detailItems}
            tag='Activation'>
            {profileError ? (
                    <p className='mt-4 text-sm text-red-500'>{profileError}</p>
                  ) : null}

          </NeobrutalistCard>
*/
