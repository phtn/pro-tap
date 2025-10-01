import { NeumorphButton as Button } from '@/components/ui/neumorph'
import { useNavbarCtx } from '@/ctx/navbar'
import { AnimatePresence, motion } from 'motion/react'

interface NavChildProps {
  code?: string;
}

export const NavChild = ({ code }: NavChildProps) => {
  const { toggleTheme } = useNavbarCtx()
  // const tempNtagSerialNumber = "1234567890";
  return (
    <div className='flex items-center justify-end md:space-x-4 space-x-1'>
      <NtagCode serialNumber={code} />
      <Button
        onClick={toggleTheme}
        size='sq'
        intent='ghost'
        className='rounded-full'
        icon='dark-theme'
      />
    </div>
  )
}

interface NtagCodeProps {
  serialNumber?: string;
}

const NtagCode = ({ serialNumber }: NtagCodeProps) => {
  return (
    <div className='md:w-80 w-40 flex items-center justify-end overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.span
          key='expanded'
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
          exit={{ width: 0 }}
          transition={{ visualDuration: 0.5, type: 'spring', bounce: 0.15 }}
          className='capitalize font-doto text-base lg:text-2xl font-bold tracking-widest whitespace-nowrap text-foreground'
        >
          {serialNumber?.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
