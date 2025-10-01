import {ProtapCard} from '@/components/experimental/protap-card'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import NFCScanner from '@/components/nfc/scanner'
import {Prism} from '@/components/react-bits/prism'
import {Beacon} from '@/components/ui/beacon'
import TextAnimate from '@/components/ui/text-animate'
import {useToggle} from '@/hooks/use-toggle'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {format} from 'date-fns'
import {AnimatePresence, motion} from 'motion/react'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

export const TapActivation = () => {
  const {on: onActivation, toggle: toggleActivation} = useToggle()
  const router = useRouter()
  const handleGetProtap = useCallback(() => {
    router.push('/pricing')
  }, [router])

  const handleNFCScan = useCallback(() => {
    console.log('Scanning NFC...')
  }, [])
  const handleNFCError = useCallback(() => {
    console.log('Scanning NFC...')
  }, [])
  return (
    <div className='flex flex-col md:flex-row items-center justify-center md:space-x-14 h-140 overflow-hidden border border-zinc-300 dark:border-zinc-950 md:rounded-4xl bg-gradient-to-l from-zinc-500 via-zinc-200 to-zinc-100 dark:from-cyan-100/40 dark:via-zinc-200/20 dark:to-zinc-300/20 shadow-lg'>
      <Beacon className='absolute md:scale-[21] scale-[16] md:top-64 top-36 right-1/3' />
      <div className='relative h-120 md:w-1/2 w-screen md:hidden flex items-center justify-center'>
        <ProtapCard
          canFlip={false}
          className={cn(
            'md:scale-110 scale-70 -rotate-6 md:-right-16 -right-10 shadow-2xl rounded-3xl backface-hidden',
            {'md:scale-80 md:bottom-12': onActivation},
          )}
          icon='spinner-pulse-a'
        />
        {onActivation && <Phone />}
      </div>
      {onActivation ? (
        <HeroActivation onError={handleNFCError} onScan={handleNFCScan} />
      ) : (
        <Hero activateFn={toggleActivation} routeFn={handleGetProtap} />
      )}
      <div className='hidden relative h-120 md:w-1/2 w-screen md:flex items-center justify-center'>
        <ProtapCard
          canFlip={false}
          className={cn(
            'md:scale-110 scale-60 rotate-6 md:-right-16 shadow-2xl rounded-3xl backface-hidden',
            {'md:scale-80 md:bottom-12': onActivation},
          )}
          icon='spinner-pulse-a'
        />
        {onActivation && <Phone />}
      </div>
    </div>
  )
}

interface HeroProps {
  activateFn: VoidFunction
  routeFn: VoidFunction
}

const Hero = ({activateFn, routeFn}: HeroProps) => {
  return (
    <div className='h-full md:space-y-8 md:px-0 flex flex-col justify-center'>
      <div className='md:space-y-4'>
        <div className='font-bold w-full flex md:flex-col items-center justify-center space-x-3 md:space-x-0'>
          {/* <div className="flex items-center justify-start w-64 h-16"></div> */}
          <TextAnimate
            text='Do you have a'
            type='whipInUp'
            className='font-figtree text-2xl lg:text-5xl font-semibold md:font-bold max-w-[20ch] md:h-14 tracking-tighter'
          />
          <div className='flex item-center justify-center space-x-3'>
            <Icon
              name='protap'
              className='md:h-16 h-14 md:w-40 w-30 md:text-primary text-primary-hover dark:text-teal-400'
            />
            <TextAnimate
              text='card?'
              type='whipInUp'
              className='font-figtree text-2xl lg:text-5xl font-semibold md:font-bold max-w-[20ch] flex items-center h-14 tracking-tighter'
            />
          </div>
        </div>
        <p className='hidden _md:flex font-figtree text-lg text-foreground/70 tracking-wide leading-snug max-w-lg text-balance'>
          Experience the future of personalized, and feature rich career &
          business platform.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <SexyButton
          onClick={activateFn}
          variant='invert'
          size='lg'
          className='font-bold'>
          Yes, I have the Card.
        </SexyButton>
        <SexyButton
          onClick={routeFn}
          variant='default'
          rightIcon='arrow-right'
          size='lg'
          className='font-bold'>
          Get The Card
        </SexyButton>
      </div>
    </div>
  )
}

