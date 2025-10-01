'use client'

/**
 * @author: @dorian_baffier
 * @description: Currency Transfer
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import {TooltipProvider} from '@/components/ui/tooltip'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {AnimatePresence, motion} from 'motion/react'
import {useEffect, useState} from 'react'
import {Hex} from '../experimental/hex'
import TextAnimate from '../ui/text-animate'

interface CheckmarkProps {
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
}

const draw = {
  hidden: {pathLength: 0, opacity: 0},
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: 'spring',
        duration: 1.5,
        bounce: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: {delay: i * 0.2, duration: 0.3},
    },
  }),
}

export function VerifyLoader({code}: {code?: string}) {
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // useEffect(() => {
  //   if (isCompleted && code) {
  //     router.replace('/verify');
  //   }
  // }, [isCompleted, code, router]);

  return (
    <TooltipProvider>
      <div className='relative size-[240px] flex items-center justify-center'>
        <Hex
          size={240}
          className={cn(
            'z-0 absolute fill-primary/1 dark:fill-primary-hover/2',
            'transition-all duration-500 blur-xs translate-y-10 scale-75',
            {
              'fill-emerald-400/15 dark:fill-emerald-900/30 translate-y-0 scale-100':
                isCompleted,
            },
          )}
        />
        <div className='relative z-50 size-[240px] flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center'>
            <motion.div
              className='flex justify-center'
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}>
              <div className='relative w-[100px] h-[100px] flex items-center justify-center'>
                <motion.div
                  className={cn(
                    'absolute inset-0 blur-2xl bg-primary-hover/10 dark:bg-primary-hover/5 rounded-full',
                    'transition-colors duration-400',
                    {'bg-emerald-500/10 dark:bg-emerald-500/5': isCompleted},
                  )}
                  initial={{opacity: 0}}
                  animate={{
                    opacity: [0, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.5, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <AnimatePresence mode='wait'>
                  {!isCompleted ? (
                    <motion.div
                      key='progress'
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{
                        opacity: 0,
                        rotate: 360,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeInOut',
                      }}
                      className='w-[102px] h-[102px] flex items-center justify-center'>
                      <div className='relative z-20'>
                        <motion.div
                          className='absolute inset-0 rounded-full border-2 border-transparent'
                          style={{
                            borderLeftColor: 'oklch(0.592 0.178 257.29)',
                            borderRightColor: 'oklch(0.592 0.178 257.29)',
                            filter: 'blur(0.5px)',
                          }}
                          animate={{
                            rotate: 650,
                            scale: [1.01, 1.03, 1],
                          }}
                          transition={{
                            rotate: {
                              duration: 3,
                              repeat: Infinity,
                              ease: 'linear',
                            },
                            scale: {
                              duration: 4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }}
                        />
                        <div className='relative z-10 bg-white dark:bg-zinc-950 rounded-full p-5 shadow-[0_0_15px_rgba(16,185,129,0.1)]'>
                          <Icon
                            name='hexagon'
                            className={cn('size-10 text-primary', {
                              'animate-caret-blink': !isCompleted,
                            })}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key='completed'
                      initial={{
                        opacity: 0,
                        rotate: -180,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeInOut',
                      }}
                      className='w-[100px] h-[100px] flex items-center justify-center'>
                      <div className='relative z-10 rounded-full p-3 bg-emerald-400/15 backdrop-blur-lg'>
                        <Checkmark
                          className='size-14 md:size-20  text-emerald-500 bg-white dark:bg-background rounded-full'
                          strokeWidth={3.5}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          <div className='flex flex-col'>
            <motion.div
              className='space-y-2 text-center w-full mt-3 mb-4'
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}>
              <AnimatePresence mode='wait'>
                {isCompleted ? (
                  <motion.h2
                    key='completed-title'
                    className='relative md:text-lg text-zinc-900 dark:text-zinc-100 tracking-normal font-semibold font-figtree uppercase'
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}>
                    <span className='absolute text-white blur-sm scale-[102%]'>
                      Successful
                    </span>
                    <span>Successful</span>
                  </motion.h2>
                ) : (
                  <motion.h2
                    key='progress-title'
                    className='md:text-lg text-zinc-900 dark:text-zinc-100 tracking-tighter font-semibold uppercase'
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}>
                    in Progress
                  </motion.h2>
                )}
              </AnimatePresence>
              <AnimatePresence mode='wait'>
                <div className='flex items-center justify-center'>
                  {isCompleted ? (
                    <motion.div
                      key='completed-id'
                      className={cn(
                        'text-xs md:text-sm text-primary-hover dark:text-primary-hover font-medium font-figtree',
                        {
                          'text-emerald-600 dark:text-emerald-400': isCompleted,
                        },
                      )}
                      initial={{opacity: 0, y: 10}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: -10}}
                      transition={{
                        delay: 0.8,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}>
                      Protap Verified
                    </motion.div>
                  ) : (
                    <TextAnimate
                      text={`${code}`}
                      type='calmInUp'
                      className='text-xs md:text-sm uppercase font-doto text-primary font-black tracking-wide'
                      delay={1.3}
                    />
                  )}
                </div>
              </AnimatePresence>
              <div className='flex items-center gap-4 mt-4' />
            </motion.div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export function Checkmark({
  size = 100,
  strokeWidth = 2,
  color = 'currentColor',
  className = '',
}: CheckmarkProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox='0 0 100 100'
      initial='hidden'
      animate='visible'
      className={className}>
      <title>Animated Checkmark</title>
      <motion.circle
        cx='50'
        cy='50'
        r='48'
        stroke={color}
        variants={draw as any}
        custom={0}
        style={{
          strokeWidth,
          strokeLinecap: 'round',
          fill: 'transparent',
          filter: 'drop-shadow(0 0 2px rgba(16, 185, 129, 0.2))',
        }}
      />
      <motion.path
        d='M32 50L45 63L68 35'
        stroke={color}
        variants={draw as any}
        custom={1}
        style={{
          strokeWidth: strokeWidth + 0.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'transparent',
          filter: 'drop-shadow(0 0 1px rgba(16, 185, 129, 0.3))',
        }}
      />
    </motion.svg>
  )
}

// interface Props {
//   isCompleted: boolean;
// }
