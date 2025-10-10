import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useMobile} from '@/hooks/use-mobile'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'

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
          <span className='px-2'>Open Device Camera</span>
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
      <QRCodeActivationContent />
    </div>
  </div>
)

export const QRCodeActivationContent = () => {
  const isMobile = useMobile()

  return (
    <div className='relative z-10 h-40 w-full flex flex-col items-center justify-center space-y-4'>
      <SexyButton
        variant='dark'
        size={isMobile ? 'lg' : 'lg'}
        onClick={() => console.log('')}
        rightIcon='nfc'
        iconStyle='size-6 md:size-6'
        className='relative z-50 w-64'>
        <span className={cn('px-2 text-lg', {})}>Open Device Camera</span>
      </SexyButton>
      <SexyButton
        variant='secondary'
        size={isMobile ? 'lg' : 'lg'}
        onClick={() => console.log('')}
        rightIcon='nfc'
        iconStyle='size-6 md:size-6'
        className='relative z-50 w-64'>
        <span className={cn('px-2 text-lg', {})}>Upload QR Code</span>
      </SexyButton>
    </div>
  )
}
