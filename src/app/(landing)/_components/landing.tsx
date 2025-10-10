'use client'

import {HeroCTA} from '@/app/(landing)/_components/hero-cta'
import {VisualContent} from '@/app/(landing)/_components/visual-content'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
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

  const Intro = useCallback(() => {
    const options = opts(
      <div className='w-full md:px-4 px-0 flex flex-col items-center justify-end rounded-3xl'>
        <TextAnimate
          type='whipInUp'
          className='md:text-4xl lg:text-5xl font-figtree font-medium tracking-tighter h-14'>
          Introducing, Protap.
        </TextAnimate>
      </div>,
      null,
    )
    return (
      <div className='w-full flex items-center justify-center p-4 relative z-60'>
        {options.get(isMobile)}
      </div>
    )
  }, [isMobile])

  return (
    <main className='overflow-y-scroll md:overflow-visible h-screen'>
      <Intro />
      <div className='h-[36lvh] md:h-[55lvh] grid lg:grid-cols-2 gap-12 w-full items-center'>
        <Hero />
        <VisualContent />
      </div>
      <div className='flex px-14'>
        <SexyButton
          className='rounded-full'
          rightIcon='chevron-right'
          variant='dark'
          size='lg'>
          Get The Card
        </SexyButton>
      </div>
      <div className='flex items-center font-figtree dark:bg-zinc-500/0 backdrop-blur-3xl md:tracking-wide md:text-lg w-full rounded-3xl px4'>
        <div className='bg-zinc-900/0 dark:bg-transparent  h-20 w-full flex flex-1 items-center justify-center px-3'>
          <ShimmerText
            surface='dark'
            className='text-xl lg:text-2xl flex leading-6 md:leading-6 items-center p-0 m-0 text-center md:font-bold font-extrabold h-20'>
            A Unified Digital Insurance Platform
          </ShimmerText>
        </div>
      </div>
      <div className='h-[24lvh] flex flex-col justify-center items-center w-full lg:h-[36lvh]'>
        <div className='w-full px-8 font-space capitalize text-sm h-10 opacity-60 tracking-tighter'>
          <h3 className='md:text-xl font-semibold'>our users</h3>
        </div>
        <LogoCarousel columnCount={isMobile ? 4 : 5} />
      </div>
    </main>
  )
}

export const Unified = () => (
  <div className='w-full flex flex-1 items-center justify-center text-center font-medium h-20 border border-zinc-900/50 dark:border-transparent dark:opacity-75 bg-teal-100/20 dark:bg-transparent'>
    <p className='text-sm text-center border-l max-w-[28ch]'>
      <span>
        Unified Digital Insurance Platform, Career Builder made and built with
        love for
      </span>
      <span className='font-bold ml-1 dark:text-teal-200'>everyone</span>.
    </p>
  </div>
)
