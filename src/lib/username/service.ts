'use client'

import type {ConvexReactClient} from 'convex/react'
import {useConvex} from 'convex/react'
import {api} from '../../../convex/_generated/api'
import type {Doc, Id} from '../../../convex/_generated/dataModel'

type UsernameAvailabilityReason =
  | 'too_short'
  | 'too_long'
  | 'invalid_format'
  | 'reserved'
  | 'unavailable'

export interface UsernameAvailability {
  available: boolean
  normalized: string
  reason?: UsernameAvailabilityReason
  suggestions: string[]
}

interface UsernameValidationResult {
  valid: boolean
  normalized: string
  reason?: UsernameAvailabilityReason
}

export interface ChangeUsernameResult {
  success: boolean
  previousUsername?: string | null
  newUsername?: string
  error?: string
}

type UserProfileDoc = Doc<'userProfiles'>
type UserProfileUpdatePayload = Omit<UserProfileDoc, '_id' | '_creationTime'>

export class UsernameService {
  private static readonly RULES = {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-z0-9_-]+$/i,
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

  private static readonly SUGGESTION_SUFFIXES = [
    'hq',
    'official',
    'team',
    'studio',
    'app',
    'co',
  ]

  private static readonly MAX_SUGGESTION_ATTEMPTS = 32

  private constructor(private readonly convex: ConvexReactClient) {}

  static useService(): UsernameService {
    const convex = useConvex()
    return new UsernameService(convex)
  }

  get rules() {
    return UsernameService.RULES
  }

  normalizeUsername(username: string): string {
    return username.trim().toLowerCase()
  }

  validateUsername(username: string): UsernameValidationResult {
    const normalized = this.normalizeUsername(username)
    const {minLength, maxLength, pattern, reserved} = UsernameService.RULES

    if (normalized.length < minLength) {
      return {valid: false, normalized, reason: 'too_short'}
    }

    if (normalized.length > maxLength) {
      return {valid: false, normalized, reason: 'too_long'}
    }

    if (!pattern.test(normalized)) {
      return {valid: false, normalized, reason: 'invalid_format'}
    }

    if (reserved.includes(normalized)) {
      return {valid: false, normalized, reason: 'reserved'}
    }

    return {valid: true, normalized}
  }

  async checkAvailability(username: string): Promise<UsernameAvailability> {
    const validation = this.validateUsername(username)

    if (!validation.valid) {
      return {
        available: false,
        normalized: validation.normalized,
        reason: validation.reason,
        suggestions: await this.suggestAlternatives(validation.normalized),
      }
    }

    const exists = await this.usernameExists(validation.normalized)

    if (exists) {
      return {
        available: false,
        normalized: validation.normalized,
        reason: 'unavailable',
        suggestions: await this.suggestAlternatives(validation.normalized),
      }
    }

    return {
      available: true,
      normalized: validation.normalized,
      suggestions: [],
    }
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const availability = await this.checkAvailability(username)
    return availability.available
  }

  async changeUsername(
    userId: Id<'users'> | string,
    newUsername: string,
    options: {profileId?: Id<'userProfiles'>} = {},
  ): Promise<ChangeUsernameResult> {
    const availability = await this.checkAvailability(newUsername)

    if (!availability.available) {
      return {
        success: false,
        error: this.describeAvailabilityError(availability),
      }
    }

    const userProfile = options.profileId
      ? await this.getProfileById(options.profileId)
      : await this.getProfileByUserId(this.toUsersId(userId))

    if (!userProfile) {
      return {
        success: false,
        error: 'Profile not found',
      }
    }

    const previousUsername = userProfile.username ?? null

    const updatePayload = this.prepareProfileUpdate(
      userProfile,
      availability.normalized,
    )

    await this.convex.mutation(api.userProfiles.m.update, {
      id: userProfile._id,
      fields: updatePayload,
    })

    if (previousUsername && previousUsername !== availability.normalized) {
      await this.handleUsernameRedirect(
        previousUsername,
        availability.normalized,
      )
    }

    return {
      success: true,
      previousUsername,
      newUsername: availability.normalized,
    }
  }

