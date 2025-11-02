'use client'

import {GlistenCard} from '@/app/account/profile/preview/glisten-card'
import {useEffect, useState} from 'react'
import {UserProfileProps} from '../../../../convex/userProfiles/d'

interface ProfileViewProps {
  profile: UserProfileProps
}

export default function ProfileView({profile}: ProfileViewProps) {
  const [displayAvatarUrl, setDisplayAvatarUrl] = useState<string | null>(() =>
    typeof profile.avatarUrl === 'string' ? profile.avatarUrl : null,
  )

  useEffect(() => {
    if ((profile.avatarUrl as unknown) instanceof File) {
      const objectUrl = URL.createObjectURL(
        profile.avatarUrl as unknown as Blob,
      )
      setDisplayAvatarUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }

    if (typeof profile.avatarUrl === 'string') {
      setDisplayAvatarUrl(profile.avatarUrl)
    } else if (profile.avatarUrl === null) {
      setDisplayAvatarUrl(null)
    }
  }, [profile.avatarUrl])

  return (
    <div className={`min-h-screen`}>
      <div className='max-w-3xl mx-auto px-4 py-12'>
        {/* Avatar */}
        {displayAvatarUrl && (
          <div className='flex flex-col items-center justify-center mb-6 gap-4'>
            <div className='relative h-auto aspect-auto overflow-hidden'>
              <GlistenCard
                name={profile?.displayName!}
                bio={profile?.username!}
                followers={0}
                posts={0}
                imageUrl={displayAvatarUrl}
              />
              <img
                src={displayAvatarUrl}
                alt={profile.displayName ?? 'display-name'}
                className='hidden w-full h-full object-cover'
              />
            </div>
          </div>
        )}

        {/* Social Links */}
        {profile.socialLinks && Object.keys(profile.socialLinks).length > 0 && (
          <div className='flex justify-center gap-4 flex-wrap'>
            {profile.website && (
              <a
                href={profile.website}
                target='_blank'
                rel='noopener noreferrer'
                className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
                Website
              </a>
            )}
            {profile.socialLinks.twitter && (
              <a
                href={`https://twitter.com/${profile.socialLinks.twitter}`}
                target='_blank'
                rel='noopener noreferrer'
                className='px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition'>
                Twitter
              </a>
            )}
            {profile.socialLinks.tiktok && (
              <a
                href={`https://github.com/${profile.socialLinks.tiktok}`}
                target='_blank'
                rel='noopener noreferrer'
                className='px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition'>
                GitHub
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a
                href={`https://linkedin.com/in/${profile.socialLinks.linkedin}`}
                target='_blank'
                rel='noopener noreferrer'
                className='px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition'>
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
