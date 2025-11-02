'use client'

import {useCallback, useEffect, useState} from 'react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {useAuthCtx} from '@/ctx/auth'
import {useMutation, useQuery} from 'convex/react'
import {api} from '../../../../convex/_generated/api'

import {
  SOCIAL_LINK_FIELDS,
  SocialLinksSheet,
  type CustomLink,
  type SocialLinkKey,
  type SocialLinksMap,
  type SocialLinksSheetResult,
} from './_components/social-links-sheet'
import {Content} from './content'

const Page = () => {
  const {user} = useAuthCtx()
  const updateProfileBasics = useMutation(api.userProfiles.m.updateBasics)
  const userProfile = useQuery(api.userProfiles.q.getByProId, {
    proId: user?.uid ?? '',
  })

  const [isSheetOpen, setSheetOpen] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialLinksMap>({})
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([])
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [isSavingProfile, setSavingProfile] = useState(false)
  const [profileFeedback, setProfileFeedback] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [hasInitializedProfile, setHasInitializedProfile] = useState(false)

  useEffect(() => {
    setHasInitializedProfile(false)
    if (!user?.uid) {
      setUsername('')
      setDisplayName('')
      setBio('')
      setSocialLinks({})
      setCustomLinks([])
    }
  }, [user?.uid])

  useEffect(() => {
    if (!userProfile || hasInitializedProfile) {
      return
    }

    setUsername(userProfile.username ?? '')
    setDisplayName(userProfile.displayName ?? '')
    setBio(userProfile.bio ?? '')
    setSocialLinks(userProfile.socialLinks ?? {})
    setCustomLinks(
      Array.isArray(userProfile.customLinks)
        ? userProfile.customLinks.map((link) => ({
            id: link.id,
            label: link.label,
            url: link.url,
          }))
        : [],
    )
    setHasInitializedProfile(true)
  }, [hasInitializedProfile, userProfile])

  useEffect(() => {
    if (!profileFeedback) {
      return
    }

    const timer = window.setTimeout(() => setProfileFeedback(null), 3000)
    return () => window.clearTimeout(timer)
  }, [profileFeedback])

  const persistProfile = useCallback(async () => {
    if (!user?.uid) {
      return
    }

    const payload = {
      proId: user.uid,
      username: username.trim() ? username.trim() : null,
      displayName: displayName.trim() ? displayName.trim() : null,
      bio: bio.trim() ? bio.trim() : null,
    }

    setSavingProfile(true)
    setProfileError(null)
    setProfileFeedback(null)

    try {
      await updateProfileBasics(payload)
      setProfileFeedback('Profile saved')
    } catch (error) {
      console.error('Failed to save profile basics', error)
      setProfileError('Unable to save profile details. Please try again.')
    } finally {
      setSavingProfile(false)
    }
  }, [bio, displayName, updateProfileBasics, user?.uid, username])

  const handleOpenChange = useCallback((next?: boolean) => {
    if (typeof next === 'boolean') {
      setSheetOpen(next)
      return
    }
    setSheetOpen((prev) => !prev)
  }, [])

  const handleSave = useCallback(
    (result: SocialLinksSheetResult) => {
      setSocialLinks(result.socialLinks)
      setCustomLinks(result.customLinks)
      void persistProfile()
      setSheetOpen(false)
    },
    [persistProfile],
  )

  return (
    <div className='relative space-y-10'>
      <Content />

      <section className='mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8'>
        <div className='space-y-6 rounded-3xl border border-border/60 bg-background/50 p-6 shadow-sm backdrop-blur'>
          <div className='space-y-1'>
            <h2 className='text-lg font-semibold tracking-tight sm:text-xl'>
              Profile basics
            </h2>
            <p className='text-sm text-muted-foreground'>
              Update the details displayed on your public profile.
            </p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label
                htmlFor='profile-display-name'
                className='text-sm font-medium tracking-tight'>
                Display name
              </Label>
              <Input
                id='profile-display-name'
                value={displayName}
                onChange={(event) => {
                  setDisplayName(event.target.value)
                  if (profileError) {
                    setProfileError(null)
                  }
                }}
                placeholder='How should we introduce you?'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='profile-username'
                className='text-sm font-medium tracking-tight'>
                Username
              </Label>
              <Input
                id='profile-username'
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                  if (profileError) {
                    setProfileError(null)
                  }
                }}
                placeholder='username'
              />
            </div>
            <div className='space-y-2 sm:col-span-2'>
              <Label
                htmlFor='profile-bio'
                className='text-sm font-medium tracking-tight'>
                Bio
              </Label>
              <textarea
                id='profile-bio'
                value={bio}
                onChange={(event) => {
                  setBio(event.target.value)
                  if (profileError) {
                    setProfileError(null)
                  }
                }}
                placeholder='Share a quick introduction.'
                className='min-h-28 w-full rounded-lg border border-border/60 bg-background/50 px-3 py-3 text-sm font-medium tracking-tight text-foreground shadow-xs outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 dark:bg-background/30 dark:text-white'
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <div className='min-h-[1.25rem]'>
              {profileError ? (
                <p className='text-sm font-medium text-destructive'>
                  {profileError}
                </p>
              ) : profileFeedback ? (
                <p className='text-sm font-medium text-emerald-600 dark:text-emerald-400'>
                  {profileFeedback}
                </p>
              ) : null}
            </div>
            <Button
              type='button'
              size='sm'
              onClick={() => void persistProfile()}
              disabled={isSavingProfile || !user?.uid}>
              {isSavingProfile ? 'Saving…' : 'Save profile'}
            </Button>
          </div>
        </div>
      </section>

      <section className='mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-4 rounded-3xl border border-border/60 bg-background/50 p-6 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-1'>
            <h2 className='text-lg font-semibold tracking-tight sm:text-xl'>
              Social Links
            </h2>
            <p className='text-sm text-muted-foreground'>
              Manage the platforms and URLs displayed on your public profile.
            </p>
          </div>
          <SocialLinksSheet
            proId={user?.uid ?? null}
            isOpen={isSheetOpen}
            setOpen={handleOpenChange}
            initialLinks={socialLinks}
            initialCustomLinks={customLinks}
            onSave={handleSave}>
            <Button type='button' variant='outline' size='sm'>
              Edit links
            </Button>
          </SocialLinksSheet>
        </div>

        <SocialLinksOverview
          socialLinks={socialLinks}
          customLinks={customLinks}
        />
      </section>
    </div>
  )
}

