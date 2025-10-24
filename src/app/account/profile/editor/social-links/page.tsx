'use client'

import {FieldConfig} from '@/components/experimental/form/schema'
import {useAppForm} from '@/components/experimental/form/utils'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {ImageCropper} from '@/components/image-cropper'
import {HyperList} from '@/components/list'
import {ScrollArea} from '@/components/ui/scroll-area'
import {useAuthCtx} from '@/ctx/auth'
import {useProfileService} from '@/hooks/use-profile-service'
import {useToggle} from '@/hooks/use-toggle'
import {ProfileFormData} from '@/lib/firebase/types/user'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useActionState, useCallback, useEffect, useTransition} from 'react'
import ProfileView from '../../_components/profile-preview'
import {
  profileFieldGroups,
  profileInitial,
  UserProfile,
  UserProfileSchema,
} from '../_components/profile-schema'

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
      }
    : {
        username: 'preview',
        displayName: formData.displayName,
        bio: formData.bio,
        avatar: formData.avatar,
        socialLinks: formData.socialLinks,
        theme: formData.theme,
        isPublished: formData.isPublished,
      }

  const [, action, pending] = useActionState(handleSave, profileInitial)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (profile) console.log(profile)
  }, [profile])

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      startTransition(() => {
        action(formData)
      })
    },
    [action],
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
                    name={field.name}
                    label={field.label}
                    helperText={field.helperText}
                    required={field.required}
                    options={field.options}
                    type={field.type}
                    defaultValue={
                      formData[field.name as keyof ProfileFormData] as string
                    }
                    error={invalid && errors.join(', ')}
                  />
                )

              default:
                // Text, email, number, etc.
                return (
                  <fieldApi.TextField
                    {...fieldApi}
                    name={field.name}
                    label={field.label}
                    defaultValue={
                      formData[field.name as keyof ProfileFormData] as string
                    }
                    error={invalid && errors.join(', ')}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    helperText={field.helperText}
                    placeholder={field.placeholder}
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
    <div className='h-[calc(100vh-48px)] overflow-hidden'>
      <ScrollArea className='max-w-4xl rounded-4xl md:py-8'>
        <div className='w-full h-fit bg-origin/40 px-4 py-4 md:py-8'>
          <div className='mb-2 flex items-center justify-between'>
            <h1 className='flex items-center text-base md:text-2xl font-bold tracking-tight px-2'>
              <Icon name='sign-pen' className='size-6 shrink-0 mr-1 md:mr-1' />
              <span>Profile Page</span>
            </h1>
            <SexyButton leftIcon='eye' className='' onClick={togglePreview}>
              Preview
            </SexyButton>
          </div>
          <div className='h-1 md:h-2 w-full rounded-full bg-origin/40' />

          <ImageCropper />
          <div
            className={cn(
              `border mb-3 md:mb-4 px-2 md:px-4 flex items-center w-full h-7 md:h-12 text-xs md:text-sm lg:text-base rounded-lg md:rounded-xl bg-green-100 text-green-700 tracking-tight font-figtree md:font-medium`,
              {
                'bg-red-100 dark:bg-red-400/80 dark:text-white text-red-700':
                  formMessage.includes('Error'),
                'bg-orange-100 text-orange-700':
                  formMessage.includes('Invalid'),
                'opacity-0': !formMessage,
              },
            )}>
            {formMessage}
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className='mb-4 md:mb-8'>
              {profileFieldGroups.map((group) => (
                <HyperList
                  key={group.title}
                  data={group.fields.slice(0, 1)}
                  component={renderField}
                  container='space-y-4 md:space-y-8'
                  itemStyle='px-1'
                />
              ))}
            </div>
            <div className='flex items-center justify-between w-full'>
              <div />
              <Submit />
            </div>
          </form>
        </div>
      </ScrollArea>
    </div>
  )
}

/*
<div>
              <label className='block text-sm font-medium mb-2'>
                Social Links
              </label>
              <div className='space-y-3'>
                <input
                  type='text'
                  value={formData.socialLinks?.website || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        website: e.target.value,
                      },
                    })
                  }
                  className='w-full px-4 py-2 border rounded-lg'
                  placeholder='Website URL'
                />
                <input
                  type='text'
                  value={formData.socialLinks?.twitter || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        twitter: e.target.value,
                      },
                    })
                  }
                  className='w-full px-4 py-2 border rounded-lg'
                  placeholder='Twitter username (without @)'
                />
                <input
                  type='text'
                  value={formData.socialLinks?.github || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        github: e.target.value,
                      },
                    })
                  }
                  className='w-full px-4 py-2 border rounded-lg'
                  placeholder='GitHub username'
                />
                <input
                  type='text'
                  value={formData.socialLinks?.linkedin || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        linkedin: e.target.value,
                      },
                    })
                  }
                  className='w-full px-4 py-2 border rounded-lg'
                  placeholder='LinkedIn username'
                />
              </div>
            </div>
*/
