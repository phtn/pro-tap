import {TokenService} from '@/lib/jwt/tok.service'
import {
  TokenChannel,
  TokenGenerationOptions,
  TokenMetadata,
} from '@/lib/jwt/tok.types'
import {NextRequest, NextResponse} from 'next/server'
import {CardSeries, CardType} from '../../../../../convex/cards/d'

export interface CardRequest {
  userId: string | null
  type: CardType
  body: {
    series: CardSeries
    group: string
    batch: string
  }
  count?: number
}

export const POST = async (req: NextRequest) => {
  const {type, body, count = 1} = (await req.json()) as CardRequest

  const opts: TokenGenerationOptions = {
    series: body.series,
    group: body.group,
    userId: body.series,
    channel: type as TokenChannel,
    expiryDays: 30,
  }

  const tokens: TokenMetadata[] = []

  for (let i = 0; i < count; i++) {
    tokens.push(await TokenService.generateActivationToken(opts))
  }
  if (tokens.length === 0) {
    return NextResponse.json({error: 'No tokens generated'}, {status: 400})
  }

  return NextResponse.json(tokens, {status: 200})
}
