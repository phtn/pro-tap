import {useMemo} from 'react'

type LegacyProfileForm = {
  username: string | null
  displayName: string | null
  bio: string | null
  avatarUrl: string | null
  socialLinks: Record<string, string>
  theme: 'light' | 'dark' | 'auto'
  isPublished: boolean
}

const defaultProfile: LegacyProfileForm = {
  username: null,
  displayName: null,
  bio: null,
  avatarUrl: null,
  socialLinks: {},
  theme: 'auto',
  isPublished: false,
}

export const useProfileService = (_uid?: string) => {
  const memoizedDefault = useMemo(() => defaultProfile, [])

  const noop = async () => memoizedDefault

  return {
    profile: null,
    formData: memoizedDefault,
    isSaving: false,
    formMessage: 'This legacy profile service is deprecated.',
    handleSave: noop,
    handlePublish: async () => {
      /* noop */
    },
  }
}
