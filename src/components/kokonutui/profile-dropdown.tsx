'use client'

import {type ClassName} from '@/app/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useAuthCtx} from '@/ctx/auth'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useQuery} from 'convex/react'
import {useTheme} from 'next-themes'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {memo, type ReactNode, useCallback, useMemo, useState} from 'react'
import {api} from '../../../convex/_generated/api'
import {getNextTheme} from '../animate-ui/components/buttons/theme-toggler'
import {ThemeSelection} from '../animate-ui/primitives/effects/theme-toggler'

interface Profile {
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
  disabled?: boolean
}

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Profile
  showTopbar?: boolean
  children?: ReactNode
}
const SAMPLE_PROFILE_DATA: Profile = {
  name: 'Elon Musk',
  email: 'elon@x.com',
  avatar:
    'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg',
  subscription: 'PRO',
}
export function ProfileDropdown({
  data = SAMPLE_PROFILE_DATA,
  className,
  children,
  ...props
}: ProfileDropdownProps) {
  const {theme, setTheme} = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const {onSignOut, user} = useAuthCtx()
  const pathname = usePathname()
  const inProfile = useMemo(
    () => pathname.split('/').pop() === 'profile',
    [pathname],
  )

  const userProfile = useQuery(api.userProfiles.q.getByProId, {
    proId: user?.uid ?? '',
  })

  const isUserActivated = useMemo(
    () => userProfile && userProfile.cardId && inProfile,
    [userProfile, inProfile],
  )

  const isDark = useMemo(() => theme === 'dark', [theme])

  const toggler = useCallback(() => {
    setTheme(getNextTheme(theme as ThemeSelection, ['dark', 'light']))
  }, [theme, setTheme])

  const menuItems = useMemo(
    () =>
      [
        {
          label: isUserActivated ? 'My Profile Page' : 'Account',
          href: isUserActivated
            ? `/u/${userProfile?.username ?? userProfile?.cardId}`
            : '/account/profile',
          icon: user?.role === 'user' ? 'user-profile' : 'crown',
          type: 'link',
          disabled: false,
        },
        // {
        //   label: 'Chats',
        //   value: data.subscription,
        //   href: '#',
        //   icon: 'chat',
        //   type: 'link',
        //   disabled: false,
        // },
        // {
        //   label: 'Affiliate',
        //   href: '#',
        //   icon: 'play',
        //   type: 'link',
        //   disabled: false,
        // },
        // {
        //   label: 'Settings',
        //   href: '/account/settings',
        //   icon: 'settings',
        //   type: 'link',
        //   disabled: false,
        // },
        {
          label: isDark ? 'Light mode' : 'Dark mode',
          href: '#',
          icon: 'dark-theme',
          external: true,
          type: 'action',
          fn: toggler,
          disabled: false,
        },
        {
          label: `Admin - ${user?.role}`,
          href: '/admin',
          icon: 'pawn',
          external: true,
          type: 'link',
          className:
            'bg-gradient-to-r from-orange-100 via-indigo-100 to-indigo-200 dark:from-orange-100/30 dark:via-indigo-200/50 dark:to-indigo-300/40',
          disabled: user?.role === 'user',
        },
      ] as MenuItem[],
    [data, isDark, user?.role, inProfile],
  )

  const MenuItemList = memo(({menuItems}: {menuItems: MenuItem[]}) => (
    <div className='space-y-2'>
      {menuItems
        .filter((item) => !item.disabled)
        .map((item) =>
          item.type === 'link' ? (
            <LinkMenuItem key={item.label} {...item} />
          ) : (
            <ActionMenuItem key={item.label} {...item} />
          ),
        )}
    </div>
  ))

  return (
    <div className={cn('relative z-80', className)} {...props}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <div className='group relative p-px'>
          <DropdownMenuTrigger asChild>
            <button
              type='button'
              className='rounded-full outline-0 cursor-pointer'
              // className="flex items-center gap-16 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 hover:shadow-sm transition-all duration-200 focus:outline-none"
            >
              {children}
            </button>
          </DropdownMenuTrigger>

          {/* Bending line indicator on the right */}

          <DropdownMenuContent
            align='end'
            alignOffset={-1}
            sideOffset={6}
            className='relative z-[80] w-72 px-3 py-3.5 font-figtree font-semibold bg-white dark:bg-zinc-800/95 backdrop-blur-sm border-[0.33px] border-zinc-300 dark:border-zinc-800/60 rounded-3xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20
                    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-top-right'>
            <MenuItemList menuItems={menuItems} />

            <DropdownMenuSeparator className='my-3 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800' />

            <DropdownMenuItem asChild>
              <button
                type='button'
                onClick={onSignOut}
                className='flex items-center justify-between bg-zinc-500/10 w-full h-11 hover:bg-zinc-100/80 dark:hover:bg-zinc-600/60 rounded-xl transition-all duration-200 cursor-pointer group'>
                <span className='text-sm font-medium px-2'>Sign out</span>
                <Icon name='sign-out' className='text-foreground/60 mr-2' />
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  )
}

export const LinkMenuItem = memo((item: MenuItem) => {
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
})

export const ActionMenuItem = memo((item: MenuItem) => {
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
})

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

const IconLabel = memo(({icon, label}: IconLabelProps) => {
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
})

interface ExtraValueProps {
  label: string
  value?: string
}
const ExtraValueItem = memo(({label, value}: ExtraValueProps) => {
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
})
