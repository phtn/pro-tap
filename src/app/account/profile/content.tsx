'use client'

import {ProAvatar} from '@/components/ui/pro-avatar'
import TextAnimate from '@/components/ui/text-animate'
import Image from 'next/image'

import {BentoGridStats} from '@/app/account/profile/_components/bento-grid'
import {ClassName} from '@/app/types'
import {StarsBackground} from '@/components/animate-ui/components/backgrounds/stars'
import {useAuthCtx} from '@/ctx/auth'
import {cn} from '@/lib/utils'
import {useMutation} from 'convex/react'
import {useTheme} from 'next-themes'
import {useEffect} from 'react'
import {api} from '../../../../convex/_generated/api'

export const Content = () => {
  const {user} = useAuthCtx()
  const upsert = useMutation(api.users.create.default)

  useEffect(() => {
    if (user?.email) {
      upsert({
        proId: user.uid,
        email: user.email,
        visible: true,
      })
    }
  }, [user, upsert])

  return (
    <div className='relative block'>
      <ProfileBackground />
      <CoverSection
        imageSource={user?.photoURL ?? '/sam-editor.png'}
        isActivated={true}
      />
      <Spacer />
      <HeaderTitle title='Overview' className='md:flex hidden' />
      <BentoGridStats />
      <Spacer />
      {/*<ReactMasonryExample />*/}
    </div>
  )
}

interface CoverSectionProps {
  imageSource: string | null
  isActivated: boolean
}

const CoverSection = ({imageSource, isActivated}: CoverSectionProps) => {
  return (
    <div className='relative'>
      <div className='h-36 md:h-64 lg:h-72 rounded-b-4xl rounded-t-4xl overflow-hidden'>
        <Image
          // src="https://res.cloudinary.com/dx0heqhhe/image/upload/v1757754913/personalization_pluy38.webp"
          // src='https://res.cloudinary.com/dx0heqhhe/image/upload/v1759433575/Screenshot_2025-09-05_at_5.23.47_AM_k6cs9n.png'
          src='/images/short-cover.avif'
          alt='Logo'
          width={1600}
          height={900}
          className='aspect-auto object-cover w-full select-none sepia'
          priority
          unoptimized
        />
      </div>
      <div className='relative'>
        {imageSource && (
          <div className='absolute border-2 bg-white border-white aspect-square size-20 md:size-28 flex items-center justify-center left-1/8 -translate-x-1/4 -bottom-12 rounded-full shadow-2xl'>
            <ProAvatar
              photoURL={imageSource}
              isActivated={isActivated}
              className='size-full shrink-0'
            />
          </div>
        )}
      </div>
    </div>
  )
}

interface HeaderProps {
  title: string
  className?: ClassName
}

const HeaderTitle = ({title, className}: HeaderProps) => {
  return (
    <div
      className={cn('flex items-center relative h-20 md:pl-4 pl-8', className)}>
      <TextAnimate
        delay={500}
        text={title}
        type='whipInUp'
        className='tracking-tighter text-2xl font-semibold font-figtree'
      />
    </div>
  )
}

const Spacer = () => <div className='relative z-20 h-14 w-full' />

const ProfileBackground = () => {
  const {resolvedTheme} = useTheme()

  return (
    <StarsBackground
      starColor={resolvedTheme === 'dark' ? '#FFF' : '#000'}
      className={cn(
        'hidden dark:flex items-center justify-center absolute z-0 pointer-events-none inset-0',
        'dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_60%)] _bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_50%)]',
      )}
    />
  )
}

/*


export const ProfileBackground = () => {
  const { resolvedTheme } = useTheme()

  return (
    <StarsBackground
      starColor={resolvedTheme === 'dark' ? '#FFF' : '#000'}
      className={cn(
        'absolute inset-0 flex items-center justify-center rounded-xl',
        'dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)] _bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_100%)]'
      )}
    />
  )
}
*/
