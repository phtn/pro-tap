import { Verifier } from '@/components/kokonutui/verifier'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useAuthCtx } from '@/ctx/auth'
import { onError } from '@/ctx/toast'
import { activateCard, checkCard } from '@/lib/firebase/cards'
import { activateUser } from '@/lib/firebase/users'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface QRActivationProgressProps {
  open: boolean
  onOpenChange: VoidFunction
  qrcData: string | null
}

export const QRActivationProgress = ({
  open,
  onOpenChange,
  qrcData,
}: QRActivationProgressProps) => {
  const { user } = useAuthCtx()
  const router = useRouter()

  const [isVerified, setIsVerified] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performActivation = useCallback(async () => {
    if (!qrcData || !user || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      // Parse QR data to extract ID and group
      let cardId: string
      let grp: string = 'general'

      try {
        const url = new URL(qrcData)
        cardId = url.searchParams.get('id') || ''
        grp = url.searchParams.get('grp') || 'general'
      } catch (error) {
        // If QR data isn't a valid URL, assume it's just the ID
        cardId = qrcData
        grp = 'general'
      }

      // Step 1: Verify card exists and ownerId is null
      const cardExists = await checkCard(cardId, grp)

      if (!cardExists) {
        throw new Error('Card not found or already activated')
      }

      setIsVerified(true)

      // Step 2: Activate user
      await activateUser(user.uid, cardId, cardId)
      setIsActivated(true)

      // Step 3: Activate card
      await activateCard(cardId, grp, user.uid)

      // Step 4: Complete activation
      setIsCompleted(true)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Activation failed'
      setError(errorMessage)
      onError(errorMessage)
      console.error('QR Activation error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [qrcData, user, isLoading])

  useEffect(() => {
    if (open && qrcData && user && !isCompleted && !isLoading) {
      performActivation()
    }
  }, [open, qrcData, user, isCompleted, isLoading, performActivation])

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
          <QRCodeId qrcData={qrcData} />
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
          ) : qrcData && user ? (
            <QRVerifier
              qrcData={qrcData}
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

interface QRCodeIdProps {
  qrcData: string | null
}

export const QRCodeId = ({ qrcData }: QRCodeIdProps) => {
  const getQRId = (data: string): string => {
    try {
      const url = new URL(data)
      return url.searchParams.get('id') || data
    } catch (error) {
      return data
    }
  }

  const qrId = qrcData ? getQRId(qrcData) : ''

  return (
    <div className='md:w-80 w-40 flex items-center justify-end overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.span
          key='expanded'
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
          exit={{ width: 0 }}
          transition={{ visualDuration: 0.5, type: 'spring', bounce: 0.15 }}
          className='capitalize font-doto text-base lg:text-2xl font-bold tracking-widest whitespace-nowrap text-foreground'>
          {qrId}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

interface QRVerifierProps {
  qrcData: string
  isActivated: boolean
  isCompleted: boolean
  isVerified: boolean
}

export const QRVerifier = ({
  qrcData,
  isActivated,
  isCompleted,
  isVerified,
}: QRVerifierProps) => {
  const getQRId = (data: string): string => {
    try {
      const url = new URL(data)
      return url.searchParams.get('id') || data
    } catch (error) {
      return data
    }
  }

  const qrId = getQRId(qrcData)

  return (
    <Verifier
      code={qrId}
      isActivated={isActivated}
      isCompleted={isCompleted}
      isVerified={isVerified}
    />
  )
}