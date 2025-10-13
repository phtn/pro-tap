'use client'

import {GuidingLight} from '@/components/experimental/guiding-light'
import {Icon} from '@/lib/icons'
import {useRouter} from 'next/navigation'

export const Content = () => {
  const router = useRouter()
  return (
    <div className='h-[86lvh]  w-full flex flex-col items-center'>
      <GuidingLight />
      <div className='size-full border-b-4'>
        <Icon name='hexagon' onClick={() => router.push('/account')} />
      </div>
    </div>
  )
}
