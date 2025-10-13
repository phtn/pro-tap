'use client'

import {useAuthCtx} from '@/ctx/auth'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'

export default function AddServicePage() {
  const {user} = useAuthCtx()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      return router.push('/sign')
    }

    if (!user.isActivated) {
      return router.push('/account/profile')
    }
  }, [user, router])

  if (!user || !user.isActivated) {
    return null
  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='max-w-md w-full space-y-6 text-center'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-foreground'>
            Add Your Service
          </h1>
          <p className='text-muted-foreground'>
            You're successfully activated! Now you can add your service to start
            using Protap.
          </p>
        </div>

        <div className='space-y-4'>
          <button
            onClick={() => {
              // TODO: Navigate to service creation form
              console.log('Navigate to service creation')
            }}
            className='w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90'>
            Add Service
          </button>

          <button
            onClick={() => router.push('/account')}
            className='w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90'>
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  )
}
