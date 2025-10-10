'use client'

import type React from 'react'

import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Icon} from '@/lib/icons'
import {Html5Qrcode} from 'html5-qrcode'
import {useEffect, useRef, useState} from 'react'

export function QRCodeReader() {
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

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode('qr-reader')
      }

      await html5QrCodeRef.current.start(
        {facingMode: 'environment'},
        {
          fps: 10,
          qrbox: {width: 250, height: 250},
        },
        async (decodedText) => {
          setQrResult(decodedText)
          await stopCamera()
        },
        (errorMessage) => {
          // Ignore scanning errors (they happen continuously while scanning)
        },
      )
      setIsCameraActive(true)
    } catch (err) {
      setError('Unable to access camera. Please check permissions.')
      console.error('[v0] Camera error:', err)
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
    <Card>
      <CardHeader>
        <CardTitle>Scan QR Code</CardTitle>
        <CardDescription>Choose a method to read your QR code</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'camera' | 'upload')}>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='camera' className='flex items-center gap-2'>
              <Icon name='camera' className='h-4 w-4' />
              Camera
            </TabsTrigger>
            <TabsTrigger value='upload' className='flex items-center gap-2'>
              <Icon name='upload' className='h-4 w-4' />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value='camera' className='space-y-4'>
            <div className='relative aspect-video bg-muted rounded-lg overflow-hidden'>
              {!isCameraActive && !qrResult && (
                <div className='absolute inset-0 flex items-center justify-center z-10'>
                  <div className='text-center space-y-4'>
                    <Icon
                      name='camera'
                      className='h-16 w-16 mx-auto text-muted-foreground'
                    />
                    <p className='text-sm text-muted-foreground'>
                      Click the button below to start scanning
                    </p>
                  </div>
                </div>
              )}
              <div id='qr-reader' className='w-full' />
            </div>

            <div className='flex gap-2'>
              {!isCameraActive && !qrResult && (
                <Button onClick={startCamera} className='flex-1'>
                  <Icon name='camera' className='mr-2 h-4 w-4' />
                  Start Camera
                </Button>
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

            <div className='relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-dashed border-border'>
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
                      name='upload'
                      className='h-16 w-16 mx-auto text-muted-foreground'
                    />
                    <p className='text-sm text-muted-foreground'>
                      Upload an image containing a QR code
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileUpload}
              className='hidden'
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className='w-full'>
              <Icon name='upload' className='mr-2 h-4 w-4' />
              Choose Image
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
      </CardContent>
    </Card>
  )
}
