'use client'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {ProfileCard} from '@/components/react-bits/profile-card'
import {useAuthCtx} from '@/ctx/auth'
import {useToggle} from '@/hooks/use-toggle'
import {useUserUpdater} from '@/hooks/use-user-updater'
import {ProfilePictureUploader} from '../_components/photo-upload'

export const Content = () => {
  const {user} = useAuthCtx()
  const {on: onUploader, toggle: toggleUploader} = useToggle(false)
  const {updateProfilePhoto} = useUserUpdater(user?.uid)
  return (
    <main className='flex items-center justify-center py-16'>
      <ProfileCard
        avatarUrl={user?.photoURL ?? 'https://github.com/phtn.png'}
        iconUrl='https://res.cloudinary.com/dx0heqhhe/image/upload/v1755962445/re-up-icon-v3_1_u5r544.png'
        grainUrl='https://res.cloudinary.com/dx0heqhhe/image/upload/v1755962445/re-up-icon-v3_1_u5r544.png'
        behindGradient=''
        innerGradient=''
        showBehindGradient
        className=''
        enableTilt
        enableMobileTilt
        mobileTiltSensitivity={0}
        miniAvatarUrl={user?.photoURL ?? 'https://github.com/phtn.png'}
        name={user?.displayName ?? ''}
        title=''
        handle={user?.displayName?.split(' ')[0] ?? ''}
        status=''
        contactText=''
        showUserInfo={false}
        onContactClick={() => console.log('')}
      />
      <div className='size-96 bg-amber-50'>
        {user && (
          <ProfilePictureUploader
            user={user}
            onUpdate={updateProfilePhoto}
            onClose={toggleUploader}
          />
        )}
      </div>
      <div>
        <SexyButton
          disabled={onUploader}
          onClick={toggleUploader}
          className=''></SexyButton>
      </div>
    </main>
  )
}
