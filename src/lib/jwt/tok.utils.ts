// lib/jwt/token.utils.ts
import type {ActivationTokenPayload, TokenChannel} from './tok.types'

export class TokenUtils {
  /**
   * Get human-readable expiry duration
   */
  static getExpiryDuration(channel: TokenChannel): string {
    const durations: Record<TokenChannel, string> = {
      online: '24 hours',
      qr: '30 days',
      nfc: '90 days',
      other: '120 days',
    }
    return durations[channel]
  }

  /**
   * Check if token is about to expire (within 24 hours)
   */
  static isExpiringSoon(payload: ActivationTokenPayload): boolean {
    const expiryTime = payload.exp * 1000
    const now = Date.now()
    const hoursUntilExpiry = (expiryTime - now) / (1000 * 60 * 60)
    return hoursUntilExpiry < 24 && hoursUntilExpiry > 0
  }

  /**
   * Get time remaining until expiry
   */
  static getTimeRemaining(payload: ActivationTokenPayload): string {
    const expiryTime = payload.exp * 1000
    const now = Date.now()
    const diff = expiryTime - now

    if (diff <= 0) return 'Expired'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} remaining`
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} remaining`
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`
  }

  /**
   * Parse token without verification (for display purposes only)
   */
  static parseTokenUnsafe(token: string): ActivationTokenPayload | null {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return null

      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString())
      return payload as ActivationTokenPayload
    } catch {
      return null
    }
  }

  /**
   * Get channel display name
   */
  static getChannelDisplayName(channel: TokenChannel): string {
    const names: Record<TokenChannel, string> = {
      nfc: 'NFC Card',
      qr: 'QR Code',
      online: 'Online',
      other: 'Other',
    }
    return names[channel]
  }

  /**
   * Validate token format (basic check before API call)
   */
  static isValidFormat(token: string): boolean {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
    return jwtRegex.test(token)
  }
}
