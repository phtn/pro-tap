import {cn} from '@/lib/utils'
import {type ComponentProps, forwardRef} from 'react'

function Input({className, type, ...props}: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'flex h-12 w-full min-w-0 bg-input/20 dark:bg-card/10',
        'text-base dark:text-white md:text-lg font-medium,',
        'pl-3 pr-12 py-1 border-slate-400/80 dark:border-zinc-400 border outline-none rounded-lg',
        'selection:bg-sky-300/80 dark:selection:text-zinc-800 selection:text-foreground',
        'shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground',
        'file:text-foreground file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring dark:focus-visible:ring-cyan-100/60 focus-visible:ring-ring/40 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        '',
        className,
      )}
      {...props}
    />
  )
}

const ModernInput = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-zinc-300/0 dark:border-zinc-700 bg-background dark:bg-background/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/80 placeholder:tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

export {Input, ModernInput}
