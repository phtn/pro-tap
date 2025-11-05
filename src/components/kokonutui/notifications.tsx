import {ClassName} from '@/app/types'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {memo, ReactNode} from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {ExtraValueItem, IconLabel, MenuItem} from './profile-dropdown'

interface NotificationsProps {
  open: boolean
  onOpenChange: VoidFunction
  className?: ClassName
  children?: ReactNode
}
export const Notifications = ({
  open,
  onOpenChange,
  className,
  children,
}: NotificationsProps) => {
  return (
    <div className={cn('relative z-80', className)}>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <div className='group relative p-px'>
          <DropdownMenuTrigger asChild>
            <button
              type='button'
              className='rounded-full outline-0 cursor-pointer'
              // className="flex items-center gap-16 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 hover:shadow-sm transition-all duration-200 focus:outline-none"
            >
              {children}
            </button>
          </DropdownMenuTrigger>

          {/* Bending line indicator on the right */}

          <DropdownMenuContent
            align='end'
            alignOffset={-1}
            sideOffset={20}
            className='relative z-[80] w-72 px-3 py-3.5 font-figtree font-semibold bg-white dark:bg-zinc-800/95 backdrop-blur-sm border-[0.33px] border-zinc-300 dark:border-zinc-800/60 rounded-3xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20
                        data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-top-right'>
            <ActionMenuItem
              label='No new notifications'
              value=''
              fn={() => console.log('')}
              icon={'check-fill'}
              type={'action'}
            />

            <DropdownMenuSeparator className='my-3 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800' />
            <DropdownMenuItem asChild>
              <button
                type='button'
                className='flex items-center justify-between bg-zinc-500/10 w-full h-11 hover:bg-zinc-100/80 dark:hover:bg-zinc-600/60 rounded-xl transition-all duration-200 cursor-pointer group'>
                <span className='text-sm font-medium px-2'>
                  Mark all as read
                </span>
                <Icon
                  name='checkmark-circle'
                  className='text-foreground/60 mr-2'
                />
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  )
}
const ActionMenuItem = memo((item: MenuItem) => {
  return (
    <DropdownMenuItem key={item.label} asChild>
      <button
        onClick={item.fn}
        className='flex w-full items-center h-12 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group'>
        <IconLabel icon={item.icon} label={item.label} />
        <ExtraValueItem value={item.value} label={item.label} />
      </button>
    </DropdownMenuItem>
  )
})
