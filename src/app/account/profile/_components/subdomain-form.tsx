'use client'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {useActionState, useState} from 'react'
// import {
//   EmojiPicker,
//   EmojiPickerContent,
//   EmojiPickerSearch,
//   EmojiPickerFooter
// } from '@/components/ui/emoji-picker';
import {createSubdomainAction} from '@/app/account/profile/actions'
import {rootDomain} from '@/lib/utils'

type CreateState = {
  error?: string
  success?: boolean
  subdomain?: string
  icon?: string
}

function SubdomainInput({defaultValue}: {defaultValue?: string}) {
  return (
    <div className='space-y-2'>
      <Label htmlFor='subdomain'>Subdomain</Label>
      <div className='flex items-center'>
        <div className='relative flex-1'>
          <Input
            id='subdomain'
            name='subdomain'
            placeholder='your-subdomain'
            defaultValue={defaultValue}
            className='w-full rounded-r-none focus:z-10'
            required
          />
        </div>
        <span className='bg-gray-100 px-3 border border-l-0 border-input rounded-r-md text-gray-500 min-h-[36px] flex items-center'>
          .{rootDomain}
        </span>
      </div>
    </div>
  )
}

function IconPicker({
  icon,
  setIcon,
  defaultValue,
}: {
  icon: string
  setIcon: (icon: string) => void
  defaultValue?: string
}) {
  return (
    <div className='space-y-2'>
      <Label htmlFor='icon'>Icon</Label>
      <div className='flex flex-col gap-2'>
        <input type='hidden' name='icon' value={icon} required />
        <div className='flex items-center gap-2'></div>
        <p className='text-xs text-gray-500'>Select theme</p>
      </div>
    </div>
  )
}

export function SubdomainForm() {
  const [icon, setIcon] = useState('')

  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createSubdomainAction,
    {},
  )

  return (
    <form action={action} className='space-y-4'>
      <SubdomainInput defaultValue={state?.subdomain} />

      <IconPicker icon={icon} setIcon={setIcon} defaultValue={state?.icon} />

      {state?.error && (
        <div className='text-sm text-red-500'>{state.error}</div>
      )}

      <Button type='submit' className='w-full' disabled={isPending || !icon}>
        {isPending ? 'Creating...' : 'Create Subdomain'}
      </Button>
    </form>
  )
}
