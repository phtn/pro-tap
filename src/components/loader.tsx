'use client'
import {GuidingLight} from '@/app/account/_components/guiding-light'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useRef} from 'react'

interface Props {
  fullScreen?: boolean
}
export const Loader = ({fullScreen = false}: Props) => {
  const root = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={root}
      className={cn('bg-background flex items-start justify-center lg:p-4', {
        'h-screen': fullScreen,
      })}>
      <GuidingLight />
      <div className='size-96 flex flex-col items-center justify-center'>
        <div>
          <Icon name='protap' className='size-40' />
        </div>
        <div className='flex items-center md:space-x-4 space-x-2'>
          <Icon name='spinners-ring' className='size-4' />
        </div>
      </div>
      {fullScreen && <div className='h-1/3 w-full' />}
    </div>
  )
}
