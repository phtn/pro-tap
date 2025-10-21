import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useAuthCtx} from '@/ctx/auth'

export const SignInContent = () => {
  const {signInWithGoogle, loading} = useAuthCtx()

  return (
    <div className='fixed bottom-0 z-100 md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/3 md:h-80 h-64 flex flex-col justify-center space-y-8 font-figtree'>
      <SexyButton
        size='lg'
        disabled={loading}
        onClick={signInWithGoogle}
        variant='default'
        rightIcon={loading ? 'spinners-ring' : 'google'}
        iconStyle='size-8'
        className='rounded-full md:text-lg'>
        <span className='px-2'>Sign in with Google</span>
      </SexyButton>

      <SexyButton
        size='lg'
        onClick={signInWithGoogle}
        variant='default'
        leftIcon='github'
        iconStyle='size-8'
        className='hidden rounded-full md:text-lg'>
        <span className='px-2'>Github</span>
      </SexyButton>
      <SexyButton
        size='lg'
        variant='invert'
        leftIcon='facebook-solid'
        iconStyle='size-8'
        className='hidden rounded-full md:text-lg bg-primary-hover'>
        <span className='px-2'>Facebook</span>
      </SexyButton>
      <SexyButton
        size='lg'
        variant='secondary'
        leftIcon='apple'
        iconStyle='size-8'
        className='hidden rounded-full md:text-lg'>
        <span className='px-2'>Apple</span>
      </SexyButton>
    </div>
  )
}
