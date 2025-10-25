import {ClassName} from '@/app/types'
import {Icon, IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'

interface FormHeaderProps {
  title: string
  icon?: IconName
}

export const FormHeader = ({title, icon}: FormHeaderProps) => {
  return (
    <div className='mb-2 flex items-center justify-between'>
      <h2 className='flex items-center text-lg md:text-2xl font-bold tracking-tight px-2'>
        <Icon
          name={icon || 'user'}
          className={cn('size-5 md:size-6 shrink-0 mr-1 md:mr-1', {
            hidden: !icon,
          })}
        />
        <span>{title}</span>
      </h2>
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
