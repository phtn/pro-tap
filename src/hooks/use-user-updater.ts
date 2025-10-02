import {onError, onSuccess} from '@/ctx/toast'
import {updateUserProfile} from '@/lib/firebase/upload'
import {useCallback, useState} from 'react'

// This is a MOCK user hook.
// In a real app, this would use `onAuthStateChanged` from Firebase Auth.

// const initialUser: User = {
//   uid: 'mock-user-123',
//   displayName: 'Alex Doe',
//   email: 'alex.doe@example.com',
//   photoURL: 'https://picsum.photos/seed/mock-user-123/400',
// };

export const useUserUpdater = (uid: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(false)

  const updateProfilePhoto = useCallback(async (photoURL: string) => {
    setLoading(true)
    if (!uid) {
      setLoading(false)
      return
    }
    await updateUserProfile(uid, {photoURL})
      .then(() => {
        setLoading(false)
        onSuccess('Profile photo updated successfully')
      })
      .catch((error) => {
        setLoading(false)
        onError(error.message)
      })
  }, [])

  return {loading, updateProfilePhoto}
}
