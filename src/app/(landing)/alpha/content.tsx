'use client'

import {FullActivation} from '@/app/account/_components/full-activation'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {Navbar} from '@/components/ui/navbar'
import {ActivationCtxProvider} from '@/ctx/activation'
import {useAuthCtx} from '@/ctx/auth'
import {useMobile} from '@/hooks/use-mobile'
import {useToggle} from '@/hooks/use-toggle'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {opts} from '@/utils/helpers'
import {useCallback, useEffect, useRef} from 'react'
import {Landing} from '../_components/landing'
import {NavChild} from '../_components/nav-child'

export const Content = () => {
  const {user} = useAuthCtx()
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

  const NavbarLabel = useCallback(() => {
    const options = opts(
      <Icon href='/' name='protap' className='h-28 w-auto' />,
      <SexyButton
        variant={isMobile ? 'ghost' : 'ghost'}
        onClick={toggle}
        id='activation-trigger'
        size={isMobile ? 'md' : 'lg'}
        className='focus-visible:bg-white  rounded-full relative z-100 md:bg-white hover:bg-white dark:bg-mac-gray/60 space-x-1'
        iconStyle={cn(
          'text-primary-hover md:text-primary dark:text-mac-teal size-5',
        )}
        rightIcon={on ? 'close' : 'zap-solid'}>
        <span className='md:px-4 px-2 md:text-lg text-primary md:text-foreground dark:text-white'>
          {on ? 'Select Activation' : 'Activate Account'}
        </span>
      </SexyButton>,
    )
    return <>{options.get(!!user?.isActivated)}</>
  }, [user?.isActivated])

  // const inProduction = useMemo(() => env.NODE_ENV === 'production', [])

  // const ctaLabel = useMemo(
  //   () => (inProduction ? 'Launching Soon' : 'Activate Account'),
  //   [],
  // )

  return (
    <div className='min-h-screen md:max-w-5xl lg:max-w-6xl mx-auto'>
      <Navbar label={<NavbarLabel />}>
        <NavChild />
      </Navbar>
      <div>
        <div
          className={cn(
            'overflow-hidden',
            'transition-all duration-500 ease-in-out',
            `${on ? 'max-h-screen md:max-h-220 md:translate-y-12' : 'max-h-0'}`,
          )}>
          <div className='h-screen pb-4 md:px-2 md:pb-4 md:h-220 md:w-6xl relative overflow-clip'>
            <ActivationCtxProvider>
              <FullActivation scrollRef={scrollRef} />
            </ActivationCtxProvider>
          </div>
        </div>

        <Landing />
      </div>
    </div>
  )
}
