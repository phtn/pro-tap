import {TokenService} from '@/lib/jwt/tok.service'
import {TokenChannel} from '@/lib/jwt/tok.types'
import {useCallback} from 'react'

export const useTokenService = () => {
  const handleGenerateToken = useCallback(async () => {
    const tokenOptions = {
      subscriptionId: 'your-subscription-id',
      userId: 'current-user-id',
      channel: 'nfc' as TokenChannel,
      expiryDays: 30,
    }
    await TokenService.generateActivationToken(tokenOptions)
  }, [])

  return {
    handleGenerateToken,
  }
}
