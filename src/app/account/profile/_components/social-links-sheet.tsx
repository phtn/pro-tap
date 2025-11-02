'use client'

import type {ReactNode} from 'react'
import {useCallback, useEffect, useState} from 'react'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {Button} from '@/components/ui/button'
import {Input, ModernInput} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useMutation} from 'convex/react'
import {api} from '../../../../../convex/_generated/api'

type ToggleHandler = (open?: boolean) => void

export const SOCIAL_LINK_FIELDS = [
  {
    key: 'facebook',
    label: 'Facebook',
    prefix: 'facebook.com/',
    placeholder: 'your-facebook-handle',
    style: 'text-[#0b66ff] size-6',
    icon: 'facebook-solid',
  },

  {
    key: 'twitter',
    label: 'X.com',
    prefix: 'x.com/',
    placeholder: 'your-handle',
    style: 'text-foreground',
    icon: 'x-twitter',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    prefix: 'instagram.com/',
    placeholder: 'your-handle',
    style: 'text-[#fe2e42] size-5',
    icon: 'instagram',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    prefix: 'tiktok.com/@',
    placeholder: 'your-handle',
    style: 'text-[#000000] size-6',
    icon: 'tiktok',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    prefix: 'linkedin.com/in/',
    placeholder: 'your-linkedin-handle',
    style: 'text-[#0077b5] size-5',
    icon: 'linkedin',
  },
] as const

export type SocialLinkKey = (typeof SOCIAL_LINK_FIELDS)[number]['key']
export type SocialLinksMap = Partial<Record<SocialLinkKey, string>>

export type CustomLink = {
  id: string
  label: string
  url: string
}

export type CustomLinkInput = Partial<CustomLink>

export type SocialLinksSheetResult = {
  socialLinks: SocialLinksMap
  customLinks: CustomLink[]
}

interface Props {
  isOpen: boolean
  setOpen: ToggleHandler
  children?: ReactNode
  initialLinks?: SocialLinksMap
  initialCustomLinks?: CustomLinkInput[]
  onSave?: (result: SocialLinksSheetResult) => void
  proId?: string | null
  isMobile?: boolean
}

const createEmptyLinks = (): SocialLinksMap => {
  return SOCIAL_LINK_FIELDS.reduce<SocialLinksMap>((acc, field) => {
    acc[field.key] = ''
    return acc
  }, {})
}

const createId = (): string => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2, 10)
}

const toCustomLink = (link?: CustomLinkInput): CustomLink => ({
  id: link?.id ?? createId(),
  label: link?.label ?? '',
  url: link?.url ?? '',
})

const normalizeLinks = (links?: SocialLinksMap): SocialLinksMap => {
  const base = createEmptyLinks()
  if (!links) {
    return base
  }

  for (const field of SOCIAL_LINK_FIELDS) {
    const value = links[field.key]
    base[field.key] = typeof value === 'string' ? value : ''
  }

  return base
}

const normalizeCustomLinks = (links?: CustomLinkInput[]): CustomLink[] => {
  if (!links?.length) {
    return []
  }

  return links.map((link) => toCustomLink(link))
}

const sanitizeSocialLinks = (links: SocialLinksMap): SocialLinksMap => {
  return SOCIAL_LINK_FIELDS.reduce<SocialLinksMap>((acc, field) => {
    const value = links[field.key]
    const trimmed = typeof value === 'string' ? value.trim() : ''
    if (trimmed) {
      acc[field.key] = trimmed.replace(/^@+/, '')
    }
    return acc
  }, {})
}

const ensureAbsoluteUrl = (value: string): string => {
  if (!value) {
    return ''
  }

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return `https://${value}`
}

const sanitizeCustomLinks = (links: CustomLink[]): CustomLink[] => {
  return links
    .map((link) => ({
      id: link.id,
      label: link.label.trim(),
      url: ensureAbsoluteUrl(link.url.trim()),
    }))
    .filter((link) => link.label && link.url)
}

