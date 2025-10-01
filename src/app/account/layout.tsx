'use client'
import {UserNavbar} from '@/components/ui/navbar-user'
import {ShimmerButton} from '@/components/ui/shim-button'
import {useToggle} from '@/hooks/use-toggle'
import {cn} from '@/lib/utils'

import {Icon} from '@/lib/icons'
import {usePathname, useRouter} from 'next/navigation'
import {useCallback} from 'react'
import {TapActivation} from './_components/tap-activation'

export default function Layout({children}: {children: React.ReactNode}) {
  const {on, toggle} = useToggle()
  const pathname = usePathname()
  const isPreview = pathname.split('/').pop() === 'preview'
  const router = useRouter()
  const back = useCallback(() => router.back(), [router])

  return (
    <div className='bg-background/20 bg-blend-multiply min-h-screen h-full overflow-auto no-scrollbar '>
      {isPreview ? (
        <div className='flex items-center justify-end'>
          <button onClick={back} className='h-14 px-5'>
            <Icon name='close' className='size-6' />
          </button>
        </div>
      ) : (
        <UserNavbar>
          <ShimmerButton
            auto
            surface='light'
            onClick={toggle}
            icon='arrow-right'
            className='dark:bg-accent-foreground'>
            Activate Protap
          </ShimmerButton>
        </UserNavbar>
      )}
      <main className='max-w-6xl mx-auto'>
        <div
          className={cn(
            'overflow-hidden',
            'transition-all duration-500 ease-in-out',
            `${on ? 'max-h-160' : 'max-h-0'}`,
          )}>
          <div className='h-160 md:w-6xl relative overflow-clip'>
            <TapActivation />
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
