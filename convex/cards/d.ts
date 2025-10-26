import {Infer, v} from 'convex/values'
const series = v.union(
  v.literal('individual'),
  v.literal('fleet'),
  v.literal('limited-edition'),
  v.literal('other'),
)
const state = v.union(
  v.literal('unused'),
  v.literal('pending'),
  v.literal('activated'),
  v.literal('expired'),
  v.literal('suspended'),
  v.literal('revoked'),
)
const type = v.union(
  v.literal('nfc'),
  v.literal('qr'),
  v.literal('online'),
  v.literal('other'),
)
export const cardSchema = v.object({
  cardId: v.string(),
  userId: v.union(v.id('users'), v.null()),
  series,
  state,
  type,
  group: v.union(v.string(), v.null()),
  batch: v.union(v.string(), v.null()),
  token: v.union(v.string(), v.null()),
  activatedAt: v.union(v.number(), v.null()),
  serialNumber: v.union(v.string(), v.null()),
  issuedAt: v.number(),
  expiresAt: v.string(),
  revokedAt: v.union(v.number(), v.null()),
  createdAt: v.number(),
  createdBy: v.string(),
  updatedAt: v.number(),
  visible: v.boolean(),
})

type Card = Infer<typeof cardSchema>
type CardType = Infer<typeof type>
type CardSeries = Infer<typeof series>
type CardState = Infer<typeof state>
export type {Card, CardSeries, CardState, CardType}
