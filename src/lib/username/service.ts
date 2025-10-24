import {User} from 'firebase/auth'
import {getVisiblePublicUserById} from '../firebase/public/u'
import {updateUser} from '../firebase/users'

interface UsernameAvailability {
  available: boolean
  suggestions?: string[]
}

async function checkUsernameAvailability(
  username: string,
): Promise<UsernameAvailability> {
  // Validation rules
  const rules = {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_-]+$/, // Alphanumeric, underscore, hyphen
    reserved: [
      'admin',
      'api',
      'www',
      'app',
      'support',
      'help',
      'about',
      'terms',
      'privacy',
    ],
  }

  // Validate format
  if (username.length < rules.minLength || username.length > rules.maxLength) {
    return {available: false, suggestions: []}
  }

  if (!rules.pattern.test(username)) {
    return {available: false, suggestions: []}
  }

  if (rules.reserved.includes(username.toLowerCase())) {
    return {available: false, suggestions: []}
  }

  // Check database
  const exist = await getVisiblePublicUserById('id')

  if (exist) {
    // Generate suggestions
    const suggestions = await generateUsernameSuggestions(username)
    return {available: false, suggestions}
  }

  return {available: true}
}

async function generateUsernameSuggestions(
  username: string,
): Promise<string[]> {
  const suggestions: string[] = []

  // Add numbers
  for (let i = 1; i <= 3; i++) {
    const suggestion = `${username}${Math.floor(Math.random() * 999)}`
    const available = await checkUsernameAvailability(suggestion)
    if (available.available) {
      suggestions.push(suggestion)
    }
  }

  return suggestions.slice(0, 3)
}

export async function changeUsername(
  userId: string,
  newUsername: string,
): Promise<{success: boolean; error?: string}> {
  // Check availability
  const availability = await checkUsernameAvailability(newUsername)
  if (!availability.available) {
    return {success: false, error: 'Username not available'}
  }

  // Get old username for redirect handling
  const oldProfile = false

  if (!oldProfile) {
    return {success: false, error: 'Profile not found'}
  }

  // Update username
  await updateUser({uid: 'uid', photoURL: ''} as User)

  return {success: true}
}

// Handle old username redirects
export async function handleUsernameRedirect(username: string) {}
