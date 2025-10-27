import {Button} from '@/components/ui/button'
import {Icon} from '@/lib/icons'

interface GlistenCardProps {
  name: string
  bio: string
  followers: number
  posts: number
  imageUrl: string | null
  isVerified?: boolean
}

export function GlistenCard({
  name,
  bio,
  followers,
  posts,
  imageUrl,
  isVerified = false,
}: GlistenCardProps) {
  return (
    <div className='mt-4 relative w-full md:max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-gray-200 to-gray-100'>
      {/* Glisten Image */}
      <div className='aspect-[4/5] w-full'>
        <img
          src={imageUrl ?? '/images/sega.png'}
          alt={name}
          className='h-full w-full object-cover'
        />
      </div>

      {/* Content Overlay */}
      <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent px-8 pb-8 pt-32'>
        {/* Name with Verification Badge */}
        <div className='mb-1 flex items-center gap-2'>
          <h2 className='text-3xl font-semibold tracking-tighter'>{name}</h2>
          {isVerified && (
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-6 w-6 text-white'>
                <polyline points='20 6 9 17 4 12' />
              </svg>
            </div>
          )}
        </div>

        {/* Bio */}
        <p className='mb-6 text-xl leading-relaxed text-gray-900'>{bio}</p>

        {/* Stats and Follow Button */}
        <div className='flex items-center justify-between'>
          {/* Stats */}
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
              <Icon name='eye' className='h-6 w-6 text-gray-500' />
              <span className='text-lg tracking-tighter font-space font-medium'>
                {followers + 145}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Icon name='thumbs-up' className='h-6 w-6 text-gray-500' />
              <span className='text-lg tracking-tighter font-space font-medium'>
                {posts + 36}
              </span>
            </div>
          </div>

          {/* Follow Button */}
          <Button
            variant='ghost'
            className='bg-transparent shadow-none px-4 py-6 text-lg font-medium font-space tracking-tight hover:bg-gray-50'>
            <span>follow</span>
            <Icon name='add' className='size-5 text-gray-500' />
          </Button>
        </div>
      </div>
    </div>
  )
}
