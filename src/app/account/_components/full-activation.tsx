import { useActivationCtx } from '@/ctx/activation'
import { onSuccess } from '@/ctx/toast'
import { cn } from '@/lib/utils'
import { useCallback } from 'react'
import { ActivationProgress } from './progress'
import ActivationTabs from './tab-activation'

interface Props {
  scrollRef?: React.RefObject<HTMLDivElement | null>
}

export const FullActivation = ({ scrollRef }: Props) => {
  // const isMobile = useMobile()
  // const {on: onActivation, toggle: toggleActivation} = useToggle()
  // const router = useRouter()
  // const handleGetProtap = useCallback(() => {
  //   router.push('/pricing')
  // }, [router])
  //

  const { openProgress, toggleOpenProgress, nfcData } = useActivationCtx()

  const onNFCScan = useCallback(() => {
    onSuccess('Scanned NFC Successfully')
  }, [])
  const onNFCError = useCallback(() => {
    console.log('Scanning NFC...')
  }, [])
  return (
    <div
      ref={scrollRef}
      className={cn(
        ' overflow-hidden shadow-lg md:dark:bg-background',
        // 'bg-gradient-to-l md:from-zinc-300/90 md:via-zinc-300/20 md:to-zinc-300/90',
        // 'md:dark:from-teal-100/80  md:dark:from-35% md:dark:via-neutral-200/10 md:dark:to-teal-100/90 md:dark:to-75% md:dark:backdrop-blur-lg',
        'dark:border-none border-zinc-400 dark:border-zinc-950 md:rounded-[6.5rem]',
        'grid grid-cols-1 h-full w-full',
      )}>
      <div className='h-[85vh] md:h-[70vh] px-4 pb-4 md:px-0'>
        <ActivationTabs nfcProps={{ onScan: onNFCScan, onError: onNFCError }} />
      </div>
      <ActivationProgress
        open={openProgress}
        onOpenChange={toggleOpenProgress}
        nfcData={nfcData}
      />
    </div>
  )
}

// const Bank = () => (
//   <>
//     {onActivation ? (
//             <HeroActivation onError={handleNFCError} onScan={handleNFCScan} />
//           ) : (
//             <Hero activateFn={toggleActivation} routeFn={handleGetProtap} />
//           )}
//           <Icon
//             name='card-scan'
//             className={cn(
//               'size-96 absolute top-10 rotate-12 scale-100',
//               'transition-all duration-700 ease-in',
//               {'rotate-0 scale-90': onActivation},
//             )}
//           />
//           <div className='relative md:h-120 h-100 md:w-1/4 w-screen flex items-center justify-center'>
//             {onActivation && <Phone isMobile={isMobile} />}
//           </div>
//   </>
// )

// interface HeroProps {
//   activateFn: VoidFunction
//   routeFn: VoidFunction
// }

// const Hero = ({activateFn, routeFn}: HeroProps) => {
//   return (
//     <div className='h-full md:space-y-8 md:px-0 flex flex-col justify-center'>
//       <div className='md:space-y-4'>
//         <div className='font-bold w-full flex md:flex-col items-center justify-center space-x-3 md:space-x-0'>
//           {/* <div className="flex items-center justify-start w-64 h-16"></div> */}
//           <TextAnimate
//             text='Do you have a'
//             type='whipInUp'
//             className='font-figtree text-xl md:text-2xl lg:text-5xl text-zinc-100 font-semibold md:font-semibold max-w-[20ch] md:h-14 tracking-tighter'
//           />
//           <div className='flex item-center justify-center space-x-3'>
//             <Icon
//               name='protap'
//               className='md:h-16 h-14 md:w-40 w-30 md:text-accent text-primary-hover dark:text-teal-400'
//             />
//             <TextAnimate
//               text='card?'
//               type='whipInUp'
//               className='font-figtree text-2xl lg:text-5xl text-zinc-100 font-semibold md:font-bold max-w-[20ch] flex items-center h-14 tracking-tighter'
//             />
//           </div>
//         </div>
//         <p className='hidden _md:flex font-figtree text-lg text-foreground/70 tracking-wide leading-snug max-w-lg text-balance'>
//           Exp business platform.
//         </p>
//       </div>

