'use client'
import {getUserProfile} from '@/app/actions'
import {ClassName} from '@/app/types'
import {Icon, type IconName} from '@/lib/icons'
import {getBestImageSource} from '@/lib/image-cache'
import {cn} from '@/lib/utils'
import {motion} from 'motion/react'
import {ReactNode, useEffect, useMemo, useState} from 'react'
import {BentoGrid, BentoGridItem} from '../../../../components/ui/bento-grid'
import {DitherPhoto, ImageDither} from './dither-photo'

interface BentoHeader {
  title: string
  description: ReactNode
  href?: string
  header: ReactNode
  icon: IconName
  className?: ClassName
  activeIcon?: IconName
  pro?: boolean
}

export const BentoGridStats = () => {
  const [imageSource, setImageSource] = useState<string | null>(null)

  useEffect(() => {
    console.log('\ntest')
    const loadCachedImage = async () => {
      try {
        const cachedProfile = await getUserProfile()
        const bestImageSource = cachedProfile
          ? getBestImageSource(cachedProfile)
          : null
        setImageSource(bestImageSource)
        console.log(bestImageSource)
      } catch (error) {
        console.error('Error loading cached image:', error)
        // setImageSource('')
      }
    }

    loadCachedImage().catch(console.error)
  }, [])

  const items = useMemo(
    () =>
      [
        {
          title: '',
          description: <span className='text-sm'></span>,
          header: <SkeletonFour />,
          className: 'md:col-span-2 border-none dark:bg-transparent px-0',
          icon: 'link',
        },
        {
          title: 'Profile Editor',
          description: <span className='text-sm'></span>,
          header: (
            <ProfileEditor>
              <motion.div className='relative h-full w-full rounded-lg flex items-center overflow-hidden'>
                <ImageDither image={imageSource} />
                <DitherPhoto />
              </motion.div>
            </ProfileEditor>
          ),
          className:
            'md:col-span-1 bg-white/60 backdrop-blur-md hover:shadow-xs',
          icon: 'check',
          activeIcon: 'arrow-up',
          pro: true,
          href: '/account/profile/editor',
        },
        {
          title: 'Connections',
          description: (
            <span className='text-sm'>
              View your followers and user interactions.
            </span>
          ),
          header: <SkeletonOne />,
          className: 'md:col-span-1 bg-indigo-200/20',
          icon: 'settings',
          pro: true,
        },
        {
          title: 'Affiliate Account',
          description: (
            <span className='text-sm'>Manage your affiliate account.</span>
          ),
          header: <SkeletonTwo />,
          className: 'md:col-span-1 bg-sky-200/20',
          icon: 'sign-pen',
          pro: true,
        },
        {
          title: 'Merchant Account',
          description: (
            <span className='text-sm'>
              Summarized or full length, you decide.
            </span>
          ),
          header: <MerchantAccount />,
          className: 'md:col-span-1 bg-teal-200/20',
          icon: 'zap',
          pro: true,
        },
      ] as BentoHeader[],
    [],
  )
  return (
    <BentoGrid className='relative max-w-6xl mx-auto md:auto-rows-[20rem]'>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          href={item.href}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn(
            '[&>p:text-lg]',
            item.className,
            // item.title === '' && '',
          )}
          icon={item.icon}
          activeIcon={item.activeIcon}
          pro={item.pro}
        />
      ))}
    </BentoGrid>
  )
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  }
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      initial='initial'
      whileHover='animate'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'>
      <motion.div
        variants={variants}
        className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black'>
        <div className='h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0' />
        <div className='w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900' />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black'>
        <div className='w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900' />
        <div className='h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0' />
      </motion.div>
      <motion.div
        variants={variants}
        className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black'>
        <div className='h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0' />
        <div className='w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900' />
      </motion.div>
    </motion.div>
  )
}
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: '100%',
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ['0%', '100%'],
      transition: {
        duration: 2,
      },
    },
  }
  const arr = useMemo(() => new Array(6).fill(0), [])
  return (
    <motion.div
      initial='initial'
      animate='animate'
      whileHover='hover'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'>
      {arr.map((_, i) => (
        <motion.div
          key={'skelenton-two' + i}
          variants={variants}
          className='max-w-12 flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4'></motion.div>
      ))}
    </motion.div>
  )
}
interface ProfileEditorProps {
  children?: ReactNode
}
const ProfileEditor = ({children}: ProfileEditorProps) => {
  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  }
  return (
    <motion.div
      initial='initial'
      animate='animate'
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className='flex flex-1 w-full h-full md:min-h-[6rem] min-h-[12rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2'
      style={{
        background:
          'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '500% 500%',
      }}>
      {children}
    </motion.div>
  )
}
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  return (
    <motion.div
      initial='initial'
      animate='animate'
      whileHover='hover'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2'>
      <motion.div
        variants={first}
        className='w-1/3 h-full rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center'>
        <Icon name='nfc' className='rounded-full size-8 md:size-12' />
        <p className='sm:text-sm text-xs text-center font-light md:font-semibold text-neutral-500 mt-4'>
          my NFC Card
        </p>
        <p className='border border-teal-500 bg-teal-100 dark:bg-teal-900/20 text-teal-600 text-xs rounded-full px-1 md:px-2 md:py-0.5 mt-4'>
          Active
        </p>
      </motion.div>
      <motion.div className='h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center'>
        <Icon
          name='qrcode-scan'
          className='rounded-full size-10 md:size-12 text-white'
        />

        <p className='sm:text-sm text-xs text-center font-light md:font-semibold text-neutral-500 mt-4'>
          QR Code
        </p>
        <p className='border border-amber-500 bg-amber-100 dark:bg-amber-900/20 text-amber-600 text-xs rounded-full px-1 md:px-2 md:py-0.5 mt-4'>
          Not Active
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className='h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center'>
        <Icon
          name='shield-checkmark'
          className='rounded-full size-8 md:size-14 '
        />

        <p className='sm:text-sm text-xs text-center font-light md:font-semibold text-neutral-500 mt-4'>
          Personal Accident Insurance
        </p>
        <p className='border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-1 md:px-2 md:py-0.5 mt-4'>
          Not Active
        </p>
      </motion.div>
    </motion.div>
  )
}
const MerchantAccount = () => {
  return (
    <motion.div
      initial='initial'
      whileHover='animate'
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2'></motion.div>
  )
}
