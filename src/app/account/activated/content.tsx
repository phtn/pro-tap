'use client'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import TextAnimate from '@/components/ui/text-animate'
import {Icon, type IconName} from '@/lib/icons'
import {useRouter} from 'next/navigation'

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
      description: 'Special offers and bonus content',
    },
  ]

  return (
    <div className='w-screen md:max-w-6xl overflow-hidden px-4 md:px-20'>
      {/* Top Section - Congratulations */}
      <div className='bg-gradient-to-br from-slate-200 to-gray-200 rounded-3xl shadow-lg pt-8 pb-4 border border-black mb-4'>
        <div className='flex items-start justify-between'>
          <div />
          <span className='text-xs text-slate-900 font-doto '>
            Asg79b2osdifghj
          </span>
        </div>

        <div className='relative h-fit flex flex-col items-center justify-center space-y-4'>
          <div className='relative h-10 flex items-center justify-center w-full'>
            <div className='size-14 aspect-square border relative flex items-center justify-center'>
              <Icon
                name='badge-verified-solid'
                className='size-18 md:size-28 text-teal-400'
              />
            </div>
          </div>

          <TextAnimate
            type='whipInUp'
            className='md:text-2xl text-xl tracking-tighter font-semibold text-gray-900 mb-2 text-center'>
            Account Activated!
          </TextAnimate>
          <div className='w-full bg-slate-400 py-3 text-slate-50 flex items-center justify-center gap-1 text-sm'>
            <Icon name='crown' className='size-6 text-yellow-400 ' />
            <span>Welcome to the ProTap ecosystem</span>
          </div>
          <p className='text-gray-600 text-center text-xs max-w-[30ch]'>
            Your NFC card has been successfully linked to your account. Your
            digital identity is now active and ready to connect.
          </p>
        </div>
        <div className='my-4 h-px w-full border border-dashed border-slate-400/80'></div>
        <div className='p-2'>
          <div className='space-y-2'>
            {benefits.map((benefit, index) => {
              return (
                <div
                  key={index}
                  className='flex items-center gap-x-4 p-2  tracking-tight'>
                  <div className='size-6 bg-slate-800/80 rounded-md flex items-center justify-center flex-shrink-0'>
                    <Icon name={benefit.icon} className='size-4 text-white' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-medium text-gray-900'>
                      {benefit.title}
                    </h4>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='mt-4 px-2 flex justify-center'>
            <SexyButton
              fullWidth
              size='lg'
              onClick={handleContinue}
              variant='ghost'
              rightIcon='arrow-right'
              className='bg-teal-500 text-white'>
              Continue to Dashboard
            </SexyButton>
          </div>
        </div>
      </div>
    </div>
  )
}
