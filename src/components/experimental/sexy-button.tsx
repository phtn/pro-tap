import { type ClassName } from '@/app/types'
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface SexyButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: ClassName;
}

export const SexyButton = ({
  children,
  className,
  ...props
}: SexyButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'relative h-10 md:h-12 w-32 px-4 inline-flex items-center justify-center',
        'bg-gradient-to-r from-white/50 via-white/70 to-white',
        'dark:from-zinc-700 dark:via-zinc-700 dark:to-zinc-700',
        'rounded-[11.5px] border-[0.5px] py-4 border-[#bbbbbb] dark:border-zinc-500/5 dark:hover:border-zinc-600/80  hover:border-[#cccccc]',
        'hover:text-foreground md:dark:hover:text-zinc-100',
        'text-base text-secondary-foreground/80 font-figtree font-semibold tracking-tight',
        'backdrop-blur-xs shadow-sm hover:shadow-sm overflow-hidden',
        'disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap cursor-pointer',
        'ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2  dark:focus-visible:ring-zinc-300',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        'active:scale-96 active:shadow-xs transition-all duration-300',
        'inset-shadow-[0_1px_rgb(237_237_237)]',
        'dark:inset-shadow-[0_1px_rgb(100_100_100)] dark:hover:dark:inset-shadow-[0_1px_rgb(120_120_120)]',
        className
      )}
    >
      <div className='pointer-events-none relative z-50 '>{children}</div>
      <div
        className={cn(
          'absolute h-full w-full bg-gradient-to-r',
          'opacity-0 inset-0 rounded-[10px] ',
          'from-white/70 via-white/50 to-white/30',
          'dark:from-zinc-800/50 dark:via-zinc-800/70 dark:to-zinc-800/90',
          'hover:opacity-100 transition duration-400'
        )}
      />
    </button>
  )
}

