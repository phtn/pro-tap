'use client'

import {HeroCTA} from '@/app/(landing)/_components/hero-cta'
import {VisualContent} from '@/app/(landing)/_components/visual-content'
import ShimmerText from '@/components/kokonutui/shimmer-text'
import {LogoCarousel} from '@/components/ui/logo-carousel'
import TextAnimate from '@/components/ui/text-animate'
import {useMobile} from '@/hooks/use-mobile'
import {opts} from '@/utils/helpers'
import {useCallback} from 'react'

export const Landing = () => {
  const isMobile = useMobile()
  const Hero = useCallback(() => {
    const options = opts(null, <HeroCTA />)
    return <>{options.get(isMobile)}</>
  }, [isMobile])

  const Activate = useCallback(() => {
    const options = opts(
      <div className='w-full space-y-2 md:px-4 px-0 h-48 flex flex-col items-center justify-center rounded-4xl '>
        <TextAnimate
          type='whipInUp'
          className='md:text-4xl lg:text-5xl font-figtree font-semibold tracking-tighter h-14'>
          Introducing
        </TextAnimate>
        <div className='flex items-center font-figtree dark:bg-zinc-500/10 backdrop-blur-3xl md:tracking-wide md:text-lg w-full rounded-3xl'>
          <div className='bg-zinc-900 dark:bg-transparent max-w-[10ch] md:max-w-[10ch] h-20 w-1/3 flex flex-1 items-center justify-center border border-zinc-900 dark:border-transparent'>
            <ShimmerText
              surface='dark'
              // auto={false}
              className='text-base sm:text-lg md:text-xl lg:text-2xl flex leading-6 md:leading-6 items-center p-0 m-0 text-center md:font-bold font-extrabold h-20'>
              The world's first ever
            </ShimmerText>
          </div>
          <div className='w-full flex flex-1 items-center justify-center text-center font-medium h-20 border border-zinc-900/50 dark:border-transparent dark:opacity-75 bg-teal-100/20 dark:bg-transparent'>
            <p className='text-sm text-center border-l max-w-[20ch]'>
              <span>Unified Professional Career Builder, built for</span>
              <span className='font-bold ml-1 dark:text-teal-200'>
                everyone
              </span>
              .
            </p>
          </div>
        </div>
      </div>,
      null,
    )
    return (
      <div className='w-full flex items-center justify-center p-4 relative z-100'>
        {options.get(isMobile)}
      </div>
    )
  }, [isMobile])

  return (
    <main className='overflow-y-scroll md:overflow-visible h-screen'>
      <div className='h-[35lvh] md:h-[55lvh] grid lg:grid-cols-2 gap-12 w-full items-center'>
        <Hero />
        <VisualContent />
      </div>

      <Activate />

      <div className='h-[24lvh] flex flex-col justify-center items-center w-full lg:h-[36lvh]'>
        <div className='w-full px-5 font-space capitalize text-sm h-10 opacity-60 tracking-tighter'>
          <h3>our users</h3>
        </div>
        <LogoCarousel columnCount={isMobile ? 4 : 5} />
      </div>
    </main>
  )
}
