'use client'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from '@/components/ui/cropper'
import {Slider} from '@/components/ui/slider'
import {useAuthCtx} from '@/ctx/auth'
import {Icon} from '@/lib/icons'
import {useQuery} from 'convex/react'
import NextImage from 'next/image'
import {api} from '../../../../../../convex/_generated/api'
import type {Id} from '../../../../../../convex/_generated/dataModel'

// Define type for pixel crop area
type Area = {x: number; y: number; width: number; height: number}

type GalleryItem = {
  fileId: Id<'files'>
  storageId: Id<'_storage'>
  url: string
  author: string | null
  format: string | null
}

const ORIGINAL_IMAGE_URL =
  'https://res.cloudinary.com/dx0heqhhe/image/upload/v1761941950/cosmo_cyq7jy.jpg'

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
  const {user} = useAuthCtx()
  const convexUser = useQuery(
    api.users.q.getByProId,
    user?.uid ? {proId: user.uid} : 'skip',
  )
  const galleryData = useQuery(
    api.userProfiles.q.getGallery,
    convexUser?._id ? {userId: convexUser._id} : 'skip',
  ) as GalleryItem[] | undefined

  const galleryItems = useMemo<GalleryItem[]>(
    () => (Array.isArray(galleryData) ? galleryData : []),
    [galleryData],
  )
  const [zoom, setZoom] = useState(1.4)
  const [imageSrc, setImageSrc] = useState<string | null>(defaultValue)

  // Update imageSrc when defaultValue changes
  useEffect(() => {
    setImageSrc(defaultValue)
    setCroppedImageUrl(null) // Reset cropped preview when default image changes
  }, [defaultValue])

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const [newImageLoaded, setNewImageLoaded] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<
    number | null
  >(null)

  useEffect(() => {
    if (!galleryItems.length) {
      setSelectedGalleryIndex(null)
      return
    }

    setSelectedGalleryIndex((prev) => {
      if (prev === null || prev < 0 || prev >= galleryItems.length) {
        return 0
      }
      return prev
    })
  }, [galleryItems])

  const selectedGalleryUrl = useMemo(() => {
    if (
      selectedGalleryIndex === null ||
      selectedGalleryIndex < 0 ||
      selectedGalleryIndex >= galleryItems.length
    ) {
      return null
    }

    return galleryItems[selectedGalleryIndex]?.url ?? null
  }, [galleryItems, selectedGalleryIndex])

  const defaultViewerSrc = useMemo(() => {
    if (selectedGalleryUrl) {
      return selectedGalleryUrl
    }

    if (typeof imageSrc === 'string' && imageSrc.length > 0) {
      return imageSrc
    }

    return ORIGINAL_IMAGE_URL
  }, [imageSrc, selectedGalleryUrl])

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
        setNewImageLoaded(true)
        setSelectedGalleryIndex(null)
        const url = URL.createObjectURL(file)
        setImageSrc(url)
        setCroppedImageUrl(null) // Reset cropped preview
      }
    },
    [],
  )

  // useEffect(() => {
  //   if (!defaultImage) return
  //   const url = URL.createObjectURL(defaultImage)
  //   setImageSrc(url)
  //   setCroppedImageUrl(null) // Reset cropped preview
  // }, [defaultImage])

  // const checkParams = useCallback(() => {
  //   if (fileInputRef.current) {
  //     console.log(fileInputRef.current.files)
  //     console.table({croppedAreaPixels, imageSrc, croppedImageUrl})
  //   }
  // }, [croppedAreaPixels, imageSrc, croppedImageUrl])

  // Function to handle the crop button click
  const handleCrop = useCallback(async () => {
    const sourceImage = imageSrc ?? selectedGalleryUrl ?? null

    if (!sourceImage) {
      console.error('No image selected.')
      return
    }

    let cropArea: Area | null = croppedAreaPixels

    if (!cropArea) {
      try {
        const imageElement = await createImage(sourceImage)
        cropArea = {
          x: 0,
          y: 0,
          width: imageElement.naturalWidth || imageElement.width,
          height: imageElement.naturalHeight || imageElement.height,
        }
        setCroppedAreaPixels(cropArea)
      } catch (error) {
        console.error('Failed to initialize crop area:', error)
        return
      }
    }

    if (!cropArea) {
      console.error('Unable to determine crop area.')
      return
    }

    try {
      const croppedBlob = await getCroppedImg(
        sourceImage,
        cropArea,
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
  }, [croppedAreaPixels, imageSrc, selectedGalleryUrl])

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
    <div className='flex flex-col items-center'>
      <SexyButton
        className='hidden'
        onClick={handleCrop}
        disabled={!croppedAreaPixels}
        variant='dark'>
        Crop preview
      </SexyButton>
      {newImageLoaded ? (
        <div className='h-100 md:h-110 relative flex w-full flex-col gap-4 px-4'>
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
            <output className='block w-10 shrink-0 text-greyed dark:text-foreground text-right text-sm font-medium tabular-nums'>
              {parseFloat(zoom.toFixed(1))}x
            </output>
          </div>
        </div>
      ) : (
        <div className='flex gap-8'>
          <div className='w-24 h-[360px] flex flex-col items-center py-2 space-y-4 overflow-y-scroll bg-foreground/5 rounded-3xl'>
            {/*list of portraits from the gallery*/}
            {galleryItems.map((item, index) => {
              const isSelected = index === selectedGalleryIndex

              return (
                <button
                  key={item.fileId}
                  type='button'
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedGalleryIndex(index)
                    setNewImageLoaded(false)
                  }}
                  className={`group relative w-20 h-18 flex items-center justify-center rounded-xl border-2 transition-colors duration-200 overflow-hidden ${
                    isSelected
                      ? 'border-primary-hover ring-2 ring-primary/40'
                      : 'border-transparent hover:border-primary-hover'
                  }`}>
                  <NextImage
                    src={item.url}
                    alt='Gallery portrait'
                    width={400}
                    height={500}
                    className='rounded-xl w-full h-auto aspect-auto'
                  />
                </button>
              )
            })}

            <button
              type='button'
              onClick={(e) => {
                e.preventDefault()
                fileInputRef.current?.click()
              }}
              className='w-20 h-18 group flex items-center justify-center bg-background/40 hover:bg-background border-2 border-transparent hover:border-primary-hover rounded-xl transition-colors duration-200'>
              <Icon
                name='add'
                className='opacity-40 size-6 group-hover:opacity-100 group-hover:size-7 group-hover:text-primary transition-all duration-100'
              />
            </button>
          </div>
          <NextImage
            id='default-viewer'
            src={defaultViewerSrc}
            alt='Profile Image'
            width={240}
            height={400}
            className='aspect-auto rounded-2xl'
          />
        </div>
      )}

      <div className='py-12 md:py-0 md:mt-8 relative gap-2 flex items-center justify-between w-full'>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          ref={fileInputRef}
          className='hidden'
        />

        <Icon
          id='select-image'
          onClick={(e) => {
            e.preventDefault()
            fileInputRef.current?.click()
          }}
          name='photo-add'
          className='size-10 mx-2 cursor-pointer text-greyed dark:text-foreground hover:text-background dark:hover:text-catnip rounded-xl hover:bg-greyed/80 p-1 transition-colors duration-150 ease-in-out'
        />
        <SexyButton
          name='undo'
          disabled={!croppedAreaPixels}
          variant='ghost'
          className=' dark:disabled:inset-shadow-[0_1px_rgb(100_100_100)]/10 dark:disabled:text-foreground/20 dark:disabled:shadow-none dark:disabled:hover:bg-transparent text-greyed dark:text-foreground'
          onClick={(e) => {
            e.preventDefault()
          }}>
          <Icon name='arrow-undo' className='size-6 text-' />
        </SexyButton>
        <SexyButton
          fullWidth
          name='preview'
          variant='ghost'
          className='md:px-8 text-lg text-greyed dark:text-foreground'
          onClick={(e) => {
            e.preventDefault()
            handleCrop()
          }}>
          Preview
        </SexyButton>
        <SexyButton
          name='save'
          fullWidth
          variant='ghost'
          className=' text-lg text-greyed dark:text-foreground'
          onClick={(e) => {
            e.preventDefault()
          }}>
          Save
        </SexyButton>
      </div>
    </div>
  )
}
