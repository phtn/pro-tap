import {updateUserProfile, uploadProfilePicture} from '@/lib/firebase/upload'
import {Icon} from '@/lib/icons'
import getCroppedImg from '@/utils/crop'
import {User} from 'firebase/auth'
import {type FC, useCallback, useRef, useState} from 'react'
import type {Area, Point} from 'react-easy-crop'
import Cropper from 'react-easy-crop'

interface ProfilePictureUploaderProps {
  user: User
  onUpdate: (photoURL: string) => void
  onClose: () => void
}

export const ProfilePictureUploader: FC<ProfilePictureUploaderProps> = ({
  user,
  onUpdate,
  onClose,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Point>({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImageSrc(reader.result as string)
      })
      reader.readAsDataURL(file)
    }
  }

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [],
  )

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    setIsUploading(true)
    setError(null)
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
      if (!croppedImageBlob) {
        throw new Error('Could not crop image.')
      }

      const downloadURL = await uploadProfilePicture(user.uid, croppedImageBlob)
      await updateUserProfile(user.uid, {photoURL: downloadURL})

      onUpdate(downloadURL)
      onClose()
    } catch (err) {
      console.error(err)
      setError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setImageSrc(null)
    setZoom(1)
    setCrop({x: 0, y: 0})
    onClose()
  }

  const triggerFileSelect = () => fileInputRef.current?.click()

  return (
    <div className='inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm'>
      <div className='bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md m-4 border border-gray-700'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold text-center text-white mb-4'>
            Update Profile Picture
          </h2>

          <div className='relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4'>
            {imageSrc ? (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape='rect'
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={false}
                style={{
                  containerStyle: {borderRadius: '0.5rem'},
                  mediaStyle: {transition: 'none'},
                }}
              />
            ) : (
              <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                <Icon name='download' className='w-16 h-16 mb-4' />
                <button
                  onClick={triggerFileSelect}
                  className='px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors'>
                  Select Image
                </button>
              </div>
            )}
          </div>

          {imageSrc && (
            <div className='flex flex-col space-y-2 mb-4'>
              <label
                htmlFor='zoom'
                className='text-sm font-medium text-gray-400'>
                Zoom
              </label>
              <input
                id='zoom'
                type='range'
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e) => setZoom(Number(e.target.value))}
                className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500'
              />
            </div>
          )}

          {error && <p className='text-red-400 text-center mb-4'>{error}</p>}

          <div className='flex justify-between items-center space-x-4'>
            <button
              onClick={handleCancel}
              disabled={isUploading}
              className='flex-1 inline-flex justify-center items-center px-4 py-3 border border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 transition-colors'>
              <Icon name='close' className='w-5 h-5 mr-2' />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!imageSrc || isUploading}
              className='flex-1 inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
              {isUploading ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Icon name='check' className='w-5 h-5 mr-2' />
                  Save
                </>
              )}
            </button>
          </div>
        </div>

        <input
          type='file'
          ref={fileInputRef}
          onChange={onFileChange}
          accept='image/*'
          className='hidden'
        />
      </div>
    </div>
  )
}
