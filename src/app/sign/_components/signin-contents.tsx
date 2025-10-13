import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useAuthCtx} from '@/ctx/auth'

export const SignInContent = () => {
  const {signInWithGoogle, loading} = useAuthCtx()

  return (
    <div className='fixed bottom-0 z-100 md:absolute md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/3 h-64 flex flex-col justify-center space-y-8 font-figtree'>
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

// export const SignInForm = () => {
//   const [showPassword, setShowPassword] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value)
//   }

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value)
//   }

//   const togglePasswordVisibility = useCallback(() => {
//     setShowPassword((prev) => !prev)
//   }, [])
//   return (
//     <form className='space-y-6'>
//       <FormInput
//         type='email'
//         id='email'
//         name='email'
//         value={email}
//         onInputChange={handleEmailChange}>
//         <Typewriter
//           text={['Your email address']}
//           speed={70}
//           className=' opacity-100 font-doto font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-cyan-100 dark:to-sky-300 from-cyan-800 to-sky-900 tracking-wide text-pretty'
//           waitTime={1500}
//           deleteSpeed={40}
//           cursorChar='_'
//         />
//       </FormInput>

//       <FormInput
//         type='password'
//         showPassword={showPassword}
//         toggleInputVisibility={togglePasswordVisibility}
//         id='password'
//         name='password'
//         value={password}
//         onInputChange={handlePasswordChange}>
//         <MatrixText
//           initialDelay={600}
//           text='Your strong password'
//           className='text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r dark:from-cyan-100 dark:to-sky-500 from-cyan-800 to-sky-900'
//         />
//       </FormInput>

//       <NeumorphButton
//         size='xl'
//         type='submit'
//         intent='default'
//         className='rounded-full w-full h-12 bg-gray-900 hover:bg-sky-950 text-white font-medium'>
//         <span className='tracking-tight text-lg'>Create account</span>
//       </NeumorphButton>
//     </form>
//   )
// }
// interface FormInputProps {
//   id: string
//   type: HTMLInputTypeAttribute
//   onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
//   value: string
//   name: string
//   children?: ReactNode
//   showPassword?: boolean
//   toggleInputVisibility?: VoidFunction
// }
// const FormInput = ({
//   id,
//   children,
//   name,
//   type,
//   onInputChange,
//   value,
//   showPassword = true,
//   toggleInputVisibility,
// }: FormInputProps) => {
//   return (
//     <div className='space-y-2 relative'>
//       <Label htmlFor={id}>{children}</Label>
//       <Input
//         id={id}
//         type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
//         name={name}
//         value={value}
//         onChange={onInputChange}
//         className='h-12 px-4'
//       />
//       {id === 'password' && type === 'password' && (
//         <Button
//           type='button'
//           variant='ghost'
//           onClick={toggleInputVisibility}
//           className='absolute right-0 bottom-0 text-gray-400 hover:text-gray-600 dark:hover:text-foreground hover:bg-transparent dark:hover:bg-transparent'>
//           <Icon name={showPassword ? 'eye' : 'eye-off'} className='size-5' />
//         </Button>
//       )}
//     </div>
//   )
// }

// export const SignInFooter = () => {
//   return (
//     <div className='select-none text-center'>
//       <p className='text-sm text-zinc-600 dark:text-zinc-300 space-x-3'>
//         <span>Already have an account?</span>
//         <a
//           href='#'
//           className='text-sky-500 dark:text-sky-300 hover:underline underline-offset-2 hover:text-primary-hover font-semibold tracking-tight'>
//           Sign in
//         </a>
//       </p>
//     </div>
//   )
// }
