import {QRCodeReader} from '@/components/experimental/qrcode-reader'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useMobile} from '@/hooks/use-mobile'
import {cn} from '@/lib/utils'

export const QRCodeActivationPanel = () => <QRCodeReader />

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
