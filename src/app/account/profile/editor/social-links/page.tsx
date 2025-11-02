'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'

export default function ProfilePageEditor() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/account/profile')
  }, [router])

  return (
    <div className='flex h-[50vh] w-full items-center justify-center'>
      <p className='text-sm font-medium text-muted-foreground'>
        Redirecting to the updated profile editor…
      </p>
    </div>
  )
}
