'use client'

import { useState, useCallback, useMemo } from 'react'

export type AppScreen = 'profile' | 'profile-detail' | 'chat' | 'contacts' | 'settings' | 'about'
export type DetailScreen =
  | 'overview'
  | 'features'
  | 'timeline'
  | 'budget'
  | 'team'

export const useAppNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('profile')

  const navigateTo = useCallback((screen: AppScreen) => {
    setCurrentScreen(screen)
  }, [])

  const screens: AppScreen[] = useMemo(
    () => ['profile', 'contacts', 'settings', 'about'],
    []
  )
  const currentIndex = screens.indexOf(currentScreen)

  const nextScreen = useCallback(() => {
    if (currentScreen === 'profile-detail') {
      // From profile detail, go to contacts
      setCurrentScreen('contacts')
    } else if (currentScreen === 'chat') {
      // From chat, go to contacts
      setCurrentScreen('contacts')
    } else {
      const nextIndex = (currentIndex + 1) % screens.length
      setCurrentScreen(screens[nextIndex])
    }
  }, [currentScreen, currentIndex, screens])

  const prevScreen = useCallback(() => {
    if (currentScreen === 'profile-detail') {
      // From profile detail, go back to profile
      setCurrentScreen('profile')
    } else if (currentScreen === 'chat') {
      // From chat, go back to profile detail
      setCurrentScreen('profile-detail')
    } else {
      const prevIndex =
        currentIndex === 0 ? screens.length - 1 : currentIndex - 1
      setCurrentScreen(screens[prevIndex])
    }
  }, [currentScreen, currentIndex, screens])

  const goToProfileDetail = useCallback(() => {
    setCurrentScreen('profile-detail')
  }, [])

  const goBackToProfile = useCallback(() => {
    setCurrentScreen('profile')
  }, [])

  const goToChat = useCallback(() => {
    setCurrentScreen('chat')
  }, [])

  const goBackToProfileDetail = useCallback(() => {
    setCurrentScreen('profile-detail')
  }, [])

  return {
    currentScreen,
    navigateTo,
    nextScreen,
    prevScreen,
    goToProfileDetail,
    goBackToProfile,
    goToChat,
    goBackToProfileDetail,
    screens,
    currentIndex,
    totalScreens: screens.length,
  }
}

export const useDetailNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState<DetailScreen>('overview')

  const navigateTo = useCallback((screen: DetailScreen) => {
    setCurrentScreen(screen)
  }, [])

  const screens: DetailScreen[] = useMemo(
    () => ['overview', 'features', 'timeline', 'budget', 'team'],
    []
  )
  const currentIndex = screens.indexOf(currentScreen)

  const nextScreen = useCallback(() => {
    const nextIndex = (currentIndex + 1) % screens.length
    setCurrentScreen(screens[nextIndex])
  }, [currentIndex, screens])

  const prevScreen = useCallback(() => {
    const prevIndex =
      currentIndex === 0 ? screens.length - 1 : currentIndex - 1
    setCurrentScreen(screens[prevIndex])
  }, [currentIndex, screens])

  return {
    currentScreen,
    navigateTo,
    nextScreen,
    prevScreen,
    screens,
    currentIndex,
    totalScreens: screens.length,
  }
}
