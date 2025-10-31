'use client'

/**
 * @author: @dorian_baffier
 * @description: Smooth Tab
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import {type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {AnimatePresence, motion} from 'motion/react'
import {
  KeyboardEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

export interface TabItem {
  id: string
  title: string
  label?: string
  icon?: IconName
  content?: ReactNode
  cardContent?: ReactNode
  color: string
}

interface SmoothTabProps {
  items?: TabItem[]
  defaultTabId?: string
  className?: string
  activeColor?: string
  onChange?: (tabId: string) => void
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.95,
    position: 'absolute' as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    position: 'absolute' as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.95,
    position: 'absolute' as const,
  }),
}

const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
}

export function SubscriptionTab({
  items,
  className,
  activeColor = 'bg-[#1F9CFE]',
  onChange,
}: SmoothTabProps) {
  if (!items) return null
  const [selected, setSelected] = useState<string>(items?.[0]?.id ?? '')
  const [direction, setDirection] = useState(0)
  const [dimensions, setDimensions] = useState({width: 0, left: 0})

  // Reference for the selected button
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  // Update dimensions whenever selected tab changes or on mount
  useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected)
      const container = containerRef.current

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        })
      }
    }

    // Initial update
    requestAnimationFrame(() => {
      updateDimensions()
    })

    // Update on resize
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [selected])

  const handleTabClick = (tabId: string) => {
    const currentIndex = items.findIndex((item) => item.id === selected)
    const newIndex = items.findIndex((item) => item.id === tabId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setSelected(tabId)
    onChange?.(tabId)
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    tabId: string,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleTabClick(tabId)
    }
  }

  const selectedItem = items.find((item) => item.id === selected)

  return (
    <div className='flex flex-col h-full w-full'>
      {/* Card Content Area */}
      <div className='flex-1 mb-4 relative'>
        <div className='bg-white dark:bg-dark-origin rounded-3xl overflow-hidden min-h-[200px] h-[280px] w-full relative'>
          <div className='absolute inset-0'>
            <AnimatePresence
              initial={false}
              mode='popLayout'
              custom={direction}>
              <motion.div
                key={`card-${selected}`}
                custom={direction}
                variants={slideVariants as any}
                initial='enter'
                animate='center'
                exit='exit'
                transition={transition as any}
                className='absolute inset-0 w-full h-full will-change-transform'
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}>
                {selectedItem?.cardContent}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div
        ref={containerRef}
        role='tablist'
        aria-label='Smooth tabs'
        className={cn(
          'flex items-center justify-between gap-1 py-1 mt-auto relative',
          'bg-transparent w-full md:w-[400px] mx-auto',
          'rounded-xl',
          'transition-all duration-200',
          className,
        )}>
        {/* Sliding Background */}
        <motion.div
          className={cn(
            'absolute rounded-md z-[1]',
            selectedItem?.color || activeColor,
          )}
          initial={false}
          animate={{
            width: dimensions.width - 8,
            x: dimensions.left + 4,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
          style={{height: 'calc(100% - 8px)', top: '4px'}}
        />

        <div className='grid grid-cols-4 w-full gap-1 relative z-[2]'>
          {items.map((item) => {
            const isSelected = selected === item.id
            return (
              <motion.button
                key={item.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el)
                  else buttonRefs.current.delete(item.id)
                }}
                type='button'
                role='tab'
                aria-selected={isSelected}
                aria-controls={`panel-${item.id}`}
                id={`tab-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                className={cn(
                  'relative flex items-center justify-center gap-0.5 rounded-lg px-2 py-1.5',
                  'text-sm font-medium transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'truncate',
                  isSelected
                    ? 'text-white'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                )}>
                <span className='truncate'>{item.title}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
