'use client'

import {useCallback, useEffect, useRef, useState} from 'react'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from '@/components/ui/cropper'
import {Slider} from '@/components/ui/slider'
import {Icon} from '@/lib/icons'

// Define type for pixel crop area
type Area = {x: number; y: number; width: number; height: number}

const ORIGINAL_IMAGE_URL =
  'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-08_wneftq.jpg'

// --- Start: Copied Helper Functions ---
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // Needed for canvas Tainted check
    image.src = url
  })

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  outputWidth: number = pixelCrop.width, // Optional: specify output size
  outputHeight: number = pixelCrop.height,
): Promise<Blob | null> {
  try {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return null
    }

    // Set canvas size to desired output size
    canvas.width = outputWidth
    canvas.height = outputHeight

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputWidth, // Draw onto the output size
      outputHeight,
    )

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/jpeg') // Specify format and quality if needed
    })
  } catch (error) {
    console.error('Error in getCroppedImg:', error)
    return null
  }
}

interface ImageCropperProps {
  defaultValue: string | null
  onCrop?: (croppedImage: File) => void
  togglePreview: VoidFunction
}

export const PortraitCropper = ({
  defaultValue,
  togglePreview,
  onCrop,
}: ImageCropperProps) => {
  const [zoom, setZoom] = useState(1.4)
  const [imageSrc, setImageSrc] = useState<string | null>(defaultValue)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Callback to update crop area state
  const handleCropChange = useCallback((pixels: Area | null) => {
    setCroppedAreaPixels(pixels)
  }, [])

  // Handle file selection
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      const file = event.target.files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        setImageSrc(url)
        setCroppedImageUrl(null) // Reset cropped preview
      }
    },
    [],
  )

  // const checkParams = useCallback(() => {
  //   if (fileInputRef.current) {
  //     console.log(fileInputRef.current.files)
  //     console.table({croppedAreaPixels, imageSrc, croppedImageUrl})
  //   }
  // }, [croppedAreaPixels, imageSrc, croppedImageUrl])

  // Function to handle the crop button click
  const handleCrop = useCallback(async () => {
    if (!croppedAreaPixels || !imageSrc) {
      console.error('No crop area or image selected.')
      return
    }

    try {
      const croppedBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
      ).catch(console.error)
      if (!croppedBlob) {
        throw new Error('Failed to generate cropped image blob.')
      }

      // Create a new object URL
      const newCroppedUrl = URL.createObjectURL(croppedBlob)

      // Revoke the old URL if it exists
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl)
      }

      // Set the new URL
      setCroppedImageUrl(newCroppedUrl)

      // Create a File from the blob and call onCrop
      const croppedFile = new File([croppedBlob], 'cropped-avatar.jpg', {
        type: 'image/jpeg',
      })
      onCrop?.(croppedFile)
      togglePreview()
    } catch (error) {
      console.error('Error during cropping:', error)
      // Optionally: Clear the old image URL on error
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl)
      }
      setCroppedImageUrl(null)
    }
  }, [croppedAreaPixels, imageSrc])

  // Effect for cleaning up the object URLs
  useEffect(() => {
    // const currentCroppedUrl = croppedImageUrl
    // const currentImageSrc = imageSrc
    // return () => {
    //   if (currentCroppedUrl && currentCroppedUrl.startsWith('blob:')) {
    //     URL.revokeObjectURL(currentCroppedUrl)
    //   }
    //   if (currentImageSrc && currentImageSrc.startsWith('blob:')) {
    //     URL.revokeObjectURL(currentImageSrc)
    //   }
    // }

    // This is the cleanup function that runs when the component unmounts
    // or when croppedImageUrl changes before the next effect runs.
    const currentUrl = croppedImageUrl
    return () => {
      if (currentUrl && currentUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentUrl)
        console.log('Revoked URL:', currentUrl) // Optional: for debugging
      }
    }
  }, [croppedImageUrl, imageSrc])

  return (
    <div className='flex flex-col items-center gap-4'>
      <SexyButton
        onClick={handleCrop}
        disabled={!croppedAreaPixels}
        className='hidden'
        variant='dark'>
        Crop preview
      </SexyButton>
      <div className='h-100 md:h-110 relative flex w-full flex-col gap-4'>
        <Cropper
          aspectRatio={4 / 5}
          className='border-2 border-dysto/30 rounded-xl h-full bg-greyed py-0'
          image={imageSrc ?? ORIGINAL_IMAGE_URL}
          zoom={zoom}
          onCropChange={handleCropChange}
          onZoomChange={setZoom}>
          <CropperDescription />
          <CropperImage className='rounded-md' />
          <CropperCropArea className='h-full border-teal-100/80 dark:border-origin rounded-md' />
        </Cropper>
        <div className='mx-auto flex w-full max-w-80 items-center gap-1'>
          <Slider
            max={3}
            min={0.6}
            step={0.1}
            value={[zoom]}
            defaultValue={[1.2]}
            onValueChange={(value) => setZoom(value[0])}
            aria-label='Zoom slider'
            className=''
          />
          <output className='block w-10 shrink-0 text-right text-sm font-medium tabular-nums'>
            {parseFloat(zoom.toFixed(1))}x
          </output>
        </div>
      </div>

      <div className='py-4 relative flex items-center justify-between w-full'>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          ref={fileInputRef}
          className='hidden'
        />

        <Icon
          onClick={(e) => {
            e.preventDefault()
            fileInputRef.current?.click()
          }}
          name='photo-add'
          className='size-8 mx-2'
        />
        <SexyButton
          fullWidth
          className='md:px-8'
          onClick={(e) => {
            e.preventDefault()
          }}>
          Crop
        </SexyButton>
        <SexyButton
          fullWidth
          variant='dark'
          className='md:px-8'
          onClick={(e) => {
            e.preventDefault()
            handleCrop()
          }}>
          Preview
        </SexyButton>
        <SexyButton
          fullWidth
          variant='secondary'
          className=''
          onClick={(e) => {
            e.preventDefault()
          }}>
          Save
        </SexyButton>
      </div>
    </div>
  )
}
