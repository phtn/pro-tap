'use client'

import {Icon, type IconName} from '@/lib/icons'
import {AnimatePresence, motion} from 'motion/react'
import {useEffect, useRef, useState} from 'react'
import {useOnClickOutside} from 'usehooks-ts'

export interface IItem {
  value: string
  label: string
  icon: IconName
  description?: string
  code?: string
  level?: string
  status?: string
  timestamp?: string
}

export interface Props {
  items: IItem[]
  className?: string
  onClick?: (item: IItem) => void
}

export default function ListItem({items, className, onClick}: Props) {
  const [activeItem, setActiveItem] = useState<IItem | null>(null)
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  useOnClickOutside(ref, () => setActiveItem(null))

  useEffect(() => {
    function onKeyDown(event: {key: string}) {
      if (event.key === 'Escape') {
        setActiveItem(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='pointer-events-none absolute inset-0 z-10 bg-blend-luminosity backdrop-blur-xl'
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeItem ? (
          <>
            <div className='group absolute inset-0 z-10 grid place-items-center'>
              <motion.div
                className='border border-background/20 flex h-fit w-full cursor-pointer flex-col items-start gap-4 overflow-hidden p-4 shadow-xs'
                ref={ref}
                layoutId={`workItem-${activeItem.value}`}
                style={{borderRadius: 12}}>
                <div className='flex w-full items-center gap-4'>
                  <motion.div layoutId={`workItemLogo-${activeItem.value}`}>
                    <Icon
                      name={activeItem.icon}
                      className='dark:text-pink-100 size-6'
                    />
                  </motion.div>
                  <div className='flex grow items-center justify-between'>
                    <div className='flex w-full flex-col gap-0.5'>
                      <div className='flex w-full flex-row justify-between gap-0.5'>
                        <motion.div
                          className='text-foreground text-sm font-medium'
                          layoutId={`workItemCompany-${activeItem.value}`}>
                          {activeItem.value}
                        </motion.div>
                      </div>
                      <motion.p
                        layoutId={`workItemTitle-${activeItem.value}`}
                        className='text-primary-foreground text-sm'>
                        {activeItem.label} / {activeItem.code}
                      </motion.p>
                      <motion.div
                        className='text-primary-foreground flex flex-row gap-2 text-xs'
                        layoutId={`workItemExtras-${activeItem.value}`}>
                        {activeItem.status === 'Yes' && ` ${activeItem.level} `}
                        {activeItem.status === 'No' && ` ${activeItem.level} `}
                        {activeItem.status === 'Hybrid' &&
                          ` ${activeItem.status} / ${activeItem.level} `}
                        | {activeItem.timestamp}
                      </motion.div>
                    </div>
                  </div>
                </div>
                <motion.p
                  layout
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0, transition: {duration: 0.05}}}
                  className='text-primary-foreground text-sm'>
                  {activeItem.description}
                </motion.p>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
      <div className={`relative flex items-start p-6 ${className || ''}`}>
        <div className='relative flex w-full flex-col items-center gap-4 px-2'>
          {items.map((item) => (
            <motion.div
              layoutId={`workItem-${item.value}`}
              key={item.value}
              className='group bg-background flex w-full cursor-pointer flex-row items-center gap-4 border p-2 shadow-xs md:p-4'
              onClick={() => {
                setActiveItem(item)
                if (onClick) onClick(item)
              }}
              style={{borderRadius: 8}}>
              <motion.div layoutId={`workItemLogo-${item.value}`}>
                <Icon name={item.icon} />
              </motion.div>
              <div className='flex w-full flex-col items-start justify-between gap-0.5'>
                <motion.div
                  className='text-foreground font-medium'
                  layoutId={`workItemCompany-${item.value}`}>
                  {item.value}
                </motion.div>
                <motion.div
                  className='text-primary-foreground text-xs'
                  layoutId={`workItemTitle-${item.value}`}>
                  {item.label} / {item.code}
                </motion.div>

                <motion.div
                  className='text-primary-foreground flex flex-row gap-2 text-xs'
                  layoutId={`workItemExtras-${item.value}`}>
                  {item.status === 'Yes' && ` ${item.level} `}
                  {item.status === 'No' && ` ${item.level} `}
                  {item.status === 'Hybrid' &&
                    ` ${item.status} / ${item.level} `}
                  | {item.timestamp}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
