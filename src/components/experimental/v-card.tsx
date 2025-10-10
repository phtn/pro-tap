'use client'

import {ClassName} from '@/app/types'
import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardStyled,
} from '@/components/ui/texture-card'
import {onSuccess} from '@/ctx/toast'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {type ReactNode} from 'react'

interface Props {
  children?: ReactNode
  toolbar?: ReactNode
  toggle?: VoidFunction
  className?: ClassName
  footer?: ReactNode
}

export function VCard({children, className, toolbar, toggle, footer}: Props) {
  return (
    <div className={cn('flex items-center justify-center')}>
      <div className='bg-zinc-800/60 backdrop-blur-2xl h-full'>
        <div
          className={cn(
            'h-12 px-4 flex items-center justify-between',
            className,
          )}>
          {toolbar}
          <button
            className={cn('relative hover:text-amber-200', {hidden: !toggle})}
            onClick={() => {
              onSuccess('check')
            }}>
            <Icon name='close' className='size-4 text-zinc-200' />
          </button>
        </div>
        <TextureCardStyled>
          <TextureCardContent className='min-w-sm p-1'>
            {children}
          </TextureCardContent>
          <TextureCardFooter className={cn({hidden: !footer})}>
            {footer}
          </TextureCardFooter>
        </TextureCardStyled>
      </div>
    </div>
  )
}

export interface FooterProps<T> {
  meta: T
}
