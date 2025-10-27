import {ClassName} from '@/app/types'
import {Icon, IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {ReactNode} from 'react'

interface FormHeaderProps {
  title: string
  icon?: IconName
  children?: ReactNode
}

export const FormHeader = ({title, icon, children}: FormHeaderProps) => {
  return (
    <div className='mb-8 flex items-center justify-between'>
      <h2 className=' text-greyed dark:text-foreground flex whitespace-nowrap items-center text-lg md:text-xl font-semibold font-space tracking-tight px-2'>
        <Icon
          name={icon || 'user'}
          className={cn('hidden size-5 md:size-6 shrink-0 mr-1 md:mr-1', {
            hidden: !icon,
          })}
        />
        <span>{title}</span>
      </h2>
      {children}
    </div>
  )
}
interface Props {
  className?: ClassName
}
export const FormHeaderGap = ({className}: Props) => (
  <div
    className={cn('h-1 md:h-2 w-full rounded-full bg-origin/40', className)}
  />
)
