'use client'

import { HeroCTA, ViewButton } from '@/app/(landing)/_components/hero-cta'
import { VisualContent } from '@/app/(landing)/_components/visual-content'
import { SexyButton } from '@/components/experimental/sexy-button-variants'
import TextAnimate from '@/components/ui/text-animate'
import { useMobile } from '@/hooks/use-mobile'
import { Icon } from '@/lib/icons'

export const Landing = () => {
  const isMobile = useMobile()
  return (
    <main className='overflow-y-scroll md:overflow-visible h-screen'>
      <div className='h-[40lvh] md:h-[55lvh] grid lg:grid-cols-2 gap-12 w-full items-center'>
        {/* Left Content */}
        {isMobile ? null : <HeroCTA />}

        {/* Right Content - 3D Character Placeholder */}
        <VisualContent />
      </div>

      {/* CTA */}
      {isMobile ? (
        <div className='w-full flex items-center justify-center relative z-100'>
          <ViewButton />
        </div>
      ) : null}

      {/* Feature Cards */}
      {/* {isMobile ? <FeatureCards /> : <FeatureCards />} */}
      <div className='lg:h-[36lvh] py-6 md:px-0 px-4 pb-40'>
        <div className='h-full grid grid-cols-1 md:grid-cols-2 items-center md:gap-10 gap-12'>
          <CardTapActivation />
          <QRCodeActivation />
        </div>
      </div>
    </main>
  )
}

const CardTapActivation = () => {
  return (
    <div className='bg-gradient-to-br from-ash via-ash/60 via-60% to-lime-100/60 backdrop-blur-lg border border-zinc-400/80 dark:border-zinc-950 rounded-3xl pt-3 md:pt-2'>
      <div className='h-full flex items-center md:space-x-3 space-x-2'>
        <div className='md:w-96 w-64 md:h-44 h-32 flex items-center justify-center'>
          <Icon
            name='protap-scan-silver'
            className='md:size-44 size-32 text-blue-950'
          />
        </div>
        <div className='size-full flex flex-col items-start justify-center'>
          <div className='md:h-24 h-24 md:px-4 px-0'>
            <TextAnimate
              type='whipInUp'
              text='Card Tap Activation'
              className='tracking-tight text-base md:text-xl font-semibold font-figtree'
              delay={500}
            />
            <div className='md:text-sm text-xs max-w-[25ch] md:max-w-[28ch] font-figtree opacity-90'>
              Enable NFC on your device to activate your account using your{' '}
              <span className='text-primary dark:text-sky-300 font-medium'>
                Protap Card
              </span>
              .
            </div>
          </div>
        </div>
      </div>
      <div className='md:p-4 px-3 pb-3 md:pt-3'>
        <SexyButton
          fullWidth
          size='lg'
          className=''
          variant='dark'
          rightIcon='chevron-right'>
          Begin Activation
        </SexyButton>
      </div>
    </div>
  )
}

const QRCodeActivation = () => {
  return (
    <div className='bg-gradient-to-br from-zinc-400 via-zinc-300 to-red-400/30 via-70% dark:from-zinc-400 dark:via-zinc-500 dark:to-rose-300/40 backdrop-blur-lg border border-zinc-400 dark:border-zinc-800 rounded-3xl pt-3 md:pt-2'>
      <div className='h-full flex items-center md:space-x-0 space-x-2'>
        <div className='md:w-96 w-64 md:h-44 h-32 overflow-visible flex items-center justify-center'>
          <Icon
            name='qrcode-scan'
            className='md:size-24 size-24 text-blue-950'
          />
        </div>
        <div className='size-full flex flex-col items-start justify-center'>
          <div className='h-20 md:h-24 md:px-0 px-0'>
            <TextAnimate
              type='whipInUp'
              text='QR Code Activation'
              className='tracking-tight text-base md:text-xl font-semibold font-figtree'
              delay={500}
            />
            <div className='md:text-sm text-xs max-w-[25ch] md:max-w-[29ch] font-figtree opacity-90'>
              Your QR code will be auto generated upon purchase of a
              <span className='text-primary dark:text-sky-300 font-medium px-1'>
                Protap
              </span>
              Subscription.
            </div>
          </div>
        </div>
      </div>
      <div className='md:p-4 px-3 pb-3 md:pt-3'>
        <SexyButton
          fullWidth
          size='lg'
          className=''
          // variant="secondary"
          rightIcon='chevron-right'>
          Upload QR Code
        </SexyButton>
      </div>
    </div>
  )
}
