'use client'

import {deleteCookie, getCookie} from '@/app/actions'
import {Button} from '@/components/ui/button'
import {useAuthCtx} from '@/ctx/auth'
import {Icon} from '@/lib/icons'
import {useMutation, useQuery} from 'convex/react'
import {useRouter} from 'next/navigation'
import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react'
import {api} from '../../../../../convex/_generated/api'
import {SubscriptionTab} from '../_components/tabs'

export const Content = () => {
  const router = useRouter()
  const {user} = useAuthCtx()
  const [loading, setLoading] = useState(false)
  const [withActivation, setWithActivation] = useState<{cardId: string}>()
  const checkActivation = useCallback(
    async () => await getCookie('protapActivation'),
    [],
  )
  useEffect(() => {
    checkActivation().then(setWithActivation)
  }, [checkActivation])

  const u = useQuery(api.users.q.getByProId, {proId: user?.uid ?? ''})

  const subscription = useMutation(api.subscriptions.m.create)

  const handleSubscription = useCallback(async () => {
    setLoading(true)
    if (!user || !u || !withActivation) return
    const subId = await subscription({
      proId: user.uid ?? '',
      visible: true,
      updatedAt: Date.now(),
      createdAt: Date.now(),
      userId: u._id,
      cardId: withActivation?.cardId,
      state: 'active',
      planType: 'annual',
      startDate: new Date().toDateString(),
      endDate: null,
    })

    if (subId) {
      console.log(subId)
      await deleteCookie('protapActivation')
      router.replace('/account/activated')
    }
  }, [u, user])

  const tabs = useMemo(() => {
    const defaultTabs = [
      {
        id: 'cards',
        title: 'Cards',
        color: 'bg-blue-500 hover:bg-blue-600',
        cardContent: (
          <CardTabContent title='Cards' description='Manage your cards' />
        ),
      },
    ]
    if (withActivation) {
      defaultTabs.push({
        id: 'activation',
        title: 'Activation',
        color: 'bg-teal-500 hover:bg-teal-600 animate-pulse',
        cardContent: (
          <CardTabContent
            title='activation'
            description='Activate your account'
          />
        ),
      })
    }
    return defaultTabs
  }, [withActivation])

  return (
    <main className='px-2'>
      <div className='border-t md:border-t-0 border-zinc-300 dark:border-dark-origin'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-0'>
          <div className='md:py-6'>
            <Header title='My' subtext='Subscriptions' />
            {withActivation && (
              <div className='h-40 bg-teal-500 rounded-3xl mb-4'>
                <div className='h-16 border-b border-white flex items-center px-6 font-bold font-figtree text-white text-xl tracking-tighter'>
                  Activate Protap
                </div>
                <div className='p-6 w-full flex justify-end'>
                  <Button
                    size='lg'
                    onClick={handleSubscription}
                    className='h-12 rounded-2xl px-8 bg-white dark:text-teal-500 text-lg'
                    variant='ghost'>
                    <span>Complete Activation</span>
                    <Icon
                      name={loading ? 'spinners-ring' : 'arrow-right'}
                      className='ml-2'
                    />
                  </Button>
                </div>
              </div>
            )}
            <SubscriptionTab
              defaultTabId={withActivation ? 'activation' : undefined}
              items={tabs}
            />
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
      <div className='mb-4'>
        <h3 className='text-2xl capitalize font-semibold tracking-tight'>
          {title}
        </h3>
        <p className='text-sm text-black/50 dark:text-white/50 leading-relaxed max-w-[90%]'>
          {description}
        </p>
      </div>
      {children}
      {/*<div className='flex flex-col w-full items-center border overflow-hidden rounded-2xl'>
                            <div className='flex px-4 bg-dark-origin items-center w-full py-2 border-b'>
                              Card
                            </div>
                            <Icon name='card-scan' className='w-64 h-auto' />
                          </div>*/}
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
