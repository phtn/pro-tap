'use client'

import {Button} from '@/components/ui/button'
import {useAuthCtx} from '@/ctx/auth'
import {Icon} from '@/lib/icons'
import {useQuery} from 'convex/react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {ReactNode, useCallback, useMemo, useState} from 'react'
import {api} from '../../../../../convex/_generated/api'
import {SubscriptionTab} from '../_components/tabs'
import {UserInsurance} from './insurance'
import {UserProfileQRCode} from './qr-code'

export const Content = () => {
  const router = useRouter()
  const {user} = useAuthCtx()
  const [loading, setLoading] = useState(false)

  const userProfile = useQuery(api.userProfiles.q.getByProId, {
    proId: user?.uid ?? '',
  })

  const handleGetProtap = useCallback(() => {
    setLoading(true)
    router.push('/pricing')
  }, [router])

  const tabs = useMemo(
    () => [
      {
        id: 'cards',
        title: 'Cards',
        color: 'bg-blue-500 hover:bg-blue-600',
        cardContent: (
          <CardTabContent title='Cards' description='Manage your cards'>
            <Image
              alt='protap-nfc-card'
              src={
                'https://res.cloudinary.com/dx0heqhhe/image/upload/v1762297043/card_udalht.png'
              }
              width={442}
              height={442}
              className='w-80 md:w-120 h-auth aspect-auto'
            />
          </CardTabContent>
        ),
      },
      {
        id: 'qr',
        title: 'QR Codes',
        color: 'bg-orange-500 hover:bg-orange-600',
        cardContent: (
          <CardTabContent
            title='My QR Codes'
            description='Share your QR codes with others.'>
            <UserProfileQRCode userProfile={userProfile} />
          </CardTabContent>
        ),
      },
      {
        id: 'pa',
        title: 'Insurance',
        color: 'bg-teal-500 hover:bg-teal-600',
        cardContent: (
          <CardTabContent
            title='Insurance'
            description='Personal Accident Insurance'>
            <UserInsurance />
          </CardTabContent>
        ),
      },
    ],
    [userProfile],
  )

  return (
    <main className='px-2'>
      <div className='border-t md:border-t-0 border-zinc-300 dark:border-dark-origin'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-0'>
          <div className='md:py-6'>
            <Header title='My' subtext='Subscriptions' />
            {userProfile && userProfile.cardId ? (
              <SubscriptionTab defaultTabId={tabs[0].id} items={tabs} />
            ) : (
              <div className='h-40 bg-teal-500 rounded-3xl mb-4'>
                <div className='h-16 border-b border-white/20 flex items-center px-6 font-bold font-figtree text-white text-xl tracking-tighter'>
                  Get Protap Today!
                </div>
                <div className='p-6 w-full flex justify-end'>
                  <Button
                    size='lg'
                    onClick={handleGetProtap}
                    className='h-12 rounded-2xl px-8 bg-white dark:text-teal-500 text-lg font-figtree tracking-tight'
                    variant='ghost'>
                    <span>Activate Protap</span>
                    <Icon
                      name={loading ? 'spinners-ring' : 'arrow-right'}
                      className='ml-2'
                    />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

interface CardTabContentProps {
  className?: string
  title?: string
  description?: string
  children?: ReactNode
}

const CardTabContent = ({
  title,
  description,
  children,
}: CardTabContentProps) => (
  <div className='relative h-full'>
    <div className='p-6 h-full relative flex flex-col'>
      <div className='mb-12 md:mb-4'>
        <h3 className='text-2xl capitalize font-semibold tracking-tight'>
          {title}
        </h3>
        <p className='text-sm text-black/50 dark:text-white/50 leading-relaxed max-w-[90%]'>
          {description}
        </p>
      </div>
      <div className='flex justify-center w-full'>{children}</div>
    </div>
  </div>
)

interface HeaderProps {
  title: string
  subtext?: string
}

const Header = ({title, subtext}: HeaderProps) => {
  return (
    <div className='flex items-center space-x-1.5 md:space-x-3 h-14 md:h-20 mb-2 md:mb-4 px-1 md:px-0'>
      <Icon
        name='coin'
        className='size-6 md:size-8 dark:text-orange-200 text-orange-300 drop-shadow-xs'
      />
      <h1 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tighter font-figtree space-x-1'>
        <span className=''>{title}</span>
        <span className='space-x-1.5 md:space-x-2 font-light'>{subtext}</span>
      </h1>
    </div>
  )
}
