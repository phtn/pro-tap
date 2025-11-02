'use client'

import {TextField} from '@/components/experimental/form/fields'
import {FieldConfig} from '@/components/experimental/form/schema'
import {useAppForm} from '@/components/experimental/form/utils'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {HyperList} from '@/components/list'
import {ScrollArea} from '@/components/ui/scroll-area'
import {useAuthCtx} from '@/ctx/auth'
import {useMobile} from '@/hooks/use-mobile'
import {useToggle} from '@/hooks/use-toggle'
import {
  useUsernameService,
  type UsernameAvailability,
} from '@/lib/username/service'
import {cn} from '@/lib/utils'
import {useMutation, useQuery} from 'convex/react'
import type {ChangeEvent, MouseEvent} from 'react'
import {
  FormEvent,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import {api} from '../../../../../../convex/_generated/api'
import {
  UserProfile,
  UserProfileBasics,
  UserProfileProps,
} from '../../../../../../convex/userProfiles/d'
import ProfileView from '../../_components/profile-preview'
import {SocialLinksSheet} from '../../_components/social-links-sheet'
import {FormHeader} from '../_components/form-header'
import {PortraitCropper} from '../_components/portrait-cropper'
import {
  profileFieldGroups,
  profileInitial,
  UserProfileSchema,
} from '../_components/profile-schema'
import {SubmitStatus} from '../_components/submit-status'

export default function ProfilePageEditor() {
  const isMobile = useMobile()
  const {user} = useAuthCtx()
  //
  // const {profile, formData, formMessage, handleSave} = useProfileService(
  //   user?.uid,
  // )
  const userProfile = useQuery(api.userProfiles.q.getByProId, {
    proId: user?.uid ?? '',
  })
  const [usernameStatus, setUsernameStatus] = useState<{
    state: 'idle' | 'checking' | 'available' | 'unavailable' | 'error'
    message: string
    suggestions: string[]
  }>({
    state: 'idle',
    message: 'Check availability',
    suggestions: [],
  })
  const usernameCheckTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )
  const [usernameDraft, setUsernameDraft] = useState(
    userProfile?.username ?? '',
  )

  const latestUsernameRef = useRef(usernameDraft)

  const [formData, setFormData] = useState<UserProfileProps>(profileInitial)
  const [formMessage, setFormMessage] = useState('')

  const form = useAppForm({
    defaultValues: userProfile ?? profileInitial,
  })
  const {on: isPreview, toggle: togglePreview} = useToggle(false)

  const updateUserProfile = useMutation(api.userProfiles.m.updateBasics)

  const handleSave = useCallback(
    async (initialValues: UserProfileBasics | undefined, fd: FormData) => {
      if (!user?.uid) {
        setFormMessage('You must be signed in to update the profile.')
        return initialValues
      }

      const payload = {
        proId: user.uid,
        displayName: (fd.get('displayName') as string | null) ?? null,
        username: (fd.get('username') as string | null) ?? null,
        bio: (fd.get('bio') as string | null) ?? null,
      }

      const validationSchema = UserProfileSchema.pick({
        displayName: true,
        username: true,
        bio: true,
      })

      const validated = validationSchema.safeParse(payload)

      if (!validated.success) {
        setFormMessage('Invalid profile data')
        return initialValues
      }

      try {
        await updateUserProfile(payload)
        setFormData((previous) => ({
          ...previous,
          displayName: payload.displayName,
          username: payload.username,
          bio: payload.bio,
        }))
        setFormMessage('Profile saved successfully!')
      } catch (error) {
        console.error('Failed to update profile basics', error)
        setFormMessage('Unable to save profile. Please try again.')
      }

      return initialValues
    },
    [updateUserProfile, user?.uid],
  )

  const usernameService = useUsernameService()

  const [, action, pending] = useActionState(handleSave, profileInitial)
  const [isPending, startTransition] = useTransition()

  const [croppedAvatar, setCroppedAvatar] = useState<File | null>(null)
  const [croppedAvatarUrl, setCroppedAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (userProfile) {
      setFormData({
        ...profileInitial,
        ...userProfile,
        socialLinks: userProfile.socialLinks ?? {},
        customLinks: userProfile.customLinks ?? [],
      })
      return
    }

    setFormData((previous) => ({
      ...previous,
      proId: user?.uid ?? previous.proId ?? '',
      socialLinks: previous.socialLinks ?? {},
      customLinks: previous.customLinks ?? [],
    }))
  }, [user?.uid, userProfile])

  const resolvedAvatarUrl =
    croppedAvatarUrl ??
    (typeof formData.avatarUrl === 'string' ? formData.avatarUrl : null)

  const previewSource: UserProfileProps = userProfile
    ? {
        ...profileInitial,
        ...userProfile,
        socialLinks: userProfile.socialLinks ?? {},
        customLinks: userProfile.customLinks ?? [],
      }
    : {
        ...profileInitial,
        proId: user?.uid ?? profileInitial.proId,
      }

  const previewProfile: UserProfileProps = {
    ...previewSource,
    ...formData,
    proId: user?.uid ?? formData.proId ?? previewSource.proId,
    avatarUrl: resolvedAvatarUrl,
    socialLinks: formData.socialLinks ?? {},
    customLinks: formData.customLinks ?? [],
  }

  if (!previewProfile.username) {
    previewProfile.username = 'preview'
  }

  const handleCrop = useCallback((file: File) => {
    setCroppedAvatar(file)
    // Create blob URL for preview
    const url = URL.createObjectURL(file)
    setCroppedAvatarUrl(url)
  }, [])

  // Cleanup blob URL on unmount or when croppedAvatar changes
  useEffect(() => {
    return () => {
      if (croppedAvatarUrl) {
        URL.revokeObjectURL(croppedAvatarUrl)
      }
    }
  }, [croppedAvatarUrl])

  useEffect(() => {
    const nextValue = formData.username ?? ''
    setUsernameDraft(nextValue)
    latestUsernameRef.current = nextValue
  }, [formData.username])

  useEffect(() => {
    return () => {
      if (usernameCheckTimeout.current) {
        clearTimeout(usernameCheckTimeout.current)
      }
    }
  }, [])

  const formatAvailabilityMessage = useCallback(
    (availability: UsernameAvailability): string => {
      if (availability.available) {
        return 'Username is available.'
      }

      switch (availability.reason) {
        case 'too_short':
          return 'Username is too short.'
        case 'too_long':
          return 'Username is too long.'
        case 'invalid_format':
          return 'Username contains invalid characters.'
        case 'reserved':
          return 'Username is reserved.'
        case 'unavailable':
        default:
          return 'Username is already taken.'
      }
    },
    [],
  )

  const handleUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setUsernameDraft(value)
      latestUsernameRef.current = value

      if (usernameCheckTimeout.current) {
        clearTimeout(usernameCheckTimeout.current)
      }

      const trimmed = value.trim()
      if (!trimmed) {
        setUsernameStatus({
          state: 'idle',
          message: 'Enter a username to check availability.',
          suggestions: [],
        })
        return
      }

      const normalized = usernameService.normalizeUsername(trimmed)
      const originalNormalized = userProfile?.username
        ? usernameService.normalizeUsername(userProfile?.username)
        : null

      if (originalNormalized && normalized === originalNormalized) {
        setUsernameStatus({
          state: 'available',
          message: 'This is your current username.',
          suggestions: [],
        })
        return
      }

      setUsernameStatus({
        state: 'checking',
        message: 'Checking availability…',
        suggestions: [],
      })

      usernameCheckTimeout.current = setTimeout(async () => {
        try {
          const availability = await usernameService.checkAvailability(trimmed)

          if (latestUsernameRef.current !== value) {
            return
          }

          if (availability.available) {
            setUsernameStatus({
              state: 'available',
              message: formatAvailabilityMessage(availability),
              suggestions: [],
            })
            return
          }

          setUsernameStatus({
            state: 'unavailable',
            message: formatAvailabilityMessage(availability),
            suggestions: availability.suggestions,
          })
        } catch (error) {
          if (latestUsernameRef.current !== value) {
            return
          }

          setUsernameStatus({
            state: 'error',
            message: 'Unable to check availability. Please try again.',
            suggestions: [],
          })
        }
      }, 500)
    },
    [formatAvailabilityMessage, userProfile?.username, usernameService],
  )

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      if (croppedAvatar) {
        formData.set('avatar', croppedAvatar)
      }
      startTransition(() => {
        action(formData)
      })
    },
    [action, croppedAvatar],
  )

  const renderField = useCallback(
    (field: FieldConfig<UserProfile>) => {
      return (
        <form.AppField
          key={field.name.toString()}
          name={field.name as keyof UserProfileProps}
          validators={field.validators}>
          {(fieldApi) => {
            const errors = fieldApi.state.meta.errors
            const invalid = !fieldApi.state.meta.isValid
            const isUsernameField = field.name === 'username'
            // Determine what type of field to render
            switch (field.type) {
              case 'select':
                return (
                  <fieldApi.SelectField
                    {...fieldApi}
                    {...field}
                    options={field.options}
                    helperText={field.helperText}
                    required={field.required}
                    defaultValue={
                      formData?.[field.name as keyof UserProfileProps] as string
                    }
                    error={invalid && errors.join(', ')}
                  />
                )
              case 'file':
                // Avatar is handled by ImageCropper, skip rendering
                return null

              default:
                // Text, email, number, etc.
                return (
                  <div className='space-y-1'>
                    <fieldApi.TextField
                      {...fieldApi}
                      {...field}
                      helperText={
                        isUsernameField ? (
                          <span
                            className={cn(
                              'text-xs font-medium',
                              usernameStatus.state === 'available'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : usernameStatus.state === 'unavailable'
                                  ? 'text-red-500'
                                  : usernameStatus.state === 'error'
                                    ? 'text-red-500'
                                    : 'text-muted-foreground',
                            )}>
                            {usernameStatus.message}
                          </span>
                        ) : (
                          field.helperText
                        )
                      }
                      value={isUsernameField ? usernameDraft : undefined}
                      defaultValue={
                        isUsernameField
                          ? undefined
                          : (formData?.[
                              field.name as keyof UserProfileProps
                            ] as string)
                      }
                      error={invalid && errors.join(', ')}
                      type={field.type}
                      onChange={(event) => {
                        fieldApi.handleChange(event.target.value)
                        if (isUsernameField) {
                          handleUsernameChange(event)
                        }
                      }}
                    />
                    {isUsernameField &&
                      usernameStatus.suggestions.length > 0 && (
                        <p className='text-xs text-muted-foreground/80'>
                          Try:{' '}
                          {usernameStatus.suggestions.slice(0, 3).join(', ')}
                        </p>
                      )}
                  </div>
                )
            }
          }}
        </form.AppField>
      )
    },
    [formData, handleUsernameChange, usernameDraft, usernameStatus],
  )

  const Submit = useCallback(
    () => (
      <form.AppForm>
        <form.SubmitButton label='Save' pending={pending || isPending} />
      </form.AppForm>
    ),
    [form, pending, isPending],
  )

  const {on: open, toggle} = useToggle()
  const handleAddSocialMedia = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      toggle()
      // toggle open social media form sheet
    },
    [],
  )

  if (isPreview) {
    return (
      <div className='max-w-6xl relative'>
        <div className='absolute md:top-20 right-4 z-50 flex gap-2'>
          <SexyButton onClick={togglePreview} className=''>
            Exit Preview
          </SexyButton>
        </div>
        <ProfileView profile={previewProfile} />
      </div>
    )
  }

  return (
    <form onSubmit={handleFormSubmit} className='w-full'>
      <div className='h-fit w-full grid grid-cols-1 md:grid-cols-6 gap-0 md:gap-16 md:py-8 max-w-6xl'>
        <div className='rounded-none md:rounded-4xl border border-dysto/10 bg-dark-origin dark:bg-greyed col-span-6 md:col-span-3 h-fit'>
          <ScrollArea className='w-full h-fit px-6 py-4 md:pt-8'>
            <FormHeader title='Photo Editor' icon='user-frame'></FormHeader>
            <PortraitCropper
              togglePreview={togglePreview}
              defaultValue={
                typeof userProfile?.avatarUrl === 'string'
                  ? userProfile.avatarUrl
                  : croppedAvatarUrl
              }
              onCrop={handleCrop}
            />

            <div className='flex items-center justify-between w-full'></div>
          </ScrollArea>
        </div>
        <div className='rounded-none md:rounded-4xl border border-origin bg-white dark:bg-greyed col-span-6 md:col-span-3 h-fit'>
          <div className='mb-4 md:mb-6'>
            <ScrollArea className='w-full h-fit px-4 md:px-6 py-4 md:pt-8 md:pb-4'>
              <FormHeader title='Profile Info' icon='sign-pen'>
                <SubmitStatus status={formMessage} />
              </FormHeader>
              {profileFieldGroups.map((g) => (
                <div key={g.fields[0].name} className='px-1 mb-8'>
                  <TextField
                    className=''
                    key={'username-field'}
                    {...g.fields[0]}
                    defaultValue={
                      formData?.[
                        g.fields[0].name as keyof UserProfileProps
                      ] as string
                    }
                    helperText={
                      usernameStatus.message ? (
                        <span
                          className={cn(
                            'text-xs font-medium',
                            usernameStatus.state === 'available'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : usernameStatus.state === 'unavailable'
                                ? 'text-red-500'
                                : usernameStatus.state === 'error'
                                  ? 'text-red-500'
                                  : 'text-muted-foreground',
                          )}>
                          {usernameStatus.message}
                        </span>
                      ) : (
                        g.fields[0].helperText
                      )
                    }
                    onChange={handleUsernameChange}
                    type='text'
                  />
                </div>
              ))}
              {profileFieldGroups.map((group) => (
                <HyperList
                  key={group.title}
                  data={group.fields.slice(1, 3)}
                  keyId={'name'}
                  component={renderField}
                  container='space-y-4 md:space-y-8 pb-3'
                  itemStyle='px-1'
                  disableAnimation
                />
              ))}
              <div className='flex items-center justify-center my-8'>
                <SocialLinksSheet
                  proId={user?.uid}
                  initialLinks={userProfile?.socialLinks}
                  isOpen={open}
                  isMobile={isMobile}
                  setOpen={toggle}>
                  <SexyButton
                    size='lg'
                    variant='dark'
                    leftIcon='add'
                    onClick={handleAddSocialMedia}
                    className='w-full text-lg'>
                    Social Media Links
                  </SexyButton>
                </SocialLinksSheet>
              </div>
            </ScrollArea>
            <div className='flex items-center justify-between w-full px-4 py-2.5'>
              <div className='flex w-full' />
              <div className='flex flex-1 items-center space-x-4 w-full'>
                <Submit />
              </div>
            </div>
          </div>
        </div>
        <div className='md:bg-terminal/5 md:dark:bg-greyed/20 col-span-6 md:flex items-center justify-between w-full p-2 md:px-4 h-24'></div>
      </div>
    </form>
  )
}
