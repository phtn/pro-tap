import {type ClassName} from '@/app/types'
import {Icon, IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {type ReactNode} from 'react'

interface WidgetProps {
  children?: ReactNode
  className?: ClassName
}
export const Widget = ({className, children}: WidgetProps) => {
  return (
    <div
      className={cn(
        'space-y-8 h-fit p-5 font-figtree font-semibold bg-gradient-to-t from-foreground/60 via-foreground/60 to-foreground/90 backdrop-blur-3xl dark:from-zinc-800/50 dark:via-zinc-800/80 dark:to-zinc-900/70 border-[0.33px] border-zinc-300 dark:border-zinc-800/60 rounded-[3rem] shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20',
        className,
      )}>
      {children}
    </div>
  )
}

interface WidgetHeaderProps {
  title: string
  description: string
  icon?: IconName
  className?: ClassName
}
export const WidgetHeader = ({
  title,
  icon,
  className,
  description,
}: WidgetHeaderProps) => {
  return (
    <div className={cn('font-figtree', className)}>
      <div className='flex items-center'>
        {icon && (
          <Icon
            name={icon}
            className='mr-1 size-6 text-primary-hover dark:text-teal-200'
          />
        )}
        <h2 className='font-bold tracking-tighter text-2xl'>{title}</h2>
      </div>
      <p className='font-normal text-white opacity-50'>{description}</p>
    </div>
  )
}
