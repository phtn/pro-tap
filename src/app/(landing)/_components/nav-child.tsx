import {getNextTheme} from '@/components/animate-ui/components/buttons/theme-toggler'
import {ThemeSelection} from '@/components/animate-ui/primitives/effects/theme-toggler'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {ProfileDropdown} from '@/components/kokonutui/profile-dropdown'
import {NeumorphButton as Button} from '@/components/ui/neumorph'
import {ProAvatar} from '@/components/ui/pro-avatar'
import {useAuthCtx} from '@/ctx/auth'
import {useNavbarCtx} from '@/ctx/navbar'
import {useMobile} from '@/hooks/use-mobile'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {useCallback} from 'react'

export const NavChild = () => {
  const {theme, setTheme} = useNavbarCtx()
  const isMobile = useMobile()
  const {user} = useAuthCtx()

  const handleThemeChange = useCallback(() => {
    setTheme(getNextTheme(theme as ThemeSelection, ['light', 'dark']))
  }, [theme])

  return (
    <div className='flex items-center px-4 md:px-0 space-x-1 md:space-x-4'>
      {user ? (
        <span className='hidden md:flex font-figtree tracking-tight text-sm opacity-80'>
          {user.displayName}
        </span>
      ) : (
        <Link href='/sign'>
          <SexyButton
            variant='ghost'
            id='activation-trigger'
            size={isMobile ? 'md' : 'lg'}
            className='rounded-full relative z-100 bg-zinc-800 hover:bg-zinc-900 md:bg-white md:hover:bg-white dark:bg-mac-gray/20 space-x-1'
            iconStyle='text-primary-hover md:text-mac-blue dark:text-mac-teal size-5'>
            <span className='md:px-4 md:text-lg text-white md:text-foreground dark:text-white'>
              Sign in
            </span>
          </SexyButton>
        </Link>
      )}
      {user ? (
        <ProfileDropdown>
          {user.isActivated ? (
            <div
              className={cn(
                'size-auto md:hidden -right-1 bottom-0 z-100 pointer-events-none aspect-square flex items-center justify-center absolute',
              )}>
              <div className='absolute bg-white size-3.5 aspect-square rounded-full' />
              <Icon
                name='badge-verified-solid'
                className='size-[22px] text-primary-hover dark:text-primary-hover relative z-2 drop-shadow'
              />
            </div>
          ) : null}
          <ProAvatar
            tiny
            photoURL={user.photoURL}
            className=' hover:border-primary border-[1.5px]'
          />
        </ProfileDropdown>
      ) : (
        <Button
          onClick={handleThemeChange}
          size='sq'
          intent='ghost'
          className='rounded-full flex items-center justify-center size-12 pt-2.5'>
          <Icon name='dark-theme' className='size-6' />
        </Button>
      )}
    </div>
  )
}
