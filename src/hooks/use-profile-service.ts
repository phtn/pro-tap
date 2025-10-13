import {profileFormDataSchema} from '@/components/experimental/form/schema'
import {ProfileService} from '@/lib/firebase/profile'
import {ProfileFormData} from '@/lib/firebase/types/user'
import {useEffect, useState} from 'react'

export const useProfileService = (uid?: string) => {
  const [profile, setProfile] = useState<ProfileFormData | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    username: null,
    displayName: null,
    bio: null,
    avatar: null,
    theme: 'auto',
    firstName: null,
    lastName: null,
    middleName: null,
    gender: null,
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
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          gender: data.gender,
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
    initialState: ProfileFormData | undefined,
    fd: FormData,
  ) => {
    if (!uid) return
    setIsSaving(true)
    setFormMessage('')

    // Extract all form data
    const formValues = {
      displayName: (fd.get('displayName') as string) || null,
      firstName: (fd.get('firstName') as string) || null,
      lastName: (fd.get('lastName') as string) || null,
      middleName: (fd.get('middleName') as string) || null,
      gender: (fd.get('gender') as string) || null,
      username: (fd.get('username') as string) || null,
      bio: (fd.get('bio') as string) || null,
      avatar: (fd.get('avatar') as string) || null,
      theme: (fd.get('theme') as 'light' | 'dark' | 'auto') || 'auto',
      isPublished: (fd.get('isPublished') as string) || false,
    }

    const validated = profileFormDataSchema.safeParse({
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
      // console.log(JSON.stringify(validated.data, null, 2))
      // await ProfileService.updateProfile(uid, validated.data)
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
