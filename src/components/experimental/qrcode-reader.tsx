'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Icon } from '@/lib/icons'
import { Html5Qrcode } from 'html5-qrcode'
import { useEffect, useRef, useState } from 'react'
import { HyperCard } from './card/hyper-card'
import { SexyButton } from './sexy-button-variants'

interface QRCodeReaderProps {
  onScan?: (data: string) => void
}

export function QRCodeReader({ onScan }: QRCodeReaderProps) {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera')
  const [qrResult, setQrResult] = useState<string>('')
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [error, setError] = useState<string>('')
  const [uploadedImage, setUploadedImage] = useState<string>('')

  // const cameraRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null)

  const stopCamera = async () => {
    if (html5QrCodeRef.current && isCameraActive) {
      try {
        await html5QrCodeRef.current.stop()
        setIsCameraActive(false)
      } catch (err) {
        console.error('[v0] Error stopping camera:', err)
      }
    }
  }

  const startCamera = async () => {
    try {
      setError('')
      setQrResult('')

      // Check if we're in a secure context (HTTPS required for camera)
      if (!window.isSecureContext) {
        setError('Camera access requires HTTPS. Please access this site over a secure connection.')
        return
      }

      // Small delay to ensure DOM element is properly mounted
      await new Promise(resolve => setTimeout(resolve, 100))

      // Ensure the element exists before creating Html5Qrcode instance
      const element = document.getElementById('qr-reader')
      if (!element) {
        setError('Camera element not found. Please try again.')
        return
      }

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode('qr-reader')
      }

      // Request camera permission through the start method
      await html5QrCodeRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          setQrResult(decodedText)
          onScan?.(decodedText)
          await stopCamera()
        },
        (errorMessage) => {
          // Ignore scanning errors (they happen continuously while scanning)
          console.log('[v0] Scanning error:', errorMessage)
        },
      )
      setIsCameraActive(true)
    } catch (err) {
      console.error('[v0] Camera error:', err)
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Camera permission denied. To fix this:\n\n1. Click the camera icon in your browser\'s address bar\n2. Select "Allow" for camera access\n3. Refresh this page and try again')
        } else if (err.name === 'NotFoundError') {
          setError('No camera found. Please check your device.')
        } else if (err.name === 'NotReadableError') {
          setError('Camera is already in use by another application.')
        } else if (err.name === 'OverconstrainedError') {
          setError('Camera doesn\'t support the required settings.')
        } else {
          setError(`Camera error: ${err.message}`)
        }
      } else {
        setError('Unable to access camera. Please check permissions.')
      }
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError('')
    setQrResult('')

    console.log('[v0] Processing uploaded file:', file.name, file.type)

    // Show preview of uploaded image
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode('qr-reader-upload')
      }

      const decodedText = await html5QrCodeRef.current.scanFile(file, true)
      console.log('[v0] QR Code detected from image:', decodedText)
      setQrResult(decodedText)
      onScan?.(decodedText)
    } catch (err) {
      console.error('[v0] QR detection error:', err)
      setError(
        'No QR code found in the image. Please ensure the image contains a clear QR code.',
      )
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  // Stop camera when switching tabs
  useEffect(() => {
    if (activeTab === 'upload') {
      stopCamera()
    } else {
      setUploadedImage('')
    }
  }, [activeTab])

  return (
    <HyperCard className='p-2 rounded-[1.75rem]'>
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as 'camera' | 'upload')}>
        <TabsList className='rounded-[1.25rem] grid w-full grid-cols-2 h-16 bg-origin/60'>
          <TabsTrigger
            value='camera'
            className='flex items-center gap-2 h-14 rounded-2xl'>
            <Icon name='camera' className='size-4' />
            Camera
          </TabsTrigger>
          <TabsTrigger
            value='upload'
            className='flex items-center gap-2 h-14 rounded-2xl'>
            <Icon name='upload' className='size-4' />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value='camera' className='space-y-4'>
          <div className='relative aspect-square bg-muted rounded-lg overflow-hidden'>
            {!isCameraActive && !qrResult && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center space-y-4'>
                  <Icon
                    name='qrcode-scan'
                    className='size-36 mx-auto text-white'
                  />
                  <p className='text-sm text-muted-foreground'>
                    Use device camera to scan your QR code
                  </p>
                </div>
              </div>
            )}
            <div id='qr-reader' className='w-full h-full aspect-square' />
          </div>

          <div className='flex gap-2'>
            {!isCameraActive && !qrResult && (
              <SexyButton
                size='lg'
                variant='dark'
                leftIcon='camera'
                onClick={startCamera}
                className='flex-1 flex'>
                <span>Start Camera</span>
              </SexyButton>
            )}
            {isCameraActive && (
              <Button
                onClick={stopCamera}
                variant='destructive'
                className='flex-1'>
                <Icon name='close' className='mr-2 h-4 w-4' />
                Stop Camera
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value='upload' className='space-y-4'>
          <div id='qr-reader-upload' className='hidden' />

          <div className='relative aspect-square bg-origin/10 rounded-3xl overflow-hidden border-2 border-dashed border-border'>
            {uploadedImage ? (
              <img
                src={uploadedImage || '/placeholder.svg'}
                alt='Uploaded QR code'
                className='w-full h-full object-contain'
              />
            ) : (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center space-y-4'>
                  <Icon
                    name='image-upload'
                    className='size-36 mx-auto opacity-60'
                  />
                  <p className='text-sm text-muted-foreground'>
                    Upload an image containing a QR code
                  </p>
                </div>
              </div>
            )}
          </div>

          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileUpload}
            className='hidden'
          />
          <Button
            size='lg'
            className='w-full h-14 rounded-[1.25rem]'
            onClick={() => fileInputRef.current?.click()}>
            <Icon name='qr-code' className='mr-2 size-4 text-white' />
            <span className='md:text-lg text-white'>Choose Image</span>
          </Button>
        </TabsContent>
      </Tabs>

      {error && (
        <div className='mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg'>
          <p className='text-sm text-destructive'>{error}</p>
        </div>
      )}

      {qrResult && (
        <div className='mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg'>
          <div className='flex items-start gap-3'>
            <Icon
              name='check'
              className='h-5 w-5 text-primary mt-0.5 flex-shrink-0'
            />
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-foreground mb-1'>
                QR Code Detected
              </p>
              <p className='text-sm text-muted-foreground break-all'>
                {qrResult}
              </p>
            </div>
          </div>
        </div>
      )}
    </HyperCard>
  )
}
