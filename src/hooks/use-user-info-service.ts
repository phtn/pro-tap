import {
  UserInfoSchema,
  UserInfoType,
} from '@/app/account/profile/editor/_components/user-schema'
import {UserInfoService} from '@/lib/firebase/user'
import {useEffect, useState} from 'react'

export const useUserInfoService = (uid?: string) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null)
  const [formData, setFormData] = useState<UserInfoType>({
    email: null,
    phoneNumber: null,
    address: null,
    firstName: null,
    lastName: null,
    middleName: null,
    gender: null,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  const loadUser = async () => {
    if (!uid) return

    try {
      const data = await UserInfoService.getUserByUid(uid)
      if (data) {
        setUserInfo(data)
        setFormData({
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          gender: data.gender,
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  useEffect(() => {
    if (uid) {
      loadUser()
    }
  }, [uid])

  const handleSave = async (
    initialState: UserInfoType | undefined,
    fd: FormData,
  ) => {
    if (!uid) return
    setIsSaving(true)
    setFormMessage('')

    // Extract all form data
    const formValues = {
      email: (fd.get('email') as string) || null,
      firstName: (fd.get('firstName') as string) || null,
      lastName: (fd.get('lastName') as string) || null,
      middleName: (fd.get('middleName') as string) || null,
      gender: (fd.get('gender') as string) || null,
      phoneNumber: (fd.get('phoneNumber') as string) || null,
      address: (fd.get('address') as string) || null,
    }

    const validated = UserInfoSchema.safeParse({
      ...initialState,
      ...userInfo,
      ...formValues,
    })

    console.log('[!]', JSON.stringify(validated.data, null, 2))

    if (!validated.success) {
      setFormMessage('Invalid profile data')
      setIsSaving(false)
      return validated.data
    }

    try {
      await UserInfoService.updateUserInfo(uid, validated.data)
      setFormMessage('Profile saved successfully!')
      await loadUser()
    } catch (error) {
      setFormMessage('Error saving profile: ' + (error as Error).message)
    } finally {
      setIsSaving(false)
    }

    return validated.data
  }

  const handlePublish = async () => {
    if (!uid || !userInfo) return

    setIsSaving(true)
    setFormMessage('')
  }

  return {
    userInfo,
    formData,
    isSaving,
    formMessage,
    handleSave,
    handlePublish,
  }
}
