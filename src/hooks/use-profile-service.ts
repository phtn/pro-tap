import {
  UserProfile,
  UserProfileSchema,
} from '@/app/account/profile/editor/_components/profile-schema'
import { ProfileService } from '@/lib/firebase/profile'
import { uploadProfilePicture } from '@/lib/firebase/upload'
import { useEffect, useState } from 'react'

export const useProfileService = (uid?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<UserProfile>({
    username: null,
    displayName: null,
    bio: null,
    avatar: null,
    theme: 'auto',
    isPublished: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  const loadProfile = async () => {
    if (!uid) return

    try {
      const data = await ProfileService.getProfileByUid(uid)
      if (data) {
        setProfile(data)
        setFormData({
          username: data.username,
          displayName: data.displayName,
          bio: data.bio,
          avatar: data.photoURL,
          socialLinks: {},
          theme: data.theme,
          isPublished: data.isPublished,
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  useEffect(() => {
    if (uid) {
      loadProfile()
    }
  }, [uid])

  const handleSave = async (
    initialState: UserProfile | undefined,
    fd: FormData,
  ) => {
    if (!uid) return
    setIsSaving(true)
    setFormMessage('')

    // Extract all form data
    let avatarUrl = (fd.get('avatar') as string) || null
    const avatarFile = fd.get('avatar') as File | null
    if (avatarFile) {
      avatarUrl = await uploadProfilePicture(uid, avatarFile)
    }

    const formValues = {
      displayName: (fd.get('displayName') as string) || null,
      username: (fd.get('username') as string) || null,
      bio: (fd.get('bio') as string) || null,
      avatar: avatarUrl,
      theme: (fd.get('theme') as 'light' | 'dark' | 'auto') || 'auto',
      isPublished: (fd.get('isPublished') as string) || false,
    }

    const validated = UserProfileSchema.safeParse({
      ...initialState,
      ...profile,
      ...formValues,
    })

    console.log('[!]', JSON.stringify(validated.data, null, 2))

    if (!validated.success) {
      setFormMessage('Invalid profile data')
      setIsSaving(false)
      return validated.data
    }

    try {
      await ProfileService.updateProfile(uid, validated.data)
      setFormMessage('Profile saved successfully!')
      await loadProfile()
    } catch (error) {
      setFormMessage('Error saving profile: ' + (error as Error).message)
    } finally {
      setIsSaving(false)
    }

    return validated.data
  }

  const handlePublish = async () => {
    if (!uid || !profile) return

    setIsSaving(true)
    setFormMessage('')

    try {
      const newPublishState = !profile.isPublished
      await ProfileService.publishProfile(uid, newPublishState)
      setFormMessage(
        newPublishState ? 'Profile published!' : 'Profile unpublished',
      )
      await loadProfile()
    } catch (error) {
      setFormMessage('Error publishing profile: ' + (error as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  return {
    profile,
    formData,
    isSaving,
    formMessage,
    handleSave,
    handlePublish,
  }
}