  async handleUsernameRedirect(
    oldUsername: string,
    newUsername: string,
  ): Promise<void> {
    // Placeholder for redirect logic.
    // Implement persistent redirect storage if/when old usernames should resolve to new profiles.
    // void oldUsername
    // newUsername = undefined
    return Promise.resolve()
  }

  private async suggestAlternatives(
    username: string,
    limit = 5,
  ): Promise<string[]> {
    const normalized = this.normalizeUsername(username)
    const validationReason = this.validateUsername(normalized).reason

    if (
      validationReason &&
      !['reserved', 'unavailable'].includes(validationReason)
    ) {
      return []
    }

    return this.generateSuggestions(normalized, limit)
  }

  private async usernameExists(username: string): Promise<boolean> {
    const profile = await this.convex.query(api.userProfiles.q.getByUsername, {
      username,
    })
    return Boolean(profile)
  }

  private async getProfileById(
    profileId: Id<'userProfiles'>,
  ): Promise<UserProfileDoc | null> {
    return this.convex.query(api.userProfiles.q.get, {id: profileId})
  }

  private async getProfileByUserId(
    userId: Id<'users'>,
  ): Promise<UserProfileDoc | null> {
    return this.convex.query(api.userProfiles.q.getByUserId, {
      userId,
    })
  }

  private prepareProfileUpdate(
    profile: UserProfileDoc,
    username: string,
  ): UserProfileUpdatePayload {
    const {_id, _creationTime, ...rest} = profile
    return {
      ...rest,
      username,
      updatedAt: Date.now(),
    }
  }

  private async generateSuggestions(
    username: string,
    limit: number,
  ): Promise<string[]> {
    const suggestions = new Set<string>()
    const candidates = this.buildSuggestionCandidates(username, limit * 2)

    for (const candidate of candidates) {
      if (suggestions.size >= limit) break

      if (
        candidate === username ||
        UsernameService.RULES.reserved.includes(candidate)
      ) {
        continue
      }

      if (!(await this.usernameExists(candidate))) {
        suggestions.add(candidate)
      }
    }

    let attempts = 0
    while (
      suggestions.size < limit &&
      attempts < UsernameService.MAX_SUGGESTION_ATTEMPTS
    ) {
      attempts += 1
      const candidate = `${username}${this.randomNumericSuffix()}`

      if (
        suggestions.has(candidate) ||
        UsernameService.RULES.reserved.includes(candidate)
      ) {
        continue
      }

      if (!(await this.usernameExists(candidate))) {
        suggestions.add(candidate)
      }
    }

    return Array.from(suggestions)
  }

  private buildSuggestionCandidates(
    username: string,
    maxCandidates: number,
  ): string[] {
    const candidates: string[] = []

    for (const suffix of UsernameService.SUGGESTION_SUFFIXES) {
      candidates.push(`${username}-${suffix}`)
      candidates.push(`${username}_${suffix}`)
      candidates.push(`${username}${suffix}`)
      candidates.push(`${suffix}-${username}`)

      if (candidates.length >= maxCandidates) {
        break
      }
    }

    return candidates.slice(0, maxCandidates)
  }

  private randomNumericSuffix(length = 3): string {
    const digits = []
    for (let i = 0; i < length; i += 1) {
      digits.push(Math.floor(Math.random() * 10))
    }
    return digits.join('')
  }

  private describeAvailabilityError(
    availability: UsernameAvailability,
  ): string {
    switch (availability.reason) {
      case 'too_short':
        return 'Username is too short.'
      case 'too_long':
        return 'Username is too long.'
      case 'invalid_format':
        return 'Username contains invalid characters.'
      case 'reserved':
        return 'Username is reserved.'
      case 'unavailable':
        return 'Username is already taken.'
      default:
        return 'Username is not available.'
    }
  }

  private toUsersId(userId: Id<'users'> | string): Id<'users'> {
    return userId as Id<'users'>
  }
}

export const useUsernameService = UsernameService.useService
