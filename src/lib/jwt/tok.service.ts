import {env} from '@/env'
import {randomUUID} from 'crypto'
import jwt from 'jsonwebtoken'
import {v7 as uuidv7} from 'uuid'
import {
  ActivationTokenPayload,
  TokenChannel,
  TokenErrorCode,
  TokenGenerationOptions,
  TokenMetadata,
  TokenValidationResult,
} from './tok.types'

export class TokenService {
  private static readonly SECRET = env.RE_UP_ACTIVATION_SECRET

  // Default expiry days by channel
  private static readonly DEFAULT_EXPIRY: Record<TokenChannel, number> = {
    online: 1, // 24 hours - user is already authenticated
    qr: 30, // 30 days - printed materials
    nfc: 90, // 90 days - physical cards can be delayed in shipping
    other: 365, // 365 days - other channels
  }

  /**
   * Generate an activation token
   */
  static async generateActivationToken(
    options: TokenGenerationOptions,
  ): Promise<TokenMetadata> {
    const {subscriptionId, userId, channel, expiryDays, series, group} = options

    // Determine expiry
    const expiryDuration = expiryDays ?? this.DEFAULT_EXPIRY[channel]
    const now = Math.floor(Date.now() / 1000)
    const exp = now + expiryDuration * 86400 // Convert days to seconds

    // Generate unique token ID
    const jti = randomUUID()
    const uid = uuidv7()
    const sub = group ?? uuidv7()

    // Create payload
    const payload: ActivationTokenPayload = {
      sub,
      typ: 'JWT',
      alg: 'HS256',
      uid,
      channel,
      purpose: 'activation',
      iat: now,
      series,
      group,
      exp,
      jti,
    }

    // Sign token
    const token = jwt.sign(payload, this.SECRET, {
      algorithm: 'HS256',
    })

    // Store token metadata in database
    const meta = {
      data: {
        jti,
        userId,
        subscriptionId,
        tokenType: 'activation',
        channel,
        issuedAt: new Date(now * 1000).toDateString(),
        expiresAt: new Date(exp * 1000).toDateString(),
        isUsed: false,
      },
    }
    console.log('convex', JSON.stringify(meta, null, 2), '\n')

    const returnValue = {
      token,
      payload,
      expiresAt: new Date(exp * 1000).toDateString(),
      createdAt: new Date(now * 1000).toDateString(),
    }
    return returnValue
  }

  /**
   * Validate and decode a token
   */
  static async validateToken(token: string): Promise<TokenValidationResult> {
    try {
      // Verify signature and decode
      const decoded = jwt.verify(token, this.SECRET, {
        algorithms: ['HS256'],
      }) as ActivationTokenPayload

      // Validate required claims
      if (!decoded.sub || !decoded.uid || !decoded.jti || !decoded.channel) {
        return {
          valid: false,
          error: 'Token missing required claims',
          errorCode: TokenErrorCode.MISSING_CLAIMS,
        }
      }

      // Check if token was already used
      const tokenRecord = {
        where: {jti: decoded.jti},
      }

      if (!tokenRecord) {
        return {
          valid: false,
          error: 'Token not found in database',
          errorCode: TokenErrorCode.INVALID_FORMAT,
        }
      }

      // if (tokenRecord.isUsed) {
      //   return {
      //     valid: false,
      //     error: 'Token has already been used',
      //     errorCode: TokenErrorCode.ALREADY_USED,
      //   }
      // }

      // Check expiration (belt and suspenders - JWT verify already checks this)
      if (Date.now() > decoded.exp * 1000) {
        return {
          valid: false,
          error: 'Token has expired',
          errorCode: TokenErrorCode.EXPIRED,
        }
      }

      return {
        valid: true,
        payload: decoded,
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return {
          valid: false,
          error: 'Token has expired',
          errorCode: TokenErrorCode.EXPIRED,
        }
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return {
          valid: false,
          error: 'Invalid token signature',
          errorCode: TokenErrorCode.INVALID_SIGNATURE,
        }
      }

      return {
        valid: false,
        error: 'Malformed token',
        errorCode: TokenErrorCode.MALFORMED,
      }
    }
  }

  /**
   * Mark a token as used (call after successful activation)
   */
  // static async markTokenAsUsed(jti: string): Promise<void> {
  //   await prisma.tokenMetadata.update({
  //     where: {jti},
  //     data: {
  //       isUsed: true,
  //       usedAt: new Date(),
  //     },
  //   })
  // }

  /**
   * Revoke a token (before expiry)
   */
  // static async revokeToken(jti: string): Promise<void> {
  //   await prisma.tokenMetadata.update({
  //     where: {jti},
  //     data: {
  //       isRevoked: true,
  //       revokedAt: new Date(),
  //     },
  //   })
  // }

  // /**
  //  * Check if token is valid without full validation
  //  */
  // static async isTokenValid(jti: string): Promise<boolean> {
  //   const token = await prisma.tokenMetadata.findUnique({
  //     where: {jti},
  //   })

  //   if (!token) return false
  //   if (token.isUsed) return false
  //   if (token.isRevoked) return false
  //   if (Date.now() > token.expiresAt.getTime()) return false

  //   return true
  // }

  /**
   * Get token metadata
   */
  // static async getTokenMetadata(jti: string) {
  //   return prisma.tokenMetadata.findUnique({
  //     where: {jti},
  //     include: {
  //       user: true,
  //       subscription: true,
  //     },
  //   })
  // }

  /**
   * Cleanup expired tokens (run as cron job)
   */
  // static async cleanupExpiredTokens(): Promise<number> {
  //   const result = await prisma.tokenMetadata.deleteMany({
  //     where: {
  //       expiresAt: {
  //         lt: new Date(),
  //       },
  //     },
  //   })

  //   return result.count
  // }

  /**
   * Generate a new token for an existing subscription (re-issue)
   */
  // static async reissueToken(
  //   subscriptionId: string,
  //   channel: TokenChannel,
  // ): Promise<TokenMetadata> {
  //   // Get subscription details
  //   const subscription = await prisma.subscription.findUnique({
  //     where: {id: subscriptionId},
  //   })

  //   if (!subscription) {
  //     throw new Error('Subscription not found')
  //   }

  // Revoke old tokens for this subscription
  //     await prisma.tokenMetadata.updateMany({
  //       where: {
  //         subscriptionId,
  //         isUsed: false,
  //         isRevoked: false,
  //       },
  //       data: {
  //         isRevoked: true,
  //         revokedAt: new Date(),
  //       },
  //     })

  //     // Generate new token
  //     return this.generateActivationToken({
  //       subscriptionId,
  //       userId: subscription.userId,
  //       channel,
  //     })
  //   }
}
