import {useAuthCtx} from '@/ctx/auth'
import {NavbarCtxProvider} from '@/ctx/navbar'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
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
  const router = useRouter()
  const proId = usePathname().split('/').pop()

  const essentialButtons = useMemo(
    () =>
      [
        // {
        //   href: '/account',
        //   icon: 'feedline',
        //   onClick: () => {},
        // },
        {
          href: `/u/${proId}`,
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

  return (
    <nav className={cn('max-w-6xl mx-auto flex items-center h-16')}>
      {user && (
        <div className='flex items-center justify-between w-full'>
          <div className='w-full md:hidden pl-6  opacity-80'>
            <Icon name='arrow-left' className='size-5' onClick={router.back} />
          </div>
          <div
            className={cn('flex items-center space-x-5', {
              'space-x-3': user.isActivated,
            })}>
            <Link
              href={`/u/${proId}`}
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
            {extra}
            <EssentialButtons />
            <ProfileDropdown>
              <ProAvatar
                photoURL={user.photoURL}
                isActivated={user.isActivated}
                className=' hover:border-primary border-[1.5px]'
                tiny
              />
            </ProfileDropdown>
          </div>
        </div>
      )}
    </nav>
  )
}

export const UserNavbar = memo(({children}: NavProps) => {
  return (
    <NavbarCtxProvider>
      <Nav>{children}</Nav>
    </NavbarCtxProvider>
  )
})
