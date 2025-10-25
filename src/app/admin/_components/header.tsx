import {ClassName} from '@/app/types'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {ReactNode} from 'react'

interface HeaderProps {
  back: VoidFunction
  title: string
  subtext?: string
  className?: ClassName
  breadcrumbs?: ReactNode
}

export const Header = ({
  back,
  className,
  title,
  subtext,
  breadcrumbs,
}: HeaderProps) => {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-between',
        'border-b-[0.33px] border-origin h-14 md:h-20 px-2 md:px-6',
        'rounded-t-3xl',
        {'border-transparent': breadcrumbs === 'products'},
        className,
      )}>
      <div className='flex items-center space-x-4 md:space-x-6'>
        <Icon
          onClick={back}
          name='arrow-left'
          className='size-5 md:size-7 opacity-50 cursor-pointer'
        />
        <h1 className='capitalize text-lg md:text-3xl font-bold text-gray-900 dark:text-white tracking-tighter font-figtree space-x-2'>
          <span>{title}</span>
          <span className='space-x-1.5 md:space-x-2 font-light'>{subtext}</span>
        </h1>
      </div>
      <div className='mr-2 md:mr-10'>{breadcrumbs}</div>
    </div>
  )
}
