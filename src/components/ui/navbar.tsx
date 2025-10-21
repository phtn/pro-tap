'use client'
import {NavbarCtxProvider} from '@/ctx/navbar'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {memo, type ReactNode} from 'react'

interface NavbarProps {
  children?: ReactNode
  hideOnMobile?: boolean
  label?: ReactNode
}

const Nav = ({children, hideOnMobile, label}: NavbarProps) => {
  const pathname = usePathname().split('/').pop()
  return (
    <nav
      className={cn(
        'h-[10lvh] md:h-[12lvh] flex items-center justify-between py-6 w-screen md:max-w-6xl mx-auto',
        {
          'hidden md:flex': hideOnMobile,
          'bg-foreground md:max-w-full md:px-8': pathname === 'pricing',
        },
      )}>
      <Link href='/alpha' className='flex items-center px-4 md:px-0'>
        {label ? (
          <span className='md:text-3xl tracking-tighter font-space font-light'>
            {label}
          </span>
        ) : (
          <Icon
            name='protap'
            className={cn('h-20 md:h-32 w-auto aspect-auto text-foreground', {
              'text-background': pathname === 'pricing',
            })}
          />
        )}
      </Link>
      <div>{children}</div>
    </nav>
  )
}
export const Navbar = memo(
  ({children, hideOnMobile = false, label}: NavbarProps) => {
    return (
      <NavbarCtxProvider>
        <Nav hideOnMobile={hideOnMobile} label={label}>
          {children}
        </Nav>
      </NavbarCtxProvider>
    )
  },
)