//       <div className='flex flex-col sm:flex-row gap-4'>
//         <SexyButton
//           variant='ghost'
//           onClick={activateFn}
//           size='lg'
//           className='md:text-lg bg-mac-blue text-white'>
//           Yes, I have the Card.
//         </SexyButton>
//       </div>
//     </div>
//   )
// }

// interface HeroActivationProps {
//   onError: VoidFunction
//   onScan: VoidFunction
// }

// const HeroActivation = ({onError, onScan}: HeroActivationProps) => (
//   <div className=''>
//     <div className='hidden md:flex flex-col'>
//       <TextAnimate
//         text='Tap the card on'
//         type='whipInUp'
//         className='hidden md:visible font-figtree text-lg lg:text-5xl font-semibold max-w-[20ch] md:h-14 tracking-tighter'
//       />
//       <TextAnimate
//         text='the back of your'
//         type='whipInUp'
//         className='font-figtree text-xl lg:text-5xl font-semibold max-w-[20ch] md:h-14 tracking-tighter'
//       />
//       <TextAnimate
//         text='phone to scan.'
//         type='whipInUp'
//         className='font-figtree text-xl lg:text-5xl font-semibold max-w-[20ch] md:h-14 tracking-tighter'
//       />
//     </div>
//     <div className='hidden _flex items-center justify-center h-36 pt-6'>
//       <div className='h-24 border border-zinc-700 bg-zinc-800 rounded-xl flex flex-col items-start justify-center w-full px-4'>
//         <div className='space-y-1'>
//           <div className='text-sm dark:text-teal-400'>
//             Scanning nearby NFC tag
//           </div>
//           <div className='text-xs font-semibold uppercase opacity-50'>
//             status
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className='absolute left-0 bottom-0 z-200 bg-white md:bg-transparent w-screen h-64 md:w-full md:h-36 pt-8 flex items-center justify-center'>
//       <div className='h-28 border border-zinc-700 bg-white dark:bg-zinc-900 rounded-xl flex flex-col items-start justify-center w-ful overflow-hidden'>
//         <NFCScanner onScan={onScan} onError={onError} />
//       </div>
//     </div>
//   </div>
// )

// interface CardTap {}
// const CardTap = ({toggleFn}) => {
//   return (
//     <div className='bg-gradient-to-br from-ash via-ash/60 via-60% to-lime-100/60 backdrop-blur-lg border border-zinc-400/80 dark:border-zinc-950 rounded-3xl pt-3 md:pt-2'>
//       <div className='h-full flex items-center md:space-x-3 space-x-2'>
//         <div className='md:w-96 w-64 md:h-44 h-32 flex items-center justify-center'>
//           <Icon
//             name='protap-scan-silver'
//             className='md:size-44 size-32 text-blue-950'
//           />
//         </div>
//         <div className='size-full flex flex-col items-start justify-center'>
//           <div className='md:h-24 h-24 md:px-4 px-0'>
//             <TextAnimate
//               type='whipInUp'
//               text='Card Tap Activation'
//               className='tracking-tight text-base md:text-xl font-semibold font-figtree'
//               delay={500}
//             />
//             <div className='md:text-sm text-xs max-w-[25ch] md:max-w-[28ch] font-figtree opacity-90'>
//               Enable NFC on your device to activate your account using your{' '}
//               <span className='text-primary dark:text-sky-300 font-medium'>
//                 Protap Card
//               </span>
//               .
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='md:p-4 px-3 pb-3 md:pt-3'>
//         <SexyButton
//           fullWidth
//           size='lg'
//           className=''
//           variant='dark'
//           rightIcon='chevron-right'>
//           Begin Activation
//         </SexyButton>
//       </div>
//     </div>
//   )
// }
