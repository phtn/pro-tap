'use client'

import {useAuthCtx} from '@/ctx/auth'
import {GlistenCard} from './glisten-card'

export const Content = () => {
  const {user} = useAuthCtx()
  // const {on: onUploader, toggle: toggleUploader} = useToggle(false)
  // const {updateProfilePhoto} = useUserUpdater(user?.uid)
  return (
    <main className='flex items-center justify-center size-full md:rounded-[4rem]'>
      <GlistenCard
        name={user?.displayName!}
        bio={''}
        followers={0}
        posts={0}
        imageUrl={user?.photoURL ?? null}
      />
    </main>
  )
}

// const LegacyProfile = () => {
//   return (
//     <div>
//       <ProfileCard
//               avatarUrl={user?.photoURL ?? 'https://github.com/phtn.png'}
//               iconUrl='https://res.cloudinary.com/dx0heqhhe/image/upload/v1755962445/re-up-icon-v3_1_u5r544.png'
//               grainUrl='https://res.cloudinary.com/dx0heqhhe/image/upload/v1755962445/re-up-icon-v3_1_u5r544.png'
//               behindGradient=''
//               innerGradient=''
//               showBehindGradient
//               className=''
//               enableTilt
//               enableMobileTilt
//               mobileTiltSensitivity={0}
//               miniAvatarUrl={user?.photoURL ?? 'https://github.com/phtn.png'}
//               name={user?.displayName ?? ''}
//               title=''
//               handle={user?.displayName?.split(' ')[0] ?? ''}
//               status=''
//               contactText=''
//               showUserInfo={false}
//               onContactClick={() => console.log('')}
//             />
//             <div className='hidden size-96 bg-amber-50'>
//               {user && (
//                 <ProfilePictureUploader
//                   user={user}
//                   onUpdate={updateProfilePhoto}
//                   onClose={toggleUploader}
//                 />
//               )}
//             </div>
//             <div className='hidden'>
//               <SexyButton
//                 disabled={onUploader}
//                 onClick={toggleUploader}
//                 className=''
//               />
//             </div>
//     </div>
//   )
// }
