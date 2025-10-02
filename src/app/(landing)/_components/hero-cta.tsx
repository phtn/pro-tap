import {SexyButton} from '@/components/experimental/sexy-button-variants'
import TextAnimate from '@/components/ui/text-animate'
import {Icon} from '@/lib/icons'
import {useRouter} from 'next/navigation'
import {useCallback} from 'react'

export const HeroCTA = () => {
  const router = useRouter()
  const handleRouter = useCallback(() => {
    router.push('/pricing')
  }, [router])

  return (
    <div className='h-full space-y-14 px-6 md:px-0 flex flex-col justify-center'>
      <div className='space-y-12'>
        <div className='font-bold leading-4'>
          <div className='flex items-center justify-start w-64 h-16'>
            <Icon name='protap' className='h-48 w-auto' />
          </div>
          <TextAnimate
            type='whipInUp'
            text='Digital Insurance'
            className='font-doto text-xl lg:text-2xl font-extrabold tracking-normal dark:text-teal-500 text-primary'
          />
        </div>
        <p className='hidden md:flex font-figtree text-lg text-foreground/70 tracking-wide leading-snug max-w-lg text-balance'>
          Experience the future of personalized, and feature rich business
          platform.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <GetButton onClick={handleRouter} />
        <ActivateButton />
      </div>
    </div>
  )
}

interface GetButtonProps {
  onClick: VoidFunction
}

export const GetButton = ({onClick}: GetButtonProps) => {
  return (
    <SexyButton
      onClick={onClick}
      size='lg'
      variant='primary'
      className='rounded-full bg-primary-hover dark:bg-teal-500'>
      <span className='drop-shadow-xs text-white'>Get The Card</span>
    </SexyButton>
  )
}

export const ActivateButton = () => {
  return (
    <SexyButton
      size='lg'
      variant='secondary'
      iconStyle='text-teal-800'
      leftIcon='zap'
      className='rounded-full'>
      Activate Protap
    </SexyButton>
  )
}
