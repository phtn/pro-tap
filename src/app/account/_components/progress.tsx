import {Verifier} from '@/components/kokonutui/verifier'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {useAuthCtx} from '@/ctx/auth'
import {onError} from '@/ctx/toast'
import {NFCData} from '@/hooks/use-nfc'
import {activateCard, checkCard} from '@/lib/firebase/cards'
import {activateUser} from '@/lib/firebase/users'
import {macStr} from '@/utils/macstr'
import {AnimatePresence, motion} from 'motion/react'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useMemo, useState} from 'react'

interface ActivationProgressProps {
  open: boolean
  onOpenChange: VoidFunction
  nfcData: NFCData | null
}

export const ActivationProgress = ({
  open,
  onOpenChange,
  nfcData,
}: ActivationProgressProps) => {
  const {user} = useAuthCtx()
  const router = useRouter()

  const [isVerified, setIsVerified] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const serialNumber = useMemo(
    () =>
      nfcData && nfcData.serialNumber.split('-').shift() === 'qr'
        ? nfcData.serialNumber
        : nfcData && macStr(nfcData.serialNumber),
    [nfcData],
  )

  const performActivation = useCallback(async () => {
    if (!nfcData || !user || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      // Step 1: Verify card exists and ownerId is null
      if (!serialNumber) {
        return
      }
      const cardExists = await checkCard(serialNumber, 'general')

      if (!cardExists) {
        throw new Error('Card not found or already activated')
      }

      setIsVerified(true)
      // onSuccess('Card verified successfully')

      // Step 2: Activate user
      await activateUser(user.uid, serialNumber, nfcData.serialNumber)
      setIsActivated(true)
      // onSuccess('User activated successfully')

      // Step 3: Activate card
      await activateCard(serialNumber, 'general', user.uid)
      // onSuccess('Card activated successfully')

      // Step 4: Complete activation
      setIsCompleted(true)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Activation failed'
      setError(errorMessage)
      onError(errorMessage)
      console.error('Activation error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [nfcData, user, isLoading])

  useEffect(() => {
    if (open && nfcData && user && !isCompleted && !isLoading) {
      performActivation()
    }
  }, [open, nfcData, user, isCompleted, isLoading, performActivation])

  useEffect(() => {
    if (isCompleted && user) {
      // Close the sheet and navigate to activated page
      onOpenChange()
      router.push('/account/activated')
    }
  }, [isCompleted, user, onOpenChange, router])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetHeader>
        <SheetTitle className='hidden'>Activating</SheetTitle>
      </SheetHeader>

      <SheetContent
        side='bottom'
        className='space-y-4 h-[55lvh] dark:bg-zinc-700 rounded-t-3xl overflow-scroll p-2'>
        <div className='p-6 border-b flex justify-center'>
          <NtagId serialNumber={nfcData?.serialNumber} />
        </div>

        <div className='h-fit w-full flex items-center justify-center'>
          {error ? (
            <div className='text-center p-6'>
              <div className='text-red-500 text-lg font-semibold mb-2'>
                Activation Failed
              </div>
              <div className='text-sm text-muted-foreground mb-4'>{error}</div>
              <button
                onClick={() => {
                  setError(null)
                  setIsVerified(false)
                  setIsActivated(false)
                  setIsCompleted(false)
                  performActivation()
                }}
                className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90'>
                Try Again
              </button>
            </div>
          ) : serialNumber && user ? (
            <Verifier
              code={serialNumber}
              isActivated={isActivated}
              isCompleted={isCompleted}
              isVerified={isVerified}
            />
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}
interface NtagCodeProps {
  serialNumber?: string
}

export const NtagId = ({serialNumber}: NtagCodeProps) => {
  return (
    <div className='md:w-80 w-40 flex items-center justify-end overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.span
          key='expanded'
          initial={{width: 0}}
          animate={{width: 'auto'}}
          exit={{width: 0}}
          transition={{visualDuration: 0.5, type: 'spring', bounce: 0.15}}
          className='capitalize font-doto text-base lg:text-2xl font-bold tracking-widest whitespace-nowrap text-foreground'>
          {serialNumber && macStr(serialNumber)}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
