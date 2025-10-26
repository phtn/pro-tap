// hooks/useActivation.ts
'use client'

import type {TokenErrorCode} from '@/lib/jwt/tok.types'
import {useCallback, useState} from 'react'

interface ActivationFormData {
  username: string
  displayName: string
  acceptTerms: boolean
}

interface ActivationState {
  isValidating: boolean
  isSubmitting: boolean
  tokenValid: boolean | null
  tokenError: string | null
  tokenErrorCode: TokenErrorCode | null
  activationError: string | null
  tokenInfo: {
    channel: string
    expiresAt: string
    timeRemaining: string
  } | null
}

interface ActivationResult {
  success: boolean
  profileUrl?: string
  message?: string
  error?: string
}

export function useActivation(token: string, cardId: string) {
  const [state, setState] = useState<ActivationState>({
    isValidating: false,
    isSubmitting: false,
    tokenValid: null,
    tokenError: null,
    tokenErrorCode: null,
    activationError: null,
    tokenInfo: null,
  })

  /**
   * Validate the activation token
   */
  const validateToken = useCallback(async (): Promise<boolean> => {
    setState((prev) => ({...prev, isValidating: true}))

    try {
      const response = await fetch('/api/validate-token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token}),
      })

      const result = await response.json()

      if (!response.ok || !result.valid) {
        setState((prev) => ({
          ...prev,
          isValidating: false,
          tokenValid: false,
          tokenError: result.error ?? 'Invalid token',
          tokenErrorCode: result.errorCode ?? null,
        }))
        return false
      }

      setState((prev) => ({
        ...prev,
        isValidating: false,
        tokenValid: true,
        tokenError: null,
        tokenErrorCode: null,
        tokenInfo: result.info ?? null,
      }))
      return true
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isValidating: false,
        tokenValid: false,
        tokenError: 'Failed to validate token',
        tokenErrorCode: null,
      }))
      return false
    }
  }, [token])

  /**
   * Submit activation form
   */
  const activate = useCallback(
    async (formData: ActivationFormData): Promise<ActivationResult> => {
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
        activationError: null,
      }))

      try {
        const response = await fetch('/api/activate', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            token,
            cardId,
            ...formData,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          setState((prev) => ({
            ...prev,
            isSubmitting: false,
            activationError: result.error ?? 'Activation failed',
          }))
          return {
            success: false,
            error: result.error ?? 'Activation failed',
          }
        }

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          activationError: null,
        }))

        return {
          success: true,
          profileUrl: result.profileUrl,
          message: result.message,
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Activation failed'

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          activationError: errorMessage,
        }))

        return {
          success: false,
          error: errorMessage,
        }
      }
    },
    [token, cardId],
  )

  /**
   * Reset errors
   */
  const clearErrors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      tokenError: null,
      tokenErrorCode: null,
      activationError: null,
    }))
  }, [])

  return {
    ...state,
    validateToken,
    activate,
    clearErrors,
  }
}
