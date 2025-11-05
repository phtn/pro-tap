'use client'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {SparkleConfetti} from '@/components/experimental/sparkle-confetti'
import ShimmerText from '@/components/kokonutui/shimmer-text'
import {HyperList} from '@/components/list'
import {Icon, type IconName} from '@/lib/icons'
import {useRouter} from 'next/navigation'
import {useEffect, useRef} from 'react'

interface BenefitListItem {
  icon: IconName
  title: string
  description?: string
}

export const Content = () => {
  const router = useRouter()
  const handleContinue = () => {
    router.push('/account/profile')
  }

  const benefits: BenefitListItem[] = [
    {
      icon: 'check',
      title: 'Instant Contact Sharing',
      description: 'Access to all premium tools and features',
    },
    {
      icon: 'check',
      title: 'Chat Messaging',
      description: 'Access to all premium tools and features',
    },
    {
      icon: 'check',
      title: 'Personal Accident Insurance',
      description: 'Advanced protection for your account',
    },
    {
      icon: 'check',
      title: 'Premium Networking Features',
      description: '24/7 dedicated customer support',
    },
    {
      icon: 'check',
      title: 'Exclusive Community Access',
      description: 'Special offers and bonus content transition',
    },
  ]

  const ref = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.click()
    }
  }, [ref])

  return (
    <div className='w-screen md:max-w-xl overflow-hidden px-3 md:mx-auto md:mt-12 mt-2'>
      {/* Top Section - Congratulations */}
      <div className='bg-gradient-to-br from-slate-700 to-neutral-800 dark:from-teal-200 dark:via-teal-400 dark:to-orange-300 rounded-3xl shadow-lg pt-8 pb-4 border border-black mb-4'>
        <SparkleConfetti ref={ref} />
        <div className='relative h-fit flex flex-col items-center justify-center space-y-4'>
          <div className='relative h-20 flex items-center justify-center w-full'>
            <div className='size-14 aspect-square relative flex items-center justify-center'>
              <div className='absolute rounded-full dark:bg-white bg-primary size-12 aspect-square'></div>
              <Icon
                name='badge-verified-solid'
                className='size-24 md:size-32 text-background relative z-10'
              />
            </div>
          </div>

          <ShimmerText
            duration={20}
            surface='dark'
            className='drop-shadow text-3xl lg:text-2xl flex leading-6 md:leading-6 items-center p-0 m-0 text-center  font-semibold font-figtree'>
            Account Activated!
          </ShimmerText>

          <div className='hidden _flex items-center justify-center w-full bg-slate-400 py-3 text-slate-50 gap-1 text-sm'>
            <Icon name='crown' className='size-6 text-yellow-400 ' />
            <span>Welcome to the ProTap ecosystem</span>
          </div>
          <p className='dark:text-gray-600 text-white text-center text-sm max-w-[24ch]'>
            Your digital identity is now active and ready to connect.
          </p>
        </div>
        <div className='my-4 h-px w-full border border-dotted border-gray-700 dark:border-slate-600/40'></div>
        <div className='p-2'>
          <HyperList
            data={benefits}
            component={BenefitItem}
            container='space-y-4'
          />
          <div className='mt-8 px-2 flex justify-center'>
            <SexyButton
              fullWidth
              size='lg'
              onClick={handleContinue}
              variant='dark'
              rightIcon='arrow-right'
              className=' text-white bg-zinc-800'>
              Continue to Dashboard
            </SexyButton>
          </div>
        </div>
      </div>
    </div>
  )
}

const BenefitItem = (item: BenefitListItem) => (
  <div className='flex items-center gap-x-4 px-8 py-2  tracking-tight'>
    <div className='size-4 rounded-sm flex items-center justify-center flex-shrink-0'>
      <Icon
        name={item.icon}
        className='size-5 text-primary-hover dark:text-white'
      />
    </div>
    <div className='flex-1 min-w-0'>
      <h4 className='font-medium dark:text-gray-900 text-zinc-200'>
        {item.title}
      </h4>
    </div>
  </div>
)
