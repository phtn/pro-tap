import {VoidPromise} from '@/app/types'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {ProAvatar} from '@/components/ui/pro-avatar'
import TextAnimate from '@/components/ui/text-animate'
import {AuthUser} from '@/ctx/auth/types'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {tsToDate} from '@/utils/helpers'
import {DropdownMenuSeparator} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import {ReactNode, useCallback, useMemo} from 'react'
import {RowItem} from './row-items'

export interface SignInCardProps {
  user: AuthUser | null
  signOut?: VoidPromise
}

export const AuthedCard = ({user, signOut}: SignInCardProps) => {
  return (
    <div className='w-96 h-[24rem] px-3 py-3.5 font-figtree font-semibold bg-white dark:bg-zinc-900/95 backdrop-blur-sm border-[0.33px] border-zinc-300 dark:border-zinc-800/60 rounded-3xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20 overflow-hidden'>
      <div className='left-0 top-8 absolute size-full font-figtree flex flex-col space-y-12 items-center justify-start text-zinc-600 dark:text-zinc-400 z-100'>
        <div className='w-full flex items-center space-x-3 px-6 font-bold text-xl tracking-tight'>
          <Icon name='shield-checkmark' className='text-zinc-600 size-8' />
          <TextAnimate
            type='whipInUp'
            className='text-lg font-semibold font-figtree tracking-tight'>
            Hello, Successful!
          </TextAnimate>
          <span></span>
        </div>

        <div className='space-y-8 w-full px-6'>
          <Link
            href='/account/profile'
            className='flex items-center min-w-3xs space-x-4 bg-zinc-500/15 dark:bg-zinc-500/60 backdrop-blur-md pl-3 pr-6 py-3 rounded-full'>
            {user && user.photoURL && (
              <ProAvatar photoURL={user.photoURL} isActivated={false} />
            )}
            <span className='font-medium tracking-tight dark:text-zinc-300'>
              {user?.displayName}
            </span>
          </Link>
          <div className=' space-y-3'>
            <div className='w-full flex items-center px-3 hover:underline underline-offset-3 decoration-dashed decoration-[0.5px]'>
              <span className='text-xs font-semibold uppercase tracking-widest opacity-50 font-figtree'>
                Quicklinks
              </span>
            </div>
            <Link
              href='/account'
              className='w-full flex items-center space-x-3 px-3 hover:underline underline-offset-3 decoration-dashed decoration-[0.5px]'>
              <span className='tracking-tight'>Account Page</span>
              <Icon name='arrow-right' className='size-4 text-primary' />
            </Link>
          </div>
          <section className='fixed bottom-px left-0 right-[1px]  px-px flex flex-col justify-center space-y-px h-16 w-full'>
            <DropdownMenuSeparator className='relative z-20 my-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800' />
            <div className='flex items-center justify-between w-full h-16'>
              <Link
                href='/account'
                className='flex items-center justify-center w-full '>
                <button
                  type='button'
                  className='flex items-center justify-center space-x-1 w-full h-[3.75rem] bg-slate-100 dark:bg-slate-100/5 dark:hover:bg-slate-100/10 hover:bg-zinc-100/80 cursor-pointer group rounded-bl-[17px] rounded-tl-xs'>
                  {/* <Icon name="chevron-left" className="size-4" /> */}
                  {/* <Icon name="hexagon" className="text-foreground/60 size-7" /> */}
                </button>
              </Link>
              <button
                onClick={signOut}
                type='button'
                className='flex items-center justify-center space-x-4 w-full h-[3.75rem] bg-slate-100 dark:bg-slate-100/5 dark:hover:bg-slate-100/10 hover:bg-zinc-100/80 cursor-pointer group rounded-br-[17px] rounded-tr-xs'>
                <span className='text-base font-medium font-figtree tracking-tight'>
                  Sign out
                </span>
                <Icon name='sign-out' className='text-foreground/60 size-6' />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export const AuthedCardV2 = ({
  user,
  signOut,
  activateFn,
}: SignInCardProps & {activateFn: VoidFunction}) => {
  const UserActiveStatus = useCallback(() => {
    user = user as AuthUser
    return (
      <div
        className={cn(
          'flex items-center space-x-1 absolute -top-4 right-2 border rounded-full bg-foreground dark:bg-background text-white text-xs px-2.5 py-1.5 dark:border-amber-500/60',
          user?.isActivated && 'dark:border-mac-teal/60',
        )}>
        <Icon
          name={user?.isActivated ? 'badge-verified-solid' : 'alert-circle'}
          className={cn('size-3.5 text-amber-500/90 animate-caret-blink', {
            'text-mac-teal animate-none size-5': user?.isActivated,
          })}
        />
        <span>{user?.isActivated ? 'Active' : 'Inactive'}</span>
      </div>
    )
  }, [user])

  const accountStatus = useMemo(
    () =>
      ({
        status: user?.isActivated ? 'Active' : 'Inactive',
        type: user?.userType?.substring(0, 6),
        expiry: tsToDate(user?.activatedOn ?? null, 'P'),
        days: 80,
      }) as IAccountStatus,
    [user],
  )

  return (
    <div className='md:w-96 w-full h-[30rem] overflow-x-visible px-3 py-3.5 font-figtree bg-dark-origin/40 dark:bg-dark-origin backdrop-blur-sm border-[0.33px] border-zinc-300 dark:border-zinc-800/60 rounded-4xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20 overflow-hidden'>
      <div className='left-0 top-8 absolute size-full font-figtree flex flex-col space-y-6 items-center justify-start z-100'>
        <Header isAuthed={!!user} />

        <div className='space-y-5 w-full overflow-x-visible'>
          <UserProfileBadge user={user as AuthUser}>
            <UserActiveStatus />
          </UserProfileBadge>
          <div className='w-full flex justify-center overflow-x-visible'>
            <div className='h-[3px] bg-origin/60 dark:bg-origin/20 w-full rounded-full -mx-24' />
          </div>
          <RowItem title='account status'>
            <AccountStatus {...accountStatus} />
          </RowItem>
          <div className='w-full flex justify-center overflow-x-visible'>
            <div className='h-[3px] bg-origin/60 dark:bg-origin/30 w-full rounded-full -mx-24' />
          </div>
          <RowItem title='next step'>
            <SexyButton
              size='lg'
              disabled={user?.isActivated}
              variant='tertiary'
              onClick={activateFn}
              rightIcon='zap-solid'
              iconStyle='text-yellow-500'
              className='w-full flex items-center space-x-3 px-3'>
              <span className='tracking-tight px-2'>
                {user?.isActivated
                  ? 'Add Another Protap'
                  : 'Start Protap Activation'}
              </span>
            </SexyButton>
          </RowItem>
          <section className='fixed bottom-px left-0 right-[1px]  px-px flex flex-col justify-center space-y-px h-16 w-full'>
            <DropdownMenuSeparator className='relative z-20 my-px bg-gradient-to-r from-transparent via-origin/50 to-transparent dark:via-zinc-800' />
            <div className='flex items-center justify-between w-full h-16 border-t'>
              <Link
                href='/account'
                className='flex items-center justify-center w-full '>
                <button
                  type='button'
                  className='flex items-center justify-center space-x-1 w-full h-[3.75rem]  hover:bg-origin/20 dark:bg-background/40 dark:hover:bg-background/20 bg-zinc-100/80 cursor-pointer group rounded-tl-xs rounded-bl-4xl'></button>
              </Link>
              <button
                type='button'
                onClick={signOut}
                className='flex items-center justify-center space-x-4 w-full h-[3.75rem] dark:bg-background/40 dark:hover:bg-background/20 bg-zinc-100/80 hover:bg-origin/20 cursor-pointer group rounded-br-4xl rounded-tr-xs'>
                <span className='text-sm md:text-base font-medium font-figtree tracking-tight'>
                  Sign out
                </span>
                <Icon
                  name='sign-out'
                  className='text-foreground/60 size-4 md:size-6'
                />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

interface HeaderProps {
  isAuthed: boolean
}

const Header = ({isAuthed}: HeaderProps) => (
  <div className='w-full flex items-center space-x-2.5 px-6 text-base tracking-tight opacity-80'>
    <Icon name='shield-checkmark' className='size-4 md:size-5' />
    <span>{isAuthed ? 'You are currently logged in as:' : 'Sign in'}</span>
  </div>
)

interface UserProfileProps {
  user: AuthUser
  children?: ReactNode
}

const UserProfileBadge = ({user, children}: UserProfileProps) => {
  return (
    <Link
      href='/account/profile'
      className='relative border border-origin mx-6 dark:border-dark-origin flex items-center min-w-3xs space-x-4 bg-origin/40 dark:bg-zinc-500/50 backdrop-blur-md pl-2 pr-6 py-1 rounded-full'>
      {user && user.photoURL && (
        <ProAvatar
          className='size-10'
          photoURL={user.photoURL}
          isActivated={false}
        />
      )}
      <div>
        <div className='font-semibold tracking-tight dark:text-zinc-200'>
          {user?.displayName}
        </div>
        <div className='font-normal tracking-tight text-xs opacity-60'>
          {user?.email}
        </div>
      </div>
      {children}
    </Link>
  )
}

interface IAccountStatus {
  status: string | undefined
  type: 'INDIVIDUAL' | 'FLEET' | 'LIMITED-EDITION'
  expiry: string
  days: number
}

const AccountStatus = (props: IAccountStatus) => (
  <div className='rounded-2xl h-14 border border-origin bg-origin/30 px-5 flex items-center justify-between'>
    {Object.entries(props).map(([k, value], idx) => (
      <div key={k + idx} className='text-center'>
        <div className='font-medium text-sm uppercase'>{value}</div>
        <div className='text-xs capitalize opacity-60'>{k}</div>
      </div>
    ))}
  </div>
)
