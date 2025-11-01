'use client'

import {TextField} from '@/components/experimental/form/fields'
import {FieldConfig} from '@/components/experimental/form/schema'
import {useAppForm} from '@/components/experimental/form/utils'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {HyperList} from '@/components/list'
import {ScrollArea} from '@/components/ui/scroll-area'
import {useAuthCtx} from '@/ctx/auth'
import {useProfileService} from '@/hooks/use-profile-service'
import {useToggle} from '@/hooks/use-toggle'
import {ProfileFormData} from '@/lib/firebase/types/user'
import {
  useUsernameService,
  type UsernameAvailability,
} from '@/lib/username/service'
import {cn} from '@/lib/utils'
import {useQuery} from 'convex/react'
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
import ProfileView from '../../_components/profile-preview'
import {SocialLinksSheet} from '../../_components/social-links-sheet'
import {FormHeader} from '../_components/form-header'
import {PortraitCropper} from '../_components/portrait-cropper'
import {
  profileFieldGroups,
  profileInitial,
  UserProfile,
  UserProfileSchema,
} from '../_components/profile-schema'
import {SubmitStatus} from '../_components/submit-status'

export default function ProfilePageEditor() {
  const {user} = useAuthCtx()

  const {profile, formData, formMessage, handleSave} = useProfileService(
    user?.uid,
  )

  const usernameService = useUsernameService()
  const [usernameDraft, setUsernameDraft] = useState(formData.username ?? '')
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
  const latestUsernameRef = useRef(usernameDraft)

  const {on: isPreview, toggle: togglePreview} = useToggle(false)

  const form = useAppForm({
    defaultValues: formData ?? profileInitial,
    validators: {
      onChange: UserProfileSchema,
    },
  })

  const [, action, pending] = useActionState(handleSave, profileInitial)
  const [isPending, startTransition] = useTransition()

  // const [currentPhoto] = useState<string | null>(null)
  const [croppedAvatar, setCroppedAvatar] = useState<File | null>(null)
  const [croppedAvatarUrl, setCroppedAvatarUrl] = useState<string | null>(null)

  const previewProfile = profile
    ? {
        ...profile,
        ...formData,
        avatar:
          croppedAvatarUrl ||
          (typeof formData.avatar === 'string' ? formData.avatar : null),
      }
    : {
        username: 'preview',
        displayName: formData.displayName,
        bio: formData.bio,
        avatar:
          croppedAvatarUrl ||
          (typeof formData.avatar === 'string' ? formData.avatar : null),
        socialLinks: formData.socialLinks,
        theme: formData.theme,
        isPublished: formData.isPublished,
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
      const originalNormalized = profile?.username
        ? usernameService.normalizeUsername(profile.username)
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
    [formatAvailabilityMessage, profile?.username, usernameService],
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
          name={field.name as keyof ProfileFormData}
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
                      formData[field.name as keyof ProfileFormData] as string
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
                          : (formData[
                              field.name as keyof ProfileFormData
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

  const userProfile = useQuery(api.userProfiles.q.getByProId, {
    proId: user?.uid ?? '',
  })

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
        <div className='rounded-none md:rounded-4xl border border-dysto/30 bg-origin dark:bg-greyed col-span-6 md:col-span-3 h-fit'>
          <ScrollArea className='w-full h-fit px-6 py-4 md:pt-8'>
            <FormHeader title='Photo Editor' icon='user-frame'></FormHeader>
            <PortraitCropper
              togglePreview={togglePreview}
              defaultValue={
                typeof profile?.avatar === 'string'
                  ? profile.avatar
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
                <div className='px-1 mb-8'>
                  <TextField
                    className=''
                    key={'username-field'}
                    {...g.fields[0]}
                    defaultValue={
                      formData[
                        g.fields[0].name as keyof ProfileFormData
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
                  container='space-y-4 md:space-y-8'
                  itemStyle='px-1'
                  disableAnimation
                />
              ))}
              <div className='flex items-center justify-center my-10'>
                <SocialLinksSheet
                  proId={user?.uid}
                  initialLinks={userProfile?.socialLinks}
                  isOpen={open}
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
                <SexyButton
                  leftIcon='eye'
                  variant='ghost'
                  className={cn(
                    'md:px-6 bg-transparent hover:bg-primary dark:hover:bg-dysto shadow-none hover:text-white text-foreground dark:inset-shadow-[0_1px_rgb(160_160_160)]/0 inset-shadow-[0_1px_rgb(160_160_160)]/0',
                  )}
                  onClick={togglePreview}>
                  <span className='font-semibold text-lg'>Preview</span>
                </SexyButton>
                <Submit />
              </div>
            </div>
          </div>
        </div>
        <div className='md:bg-terminal/90 md:dark:bg-greyed/20 rounded-3xl col-span-6 md:flex items-center justify-between w-full p-2 md:px-4 h-24 hidden'></div>
      </div>
    </form>
  )
}
