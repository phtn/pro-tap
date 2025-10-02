'use client'

import {FullActivation} from '@/app/account/_components/full-activation'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {Navbar} from '@/components/ui/navbar'
import {useMobile} from '@/hooks/use-mobile'
import {useToggle} from '@/hooks/use-toggle'
import {cn} from '@/lib/utils'
import {useEffect, useRef} from 'react'
import {Landing} from '../_components/landing'
import {NavChild} from '../_components/nav-child'

export const Content = () => {
  const {on, toggle} = useToggle()
  const isMobile = useMobile()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!on || !isMobile) return

    const el = scrollRef.current
    if (!el) return

    const TRANSITION_MS = 550

    const doScroll = () => {
      // Measure navbar height (assumes Navbar is the first header-like element in flow)
      const navbarEl =
        document.getElementById('activation-trigger')?.closest('nav') ??
        document.querySelector(
          'header, nav, [data-navbar], [role="navigation"]',
        )

      const navbarHeight =
        (navbarEl instanceof HTMLElement
          ? navbarEl.getBoundingClientRect().height
          : 0) || 0

      // Target top Y of the activation section relative to document
      const elTopDoc = window.scrollY + el.getBoundingClientRect().top

      // Scroll so that the activation section sits just below the navbar
      const targetY = Math.max(0, elTopDoc - navbarHeight - 4)

      window.scrollTo({top: targetY, behavior: 'smooth'})

      // After initial scroll, ensure the bottom is fully visible and nudge Chrome's address bar to hide
      window.setTimeout(() => {
        const viewportH = window.visualViewport?.height ?? window.innerHeight
        const rect = el.getBoundingClientRect()
        const visibleBottom = rect.bottom
        const extra = visibleBottom - (viewportH - 2) // keep a tiny gutter

        if (extra > 0) {
          window.scrollBy({top: extra + 8, behavior: 'smooth'})
        } else {
          // Nudge by 1px to encourage Chrome to hide the address bar on small pages
          window.scrollBy({top: 1, behavior: 'auto'})
        }
      }, 250)
    }

    const id = window.setTimeout(doScroll, TRANSITION_MS)
    return () => window.clearTimeout(id)
  }, [on, isMobile])

  return (
    <div className='min-h-screen md:max-w-6xl mx-auto'>
      <Navbar
        label={
          <SexyButton
            variant='ghost'
            onClick={toggle}
            id='activation-trigger'
            size={isMobile ? 'md' : 'lg'}
            className='rounded-full relative z-100 bg-zinc-800 hover:bg-zinc-900 md:bg-white md:hover:bg-white dark:bg-mac-gray/60 space-x-1'
            iconStyle='text-primary-hover md:text-mac-blue dark:text-mac-teal size-5'
            rightIcon={on ? 'close' : 'arrow-right'}>
            <span className='md:px-4 md:text-lg text-white md:text-foreground dark:text-white'>
              {on ? 'Select Activation Method' : 'Activate Your Account'}
            </span>
          </SexyButton>
        }>
        <NavChild />
      </Navbar>
      <div>
        <div
          className={cn(
            'overflow-hidden',
            'transition-all duration-500 ease-in-out',
            `${on ? 'max-h-screen md:translate-y-12' : 'max-h-0'}`,
          )}>
          <div className='h-[90lvh] md:px-2 md:pb-10 md:h-160 md:w-6xl relative overflow-clip'>
            <FullActivation scrollRef={scrollRef} />
          </div>
        </div>

        <Landing />
      </div>
    </div>
  )
}
