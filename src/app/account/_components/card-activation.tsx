import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useActivationCtx} from '@/ctx/activation'
import {onSuccess} from '@/ctx/toast'
import {useMobile} from '@/hooks/use-mobile'
import {useNFC, UseNFCOptions} from '@/hooks/use-nfc'
import {cn} from '@/lib/utils'
import {useEffect} from 'react'

export const CardActivationContent = (props?: UseNFCOptions) => {
  const {toggleOpenProgress, setNfcData} = useActivationCtx()
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
    scanDetails,
  } = useNFC(props)

  useEffect(() => {
    if (scanDetails) {
      onSuccess('Card scanned successfully')
      setNfcData(scanDetails)
      toggleOpenProgress()
    }
  }, [scanDetails, toggleOpenProgress])

  return (
    <div className='relative z-10 h-40 md:h-10 w-full flex items-center justify-center'>
      <SexyButton
        variant='dark'
        onClick={startScanning}
        iconStyle='size-6 md:size-6'
        size={isMobile ? 'lg' : 'lg'}
        rightIcon={
          isLoading ? 'spinners-ring' : isScanning ? 'spinner-pulse-a' : 'nfc'
        }
        className='relative z-50'>
        <span
          className={cn('px-2 text-lg', {
            'animate-pulse text-accent': isScanning,
          })}>
          {isScanning ? 'Scanning nearby NFC' : 'Scan Card'}
        </span>
      </SexyButton>
    </div>
  )
}
