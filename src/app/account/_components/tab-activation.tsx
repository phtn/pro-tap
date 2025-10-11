import {type ClassName} from '@/app/types'
import {QRCodeReader} from '@/components/experimental/qrcode-reader'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {type TabItem} from '@/components/kokonutui/smooth-tab'
import {UseNFCOptions} from '@/hooks/use-nfc'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {AnimatePresence, motion} from 'motion/react'
import {useMemo, useRef, useState, type KeyboardEvent} from 'react'
import {CardActivationContent} from './card-activation'

interface ActivationItem {
  icon: IconName
  iconStyle?: ClassName
  description?: string
}

export interface BaseTabProps {
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

interface Props extends BaseTabProps {
  nfcProps: UseNFCOptions
}

export default function ActivationTabs({className, onChange, nfcProps}: Props) {
  const activationTabs = useMemo(
    () =>
      [
        {
          id: 'qrcode',
          title: 'QR Code',
          label: 'With QR Code',
          description:
            'Scan QR Code with your smartphone camera or upload an image',
          color: 'bg-zinc-500 hover:bg-zinc-600',
          icon: 'qrcode-scan',
          iconStyle: 'text-white md:size-54 size-36 translate-y-6',
          content: <QRCodeReader />,
        },
        {
          id: 'ntag',
          title: 'Protap Card',
          label: 'With Protap Card',
          description: 'Scan NTAG Card with your NFC enabled smartphone',
          color: 'bg-neutral-300 hover:bg-neutral-500',
          icon: 'card-scan',
          iconStyle:
            'absolute md:size-96 size-64 top-20 md:top-24 left-1/2 -translate-x-1/2',
          content: <CardActivationContent />,
        },
      ] as (TabItem & ActivationItem)[],
    [],
  )

  const [selected, setSelected] = useState<string>('qrcode')
  const [direction, setDirection] = useState(0)

  // Reference for the selected button
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  // Update dimensions whenever selected tab changes or on mount
  const handleTabClick = (tabId: string) => {
    const currentIndex = activationTabs.findIndex((tab) => tab.id === selected)
    const newIndex = activationTabs.findIndex((tab) => tab.id === tabId)
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

  const selectedItem = activationTabs.find((tab) => tab.id === selected)

  return (
    <div className='flex flex-col h-full w-full'>
      {/* Card Content Area */}
      <div className='flex-1 mb-8 md:mb-4 relative'>
        <div className='md:rounded-3xl w-full h-full relative overflow-hidden'>
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
                className='absolute p-0 inset-0 w-full will-change-transform'
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}>
                <div className='relative h-full'>
                  <div className='bg-zinc-800/20 rounded-4xl md:rounded-2xl relative p-6 md:p-16 h-full flex flex-col overflow-hidden font-figtree'>
                    <h2 className='opacity-80 md:text-base text-sm'>
                      Account Activation
                    </h2>
                    <h3 className='text-2xl font-semibold font-space tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]'>
                      {selectedItem?.title}
                    </h3>
                    <div className='hidden _flex h-full w-full items-center justify-center'>
                      {selectedItem && (
                        <Icon
                          name={selectedItem.icon}
                          className={selectedItem.iconStyle}
                        />
                      )}
                    </div>

                    <div className='relative flex flex-1'>
                      {selectedItem?.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div
        role='tablist'
        ref={containerRef}
        aria-label='Smooth tabs'
        className={cn(
          'flex items-center justify-between gap-1 my-6 relative',
          'dark:bg-transparent w-full mx-auto',
          'transition-all duration-200',
          className,
        )}>
        <div className='grid grid-cols-2 w-full gap-4 relative z-[2]'>
          {activationTabs.map((tab) => {
            const isSelected = selected === tab.id
            return (
              <SexyButton
                size='lg'
                variant='ghost'
                key={tab.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(tab.id, el)
                  else buttonRefs.current.delete(tab.id)
                }}
                type='button'
                role='tab'
                aria-selected={isSelected}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                className={cn(
                  'relative flex items-center justify-center px-0 py-1',
                  'md:text-lg transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'truncate w-full',
                  'inset-shadow-[0_1px_rgb(237_237_237)]/20',
                  isSelected
                    ? 'text-accent bg-slate-500 dark:bg-slate-500/95 dark:hover:bg-slate-500/80'
                    : 'border-muted-foreground/50 hover:bg-muted/80 hover:text-foreground',
                )}>
                <span className='truncate'>{tab.label}</span>
              </SexyButton>
            )
          })}
        </div>
      </div>
    </div>
  )
}
