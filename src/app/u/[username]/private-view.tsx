'use client'

import {useCardId} from '@/hooks/use-card-id'
import {Icon} from '@/lib/icons'
import {useParams, useSearchParams} from 'next/navigation'

interface PrivateProfileViewProps {
  cardId?: string | null
}

export default function PrivateProfileView({
  cardId: propCardId,
}: PrivateProfileViewProps = {}) {
  const params = useParams()
  const searchParams = useSearchParams()
  const username = params?.username as string | undefined
  const token = searchParams.get('token')

  // Use cardId from props if provided, otherwise use username from params
  const cardId = propCardId ?? username ?? null

  const {userProfile} = useCardId(cardId, token)

  // If profile is loading, show loading state
  if (userProfile === undefined) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-muted-foreground'>Loading...</div>
      </div>
    )
  }

  // If no profile found, don't render (should be handled by parent)
  if (!userProfile) {
    return null
  }

  // Only show private view if profile is actually private
  if (userProfile.isPublic) {
    return null
  }

  return (
    <div className='min-h-screen'>
      <div className='max-w-3xl mx-auto px-4 py-12'>
        <div className='flex flex-col items-center justify-center gap-6 text-center'>
          {/* Lock Icon */}
          <div className='flex items-center justify-center mb-4'>
            <div className='p-6 rounded-full bg-muted/50 dark:bg-muted/20'>
              <Icon
                name='lock'
                size={64}
                solid={false}
                className='text-muted-foreground'
              />
            </div>
          </div>

          {/* Message */}
          <div className='space-y-2'>
            <h1 className='text-2xl md:text-3xl font-bold'>
              This profile is private
            </h1>
            <p className='text-muted-foreground text-sm md:text-base max-w-[38ch] mx-auto'>
              The owner of this profile has chosen to keep it private. You need
              permission to view this profile.
            </p>
          </div>

          {/* Optional: Show display name if available */}
          {userProfile.displayName && (
            <div className='mt-4 pt-4 border-t'>
              <p className='text-sm text-muted-foreground'>
                Profile for:{' '}
                <span className='font-medium'>{userProfile.displayName}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