export const SocialLinksSheet = ({
  isOpen,
  setOpen,
  children,
  initialLinks,
  initialCustomLinks,
  onSave,
  proId,
  isMobile,
}: Props) => {
  const [links, setLinks] = useState<SocialLinksMap>(() =>
    normalizeLinks(initialLinks),
  )
  const [customLinks, setCustomLinks] = useState<CustomLink[]>(() =>
    normalizeCustomLinks(initialCustomLinks),
  )

  const resetState = useCallback(() => {
    setLinks(normalizeLinks(initialLinks))
    setCustomLinks(normalizeCustomLinks(initialCustomLinks))
  }, [initialLinks, initialCustomLinks])

  useEffect(() => {
    if (isOpen) {
      resetState()
    }
  }, [isOpen, resetState])

  const handleSheetChange = useCallback(
    (next: boolean) => {
      setOpen(next)
    },
    [setOpen],
  )

  const handleLinkChange = useCallback((key: SocialLinkKey, value: string) => {
    setLinks((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const handleAddCustomLink = useCallback(() => {
    setCustomLinks((prev) => [...prev, toCustomLink()])
  }, [])

  const handleCustomLinkChange = useCallback(
    (id: string, field: 'label' | 'url', value: string) => {
      setCustomLinks((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                [field]: value,
              }
            : item,
        ),
      )
    },
    [],
  )

  const handleRemoveCustomLink = useCallback((id: string) => {
    setCustomLinks((prev) => prev.filter((item) => item.id !== id))
  }, [])

  // const handleCancel = useCallback(() => {
  //   resetState()
  //   setOpen(false)
  // }, [resetState, setOpen])

  const updateSocialLinks = useMutation(api.userProfiles.m.updateSocialLinks)
  const handleSave = useCallback(async () => {
    if (!proId) return
    const socialLinks = sanitizeSocialLinks(links)
    const custom = sanitizeCustomLinks(customLinks)

    onSave?.({
      socialLinks,
      customLinks: custom,
    })

    await updateSocialLinks({
      proId,
      socialLinks,
      customLinks: custom,
    })

    setOpen(false)
  }, [customLinks, links, onSave, proId, setOpen, updateSocialLinks])

  const hasCustomLinks = customLinks.length > 0

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          'z-100 flex flex-col py-8 gap-6 md:max-w-[420px] md:rounded-s-3xl md:rounded-e-none',
          'rounded-t-3xl',
        )}>
        <SheetHeader className='-space-y-1'>
          <SheetTitle className='tracking-tight text-2xl font-bold'>
            Manage Social Links
          </SheetTitle>
          <SheetDescription>
            Add platforms and custom URLs that appear on your profile.
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 max-h-[60lvh] space-y-6 overflow-y-auto px-8'>
          <section className='space-y-4'>
            <div>
              <h3 className='text-base font-semibold tracking-tight'>
                Platforms
              </h3>
              <p className='text-xs text-muted-foreground'>
                Handles save without the base URL. We add the correct prefix for
                you.
              </p>
            </div>
            <div className='space-y-3'>
              {SOCIAL_LINK_FIELDS.map((field) => (
                <div key={field.key} className='space-y-2'>
                  <Label
                    htmlFor={`social-${field.key}`}
                    className={cn(
                      'flex items-center text-sm font-semibold lowercase tracking-tight',
                      field.style,
                    )}>
                    <Icon
                      name={field.icon}
                      className={cn('size-4', field.style)}
                    />
                    <span>{field.label}</span>
                  </Label>
                  <div className='flex items-center gap-2'>
                    {/*<div className='rounded-md border border-border/60 bg-muted px-3 py-2 text-xs font-medium text-muted-foreground/90'>
                      {field.prefix}
                    </div>*/}
                    <ModernInput
                      id={`social-${field.key}`}
                      prefix={field.prefix}
                      value={links[field.key] ?? ''}
                      placeholder={field.placeholder}
                      className='w-96 mb-4'
                      onChange={(event) =>
                        handleLinkChange(field.key, event.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className='space-y-3'>
            <div className='flex items-center justify-between gap-2'>
              <div>
                <h3 className='text-sm font-semibold tracking-tight'>
                  Custom links
                </h3>
                <p className='text-xs text-muted-foreground'>
                  Add any other important links like portfolios or newsletters.
                </p>
              </div>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={handleAddCustomLink}>
                Add link
              </Button>
            </div>

            {!hasCustomLinks && (
              <p className='text-xs text-muted-foreground'>
                You haven&apos;t added any custom links yet.
              </p>
            )}

            {hasCustomLinks && (
              <div className='space-y-3'>
                {customLinks.map((link) => (
                  <div
                    key={link.id}
                    className='rounded-lg border border-dashed border-border/70 bg-background/40 p-3 shadow-xs'>
                    <div className='grid gap-2'>
                      <div className='space-y-1'>
                        <Label
                          htmlFor={`custom-label-${link.id}`}
                          className='text-xs font-medium text-muted-foreground'>
                          Label
                        </Label>
                        <Input
                          id={`custom-label-${link.id}`}
                          value={link.label}
                          placeholder='e.g. Personal Site'
                          onChange={(event) =>
                            handleCustomLinkChange(
                              link.id,
                              'label',
                              event.target.value,
                            )
                          }
                        />
                      </div>
                      <div className='space-y-1'>
                        <Label
                          htmlFor={`custom-url-${link.id}`}
                          className='text-xs font-medium text-muted-foreground'>
                          URL
                        </Label>
                        <Input
                          id={`custom-url-${link.id}`}
                          value={link.url}
                          placeholder='https://example.com'
                          onChange={(event) =>
                            handleCustomLinkChange(
                              link.id,
                              'url',
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className='mt-3 flex justify-end'>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => handleRemoveCustomLink(link.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <SheetFooter>
          <SexyButton
            size='lg'
            fullWidth
            variant='ghost'
            className={cn(
              'md:px-6 bg-transparent hover:bg-primary dark:hover:bg-dysto shadow-none hover:text-white text-foreground dark:inset-shadow-[0_1px_rgb(160_160_160)]/0 inset-shadow-[0_1px_rgb(160_160_160)]/0',
            )}
            onClick={handleSave}>
            <span className='font-semibold text-lg'>Save</span>
          </SexyButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
