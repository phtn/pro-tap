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
        'space-y-8 h-fit p-5 font-figtree font-semibold bg-gradient-to-t from-white/60 via-white/90 to-white/50 backdrop-blur-3xl dark:from-zinc-800/50 dark:via-zinc-800/80 dark:to-zinc-900/70 border-[0.33px] border-zinc-300 dark:border-zinc-800/60 rounded-3xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20',
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
}
export const WidgetHeader = ({title, description, icon}: WidgetHeaderProps) => {
  return (
    <div className='font-figtree'>
      <div className='flex items-center'>
        {icon && (
          <Icon
            name={icon}
            className='mr-1.5 opacity-80 size-6 text-mac-blue dark:text-teal-200'
          />
        )}
        <h2 className='font-bold tracking-tighter text-2xl opacity-80'>
          {title}
        </h2>
      </div>
      <p className='font-normal text-foreground/50'>{description}</p>
    </div>
  )
}
