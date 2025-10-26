import {CardSeries} from '../../../convex/cards/d'

export type TokenChannel = 'nfc' | 'qr' | 'online' | 'other'
export type TokenPurpose =
  | 'activation'
  | 'password_reset'
  | 'email_verification'

export interface ActivationTokenPayload {
  sub: string // subscriptionId
  uid: string // userId
  channel: TokenChannel
  purpose: TokenPurpose
  iat: number // issued at
  exp: number // expires at
  jti: string // unique token ID (prevents replay)
  typ: string // token type
  alg: string // algorithm
  series?: CardSeries
  group?: string
}

export interface TokenValidationResult {
  valid: boolean
  payload?: ActivationTokenPayload
  error?: string
  errorCode?: TokenErrorCode
}

export enum TokenErrorCode {
  INVALID_FORMAT = 'INVALID_FORMAT',
  EXPIRED = 'EXPIRED',
  ALREADY_USED = 'ALREADY_USED',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  MALFORMED = 'MALFORMED',
  MISSING_CLAIMS = 'MISSING_CLAIMS',
}

export interface TokenGenerationOptions {
  channel: TokenChannel
  userId: string
  series?: CardSeries
  group?: string
  subscriptionId?: string
  expiryDays?: number // Optional custom expiry
}

export interface TokenMetadata {
  token: string
  payload: ActivationTokenPayload
  expiresAt: Date
  createdAt: Date
}
