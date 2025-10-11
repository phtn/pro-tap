import {Button} from '@/components/ui/button'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'

/**
 * @author: @dorian_baffier
 * @description: Command Button
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

export default function CommandButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
}) {
  return (
    <Button
      {...props}
      className={cn(
        'group relative p-2 gap-2',
        'rounded-lg overflow-hidden',
        'bg-gradient-to-b from-zinc-50 to-zinc-100',
        'dark:from-zinc-800 dark:to-zinc-900',
        'border border-zinc-200 dark:border-zinc-800',
        'hover:border-zinc-300 dark:hover:border-zinc-700',
        'transition-all duration-300 ease-out',
        'inline-flex items-center justify-center',
        className,
      )}>
      <Icon
        name='split-vertical'
        className={cn(
          'w-4 h-4',
          'text-zinc-600 dark:text-zinc-400',
          'transition-all duration-300',
          'group-hover:scale-110',
          'group-hover:rotate-[-4deg]',
          'group-active:scale-95',
        )}
      />
      <span className='text-sm text-zinc-600 dark:text-zinc-400'>
        {children ?? 'info'}
      </span>
      <span
        className={cn(
          'absolute inset-0',
          'bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0',
          'translate-x-[-100%]',
          'group-hover:translate-x-[100%]',
          'transition-transform duration-500',
          'ease-out',
        )}
      />
    </Button>
  )
}
