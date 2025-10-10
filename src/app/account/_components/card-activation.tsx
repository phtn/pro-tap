import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useActivationCtx} from '@/ctx/activation'
import {onSuccess} from '@/ctx/toast'
import {useMobile} from '@/hooks/use-mobile'
import {useNFC, UseNFCOptions} from '@/hooks/use-nfc'
import {checkCard} from '@/lib/firebase/cards'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useCallback, useEffect, useState} from 'react'

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

  const [isSimulating, setIsSimulating] = useState(false)

  const handleSimulatedScan = useCallback(async () => {
    setIsSimulating((prev) => !prev)

    const serialNumberOk = await checkCard('card-x-sim', 'general')

    console.log('Simulating scan...')
    if (serialNumberOk) {
      console.log('card is good')
      // Simulate a scan by dispatching a fake event
    }
  }, [])

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
      <SexyButton
        size='lg'
        variant='dark'
        className='ml-6 hidden'
        onClick={handleSimulatedScan}
        leftIcon='scan-waves'>
        <span className='px-2'>
          {isSimulating ? 'Simulating .......' : 'Simulate Scan'}
        </span>
      </SexyButton>
      {isScanning && (
        <Icon
          name='iphone-outline'
          className={cn(
            'absolute left-1/2 -translate-x-1/3 w-auto h-100 scale-90 fill-transparent aspect-auto opacity-80',
            'animate-in transition-transform duration-500 delay-500 ease-in-out translate-y-0',
            {'-translate-y-56': isScanning},
          )}
        />
      )}
    </div>
  )
}
