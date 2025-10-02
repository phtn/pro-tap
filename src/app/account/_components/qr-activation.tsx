import {SexyButton} from '@/components/experimental/sexy-button-variants'
import TextAnimate from '@/components/ui/text-animate'
import {Icon} from '@/lib/icons'

export const QRCodeActivationPanel = () => (
  <div className='shadow-3xl h-[50vh] md:h-full w-full flex flex-col items-center justify-center'>
    <div className='lg:translate-x-6 border-2 border-zinc-800/10 bg-zinc-500/10 dark:bg-transparent dark:border-transparent overflow-hidden relative md:h-96 h-full w-auto aspect-square rounded-[4rem] flex flex-col items-center justify-center'>
      <div className='h-full w-full flex flex-col items-center justify-center space-y-4'>
        <Icon name='qrcode-scan' className='md:size-36 size-24 text-white' />
        <h2 className='text-xl font-semibold font-figtree tracking-tight'>
          QR Code Activation
        </h2>
      </div>
      <div className='relative bottom-0 h-48 w-full flex items-center justify-center space-x-8 border-t'>
        <SexyButton size='lg' variant='dark' leftIcon='instagram' className=''>
          <span className='px-2'>Camera</span>
        </SexyButton>
        <SexyButton
          size='lg'
          variant='secondary'
          leftIcon='download'
          className='hover:bg-back'>
          <span className='px-2'>Upload</span>
        </SexyButton>
      </div>
    </div>
  </div>
)

export const ActivationRow = () => (
  <div className='lg:h-[36lvh] py-6 md:px-0 px-4 pb-40'>
    <div className='h-full grid grid-cols-1 md:grid-cols-2 items-center md:gap-10 gap-12'>
      <QRCodeActivation />
    </div>
  </div>
)

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
