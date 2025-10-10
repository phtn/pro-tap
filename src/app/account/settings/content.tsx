'use client'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {Icon} from '@/lib/icons'
import {useRouter} from 'next/navigation'
import {useCallback} from 'react'

export const Content = () => {
  const router = useRouter()
  const handleRouteAdmin = useCallback(() => {
    router.push('/admin')
  }, [router])

  return (
    <main>
      <SexyButton
        size='sq'
        variant='primary'
        className='mr-4 rounded-full'
        onClick={handleRouteAdmin}>
        <Icon name='re-up.ph' className='size-4' />
      </SexyButton>
    </main>
  )
}
