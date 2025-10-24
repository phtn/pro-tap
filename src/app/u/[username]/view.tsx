'use client'

import {PublicProfile} from '@/lib/firebase/public/u'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  profile: PublicProfile | null
}
export default function ProfileView({profile}: Props) {
  return (
    profile && (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 py-12'>
          {/* Header */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-6'>
            <div className='flex items-start gap-6'>
              {profile.displayName && (
                <Image
                  src={'/images/streamer.png'}
                  alt={profile.displayName}
                  width={120}
                  height={120}
                  className='rounded-full'
                />
              )}

              <div className='flex-1'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  {profile.displayName}
                </h1>
                <p className='text-gray-600 mb-4'>@{profile.email}</p>

                {profile.id && (
                  <p className='text-gray-700 mb-6'>{profile.id}</p>
                )}

                {/* Contact Links */}
                <div className='flex flex-wrap gap-4'>
                  {profile.email && (
                    <Link
                      href={`mailto:${profile.email}`}
                      className='text-blue-600 hover:text-blue-700'>
                      Email
                    </Link>
                  )}
                  {profile.id && (
                    <Link
                      href={`tel:${profile.id}`}
                      className='text-blue-600 hover:text-blue-700'>
                      Phone
                    </Link>
                  )}
                  {profile.displayName && (
                    <Link
                      href={profile.displayName}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:text-blue-700'>
                      Website
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          {/*{Object.keys(profile.displayName).length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-xl font-semibold mb-4">Connect</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(profile.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <Link
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Link>
                );
              })}
            </div>
          </div>
        )}*/}

          {/* Analytics (Owner Only) */}
          {/*{isOwner && analytics && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {analytics.overview.totalScans}
                </div>
                <div className="text-sm text-gray-600">Card Scans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {analytics.overview.totalViews}
                </div>
                <div className="text-sm text-gray-600">Profile Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {analytics.overview.uniqueVisitors}
                </div>
                <div className="text-sm text-gray-600">Unique Visitors</div>
              </div>
            </div>
          </div>
        )}*/}
        </div>
      </div>
    )
  )
}
