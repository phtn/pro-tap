'use client'
import { LogoPro } from '@/components/logo'
import ConjurSight from '@/components/orb/conjurer'
import { ScopeBurst } from './experimental/scoped-burst'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  fullScreen?: boolean;
}
export const Loader = ({ fullScreen = false }: Props) => {
  const root = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={root}
      className={cn(
        'w-full p-20 relative flex flex-col items-center justify-center',
        { 'h-screen': fullScreen }
      )}
    >
      <div className='relative space-y-16 flex flex-col items-center justify-center'>
        <div className='absolute flex items-center justify-center'>
          <div className='absolute -top-0.5 -skew-x-[81deg] -translate-y-8 size-32 aspect-square rounded-full border-6 border-gray-800' />
          <ScopeBurst root={root} shouldAnimate duration={20000} count={4} />
        </div>
        <ConjurSight />
        <LogoPro />
      </div>
      {fullScreen && <div className='h-1/3 w-full' />}
    </div>
  )
}
