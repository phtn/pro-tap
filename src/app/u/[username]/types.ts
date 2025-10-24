import {User} from 'firebase/auth'

export interface ProfileViews {
  profile: User & {
    user: {
      cards: Array<{id: string; cardType: string}>
    }
  }
  isOwner: boolean
  analytics: {
    overview: {
      totalScans: number
      totalViews: number
      uniqueVisitors: number
    }
  } | null
  cards: Array<{id: string; cardType: string}>
}
