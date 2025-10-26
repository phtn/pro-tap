'use client'

import {useRouter} from 'next/navigation'
import {useState} from 'react'

interface ActivationFormProps {
  token: string
  cardId: string
}

interface UsernameCheck {
  available: boolean
  suggestions: string[]
}

export default function ActivationForm({token, cardId}: ActivationFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    acceptTerms: false,
  })
  const [usernameStatus, setUsernameStatus] = useState<UsernameCheck | null>(
    null,
  )
  const [isChecking, setIsChecking] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkUsername = async (username: string): Promise<void> => {
    if (username.length < 3) {
      setUsernameStatus(null)
      return
    }

    setIsChecking(true)
    try {
      const response = await fetch('/api/check-username', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username}),
      })

      const data: UsernameCheck = await response.json()
      setUsernameStatus(data)
    } catch (err) {
      console.error('Failed to check username:', err)
    } finally {
      setIsChecking(false)
    }
  }

  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const username = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '')
    setFormData({...formData, username})

    // Debounce username check
    const timer = setTimeout(() => {
      checkUsername(username)
    }, 500)

    clearTimeout(timer)
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (!usernameStatus?.available) {
      setError('Please choose an available username')
      return
    }

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/activate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token,
          cardId,
          username: formData.username,
          displayName: formData.displayName,
          acceptTerms: formData.acceptTerms,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error ?? 'Activation failed')
      }

      // Success! Redirect to profile
      router.push(result.profileUrl)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Activation failed'
      setError(errorMessage)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Username */}
      <div>
        <label
          htmlFor='username'
          className='block text-sm font-medium text-gray-700 mb-2'>
          Username
        </label>
        <div className='relative'>
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
            @
          </span>
          <input
            type='text'
            id='username'
            value={formData.username}
            onChange={handleUsernameChange}
            className='w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='amanda'
            required
            minLength={3}
            maxLength={30}
          />
        </div>

        {isChecking && (
          <p className='text-sm text-gray-500 mt-1'>Checking availability...</p>
        )}

        {usernameStatus && !isChecking && (
          <div className='mt-1'>
            {usernameStatus.available ? (
              <p className='text-sm text-green-600'>✓ Username available!</p>
            ) : (
              <div>
                <p className='text-sm text-red-600'>× Username not available</p>
                {usernameStatus.suggestions.length > 0 && (
                  <div className='mt-2'>
                    <p className='text-sm text-gray-600'>Suggestions:</p>
                    <div className='flex gap-2 mt-1'>
                      {usernameStatus.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type='button'
                          onClick={() => {
                            setFormData({...formData, username: suggestion})
                            checkUsername(suggestion)
                          }}
                          className='text-sm text-blue-600 hover:underline'>
                          @{suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Display Name */}
      <div>
        <label
          htmlFor='displayName'
          className='block text-sm font-medium text-gray-700 mb-2'>
          Display Name
        </label>
        <input
          type='text'
          id='displayName'
          value={formData.displayName}
          onChange={(e) =>
            setFormData({...formData, displayName: e.target.value})
          }
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Amanda Johnson'
          required
        />
      </div>

      {/* Terms */}
      <div className='flex items-start'>
        <input
          type='checkbox'
          id='terms'
          checked={formData.acceptTerms}
          onChange={(e) =>
            setFormData({...formData, acceptTerms: e.target.checked})
          }
          className='mt-1 mr-2'
        />
        <label htmlFor='terms' className='text-sm text-gray-700'>
          I accept the{' '}
          <a href='/terms' className='text-blue-600 hover:underline'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='/privacy' className='text-blue-600 hover:underline'>
            Privacy Policy
          </a>
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type='submit'
        disabled={isSubmitting || !usernameStatus?.available}
        className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
        {isSubmitting ? 'Activating...' : 'Activate Account'}
      </button>
    </form>
  )
}
