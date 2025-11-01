'use client'

import {useCallback, useState} from 'react'

import {Button} from '@/components/ui/button'

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
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialLinksMap>({})
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([])

  const handleOpenChange = useCallback((next?: boolean) => {
    if (typeof next === 'boolean') {
      setSheetOpen(next)
      return
    }
    setSheetOpen((prev) => !prev)
  }, [])

  const handleSave = useCallback((result: SocialLinksSheetResult) => {
    setSocialLinks(result.socialLinks)
    setCustomLinks(result.customLinks)
    setSheetOpen(false)
  }, [])

  return (
    <div className='relative space-y-10'>
      <Content />

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
      return `https://github.com/${handle}`
    default:
      return ''
  }
}

export default Page
