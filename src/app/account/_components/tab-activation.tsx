import {type ClassName} from '@/app/types'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {type TabItem} from '@/components/kokonutui/smooth-tab'
import {UseNFCOptions} from '@/hooks/use-nfc'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {AnimatePresence, motion} from 'motion/react'
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {CardActivationContent} from './card-activation'

interface ActivationItem {
  icon: IconName
  iconStyle?: ClassName
  description?: string
}

interface BaseTabProps {
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
          title: 'QR Code Activation',
          description:
            'Scan QR Code with your smartphone camera or upload an image',
          color: 'bg-zinc-500 hover:bg-zinc-600',
          icon: 'qrcode-scan',
          iconStyle: 'text-white size-24',
          content: <div>QR Code Content</div>,
        },
        {
          id: 'nxp-ntag213',
          title: 'NTAG Card',
          description: 'Scan NTAG Card with your NFC enabled smartphone',
          color: 'bg-neutral-300 hover:bg-neutral-500',
          icon: 'card-scan',
          iconStyle: 'size-64',
          content: <CardActivationContent />,
        },
      ] as (TabItem & ActivationItem)[],
    [],
  )

  const [selected, setSelected] = useState<string>('qrcode')
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
      <div className='flex-1 mb-4 relative bg-indigo-400/5'>
        <div className='md:rounded-3xl w-full min-h-full relative overflow-hidden'>
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
                className='absolute bg-red-400 p-4 inset-0 w-full will-change-transform'
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}>
                <div className='relative'>
                  <div className='bg-zinc-400 relative p-6 space-y-6 h-full flex flex-col'>
                    <div className='flex h-full items-center justify-center space-x-4'>
                      {selectedItem && (
                        <Icon
                          name={selectedItem.icon}
                          className={selectedItem.iconStyle}
                        />
                      )}
                    </div>
                    <h3 className='text-2xl h-full font-semibold tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]'>
                      {selectedItem?.title}
                    </h3>
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
        ref={containerRef}
        role='tablist'
        aria-label='Smooth tabs'
        className={cn(
          'flex items-center justify-between gap-1 my-4 mt-auto relative',
          'dark:bg-transparent w-full mx-auto',
          'transition-all duration-200',
          className,
        )}>
        {/* Sliding Background */}
        <motion.div
          className={cn('absolute  z-[1]', selectedItem?.color)}
          initial={false}
          animate={{
            width: dimensions.width - 14,
            x: dimensions.left + 8,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 30,
          }}
          exit={{opacity: 0}}
          style={{height: 'calc(100% - 6px)', top: '4px'}}
        />

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
                    ? 'text-accent bg-slate-500 dark:bg-slate-400 dark:hover:bg-slate-500/50'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                )}>
                <span className='truncate'>{tab.title}</span>
              </SexyButton>
            )
          })}
        </div>
      </div>
    </div>
  )
}
