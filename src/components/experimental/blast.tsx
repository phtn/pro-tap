import { AnimatePresence, motion } from 'motion/react'
import { type RefObject } from 'react'

interface BlastProps {
  ref: RefObject<HTMLDivElement | null>;
}

export function BlastParticles ({ ref }: BlastProps) {
  const rect = ref.current?.getBoundingClientRect()
  if (!rect) {
    console.log('BlastParticles: ref.current is null')
    return null
  }

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // console.table({ centerX, centerY });

  return (
    <AnimatePresence>
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute bottom-0 right-0 w-1 h-1 bg-yellow-200 dark:bg-white rounded-full'
          style={{ left: centerX, top: centerY }}
          initial={{
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            x: [0, (i % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
            y: [0, -Math.random() * 50 - 20],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
    </AnimatePresence>
  )
}
