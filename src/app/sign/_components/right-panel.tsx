import {type VoidPromise} from '@/app/types'
import {Button} from '@/components/ui/button'
import {Icon} from '@/lib/icons'
import {type IconName} from '@/lib/icons/types'
import {cn} from '@/lib/utils'
import {User} from 'firebase/auth'
import {type ReactNode} from 'react'
import {AuthedCard} from './authed-card'
import {SignInContent} from './signin-contents'

interface HeaderProps {
  title: string
  description: string
  children?: ReactNode
}
// your web presence online to match your unique style and preferences.

const Header = ({title, description, children}: HeaderProps) => {
  return (
    <div className='flex flex-col items-start justify-center w-full py-4 md:space-y-4'>
      <div className='space-y-0 md:space-y-2'>
        <h2 className='text-lg md:text-2xl dark:text-cyan-100 font-doto font-bold md:font-figtree md:font-bold text-gray-900 md:dark:text-zinc-100 md:tracking-tight'>
          {title}.
        </h2>
        <div
          className={cn(
            'text-zinc-500 dark:text-white flex-row items-center font-figtree font-light leading-5 max-w-[45ch] tracking-normal text-base space-x-2 md:flex hidden',
          )}>
          <span className='flex text-base tracking-normal font-sans text-foreground/60'>
            {children}
          </span>
        </div>
      </div>
    </div>
  )
}

export interface SocialLogin {
  id: string
  name: string
  icon: IconName
  fn: () => Promise<void>
  disabled?: boolean
}

interface SocialLoginProps {
  data: SocialLogin[]
}

const SocialLogins = ({data}: SocialLoginProps) => {
  return (
    <div className='space-y-14 md:space-y-8'>
      <div className='select-none relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t-[0.33px] border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-4 bg-white dark:bg-zinc-500 text-gray-500 dark:text-zinc-50'>
            or continue with
          </span>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {data.map(({id, fn, icon, disabled = false}) => (
          <Button
            key={id}
            onClick={fn}
            variant='outline'
            disabled={disabled}
            className='h-14 dark:bg-zinc-200 border-gray-200 dark:hover:bg-zinc-100 hover:border-gray-300 dark:text-background/80'>
            <Icon name={icon} />
          </Button>
        ))}
      </div>
    </div>
  )
}

interface RightPanelProps {
  socialLogins: SocialLogin[]
  user: User | null
  signOut?: VoidPromise
}

export const RightPanel = ({socialLogins, user, signOut}: RightPanelProps) => {
  return (
    <div className='lg:w-1/2 px-6 md:p-12 flex flex-col justify-center'>
      <div
        className={cn(
          'space-y-20 flex flex-col items-center w-full md:h-[64lvh] h-[74lvh]',
          {
            'space-y-4 md:px-10 md:pt-10 pt-3 rounded-r-3xl': user,
          },
        )}>
        <Header
          title={user ? 'Authenticated' : 'Sign in to your account'}
          description=''>
          {user ? '' : 'Personalize your web presence!'}
        </Header>
        {user ? (
          <AuthedCard user={user} signOut={signOut} />
        ) : (
          <SignInContent />
        )}
      </div>

      <div className='max-w-md mx-auto w-full space-y-6 md:space-y-10 flex-col hidden _md:flex'>
        <Header
          title={user ? "You're logged in as" : 'Create an account'}
          description={
            user
              ? ''
              : 'your web presence online to match your unique style and preferences'
          }>
          {user ? '' : 'Get your Status Upgrade!'}
        </Header>

        {/*{user ? null : <SignInForm />}*/}
        {user ? null : <SocialLogins data={socialLogins} />}
        {/*{user ? null : <SignInFooter />}*/}

        {user ? <AuthedCard user={user} signOut={signOut} /> : null}
      </div>
    </div>
  )
}
