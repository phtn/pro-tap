'use client'

import {onSuccess} from '@/ctx/toast'
import {Icon} from '@/lib/icons'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {GuidingLight} from './account/_components/guiding-light'

export const Content = () => {
  const router = useRouter()
  const [state, setState] = useState<string>('Initializing ...')

  useEffect(() => {
    let serverTimer: NodeJS.Timeout | undefined
    let appTimer: NodeJS.Timeout | undefined
    if (typeof window !== 'undefined') {
      onSuccess('re-up secure server online.')

      serverTimer = setTimeout(() => {
        setState('Redirecting ...')
      }, 8000)
      appTimer = setTimeout(() => {
        router.push('/alpha')
      }, 5000)
    }

    return () => {
      clearTimeout(serverTimer)
      clearTimeout(appTimer)
    }
  }, [router])

  return (
    <div className='bg-background flex items-start justify-center min-h-screen lg:p-4'>
      <GuidingLight />
      <div className='size-96 flex flex-col items-center justify-center'>
        <div>
          <Icon name='protap' className='size-40' />
        </div>
        <div className='flex items-center md:space-x-4 space-x-2'>
          <Icon name='spinners-ring' className='size-4' />
          <p className='text-sm md:text-base font-figtree opacity-60 tracking-wide'>
            {state}
          </p>
        </div>
      </div>
    </div>
  )
}

// export const PreviousContent = () => (
//   <div className='space-y-4'>
//     <Nav />
//     {/* <Header /> */}
//     <div className='flex lg:space-x-8'>
//       {/* This div simulates the phone screen for presentation */}
//       <AppViewer />
//       {/* This div shows the details presentation */}
//       <DesktopDetails />
//     </div>
//   </div>
// )