type OverviewProps = {
  socialLinks: SocialLinksMap
  customLinks: CustomLink[]
}

const SocialLinksOverview = ({socialLinks, customLinks}: OverviewProps) => {
  const platforms = SOCIAL_LINK_FIELDS.map((field) => {
    const raw = socialLinks[field.key]
    const value = typeof raw === 'string' ? raw.trim() : ''
    const url = buildPlatformUrl(field.key, value)
    return {
      key: field.key,
      label: field.label,
      url,
    }
  }).filter((item) => Boolean(item.url))

  const hasPlatforms = platforms.length > 0
  const hasCustomLinks = customLinks.length > 0

  if (!hasPlatforms && !hasCustomLinks) {
    return (
      <p className='mt-6 text-sm text-muted-foreground'>
        You haven&apos;t added any social links yet.
      </p>
    )
  }

  return (
    <div className='mt-6 space-y-8'>
      {hasPlatforms && (
        <div className='space-y-3'>
          <h3 className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            Platforms
          </h3>
          <ul className='grid gap-3 sm:grid-cols-2'>
            {platforms.map((platform) => (
              <li
                key={platform.key}
                className='group rounded-2xl border border-border/60 bg-card/50 px-4 py-3 transition hover:border-primary/60 hover:shadow-md'>
                <a
                  href={platform.url}
                  target='_blank'
                  rel='noreferrer'
                  className='flex flex-col gap-1'>
                  <span className='text-sm font-semibold tracking-tight'>
                    {platform.label}
                  </span>
                  <span className='truncate text-xs text-muted-foreground group-hover:text-primary'>
                    {platform.url}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasCustomLinks && (
        <div className='space-y-3'>
          <h3 className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            Custom links
          </h3>
          <ul className='grid gap-3 sm:grid-cols-2'>
            {customLinks.map((link) => (
              <li
                key={link.id}
                className='group rounded-2xl border border-dashed border-border/60 bg-card/40 px-4 py-3 transition hover:border-primary/60 hover:shadow-md'>
                <a
                  href={link.url}
                  target='_blank'
                  rel='noreferrer'
                  className='flex flex-col gap-1'>
                  <span className='text-sm font-semibold tracking-tight'>
                    {link.label}
                  </span>
                  <span className='truncate text-xs text-muted-foreground group-hover:text-primary'>
                    {link.url}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const buildPlatformUrl = (key: SocialLinkKey, value: string): string => {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  const handle = trimmed.replace(/^@+/, '')

  switch (key) {
    case 'facebook':
      return `https://facebook.com/${handle}`
    case 'linkedin':
      return `https://linkedin.com/in/${handle}`
    case 'twitter':
      return `https://twitter.com/${handle}`
    case 'instagram':
      return `https://instagram.com/${handle}`
    case 'tiktok':
      return `https://www.tiktok.com/@${handle}`
    default:
      return ''
  }
}

export default Page
