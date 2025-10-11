import {useAuthCtx} from '@/ctx/auth'
import {NavbarCtxProvider} from '@/ctx/navbar'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {memo, type ReactNode, useCallback, useId, useMemo} from 'react'
import {Button} from '../animate-ui/primitives/buttons/button'
import {ProfileDropdown} from '../kokonutui/profile-dropdown'
import {ProAvatar} from './pro-avatar'
import TextAnimate from './text-animate'

interface NavProps {
  children?: ReactNode
  extra?: ReactNode
}
interface EssentialButton {
  href: string
  icon: IconName
  onClick?: () => void
}
const Nav = ({children, extra}: NavProps) => {
  const {user} = useAuthCtx()

  const essentialButtons = useMemo(
    () =>
      [
        {
          href: '/account',
          icon: 'feedline',
          onClick: () => {},
        },
        {
          href: '/',
          icon: 'bell',
          onClick: () => {},
        },
      ] as EssentialButton[],
    [],
  )

  const EssentialButtons = useCallback(
    () => (
      <div className='flex items-center md:space-x-8 space-x-4'>
        {essentialButtons.map((button) => {
          const id = useId()
          return (
            <Link key={id} href={button.href}>
              <Button
                id={id}
                className='rounded-full size-8 aspect-square'
                onClick={button.onClick}>
                <Icon
                  name={button.icon}
                  className='md:size-7 size-6 shrink-0'
                />
              </Button>
            </Link>
          )
        })}
      </div>
    ),
    [essentialButtons],
  )

  return user ? (
    <nav
      className={cn(
        'max-w-6xl mx-auto flex items-center justify-between h-16',
      )}>
      <div
        className={cn('flex items-center space-x-5', {
          'space-x-3': user.isActivated,
        })}>
        <Link
          href='/account'
          className='hidden md:flex items-center gap-8 lg:px-0'>
          <TextAnimate
            text={`${user.displayName}`}
            type='whipInUp'
            className='tracking-tighter font-figtree font-medium text-xl md:text-3xl'
          />
        </Link>
        {children}
      </div>
      <div className='relative h-12 flex items-center justify-between space-x-2 md:space-x-6'>
        <div
          className={cn(
            'size-auto md:hidden -right-1.5 -bottom-0.5 z-100 pointer-events-none aspect-square flex items-center justify-center absolute',
            {
              'hidden ': !user.isActivated,
            },
          )}>
          <div className='absolute bg-white size-3 aspect-square rounded-full' />
          <Icon
            name='badge-verified-solid'
            className='size-[22px] text-primary-hover dark:text-primary-hover relative z-2 drop-shadow'
          />
        </div>

        {extra}
        <EssentialButtons />
        <ProfileDropdown>
          <ProAvatar
            photoURL={user.photoURL}
            className=' hover:border-primary border-[1.5px]'
            tiny
          />
        </ProfileDropdown>
      </div>
    </nav>
  ) : (
    <div
      className={cn('h-[7lvh] md:h-[12lvh] md:max-w-5xl mx-auto md:px-4 px-2')}
    />
  )
}

export const UserNavbar = memo(({children}: NavProps) => {
  return (
    <NavbarCtxProvider>
      <Nav>{children}</Nav>
    </NavbarCtxProvider>
  )
})
