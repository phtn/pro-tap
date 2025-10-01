import * as React from 'react'

import { cn } from '@/lib/utils'

function Input ({ className, type, ...props }: React.ComponentProps<'input'>) {
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
        className
      )}
      {...props}
    />
  )
}

export { Input }
