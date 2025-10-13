'use client'

import {UserProfile} from '@/lib/firebase/types/user'
import Image from 'next/image'

interface ProfileViewProps {
  profile: UserProfile
}

export default function ProfileView({profile}: ProfileViewProps) {
  return (
    <div
      className={`min-h-screen ${profile.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className='max-w-3xl mx-auto px-4 py-12'>
        {/* Avatar */}
        {profile.avatar && (
          <div className='flex justify-center mb-6'>
            <div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200'>
              <Image
                src={profile.avatar}
                alt={profile.displayName ?? 'display-name'}
                fill
                className='object-cover'
              />
            </div>
          </div>
        )}

        {/* Name & Username */}
        <div className='text-center mb-4'>
          <h1 className='text-4xl font-bold mb-2'>{profile.displayName}</h1>
          <p className='text-xl text-gray-500'>@{profile.username}</p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className='text-center mb-8 max-w-2xl mx-auto'>
            <p className='text-lg whitespace-pre-wrap'>{profile.bio}</p>
          </div>
        )}

        {/* Social Links */}
        {profile.socialLinks && Object.keys(profile.socialLinks).length > 0 && (
          <div className='flex justify-center gap-4 flex-wrap'>
            {profile.socialLinks.website && (
              <a
                href={profile.socialLinks.website}
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
            {profile.socialLinks.github && (
              <a
                href={`https://github.com/${profile.socialLinks.github}`}
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
