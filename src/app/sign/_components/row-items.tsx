import {ClassName} from '@/app/types'
import {Icon, IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {type ReactNode} from 'react'

interface RowItemProps {
  title: ReactNode
  children: ReactNode
  bullet?: IconName
  className?: ClassName
}

export const RowItem = ({title, children, bullet, className}: RowItemProps) => (
  <div className=' space-y-3 mx-6'>
    <div className='w-full flex items-center px-3'>
      {bullet && (
        <Icon
          name={bullet}
          className={cn('mr-1 size-5 opacity-70 text-mac-blue', className)}
        />
      )}
      <span className='text-xs font-semibold uppercase tracking-widest opacity-70 md:opacity-50 font-figtree'>
        {title}
      </span>
    </div>
    {children}
  </div>
)
