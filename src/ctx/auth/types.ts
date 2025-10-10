import type {User} from 'firebase/auth'

export type UserRole = 'admin' | 'user'

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  role: UserRole
}

export interface AuthUser extends User {
  role: UserRole
}
