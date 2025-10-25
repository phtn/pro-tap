'use client'

import { FieldConfig } from '@/components/experimental/form/schema'
import { useAppForm } from '@/components/experimental/form/utils'
import { HyperList } from '@/components/list'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuthCtx } from '@/ctx/auth'
import { useUserInfoService } from '@/hooks/use-user-info-service'
import { cn } from '@/lib/utils'
import { useActionState, useCallback, useEffect, useState, useTransition } from 'react'
import { FormHeader, FormHeaderGap } from '../_components/form-header'
import {
  fieldGroups,
  userInfoInitial,
  UserInfoSchema,
  UserInfoType,
} from '../_components/user-schema'

export default function BioDataPage() {
  const { user } = useAuthCtx()

  const { userInfo, formData, formMessage, handleSave } = useUserInfoService(
    user?.uid,
  )

  const form = useAppForm({
    defaultValues: formData ?? userInfoInitial,
    validators: {
      onChange: UserInfoSchema,
    },
  })

  const userData = {
    ...userInfo,
    ...formData,
  }

  // Listen to form state changes
  useEffect(() => {
    const updateFormState = () => {
      const errors = form.state.errors
      const errorCount = Object.keys(errors).length
      setFormErrors(errorCount)
      setIsDirty(form.state.isDirty)
      setIsValid(form.state.isValid)
    }

    updateFormState()

    // Subscribe to form state changes
    const unsubscribe = form.baseStore.subscribe((state: unknown) => {
      updateFormState()
    })

    return unsubscribe
  }, [form])

  const [formErrors, setFormErrors] = useState<number>(0)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(true)

  const [, action, pending] = useActionState(handleSave, userData)
  const [isPending, startTransition] = useTransition()

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
    (field: FieldConfig<UserInfoType>) => {
      return (
        <form.AppField
          key={field.name.toString()}
          name={field.name as keyof UserInfoType}
          validators={field.validators}>
          {(fieldApi) => {
            const errors = fieldApi.state.meta.errors
            const invalid = !fieldApi.state.meta.isValid
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
                      formData[field.name as keyof UserInfoType] ?? undefined
                    }
                    error={invalid && errors.join(', ')}
                  />
                )

              default:
                return (
                  <fieldApi.TextField
                    {...fieldApi}
                    name={field.name}
                    label={field.label}
                    defaultValue={
                      formData[field.name as keyof UserInfoType] ?? undefined
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
        <form.SubmitButton
          label='Save Changes'
          pending={pending || isPending}
          className='text-white dark:bg-primary hover:bg-primary hover:text-white inset-shadow-[0_1px_rgb(237_237_237)]/0'
        />
      </form.AppForm>
    ),
    [form, pending, isPending],
  )

  return (
    <form onSubmit={handleFormSubmit} className='w-full'>
      <div className='h-fit w-full grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 md:py-8 max-w-6xl'>
        <div className='rounded-4xl border border-origin bg-white dark:bg-origin col-span-1 md:col-span-3 h-fit'>
          <ScrollArea className='w-full h-fit px-4 py-4 md:py-8'>
            <FormHeader title='Personal Info' icon='user' />
            <FormHeaderGap />

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

            <div className='mb-4 md:mb-8'>
              {fieldGroups.map((group) => (
                <HyperList
                  key={group.title}
                  data={group.fields.slice(0, 4)}
                  component={renderField}
                  container='space-y-4 md:space-y-8'
                  itemStyle='px-1'
                />
              ))}
            </div>
            <div className='md:hidden flex items-center justify-between w-full'>
              <div />
              <Submit />
            </div>
          </ScrollArea>
        </div>
        <div className='rounded-4xl bg-white border border-origin dark:bg-origin col-span-1 md:col-span-2 h-full'>
          <div className='mb-4 md:mb-8'>
            <ScrollArea className='w-full px-4 py-4 md:py-8'>
              <FormHeader title='Contact Info' icon='phone' />
              <FormHeaderGap className='mb-12' />
              {fieldGroups.map((group) => (
                <HyperList
                  key={group.title}
                  data={group.fields.slice(4)}
                  component={renderField}
                  container='space-y-4 md:space-y-14'
                  itemStyle='px-1'
                />
              ))}
            </ScrollArea>
            <div className='md:hidden flex items-center justify-between w-full px-4'>
              <div />
              <Submit />
            </div>
          </div>
        </div>
        <div className='p-2 md:bg-foreground rounded-3xl col-span-5 flex items-center justify-between w-full px-4 md:px-2 h-full'>
          <div className='px-4 text-white'>
            <div>Errors: {formErrors}</div>
            <div>Dirty: {isDirty ? 'Yes' : 'No'}</div>
            <div>Valid: {isValid ? 'Yes' : 'No'}</div>
          </div>
          <Submit />
        </div>
      </div>
    </form>
  )
}
