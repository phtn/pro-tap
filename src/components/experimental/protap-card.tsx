'use client'

import { useToggle } from '@/hooks/use-toggle'
/**
 * @author: @dorian_baffier
 * @description: Card Flip
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { ClassName } from '@/app/types'
import { Icon, type IconName } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { type ReactNode, type Ref } from 'react'
import { GlassFilter } from '../experimental/glass'

export interface CardFlipProps {
  title?: string
  subtitle?: string
  description?: string
  features?: string[]
  icon?: IconName
  className?: ClassName
  canFlip?: boolean
}

export function ProtapCard({
  title = "What's Inside",
  subtitle = '',
  description = "A closer look into Protap's Technology.",
  features = [
    'NFC Enabled Card',
    'Personal Accident Protection',
    'Increase Online Presence',
    'Affiliate Enabled Account',
  ],
  icon,
  className,
  canFlip = true,
}: CardFlipProps) {
  const { on, toggle } = useToggle(false)

  return (
    <div
      className={cn(
        'relative shrink-0 scale-85 md:scale-100 w-full max-w-[380px] h-[240px] group [perspective:2000px]',
        className,
      )}
      onClick={canFlip ? toggle : undefined}
      // onMouseEnter={() => setIsFlipped(true)}
      // onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          'relative w-full h-full bg-zinc-900 rounded-[20px]',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          on ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
          '',
        )}>
        <GlassBorder>
          <div
            id='bf'
            className={cn(
              'absolute inset-0 w-full h-full ',
              '[backface-visibility:hidden] [transform:rotateY(0deg)]',
              'overflow-hidden rounded-[18px]',
              "bg-[url('/svg/circuit-fine.svg')] bg-cover object-center  dark:bg-zinc-900",
              'border border-zinc-600 dark:border-zinc-800 _dark:border-zinc-800/50',
              'shadow-xs dark:shadow-lg',
              'transition-all duration-700',
              'group-hover:shadow-lg dark:group-hover:shadow-xl',
              on ? 'opacity-0' : 'opacity-100',
            )}>
            <GlassFilter />
            <div
              id='logo-container'
              className='rounded-[16px] relative border-0 border-background/15 shadow-lg shadow-black/20 h-full overflow-hidden bg-gradient-to-b from-protap-blue to-protap-blue/50 dark:from-zinc-900 dark:to-black/30'>
              <div className='fill-neutral-400 absolute right-8 -top-2'>
                <Icon
                  name='protap'
                  className='h-20 w-auto text-gray-400 aspect-auto'
                />
              </div>
            </div>

            <div className='absolute bottom-0 left-0 right-0 p-5'>
              <div className='relative flex items-center justify-between'>
                <div className=''>
                  {/* Chip */}
                  <div className='absolute bottom-2 md:bottom-3.75 left-3 md:left-[1.35rem]'>
                    <div className='md:w-[4.25rem] md:h-[4.15rem] w-[3rem] h-[3rem] bg-gradient-to-br from-black/70 to-black/60 rounded-sm drop-shadow-cyan-50'>
                      <div className='w-full flex items-center justify-center h-full bg-gradient-to-br from-cyan-100/30 dark:from-yellow-100/30 to-transparent rounded-sm'>
                        <Icon
                          name={icon ?? 'secure'}
                          className='md:size-10 size-8 text-cyan-50'
                        />
                      </div>
                    </div>
                    {/* <GlassFilter /> */}
                  </div>
                </div>
                <div className='relative group/icon text-cyan-100 text-xs font-space space-x-2 select-none'>
                  <span className='uppercase font-bold tracking-wider' />
                  <span className='font-mono font-light'>12/26</span>
                </div>
              </div>
            </div>
          </div>
        </GlassBorder>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 w-full h-full',
            '[backface-visibility:hidden] [transform:rotateY(180deg)]',
            'p-6 rounded-2xl',
            'bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black',
            'border border-zinc-200 dark:border-zinc-800',
            'shadow-xs dark:shadow-lg',
            'flex flex-col',
            'transition-all duration-700',
            'group-hover:shadow-lg dark:group-hover:shadow-xl',
            !on ? 'opacity-0' : 'opacity-100',
          )}>
          <div className='flex-1 space-y-6'>
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold text-zinc-900 dark:text-white leading-snug tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px]'>
                {title}
              </h3>
              <p className='text-sm text-zinc-600 dark:text-zinc-400 tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px] line-clamp-2'>
                {description}
              </p>
            </div>

            <div className='space-y-2'>
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className='flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 transition-all duration-500'
                  style={{
                    transform: on ? 'translateX(0)' : 'translateX(-10px)',
                    opacity: on ? 1 : 0,
                    transitionDelay: `${index * 100 + 200}ms`,
                  }}>
                  <Icon name='arrow-right' className='size-4 text-orange-300' />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='px-2 pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800'>
            <div
              className={cn(
                'group/start relative',
                'flex items-center justify-between',
                'p-3 -m-3 rounded-xl',
                'transition-all duration-300',
                'bg-gradient-to-r from-zinc-100 via-zinc-100 to-zinc-100',
                'dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800',
                'hover:from-sky-500/10 hover:from-0% hover:via-sky-500/5 hover:via-100% hover:to-transparent hover:to-100%',
                'dark:hover:from-sky-500/20 dark:hover:from-0% dark:hover:via-sky-500/10 dark:hover:via-100% dark:hover:to-transparent dark:hover:to-100%',
                'hover:scale-[1.02] hover:cursor-pointer',
              )}>
              <span className='text-base font-doto font-bold text-zinc-900 dark:text-white transition-colors duration-300 group-hover/start:text-sky-600 dark:group-hover/start:text-sky-200'>
                Get Insured today
              </span>
              <div className='relative group/icon'>
                <div
                  className={cn(
                    'absolute inset-[-6px] rounded-lg transition-all duration-300',
                    'bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-transparent',
                    'opacity-0 group-hover/start:opacity-100 scale-90 group-hover/start:scale-100',
                  )}
                />
                <Icon
                  name='arrow-right'
                  className='relative z-10 w-4 h-4 text-sky-500 transition-all duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          @keyframes scale {
            0% {
              transform: scale(2);
              opacity: 0;
              box-shadow: 0px 0px 50px rgba(255, 165, 0, 0.5);
            }
            50% {
              transform: translate(0px, -5px) scale(1);
              opacity: 1;
              box-shadow: 0px 8px 20px rgba(255, 165, 0, 0.5);
            }
            100% {
              transform: translate(0px, 5px) scale(0.1);
              opacity: 0;
              box-shadow: 0px 10px 20px rgba(255, 165, 0, 0);
            }
          }
        `}
      </style>
    </div>
  )
}

interface Props {
  children: ReactNode
  ref?: Ref<HTMLDivElement>
}

const GlassBorder = ({ children, ref }: Props) => {
  return (
    <div
      id='glass-border'
      className=' grid grid-cols-1 h-full rounded-[1.5rem] p-px shadow-md shadow-black/15 overflow-hidden'>
      <div className='p-0 border-2 border-background/20 rounded-[17px] shadow-xl ring-1 ring-black/5'>
        <div className='w-full h-full overflow-hidden'>
          {/* Ref for measuring content dimensions (so we can let framer know to animate into the dimensions) */}
          <div ref={ref} className='flex flex-col h-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
