// 'use client'

// import {useActivation} from '@/hooks/use-activation'
// import {useTokenValidation} from '@/hooks/use-token-validation'
// import {useRouter, useSearchParams} from 'next/navigation'
// import {useEffect} from 'react'
// import ActivationFormComponent from './form'

// export default function ActivatePage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const token = searchParams.get('token') ?? ''
//   const cardId = searchParams.get('card') ?? ''

//   // Token validation hook
//   const {
//     isValid: tokenIsValid,
//     isLoading: tokenIsLoading,
//     error: tokenError,
//     info: tokenInfo,
//     getErrorMessage,
//   } = useTokenValidation(token, true)

//   // Activation hook
//   const {isSubmitting, activationError, activate, clearErrors} = useActivation(
//     token,
//     cardId,
//   )

//   // Redirect if no token or card
//   useEffect(() => {
//     if (!token || !cardId) {
//       router.push('/error?message=Invalid activation link')
//     }
//   }, [token, cardId, router])

//   // Handle activation
//   const handleActivate = async (formData: {
//     username: string
//     displayName: string
//     acceptTerms: boolean
//   }) => {
//     const result = await activate(formData)

//     if (result.success && result.profileUrl) {
//       router.push(result.profileUrl)
//     }
//   }

//   // Loading state
//   if (tokenIsLoading) {
//     return (
//       <div className='min-h-screen flex items-center justify-center'>
//         <div className='text-center'>
//           <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
//           <p className='text-gray-600'>Validating activation link...</p>
//         </div>
//       </div>
//     )
//   }

//   // Invalid token
//   if (tokenIsValid === false) {
//     return (
//       <div className='min-h-screen flex items-center justify-center p-4'>
//         <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8'>
//           <div className='text-center'>
//             <div className='text-red-600 text-5xl mb-4'>⚠️</div>
//             <h1 className='text-2xl font-bold text-gray-900 mb-4'>
//               Invalid Activation Link
//             </h1>
//             <p className='text-gray-600 mb-6'>{getErrorMessage()}</p>
//             <a
//               href='/support'
//               className='inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700'>
//               Contact Support
//             </a>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Valid token - show activation form
//   return (
//     <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
//       <div className='max-w-md w-full'>
//         <div className='bg-white rounded-lg shadow-lg p-8'>
//           <h1 className='text-3xl font-bold text-gray-900 mb-2'>
//             Activate Your Card
//           </h1>
//           <p className='text-gray-600 mb-6'>
//             Choose your username to activate your profile
//           </p>

//           {/* Token Info */}
//           {tokenInfo && (
//             <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
//               <div className='flex items-start gap-3'>
//                 <div className='text-blue-600 text-xl'>ℹ️</div>
//                 <div className='flex-1'>
//                   <p className='text-sm text-blue-900 font-medium'>
//                     Activation via {tokenInfo.channel}
//                   </p>
//                   <p className='text-sm text-blue-700 mt-1'>
//                     {tokenInfo.timeRemaining}
//                   </p>
//                   {tokenInfo.isExpiringSoon && (
//                     <p className='text-sm text-orange-600 mt-1'>
//                       ⚠️ This link will expire soon. Please activate now.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Activation Form */}
//           <ActivationFormComponent
//             onSubmit={handleActivate}
//             isSubmitting={isSubmitting}
//             error={activationError}
//             onClearError={clearErrors}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }
