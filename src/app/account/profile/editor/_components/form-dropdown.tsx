'use client'

import {type ClassName} from '@/app/types'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {type ReactNode, useCallback, useMemo, useState} from 'react'

interface Editor {
  name: string
  email: string
  avatar: string
  subscription?: string
}

export interface MenuItem {
  label: string
  value?: string
  href?: string
  icon: IconName
  external?: boolean
  className?: ClassName
  fn?: VoidFunction
  type: 'action' | 'link' | 'divider'
}

interface EditorDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Editor
  showTopbar?: boolean
  children?: ReactNode
}
const SAMPLE_PROFILE_DATA: Editor = {
  name: 'Elon Musk',
  email: 'elon@x.com',
  avatar:
    'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg',
  subscription: 'PRO',
}
export function EditorDropdown({
  data = SAMPLE_PROFILE_DATA,
  className,
  children,
  ...props
}: EditorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentForm, setCurrentForm] = useState<
    'biodata' | 'social' | 'profile'
  >('biodata')
  const handleItemClick =
    (currentForm: 'biodata' | 'social' | 'profile') => () => {
      setCurrentForm(currentForm)
    }

  const menuItems = useMemo(
    () =>
      [
        {
          label: 'Biodata',
          icon: 'user-profile',
          type: 'action',
          fn: handleItemClick('biodata'),
        },
        {
          label: 'Social Links',
          icon: 'chat',
          type: 'action',
          fn: handleItemClick('social'),
        },
        {
          label: 'Profile',
          icon: 'settings',
          type: 'action',
          fn: handleItemClick('profile'),
        },
      ] as MenuItem[],
    [data],
  )

  const MenuItemList = useCallback(
    () => (
      <div className='space-y-1.5'>
        {menuItems.map((item) =>
          item.type === 'link' ? (
            <LinkMenuItem key={item.label} {...item} />
          ) : (
            <ActionMenuItem key={item.label} {...item} />
          ),
        )}
      </div>
    ),
    [menuItems],
  )

  return (
    <div className={cn('relative z-80', className)} {...props}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <div className='group relative p-px'>
          <DropdownMenuTrigger asChild>
            <SexyButton
              onClick={handleItemClick(currentForm)}
              rightIcon='chevron-down'
              className='capitalize'>
              {currentForm}
            </SexyButton>
          </DropdownMenuTrigger>

          {/* Bending line indicator on the right */}

          <DropdownMenuContent
            align='end'
            alignOffset={-1}
            sideOffset={6}
            className='relative z-[80] w-72 px-3 py-3.5 font-figtree font-semibold bg-white dark:bg-zinc-800/95 backdrop-blur-sm border-[0.33px] border-zinc-300 dark:border-zinc-800/60 rounded-3xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20
                    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-top-right'>
            <MenuItemList />

            {/*<DropdownMenuSeparator className='my-3 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800' />*/}

            {/*<DropdownMenuItem asChild>
              <button
                type='button'
                onClick={onSignOut}
                className='flex items-center justify-between bg-zinc-500/10 w-full h-11 hover:bg-zinc-100/80 dark:hover:bg-zinc-600/60 rounded-xl transition-all duration-200 cursor-pointer group'>
                <span className='text-sm font-medium px-2'>Sign out</span>
                <Icon name='chevron-right' className='text-foreground/60' />
              </button>
            </DropdownMenuItem>*/}
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  )
}

export const LinkMenuItem = (item: MenuItem) => {
  return (
    <DropdownMenuItem key={item.label} asChild>
      <Link
        href={item.href ?? '#'}
        className={cn(
          'flex items-center h-12 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group',
          item.className,
        )}>
        <IconLabel icon={item.icon} label={item.label} />
        <ExtraValueItem value={item.value} label={item.label} />
      </Link>
    </DropdownMenuItem>
  )
}

export const ActionMenuItem = (item: MenuItem) => {
  return (
    <DropdownMenuItem key={item.label} asChild>
      <button
        onClick={item.fn}
        className='flex w-full items-center h-12 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group'>
        <IconLabel icon={item.icon} label={item.label} />
        <ExtraValueItem value={item.value} label={item.label} />
      </button>
    </DropdownMenuItem>
  )
}

export const ActionSelectItem = (item: MenuItem) => {
  return (
    <DropdownMenuItem key={item.label} asChild>
      <button
        onClick={item.fn}
        className='flex w-full items-center h-12 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group'>
        <IconLabel icon={item.icon} label={item.label} />
        <ExtraValueItem value={item.value} label={item.label} />
      </button>
    </DropdownMenuItem>
  )
}

interface IconLabelProps {
  icon: IconName
  label: string
}

const IconLabel = ({icon, label}: IconLabelProps) => {
  return (
    <div className='flex items-center gap-5 px-1 flex-1'>
      <Icon
        name={icon}
        className='size-7 text-foreground/60 group-hover:text-foreground/50'
      />
      <span className='capitalize text-base font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight whitespace-nowrap group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors duration-50'>
        {label}
      </span>
    </div>
  )
}

interface ExtraValueProps {
  label: string
  value?: string
}
const ExtraValueItem = ({label, value}: ExtraValueProps) => {
  return (
    <div className='flex-shrink-0 ml-auto'>
      {value && (
        <span
          className={cn(
            'text-xs font-medium rounded-md py-1 px-2 tracking-tight',
            label === 'Model'
              ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10 border border-blue-500/10'
              : 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-500/10 border border-purple-500/10',
          )}>
          {value}
        </span>
      )}
    </div>
  )
}
