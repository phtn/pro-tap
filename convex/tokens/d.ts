import {v} from 'convex/values'

export const tokenSchema = v.object({
  // Token identification
  jti: v.string(), // unique token ID (prevents replay)
  token: v.string(), // the actual token string

  // Token metadata
  purpose: v.union(
    v.literal('activation'),
    v.literal('password_reset'),
    v.literal('email_verification'),
  ),
  channel: v.union(v.literal('nfc'), v.literal('qr'), v.literal('online')),

  // User and subscription references
  userId: v.string(),
  subscriptionId: v.string(),

  // Timestamps
  issuedAt: v.number(), // Unix timestamp
  expiresAt: v.number(), // Unix timestamp
  createdAt: v.number(), // Unix timestamp

  // Token lifecycle
  isUsed: v.boolean(),
  usedAt: v.optional(v.number()), // Unix timestamp when token was consumed

  // Optional revocation
  isRevoked: v.optional(v.boolean()),
  revokedAt: v.optional(v.number()),
  revokedReason: v.optional(v.string()),
})
// Indexes for efficient queries