const Phone = () => {
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
        initial={{opacity: 0, top: 360}}
        animate={{opacity: 1, top: 120}}
        className="absolute bg-transparent scale-80 -rotate-3 px-[9px] right-4 py-[7.5px] aspect-auto h-[calc(100vh)] lg:h-auto lg:w-100 shrink-0 lg:aspect-[9/16] bg-[url('/svg/15pro_max.svg')] bg-cover overflow-scroll flex flex-col shadow-xl">
        {/* <GuidingLight /> */}
        <motion.div
          key='k'
          initial={{opacity: 0, x: 0}}
          animate={{opacity: 1, x: 0}}
          exit={{opacity: 0, x: 0}}
          transition={{duration: 0.3}}
          className='h-[88lvh] rounded-t-[54px] border border-zinc-900 overflow-hidden w-full flex flex-col justify-center'>
          <div className='h-full w-full flex relative justify-center bg-white/96 border-0 border-black/40 rounded-t-[53px]'>
            <Prism
              animationType='3drotate'
              timeScale={0.33}
              height={2}
              baseWidth={5}
              scale={3}
              hueShift={0.33}
              colorFrequency={0.9}
              noise={0}
              glow={1}
            />
            <div className='absolute top-1.5 flex items-center justify-between h-15 w-90'>
              <div className='w-24 flex justify-center'>
                {/* <Icon name="apple" className="size-4 text-zinc-900" /> */}
                <span className='text-zinc-950 font-medium font-space'>
                  {time}
                </span>
              </div>
              <div className='rounded-[1.25rem] h-11 w-32 shrink-0 bg-zinc-900' />
              <div className='w-24 flex items-center justify-center space-x-1'>
                <Icon name='soundwave' className='size-5 text-zinc-900' />
                <Icon name='battery' className='size-5 text-zinc-900' />
              </div>
            </div>
          </div>
          <div className='h-36 bg-zinc-500/5 -rotate-6 absolute top-40 left-0 w-full flex items-center justify-center font-mono font-thin -tracking-[0.4em]'>
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

interface HeroActivationProps {
  onError: VoidFunction
  onScan: VoidFunction
}

const HeroActivation = ({onError, onScan}: HeroActivationProps) => (
  <div>
    <TextAnimate
      text='Tap the card on'
      type='whipInUp'
      className='font-figtree text-xl lg:text-5xl font-bold max-w-[20ch] h-14 tracking-tighter'
    />
    <TextAnimate
      text='the back of your'
      type='whipInUp'
      className='font-figtree text-xl lg:text-5xl font-bold max-w-[20ch] h-14 tracking-tighter'
    />
    <TextAnimate
      text='phone to scan.'
      type='whipInUp'
      className='font-figtree text-xl lg:text-5xl font-bold max-w-[20ch] h-14 tracking-tighter'
    />
    <div className='hidden _flex items-center justify-center h-36 pt-6'>
      <div className='h-24 border border-zinc-700 bg-zinc-800 rounded-xl flex flex-col items-start justify-center w-full px-4'>
        <div className='space-y-1'>
          <div className='text-sm dark:text-teal-400'>
            Scanning nearby NFC tag
          </div>
          <div className='text-xs font-semibold uppercase opacity-50'>
            status
          </div>
        </div>
      </div>
    </div>
    <div className='h-36 pt-8 flex items-center justify-center'>
      <div className='h-28 border border-zinc-700 bg-white dark:bg-zinc-900 rounded-xl flex flex-col items-start justify-center w-ful overflow-hidden'>
        <NFCScanner onScan={onScan} onError={onError} />
      </div>
    </div>
  </div>
)
