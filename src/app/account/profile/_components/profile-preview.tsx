'use client'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useAuthCtx} from '@/ctx/auth'
import {UserProfile} from '@/lib/firebase/types/user'
import {useMutation, useQuery} from 'convex/react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {api} from '../../../../../convex/_generated/api'
import {GlistenCard} from '../preview/glisten-card'

interface ProfileViewProps {
  profile: UserProfile
}

export default function ProfileView({profile}: ProfileViewProps) {
  const {user} = useAuthCtx()
  const [status, setStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const convexUser = useQuery(
    api.users.q.getByProId,
    user?.uid ? {proId: user.uid} : 'skip',
  )

  const convexProfile = useQuery(
    api.userProfiles.q.getByUserId,
    convexUser?._id ? {userId: convexUser._id} : 'skip',
  )

  const getUploadUrl = useMutation(api.files.upload.url)
  const updateGallery = useMutation(api.userProfiles.m.updateGallery)

  const [displayAvatarUrl, setDisplayAvatarUrl] = useState<string | null>(() =>
    typeof profile.avatar === 'string' ? profile.avatar : null,
  )

  useEffect(() => {
    if (profile.avatar instanceof File) {
      const objectUrl = URL.createObjectURL(profile.avatar)
      setDisplayAvatarUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }

    if (typeof profile.avatar === 'string') {
      setDisplayAvatarUrl(profile.avatar)
    } else if (profile.avatar === null) {
      setDisplayAvatarUrl(null)
    }
  }, [profile.avatar])

  const profileId = convexProfile?._id ?? null
  const profileOwner = (convexProfile as {proId?: string} | null)?.proId

  const canSavePhoto = useMemo(() => {
    return Boolean(
      (profile.avatar instanceof File || displayAvatarUrl) && profileId,
    )
  }, [displayAvatarUrl, profile.avatar, profileId])

  const handleSaveProfilePhoto = useCallback(async () => {
    if (!canSavePhoto || isSaving) {
      return
    }

    setIsSaving(true)
    setStatus(null)

    try {
      if (!profileId) {
        throw new Error('Profile record is not ready yet.')
      }

      let blob: Blob
      let contentType = 'image/png'

      if (profile.avatar instanceof File) {
        blob = profile.avatar
        contentType =
          (profile.avatar.type && profile.avatar.type.length > 0
            ? profile.avatar.type
            : 'image/png') ?? 'image/png'
      } else if (displayAvatarUrl) {
        const response = await fetch(displayAvatarUrl)
        if (!response.ok) {
          throw new Error('Unable to download the profile photo for saving.')
        }

        blob = await response.blob()
        contentType =
          response.headers.get('content-type') ?? blob.type ?? 'image/png'
      } else {
        throw new Error('No profile photo available to save.')
      }

      const uploadUrl = await getUploadUrl()
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': contentType,
        },
        body: blob,
      })

      if (!uploadResponse.ok) {
        throw new Error('Unable to upload the profile photo at this time.')
      }

      const {storageId} = (await uploadResponse.json()) as {
        storageId?: string
      }

      if (!storageId) {
        throw new Error('Upload did not return a storage identifier.')
      }

      const result = await updateGallery({
        id: profileId,
        storageId,
        author: user?.uid ?? profileOwner ?? 'system',
        contentType,
        setAsAvatar: true,
      } as unknown as Parameters<typeof updateGallery>[0])

      if (result && typeof result === 'object' && 'avatarUrl' in result) {
        const avatarUrl = (result as {avatarUrl?: string | null}).avatarUrl
        if (avatarUrl) {
          setDisplayAvatarUrl(avatarUrl)
        }
      }

      setStatus({
        type: 'success',
        message: 'Profile photo saved to your gallery.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to save profile photo. Please try again.',
      })
    } finally {
      setIsSaving(false)
    }
  }, [
    canSavePhoto,
    displayAvatarUrl,
    getUploadUrl,
    isSaving,
    profile.avatar,
    profileId,
    profileOwner,
    updateGallery,
    user?.uid,
  ])

  return (
    <div
      className={`min-h-screen ${profile.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-background text-gray-900'}`}>
      <div className='max-w-3xl mx-auto px-4 py-12'>
        {/* Avatar */}
        {displayAvatarUrl && (
          <div className='flex flex-col items-center justify-center mb-6 gap-4'>
            <div className='relative h-auto aspect-auto overflow-hidden'>
              <GlistenCard
                name={profile?.displayName!}
                bio={''}
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
            <div className='flex flex-col items-center gap-1'>
              <SexyButton
                size='lg'
                variant={!canSavePhoto ? 'secondary' : 'primary'}
                onClick={handleSaveProfilePhoto}
                disabled={!canSavePhoto || isSaving}
                className='px-6 text-lg'>
                {isSaving ? 'Saving…' : 'Save profile photo'}
              </SexyButton>
              {status && (
                <p
                  className={`text-sm ${
                    status.type === 'error'
                      ? 'text-red-500'
                      : 'text-emerald-500'
                  }`}>
                  {status.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Name & Username */}
        <div className='text-center mb-4 hidden'>
          <h1 className='text-4xl text-foreground tracking-tight font-space font-bold mb-2'>
            {profile.displayName}
          </h1>
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
