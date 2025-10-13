import {ClassName} from '@/app/types'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {Avatar, AvatarFallback, AvatarImage} from './avatar'

interface Props {
  photoURL: string | null
  className?: ClassName
  tiny?: boolean
}

export const ProAvatar = ({photoURL, className, tiny = false}: Props) => {
  return photoURL ? (
    <Avatar
      className={cn(
        'flex items-center justify-center aspect-auto size-12 shadow-2xs select-none',
        className,
      )}>
      <AvatarFallback className='bg-zinc-300'>
        <Icon name='spinners-ring' className='size-6' />
      </AvatarFallback>
      <AvatarImage
        src={photoURL}
        className={cn(
          'aspect-auto w-auto border-0 border-white/40 dark:border-zinc-900 rounded-full',
          {'h-10 w-auto': tiny},
        )}
      />
    </Avatar>
  ) : (
    <Icon name='user-profile' />
  )
}
