'use client'

import {FieldConfig} from '@/components/experimental/form/schema'
import {useAppForm} from '@/components/experimental/form/utils'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {HyperList} from '@/components/list'
import {ScrollArea} from '@/components/ui/scroll-area'
import {useAuthCtx} from '@/ctx/auth'
import {useProfileService} from '@/hooks/use-profile-service'
import {useToggle} from '@/hooks/use-toggle'
import {ProfileFormData} from '@/lib/firebase/types/user'
import {cn} from '@/lib/utils'
import {useActionState, useCallback, useState, useTransition} from 'react'
import ProfileView from '../../_components/profile-preview'
import {FormHeader, FormHeaderGap} from '../_components/form-header'
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

  const {on: isPreview, toggle: togglePreview} = useToggle(false)

  const form = useAppForm({
    defaultValues: formData ?? profileInitial,
    validators: {
      onChange: UserProfileSchema,
    },
  })

  const previewProfile = profile
    ? {
        ...profile,
        ...formData,
        avatar: typeof formData.avatar === 'string' ? formData.avatar : null,
      }
    : {
        username: 'preview',
        displayName: formData.displayName,
        bio: formData.bio,
        avatar: typeof formData.avatar === 'string' ? formData.avatar : null,
        socialLinks: formData.socialLinks,
        theme: formData.theme,
        isPublished: formData.isPublished,
      }

  const [, action, pending] = useActionState(handleSave, profileInitial)
  const [isPending, startTransition] = useTransition()

  const [currentPhoto] = useState<string | null>(null)
  const [croppedAvatar, setCroppedAvatar] = useState<File | null>(null)

  const handleCrop = useCallback((file: File) => {
    setCroppedAvatar(file)
  }, [])

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
                  <fieldApi.TextField
                    {...fieldApi}
                    {...field}
                    defaultValue={
                      formData[field.name as keyof ProfileFormData] as string
                    }
                    error={invalid && errors.join(', ')}
                    type={field.type}
                  />
                )
            }
          }}
        </form.AppField>
      )
    },
    [formData],
  )

  const Submit = useCallback(
    () => (
      <form.AppForm>
        <form.SubmitButton label='Save' pending={pending || isPending} />
      </form.AppForm>
    ),
    [form, pending, isPending],
  )

  if (isPreview) {
    return (
      <div>
        <div className='fixed top-20 right-4 z-50 flex gap-2'>
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
      <div className='h-fit w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 md:py-8 max-w-6xl'>
        <div className='rounded-4xl border border-dysto/30 bg-origin dark:bg-origin col-span-5 md:col-span-3 h-fit'>
          <ScrollArea className='w-full h-fit px-4 py-4 md:pt-8'>
            <FormHeader title='Profile Picture' icon='user'></FormHeader>
            <FormHeaderGap />
            <PortraitCropper
              togglePreview={togglePreview}
              defaultValue={currentPhoto}
              onCrop={handleCrop}
            />

            <div className='flex items-center justify-between w-full'></div>
          </ScrollArea>
        </div>
        <div className='rounded-4xl border border-origin bg-white dark:bg-origin col-span-5 md:col-span-2 h-fit'>
          <div className='mb-4 md:mb-8'>
            <ScrollArea className='w-full h-fit px-4 py-4 md:py-8'>
              <FormHeader title='Profile Info' icon='sign-pen'></FormHeader>
              <FormHeaderGap />
              <SubmitStatus status={formMessage} />
              {profileFieldGroups.map((group) => (
                <HyperList
                  key={group.title}
                  data={group.fields.slice(1, 5)}
                  component={renderField}
                  container='space-y-4 md:space-y-8'
                  itemStyle='px-1'
                />
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className='md:bg-terminal/90 md:dark:bg-greyed rounded-3xl col-span-5 md:flex items-center justify-between w-full p-2 md:px-4 h-full hidden'>
          <div className='flex w-full' />
          <div className='flex flex-1 items-center space-x-4 w-full'>
            <SexyButton
              leftIcon='eye'
              variant='ghost'
              className={cn(
                'md:px-6 bg-white/5 hover:bg-primary hover:text-white dark:text-foreground text-background dark:inset-shadow-[0_1px_rgb(160_160_160)]/0 inset-shadow-[0_1px_rgb(160_160_160)]/0',
              )}
              onClick={togglePreview}>
              <span className='font-semibold text-lg'>Preview</span>
            </SexyButton>
            <Submit />
          </div>
        </div>
      </div>
    </form>
  )
}
