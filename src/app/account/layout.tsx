'use client'
import {UserNavbar} from '@/components/ui/navbar-user'
import {useToggle} from '@/hooks/use-toggle'
import {cn} from '@/lib/utils'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {ActivationCtxProvider} from '@/ctx/activation'
import {useAuthCtx} from '@/ctx/auth'
import {Icon} from '@/lib/icons'
import {opts} from '@/utils/helpers'
import {usePathname, useRouter} from 'next/navigation'
import {useCallback} from 'react'
import {FullActivation} from './_components/full-activation'

export default function Layout({children}: {children: React.ReactNode}) {
  const {user} = useAuthCtx()
  const {on, toggle} = useToggle()
  const pathname = usePathname()
  const isPreview = pathname.split('/').pop() === 'preview'
  const router = useRouter()
  const back = useCallback(() => router.back(), [router])
  const ActiveStatus = useCallback(() => {
    const options = opts(
      <div className='size-auto aspect-square hidden md:flex items-center justify-center relative'>
        <div className='absolute bg-white size-4 aspect-square rounded-full' />
        <Icon
          name='badge-verified-solid'
          className='size-[28px] text-primary dark:text-primary-hover relative z-2 drop-shadow'
        />
      </div>,
      <SexyButton
        onClick={toggle}
        variant='ghost'
        className='bg-mac-blue/85 hover:bg-mac-blue dark:bg-mac-teal/60 dark:hover:bg-mac-teal/40 rounded-full inset-shadow-[0_1px_rgb(237_237_237)]/30'>
        <span className='md:px-2 md:text-lg text-white dark:text-white'>
          Activate Protap
        </span>
      </SexyButton>,
    )
    return <>{options.get(!!user?.isActivated)}</>
  }, [user])

  return (
    <div className='bg-background/10 bg-blend-multiply min-h-screen h-full overflow-auto no-scrollbar '>
      {isPreview ? (
        <div className='flex items-center justify-end'>
          <button onClick={back} className='h-14 px-5'>
            <Icon name='close' className='size-6' />
          </button>
        </div>
      ) : (
        <UserNavbar>
          <ActiveStatus />
        </UserNavbar>
      )}
      <main className='max-w-6xl mx-auto'>
        <div
          className={cn(
            'overflow-hidden',
            'transition-all duration-500 ease-in-out',
            `${on ? 'max-h-[90lvh] md:max-h-[90lvh] translate-y-10' : 'max-h-0'}`,
          )}>
          <div className='h-[90lvh] md:h-[90lvh] md:w-6xl relative border-zinc-600'>
            <ActivationCtxProvider>
              <FullActivation />
            </ActivationCtxProvider>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}

// const ProtapCheckout = () => {
//   return (
//     <div className='flex items-center justify-center space-x-4 border border-zinc-700 h-96'>
//       <div>
//         <PricingCard
//           title='Protap'
//           price='999'
//           period='12 month'
//           billing='annually'
//           buttonText='Select & Checkout'
//           gradient=''
//           features={[{ text: '100k coverage', icon: 'add' }]}
//           footerText='Xendit'
//           popular
//         />
//       </div>
//     </div>
//   )
// }
