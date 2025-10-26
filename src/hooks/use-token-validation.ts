'use client'

import {TokenUtils} from '@/lib/jwt/tok.utils'
import {useCallback, useEffect, useState} from 'react'

interface TokenValidationState {
  isValid: boolean | null
  isLoading: boolean
  error: string | null
  errorCode: string | null
  info: {
    channel: string
    expiresAt: string
    timeRemaining: string
    isExpiringSoon: boolean
  } | null
}

export function useTokenValidation(token: string, autoValidate = true) {
  const [state, setState] = useState<TokenValidationState>({
    isValid: null,
    isLoading: false,
    error: null,
    errorCode: null,
    info: null,
  })

  /**
   * Validate token format before making API call
   */
  const isValidFormat = useCallback(() => {
    return TokenUtils.isValidFormat(token)
  }, [token])

  /**
   * Parse token to get basic info (unsafe - for display only)
   */
  const parseToken = useCallback(() => {
    return TokenUtils.parseTokenUnsafe(token)
  }, [token])

  /**
   * Validate token with backend
   */
  const validate = useCallback(async (): Promise<boolean> => {
    // Quick format check
    if (!isValidFormat()) {
      setState({
        isValid: false,
        isLoading: false,
        error: 'Invalid token format',
        errorCode: 'INVALID_FORMAT',
        info: null,
      })
      return false
    }

    setState((prev) => ({...prev, isLoading: true}))

    try {
      const response = await fetch('/api/validate-token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token}),
      })

      const result = await response.json()

      if (!response.ok || !result.valid) {
        setState({
          isValid: false,
          isLoading: false,
          error: result.error ?? 'Token validation failed',
          errorCode: result.errorCode ?? null,
          info: null,
        })
        return false
      }

      setState({
        isValid: true,
        isLoading: false,
        error: null,
        errorCode: null,
        info: result.info ?? null,
      })
      return true
    } catch (error) {
      setState({
        isValid: false,
        isLoading: false,
        error: 'Failed to validate token',
        errorCode: 'NETWORK_ERROR',
        info: null,
      })
      return false
    }
  }, [token, isValidFormat])

  /**
   * Auto-validate on mount if enabled
   */
  useEffect(() => {
    if (autoValidate && token) {
      validate()
    }
  }, [token, autoValidate, validate])

  /**
   * Get user-friendly error message
   */
  const getErrorMessage = useCallback((): string | null => {
    if (!state.errorCode) return state.error

    const messages: Record<string, string> = {
      INVALID_FORMAT: 'The activation link is invalid or corrupted.',
      EXPIRED:
        'This activation link has expired. Please contact support for a new one.',
      ALREADY_USED: 'This activation link has already been used.',
      INVALID_SIGNATURE:
        'The activation link is not authentic. Please verify the source.',
      MALFORMED: 'The activation link is malformed.',
      MISSING_CLAIMS: 'The activation link is incomplete.',
      NETWORK_ERROR:
        'Unable to validate token. Please check your internet connection.',
    }

    return messages[state.errorCode] ?? state.error
  }, [state.error, state.errorCode])

  return {
    ...state,
    validate,
    parseToken,
    isValidFormat,
    getErrorMessage,
  }
}
