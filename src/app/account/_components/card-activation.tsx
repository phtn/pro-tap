import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useMobile} from '@/hooks/use-mobile'
import {useNFC, UseNFCOptions} from '@/hooks/use-nfc'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {format} from 'date-fns'
import {AnimatePresence, motion} from 'motion/react'
import {useEffect, useState} from 'react'

export const CardActivationPanel = (props: UseNFCOptions) => {
  return (
    <div className='shadow-3xl h-[50vh] md:h-full w-full flex flex-col items-center justify-center'>
      <div className='relative lg:-translate-x-6 border-2 border-zinc-800/10 bg-zinc-500/10 dark:bg-transparent dark:border-transparent overflow-hidden md:h-96 h-full w-auto aspect-square rounded-[4rem] flex flex-col items-center justify-center'>
        <div className='h-full w-full flex flex-col items-center justify-center space-y-4'>
          <Icon name='card-scan' className='md:size-46 size-24 text-white' />
          <h2 className='text-xl font-semibold font-figtree tracking-tight'>
            NFC Card Activation
          </h2>
        </div>
      </div>
    </div>
  )
}

export const CardActivationContent = (props?: UseNFCOptions) => {
  const isMobile = useMobile()
  const {
    isLoading,
    isScanning,
    startScanning,
    // lastScan,
    // isSupported,
    // scanHistory,
    // stopScanning,
    // clearHistory,
    // formatRecordData,
    // scanDetails,
  } = useNFC(props)
  return (
    // <div className='relative lg:-translate-x-6 border-2 border-zinc-800/10 bg-zinc-500/10 dark:bg-transparent dark:border-transparent overflow-hidden md:h-72 h-fit w-auto rounded-[4rem] flex flex-col items-center justify-center'>
    <div className='relative z-10 h-full w-full flex items-center justify-center'>
      <SexyButton
        onClick={startScanning}
        size={isMobile ? 'md' : 'lg'}
        variant='dark'
        rightIcon={
          isLoading ? 'spinners-ring' : isScanning ? 'spinner-pulse-a' : 'nfc'
        }
        iconStyle='size-6 md:size-6'
        className='relative z-50'>
        <span
          className={cn('px-2 text-lg', {
            'animate-pulse text-accent': isScanning,
          })}>
          {isScanning ? 'Scanning nearby NFC' : 'Scan Card'}
        </span>
      </SexyButton>
      {isScanning && <Phone isMobile={isMobile} />}
    </div>
    // </div>
  )
}

interface PhoneProps {
  isMobile: boolean
}

const Phone = ({isMobile}: PhoneProps) => {
  const [time, setTime] = useState('4:20')

  useEffect(() => {
    const interval = setInterval(() => {
      const tMs = new Date().getTime()
      setTime(format(tMs, 'h:mm'))
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{opacity: 0, y: 360, rotate: 10}}
        animate={{opacity: 1, y: isMobile ? 50 : -400, rotate: -20}}
        transition={{type: 'spring', bounce: 0.25, duration: 1.5}}
        className="absolute scale-60 md:scale-50 px-2 rounded-t-[80px] left-4 w-120 h-full z-10 md:right-0 py-[3.5px] aspect-auto lg:h-auto shrink-0 bg-[url('/svg/15pro_max.svg')] bg-contain flex">
        <motion.div
          key='k'
          initial={{opacity: 0, x: 0}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: 0}}
          transition={{duration: 0.3}}
          className='md:h-[88lvh] h-[60lvh] rounded-t-[56px] md:rounded-t-[56px] border-3 border-zinc-900 w-full flex flex-col justify-center'>
          <div className='h-full w-full flex relative justify-center bg-gradient-to-br from-cyan-50 via-orange-100 to-indigo-300 border-0 border-black/40 rounded-t-[54px]'>
            <div className='absolute top-1.5 flex items-center justify-between h-16'>
              <div className='w-24 flex justify-center'>
                {/* <Icon name="apple" className="size-4 text-zinc-900" /> */}
                <span className='text-zinc-950 font-medium font-space'>
                  {time}
                </span>
              </div>
              <div className='rounded-[1.65rem] h-11 w-32 shrink-0 bg-zinc-900' />
              <div className='w-24 flex items-center justify-center space-x-1'>
                <Icon name='soundwave' className='size-5 text-zinc-900' />
                <Icon name='battery' className='size-5 text-zinc-900' />
              </div>
            </div>
          </div>
          <div className='h-36 bg-zinc-500/0 -rotate-6 absolute top-40 left-0 w-full flex items-center justify-center font-mono font-thin -tracking-[0.4em]'>
            <div className='w-full flex items-center justify-center rotate-6'>
              <h3 className='text-8xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-amber-700/50 to-sky-600'>
                {time}
              </h3>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
