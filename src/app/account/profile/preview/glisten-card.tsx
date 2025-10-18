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
    <div className='relative w-full md:max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-gray-200 to-gray-100'>
      {/* Glisten Image */}
      <div className='aspect-[3/4] w-full'>
        <img
          src={imageUrl ?? '/images/sega.png'}
          alt={name}
          className='h-full w-full object-cover'
        />
      </div>

      {/* Content Overlay */}
      <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent px-8 pb-8 pt-32'>
        {/* Name with Verification Badge */}
        <div className='mb-3 flex items-center gap-2'>
          <h2 className='text-4xl font-bold tracking-tight text-gray-900'>
            {name}
          </h2>
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
              <Icon name='user' className='h-6 w-6 text-gray-500' />
              <span className='text-2xl font-semibold text-gray-900'>
                {followers}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Icon name='chat' className='h-6 w-6 text-gray-500' />
              <span className='text-2xl font-semibold text-gray-900'>
                {posts}
              </span>
            </div>
          </div>

          {/* Follow Button */}
          <Button
            size='lg'
            className='rounded-full bg-white px-4 py-6 text-xl font-semibold text-gray-900 tracking-tight shadow-lg hover:bg-gray-50'>
            Connect
            <Icon name='connect' className='ml-2 size-8 text-teal-500' />
          </Button>
        </div>
      </div>
    </div>
  )
}
