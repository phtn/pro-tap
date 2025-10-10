'use client'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {ProAvatar} from '@/components/ui/pro-avatar'
import TextAnimate from '@/components/ui/text-animate'
import {Visual1} from '@/components/ui/visual-1'
import {Widget, WidgetHeader} from '@/components/ui/widget'
import {useAuthCtx} from '@/ctx/auth'
import {Icon} from '@/lib/icons'
import Image from 'next/image'

import {StarsBackground} from '@/components/animate-ui/components/backgrounds/stars'
import {BentoGridStats} from '@/components/experimental/bento-grid'
import {cn} from '@/lib/utils'
import {User} from 'firebase/auth'
import {useTheme} from 'next-themes'

export const Content = () => {
  const {user} = useAuthCtx()
  return (
    <div className='relative block'>
      <ProfileBackground />
      <CoverSection user={user} />
      <Spacer />
      <HeaderTitle title='Overview' />
      <BentoGridStats />
      {/*<ReactMasonryExample />*/}
    </div>
  )
}

interface CoverSectionProps {
  user: User | null
}

const CoverSection = ({user}: CoverSectionProps) => {
  return (
    <div className='relative'>
      <div className='h-36 md:h-64 lg:h-72 rounded-b-4xl md:rounded-t-4xl overflow-hidden'>
        <Image
          // src="https://res.cloudinary.com/dx0heqhhe/image/upload/v1757754913/personalization_pluy38.webp"
          src='https://res.cloudinary.com/dx0heqhhe/image/upload/v1759433575/Screenshot_2025-09-05_at_5.23.47_AM_k6cs9n.png'
          alt='Logo'
          width={0}
          height={0}
          className='aspect-auto w-full select-none sepia'
          priority
          unoptimized
        />
      </div>
      <div className='relative'>
        {user && (
          <div className='absolute border-2 bg-white border-white aspect-square size-20 md:size-28 flex items-center justify-center left-1/8 -translate-x-1/4 -bottom-12 rounded-full shadow-2xl'>
            <ProAvatar
              photoURL={user.photoURL}
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
}

const HeaderTitle = ({title}: HeaderProps) => {
  return (
    <div className='flex items-center relative h-20 md:pl-4 pl-8'>
      <TextAnimate
        text={title}
        type='whipInUp'
        className='tracking-tighter text-2xl font-semibold font-figtree'
        delay={500}
      />
    </div>
  )
}

export const Widgets = () => (
  <div className='grid grid-cols-12 md:gap-x-6 gap-y-6 md:h-64 h-fit px-4 md:px-2 lg:px-0 w-full'>
    <Widget className='md:col-span-8 col-span-12 md:h-full overflow-hidden'>
      <WidgetHeader
        icon='engagement'
        title='Engagements'
        description='Real-time network connection stats'
      />
      <Visual1 />
    </Widget>
    <div className='md:col-span-4 col-span-12 md:h-full w-full md:place-content-between flex flex-col'>
      {/*<Link href='/account/profile/preview'>
        <SexyButton
          size='lg'
          leftIcon='eye'
          variant='primary'
          className='w-full'>
          View Profile
        </SexyButton>
      </Link>*/}
      <Widget className='align-bottom w-full'>
        <WidgetHeader
          title='Social Media'
          description='Add social media links to your profile.'
        />
        <div className='flex justify-between'>
          <SexyButton variant='ghost' badge='add'>
            <Icon name='instagram' className='scale-150' />
          </SexyButton>
          <SexyButton variant='ghost' badge='add'>
            <Icon name='facebook-solid' className='scale-190' />
          </SexyButton>
          <SexyButton variant='ghost' badge='add'>
            <Icon name='x-twitter' className='scale-150' />
          </SexyButton>
          <SexyButton variant='ghost'>
            <Icon name='add' className='scale-150' />
          </SexyButton>
        </div>
      </Widget>
    </div>
  </div>
)

const Spacer = () => <div className='relative z-20 h-14 w-full' />

const ProfileBackground = () => {
  const {resolvedTheme} = useTheme()

  return (
    <StarsBackground
      starColor={resolvedTheme === 'dark' ? '#FFF' : '#000'}
      className={cn(
        'absolute z-0 pointer-events-none inset-0 flex items-center justify-center',
        'dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_60%)] _bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_50%)]',
      )}
    />
  )
}

/*
const SampleChart = () => (
  <div className='absolute top-0 left-[-1px] h-full w-[356px]'>
    <svg
      className='h-full w-[356px]'
      viewBox='0 0 356 180'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_25_384)'>
        <path
          d='M1 131.5L33.5 125.5L64 102.5L93.5 118.5L124.5 90L154 100.5L183.5 76L207.5 92L244.5 51L274.5 60.5L307.5 46L334.5 28.5L356.5 1'
          // stroke={color}
        />
        <path
          d='M33.5 125.5L1 131.5V197H356.5V1L335 28.5L306.5 46L274.5 60.5L244.5 51L207.5 92L183.5 76L154 100.5L124.5 90L93.5 118.5L64 102.5L33.5 125.5Z'
          // fill={color}
          fillOpacity='0.3'
        />
      </g>
      <defs>
        <clipPath id='clip0_25_384'>
          <rect width='356' height='180' fill='white' />
        </clipPath>
      </defs>
    </svg>
    <div className='ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[3] transform bg-gradient-to-r from-transparent from-0% to-white to-15% transition-transform duration-500 group-hover/animated-card:translate-x-full dark:to-black' />
  </div>
)

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
