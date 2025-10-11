'use client'
import {ClassName} from '@/app/types'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {motion} from 'motion/react'
import {ReactNode, useMemo} from 'react'
import {BentoGrid, BentoGridItem} from '../ui/bento-grid'

export const BentoGridStats = () => {
  return (
    <BentoGrid className='relative max-w-6xl mx-auto md:auto-rows-[20rem]'>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn('[&>p:text-lg]', item.className)}
          icon={item.icon}
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
  const arr = new Array(6).fill(0)
  const width = useMemo(() => Math.random() * (100 - 40) + 40, [])
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
          style={{
            maxWidth: width + '%',
          }}
          className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4'></motion.div>
      ))}
    </motion.div>
  )
}
const SkeletonThree = () => {
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
      className='flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2'
      style={{
        background:
          'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
      }}>
      <motion.div className='h-full w-full rounded-lg'></motion.div>
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
        className='h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center'>
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
const SkeletonFive = () => {
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
        className='flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black'>
        <Icon
          name='feedline'
          height='100'
          width='100'
          className='rounded-full size-10 text-cyan-500'
        />
        <h4 className='text-lg text-neutral-500 tracking-tight font-figtree font-bold'>
          Recents Updates
        </h4>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className='flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black'>
        <p className='text-xs text-neutral-500'>Use PHP.</p>
        <div className='h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0' />
      </motion.div>
    </motion.div>
  )
}

interface BentoHeader {
  title: string
  description: ReactNode
  header: ReactNode
  className?: ClassName
  icon: IconName
}

const items: BentoHeader[] = [
  {
    title: 'Quicklinks',
    description: <span className='text-sm'>Essentials overview.</span>,
    header: <SkeletonFour />,
    className: 'md:col-span-2',
    icon: 'link',
  },
  {
    title: 'Rewards',
    description: <span className='text-sm'>Get Cashbacks.</span>,
    header: <SkeletonThree />,
    className: 'md:col-span-1',
    icon: 'coin',
  },
  {
    title: 'Engagements',
    description: (
      <span className='text-sm'>
        View account performance and user interactions.
      </span>
    ),
    header: <SkeletonOne />,
    className: 'md:col-span-1',
    icon: 'settings',
  },
  {
    title: 'Automated',
    description: <span className='text-sm'></span>,
    header: <SkeletonTwo />,
    className: 'md:col-span-1',
    icon: 'sign-pen',
  },
  {
    title: 'Get the latest news!',
    description: (
      <span className='text-sm'>Summarized or full length, you decide.</span>
    ),
    header: <SkeletonFive />,
    className: 'md:col-span-1',
    icon: 'zap',
  },
]
