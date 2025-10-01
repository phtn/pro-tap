'use client'

import { useCallback, useMemo } from 'react'
import { Button } from './ui/button'
import { AlertTriangle, Wifi, FileX, Server, Info } from 'lucide-react'
import CommandButton from './kokonutui/command-button'
import ListItem from './smoothui/ui/list-item'
import { cn } from '@/lib/utils'

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  name: string;
}

interface ErrorInsight {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  suggestion: string;
  color: string;
}

export function ErrorComp ({ error, reset, name }: ErrorProps) {
  const errorInsight = useMemo((): ErrorInsight => {
    const message = error?.message?.toLowerCase() || ''
    const name = error?.name?.toLowerCase() || ''

    if (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('connection')
    ) {
      return {
        category: 'Network Error',
        icon: Wifi,
        description: 'Unable to connect to the server or load resources.',
        suggestion: 'Check your internet connection and try again.',
        color: 'text-blue-500',
      }
    }

    if (message.includes('404') || message.includes('not found')) {
      return {
        category: 'Page Not Found',
        icon: FileX,
        description: "The requested page or resource doesn't exist.",
        suggestion: 'Verify the URL or navigate back to a known page.',
        color: 'text-orange-500',
      }
    }

    if (message.includes('500') || message.includes('server error')) {
      return {
        category: 'Server Error',
        icon: Server,
        description: 'Something went wrong on our end.',
        suggestion: 'This is usually temporary. Please try again in a moment.',
        color: 'text-red-500',
      }
    }

    if (name.includes('typeerror') || message.includes('undefined')) {
      return {
        category: 'Application Error',
        icon: AlertTriangle,
        description: 'An unexpected error occurred in the application.',
        suggestion:
          'Try refreshing the page or contact support if the issue persists.',
        color: 'text-amber-500',
      }
    }

    return {
      category: 'Unknown Error',
      icon: Info,
      description: 'An unexpected error has occurred.',
      suggestion: 'Please try again or contact support for assistance.',
      color: 'text-gray-500',
    }
  }, [error])

  const ResetButton = useCallback(
    () => (
      <Button size='lg' onClick={reset}>
        Try again
      </Button>
    ),
    [reset]
  )

  const IconComponent = errorInsight.icon
  // "dark:bg-origin/40 dark:border-zinc-800 dark:inset-shadow-[0_1px_rgb(255_255_255/0.20)]",
  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div
        className={cn(
          // "bg-gradient-to-b from-neutral-400/60 via-neutral-400/30 to-neutral-400/40 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30 border border-neutral-600/60 dark:border-neutral-800/60",
          'relative rounded-xl p-6 bg-zinc-700/50 backdrop-blur-[4px]',
          'inset-shadow-[0_1px_rgb(255_255_255/0.20)]',
          'shadow-[0_4px_20px_rgb(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)]'
        )}
      >
        <div className='flex items-start justify-between mb-4'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 rounded-lg bg-red-100 dark:bg-red-900/20'>
              <IconComponent className={`size-4 ${errorInsight.color}`} />
            </div>
            <div>
              <h1 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                {errorInsight.category}
              </h1>

              <span>route:</span>
              <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-light font-mono bg-slate-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200'>
                {name}
              </span>
            </div>
          </div>
          <ResetButton />
        </div>

        <div className='space-y-4'>
          <div className='p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800'>
            <p className='text-sm text-red-800 dark:text-red-200 font-medium'>
              {errorInsight.description}
            </p>
            <p className='text-sm text-red-700 dark:text-red-300 mt-1'>
              {errorInsight.suggestion}
            </p>
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <ListItem
                items={[{ value: error?.name, label: 'Name', icon: 'bell' }]}
              />
              <CommandButton>
                <div className='flex items-center space-x-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
                  <span className='text-xs font-medium text-neutral-600 dark:text-neutral-400 w-16'>
                    Name:
                  </span>
                  <span className='text-sm font-mono text-neutral-900 dark:text-neutral-100'>
                    {error?.name || 'Unknown'}
                  </span>
                </div>
              </CommandButton>

              <div className='flex items-center space-x-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
                <span className='text-xs font-medium text-neutral-600 dark:text-neutral-400 w-16'>
                  Message:
                </span>
                <span className='text-sm text-neutral-900 dark:text-neutral-100 break-words'>
                  {error?.message || 'No message available'}
                </span>
              </div>

              {error?.digest && (
                <div className='flex items-center space-x-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
                  <span className='text-xs font-medium text-neutral-600 dark:text-neutral-400 w-16'>
                    Digest:
                  </span>
                  <span className='text-sm font-mono text-neutral-900 dark:text-neutral-100 break-all'>
                    {error.digest}
                  </span>
                </div>
              )}

              <details className='group'>
                <summary className='flex items-center space-x-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors'>
                  <span className='text-xs font-medium text-neutral-600 dark:text-neutral-400 w-16'>
                    Stack:
                  </span>
                  <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                    Click to expand
                  </span>
                </summary>
                <div className='mt-2 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'>
                  <pre className='text-xs font-mono text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap break-words'>
                    {error?.stack || 'No stack trace available'}
                  </pre>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
