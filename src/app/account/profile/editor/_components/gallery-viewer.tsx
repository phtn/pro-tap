import NextImage from 'next/image'
import type {Id} from '../../../../../../convex/_generated/dataModel'

export type GalleryItem = {
  fileId: Id<'files'>
  storageId: Id<'_storage'>
  url: string
  author: string | null
  format: string | null
}

interface Props {
  galleryItems: GalleryItem[]
  selectedGalleryIndex: number | null
  onThumbnailSelect: (index: number) => void
  setNewImageLoaded: (loaded: boolean) => void
  defaultSrc: string
}

export const GalleryViewer = ({
  galleryItems,
  selectedGalleryIndex = 0,
  onThumbnailSelect,
  setNewImageLoaded,
  defaultSrc,
}: Props) => {
  return (
    <div className='flex items-start gap-3 md:gap-4 lg:gap-6'>
      {/* Thumbnails sidebar */}
      <div className='w-16 md:w-20 lg:w-24 flex-shrink-0 max-h-[80vh] md:max-h-[360px] flex flex-col items-center px-2 md:px-3 py-3 space-y-3 md:space-y-4 overflow-y-scroll bg-foreground/5 rounded-3xl'>
        {/*list of portraits from the gallery*/}
        {galleryItems.map((item, index) => {
          const isSelected = index === selectedGalleryIndex

          return (
            <button
              key={item.fileId}
              type='button'
              onClick={(e) => {
                e.preventDefault()
                onThumbnailSelect(index)
              }}
              className={`group relative w-full h-full shrink-0 aspect-[4/5] flex items-center justify-center rounded-xl border-2 transition-colors duration-200 overflow-hidden ${
                isSelected
                  ? 'border-primary-hover ring-2 ring-primary/40'
                  : 'border-transparent hover:border-primary-hover'
              }`}>
              <NextImage
                src={item.url}
                alt='Gallery portrait'
                width={400}
                height={500}
                className='rounded-xl w-full h-full object-cover'
              />
            </button>
          )
        })}
      </div>

      {/* Main image viewer */}
      <div className='flex-1 flex items-center justify-center min-w-0'>
        <NextImage
          id='default-viewer'
          src={defaultSrc}
          alt='Profile Image'
          width={320}
          height={400}
          className='aspect-[4/5] w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl object-cover'
        />
      </div>
    </div>
  )
}
