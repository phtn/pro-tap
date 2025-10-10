'use client'

import {HeroCTA} from '@/app/(landing)/_components/hero-cta'
import {VisualContent} from '@/app/(landing)/_components/visual-content'
import {Footer} from '@/components/experimental/modern-footer'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {TextFlip} from '@/components/experimental/text-flip'
import ShimmerText from '@/components/kokonutui/shimmer-text'
import {LogoCarousel} from '@/components/ui/logo-carousel'
import {NeumorphButton} from '@/components/ui/neumorph'
import TextAnimate from '@/components/ui/text-animate'
import {useMobile} from '@/hooks/use-mobile'
import {Icon} from '@/lib/icons'
import {opts} from '@/utils/helpers'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useCallback} from 'react'

export const Landing = () => {
  const isMobile = useMobile()
  const Hero = useCallback(() => {
    const options = opts(null, <HeroCTA />)
    return <>{options.get(isMobile)}</>
  }, [isMobile])

  const router = useRouter()
  const routeToPricing = () => {
    router.push('/pricing')
  }

  const Intro = useCallback(() => {
    const options = opts(
      <div className='w-full md:px-4 px-0 flex flex-col items-center justify-end'>
        <TextAnimate
          type='whipInUp'
          className='md:text-4xl lg:text-5xl font-figtree font-medium tracking-tighter'>
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
      <div className='relative -rotate-2 -translate-y-2 flex md:hidden items-center font-figtree dark:bg-zinc-500/0 backdrop-blur-3xl w-full'>
        <div className='bg-zinc-900/15 dark:bg-transparent h-6 w-full flex flex-1 items-center justify-center px-3'>
          <ShimmerText
            surface='dark'
            className='text-xs lg:text-2xl flex leading-6 md:leading-6 items-center p-0 m-0 text-center  font-semibold font-figtree'>
            A Unified Digital Insurance Platform.
          </ShimmerText>
        </div>
      </div>
      <div className='h-28 -rotate-2 flex items-center justify-center md:justify-start md:px-14 px-4 w-screen mx-auto md:hidden'>
        <SexyButton
          size='lg'
          onClick={routeToPricing}
          className='rounded-full rotate-2'
          variant='primary'>
          <span>Get The Card Today!</span>
        </SexyButton>
      </div>
      <div className='h-48 w-screen flex items-center justify-center space-x-4'>
        <NeumorphButton
          onClick={() => {}}
          size='sq'
          intent='ghost'
          className='rounded-full flex items-center justify-center size-8 pt-2.5 bg-zinc-200 dark:bg-zinc-800/40'>
          <Icon name='arrow-down' className='size-5' />
        </NeumorphButton>
        <TextAnimate
          type='whipInUp'
          className='text-3xl lg:text-4xl font-figtree font-medium tracking-tighter'>
          Discover
        </TextAnimate>
      </div>
      <div className='px-4'>
        <div className='w-full bg-zinc-200 dark:bg-zinc-800/40 rounded-4xl border-2 dark:border-pink-400/30 border-zinc-400 flex justify-between overflow-hidden shadow-md'>
          <div className='p-4 h-full '>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-figtree font-medium tracking-tighter flex space-x-1 md:space-x-2'>
              <span>Personalized</span>
              <Icon
                name='sign-pen'
                className='size-4 md:size-5 text-slate-500'
              />
            </h3>
            <p className='text-lg md:text-xl lg:text-3xl tracking-tighter opacity-80 font-sans'>
              Profile Page
            </p>
            <ul className='text-xs mt-4'>
              <li>Photo Gallery</li>
              <li>Highlights</li>
              <li>Achievements</li>
              <li>Products</li>
            </ul>
          </div>
          <Image
            src='/images/sam-editor.png'
            alt='sam-editor'
            unoptimized
            width={200}
            height={200}
            className='drop-shadow-2xl'
          />
        </div>
      </div>
      <div className='px-4 w-screen py-16'>
        <div className='h-80 w-full flex items-center justify-center '>
          <div className='relative flex flex-col items-center rounded-4xl border border-zinc-300 dark:border-zinc-700/40 bg-zinc-200/40 dark:bg-zinc-800/40 backdrop-blur-3xl p-8 space-y-4 shadow-md'>
            <Icon
              name='zap-solid'
              className='absolute -top-4 -right-4 dark:text-orange-200 text-orange-300 size-14 -rotate-8 drop-shadow-xl'
            />
            <div className='border-b border-zinc-300 pb-2 w-full flex text-3xl md:text-4xl font-figtree tracking-tight'>
              <span className='opacity-40 font-light'>protap.ph/u/</span>
              <div className='w-23 overflow-visible'>
                <TextFlip
                  textClassName='dark:text-orange-300 text-indigo-500'
                  animationDuration={500}
                  interval={1500}
                  className='bg-transparent text-left'
                  words={[
                    'sam',
                    'jake',
                    'alice',
                    'julia',
                    'xoxo',
                    'super',
                    'marie',
                    'patty',
                    'elon',
                    'mira',
                    'chloe',
                    'roon',
                    'marcy',
                    'maxine',
                    'kache',
                    'navier',
                    'moshi',
                    'riley',
                    'april',
                  ]}
                />
              </div>
            </div>
            <div className='text-sm h-10 md:text-base opacity-80 flex items-center justify-center'>
              <span>Create a shareable link to your content.</span>
            </div>
            <div className='h-16 flex items-center justify-center w-full'>
              <SexyButton
                fullWidth
                className='w-full'
                variant='dark'
                rightIcon='arrow-right'>
                Claim Yours Today
              </SexyButton>
            </div>
          </div>
        </div>
      </div>

      {/**/}
      <div className='px-4'>
        <div className='w-full bg-zinc-200 dark:bg-zinc-800/40 rounded-4xl border-2 dark:border-sky-400/20 border-zinc-400 flex justify-between overflow-hidden'>
          <div className='p-4 h-full '>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-figtree font-medium tracking-tighter flex space-x-1 md:space-x-2'>
              <span>Social Network</span>
              <Icon
                name='globe-solid'
                className='size-4 md:size-5 text-slate-500'
              />
            </h3>
            <p className='text-lg md:text-xl lg:text-3xl tracking-tighter opacity-80 font-sans'>
              Hub
            </p>
            <ul className='text-xs mt-4'>
              <li>Share profiles</li>
              <li>Get Connected</li>
              <li>Chat Messaging</li>
              <li>Create Content</li>
            </ul>
          </div>
          <Image
            src='/images/streamer.png'
            alt='sam-editor'
            unoptimized
            width={200}
            height={200}
            className='drop-shadow-2xl'
          />
        </div>
      </div>
      {/**/}
      <div className='h-96 flex flex-col justify-center items-center w-full lg:h-[36lvh]'>
        <div className='w-full px-4 md:px-8 font-space capitalize text-sm h-20 opacity-60 tracking-tighter'>
          <h3 className='text-base md:text-xl font-semibold'>
            Trusted by leading providers
          </h3>
        </div>
        <LogoCarousel columnCount={isMobile ? 4 : 5} />
      </div>
      <Footer />
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
