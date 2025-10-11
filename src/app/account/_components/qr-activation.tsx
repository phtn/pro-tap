'use client'

import { useAuthCtx } from '@/ctx/auth'
import { onSuccess } from '@/ctx/toast'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useToggle } from '@/hooks/use-toggle'
import { QRCodeReader } from '@/components/experimental/qrcode-reader'
import { QRActivationProgress } from './qr-progress'

export const QRCodeActivationContent = () => {
  const { user, loading } = useAuthCtx()
  const router = useRouter()
  const [qrScanned, setQrScanned] = useState<string | null>(null)
  const { on: openProgress, toggle: toggleOpenProgress } = useToggle()

  const handleQRScan = useCallback((qrData: string) => {
    setQrScanned(qrData)
    onSuccess('QR Code scanned successfully')

    // If user is not authenticated, store QR data and redirect to sign in
    if (!user) {
      // Store QR data in session storage for after authentication
      sessionStorage.setItem('pendingQRData', qrData)
      router.push('/sign')
      return
    }

    // If user is authenticated but not activated, proceed with activation
    if (user && !user.isActivated) {
      toggleOpenProgress()
    } else if (user && user.isActivated) {
      // If user is already activated, redirect to add service page
      router.push('/account/add-service')
    }
  }, [user, toggleOpenProgress, router])

  // Handle case where user signs in after scanning QR
  useEffect(() => {
    if (user && qrScanned && !user.isActivated) {
      toggleOpenProgress()
    } else if (user && qrScanned && user.isActivated) {
      router.push('/account/add-service')
    }
  }, [user, qrScanned, toggleOpenProgress, router])

  // Check for pending QR data when component mounts or user changes
  useEffect(() => {
    if (user && !loading) {
      const pendingQRData = sessionStorage.getItem('pendingQRData')

      if (pendingQRData && !qrScanned) {
        setQrScanned(pendingQRData)

        // Clear the stored data
        sessionStorage.removeItem('pendingQRData')

        // Proceed with activation logic
        if (!user.isActivated) {
          toggleOpenProgress()
        } else {
          router.push('/account/add-service')
        }
      }
    }
  }, [user, loading, qrScanned, toggleOpenProgress, router])

  return (
    <div className="space-y-4">
      <QRCodeReader onScan={handleQRScan} />
      {qrScanned && (
        <div className="text-center text-sm text-muted-foreground">
          QR Code scanned. {user ? 'Processing activation...' : 'Please sign in to continue.'}
        </div>
      )}

      <QRActivationProgress
        open={openProgress}
        onOpenChange={toggleOpenProgress}
        qrcData={qrScanned}
      />
    </div>
  )
}
