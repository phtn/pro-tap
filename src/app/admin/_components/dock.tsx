'use client'

import {Button, buttonVariants} from '@/components/ui/button'
import {Dock, DockIcon} from '@/components/ui/dock'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {Icon, IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
interface DockData {
  tabs: {
    id: string
    icon: IconName
    label: string
  }[]
  toolbar: {
    main: {
      clear: {
        name: string
        fn: () => void
        icon: IconName
        style: string
      }
      start: {
        name: string
        fn: VoidFunction
        icon: IconName
        style: string
      }
      halt: {
        name: string
        fn: VoidFunction
        icon: IconName
        style: string
      }
    }
  }
}

interface SeparatorProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

const Separator = ({className, orientation = 'horizontal'}: SeparatorProps) => (
  <div
    className={cn(
      'h-[0.5px] w-full bg-zinc-200 dark:bg-zinc-700 dark:blur-[0.5px] rounded-full',
      orientation === 'vertical' &&
        'w-[0.5px] h-[95%] bg-gradient-to-b  dark:bg-zinc-600',
      'from-zinc-200 via-zinc-400/50 to-zinc-300',
      'dark:from-zinc-900 dark:via-zinc-600 dark:to-zinc-800',
      className,
    )}
  />
)

interface AdminDockProps {
  tabClick: (tabId: string) => () => void
  selected: string
  startFn: VoidFunction
  haltFn: VoidFunction
  clearFn: VoidFunction
  loading: boolean
}

export const AdminDock = ({
  tabClick,
  selected,
  startFn,
  haltFn,
  clearFn,
  loading,
}: AdminDockProps) => {
  const dockData: DockData = {
    tabs: [
      {id: 'qrcode', icon: 'qr-code-bold', label: 'QR Code'},
      {id: 'ntag', icon: 'nfc', label: 'NFC Card'},
      {id: 'list', icon: 'bullet-list-square', label: 'View list'},
    ],
    toolbar: {
      main: {
        start: {
          name: 'start scan',
          fn: startFn,
          icon: loading ? 'spinner-pulse-a' : 'play-solid',
          style: 'text-blue-400',
        },
        halt: {
          name: 'halt',
          fn: haltFn,
          icon: 'pause-solid',
          style: loading
            ? 'text-amber-500'
            : 'text-slate-300 dark:text-slate-600',
        },
        clear: {
          name: 'clear list',
          fn: loading ? () => {} : clearFn,
          icon: 'split-vertical',
          style: loading ? 'text-zinc-800' : 'text-zinc-500',
        },
      },
    },
  }
  return (
    <div className=''>
      <TooltipProvider>
        <Dock direction='middle'>
          {dockData.tabs.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    id={item.id}
                    variant='ghost'
                    onClick={tabClick(item.id)}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({variant: 'ghost', size: 'sq'}),
                      'md:size-12 size-12 rounded-xl hover:bg-zinc-300/30 dark:hover:bg-zinc-600/40',
                      {
                        'dark:bg-zinc-600/30 bg-zinc-300/20':
                          selected === item.id,
                      },
                    )}>
                    <Icon
                      name={item.icon}
                      className={cn('size-6 md:size-7 dark:text-zinc-200', {
                        'dark:text-teal-200 text-teal-600':
                          selected === item.id,
                      })}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='dark:text-white capitalize text-lg tracking-tight font-medium font-figtree'>
                    {item.label}
                  </p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation='vertical' className='h-full' />
          {Object.entries(dockData.toolbar.main).map(([name, main]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    onClick={main.fn}
                    aria-label={main.name}
                    className={cn(
                      buttonVariants({variant: 'ghost', size: 'sq'}),
                      'md:size-12 size-11 rounded-2xl md:hover:bg-zinc-400/25 hover:bg-transparent md:dark:hover:bg-zinc-700/30 dark:hover:bg-transparent',
                    )}>
                    <Icon
                      name={main.icon}
                      className={cn('size-6 md:size-7', main.style)}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='md:flex hidden'>
                  <p className='dark:text-white capitalize text-base tracking-tight font-semibold font-figtree'>
                    {main.name}
                  </p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  )
}
