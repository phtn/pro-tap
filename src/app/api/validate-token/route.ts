// app/api/validate-token/route.ts
import {TokenService} from '@/lib/jwt/tok.service'
import {TokenUtils} from '@/lib/jwt/tok.utils'
import {NextRequest, NextResponse} from 'next/server'

interface ValidateTokenRequest {
  token: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const {token}: ValidateTokenRequest = await request.json()

    if (!token) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Token is required',
          errorCode: 'MISSING_TOKEN',
        },
        {status: 400},
      )
    }

    // Validate token
    const validation = await TokenService.validateToken(token)

    if (!validation.valid) {
      return NextResponse.json(
        {
          valid: false,
          error: validation.error,
          errorCode: validation.errorCode,
        },
        {status: 200}, // Return 200 even for invalid tokens
      )
    }

    // Get additional info
    const payload = validation.payload!
    const info = {
      channel: TokenUtils.getChannelDisplayName(payload.channel),
      expiresAt: new Date(payload.exp * 1000).toISOString(),
      timeRemaining: TokenUtils.getTimeRemaining(payload),
      isExpiringSoon: TokenUtils.isExpiringSoon(payload),
    }

    return NextResponse.json({
      valid: true,
      info,
    })
  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json(
      {
        valid: false,
        error: 'An error occurred during validation',
        errorCode: 'SERVER_ERROR',
      },
      {status: 500},
    )
  }
}
