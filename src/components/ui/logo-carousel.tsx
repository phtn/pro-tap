'use client'

import {Icon, type IconName} from '@/lib/icons'
import {AnimatePresence, motion} from 'motion/react'
import React, {useCallback, useEffect, useMemo, useState} from 'react'

// Define the structure for our logo objects
interface Logo {
  name: string
  id: number
  icon: IconName
  // img: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

// Utility function to randomly shuffle an array
// This is used to mix up the order of logos for a more dynamic display
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Utility function to distribute logos across multiple columns
// This ensures each column has a balanced number of logos
const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos)
  const columns: Logo[][] = Array.from({length: columnCount}, () => [])

  // Distribute logos evenly across columns
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  // Ensure all columns have the same number of logos by filling shorter columns
  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

// Props for the LogoColumn component
interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

// LogoColumn component: Displays a single column of animated logos
const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({logos, index, currentTime}) => {
    const cycleInterval = 6000 // Time each logo is displayed (in milliseconds)
    const columnDelay = index * 200 // Stagger the start of each column's animation
    // Calculate which logo should be displayed based on the current time
    const adjustedTime =
      (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)

    // Memoize the current logo to prevent unnecessary re-renders
    const currenLogo = useMemo(
      () => logos[currentIndex].icon,
      [logos, currentIndex],
    )

    return (
      // Framer Motion component for the column container
      <motion.div
        className='w-24 h-14 md:w-24 md:h-24 overflow-hidden relative'
        initial={{opacity: 0, y: 50}} // Start invisible and below final position
        animate={{opacity: 1, y: 0}} // Animate to full opacity and final position
        transition={{
          delay: index * 0.1, // Stagger the animation of each column
          duration: 0.7,
          ease: 'easeOut',
        }}>
        {/* AnimatePresence enables animation of components that are removed from the DOM */}
        <AnimatePresence mode='wait'>
          {/* Framer Motion component for each logo */}
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
            className='absolute inset-0 flex items-center justify-center'
            // Animation for when the logo enters
            initial={{y: '10%', opacity: 0, filter: 'blur(8px)'}}
            // Animation for when the logo is displayed
            animate={{
              y: '0%',
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            // Animation for when the logo exits
            exit={{
              y: '-20%',
              opacity: 0,
              filter: 'blur(6px)',
              transition: {
                type: 'tween',
                ease: 'easeIn',
                duration: 0.3,
              },
            }}>
            {/*<CurrentLogo className='size-14 max-w-[80%] max-h-[80%] object-contain' />*/}
            <Icon name={currenLogo} className='size-7 md:size-14 opacity-60' />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  },
)

// Main LogoCarousel component
export const LogoCarousel = ({columnCount = 2}: {columnCount?: number}) => {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  // Memoize the array of logos to prevent unnecessary re-renders
  const allLogos = useMemo(
    () =>
      [
        {name: 'Apple', id: 1, icon: 'auto-protect'},
        {name: 'CEO Supabase', id: 2, icon: 'facebook-solid'},
        {name: 'Vercel', id: 3, icon: 'instagram'},
        {name: 'Lowes', id: 4, icon: 'bigticket'},
        {name: 'Ally', id: 5, icon: 'nfc'},
        // {name: 'Pierre', id: 6, icon: 'google'},
        {name: 'BMW', id: 7, icon: 'engagement'},
        {name: 'Claude', id: 8, icon: 're-up.ph'},
        {name: 'Nextjs', id: 9, icon: 'globe-solid'},
        // {name: 'Tailwind', id: 10, icon: 'linkedin'},
        // {name: 'Upstash', id: 11, icon: 'heart-light'},
        {name: 'Typescript', id: 12, icon: 'dark-theme'},
        // {name: 'Stripe', id: 13, icon: 'card-scan'},
        {name: 'OpenAI', id: 14, icon: 'whatsapp-solid'},
      ] as Logo[],
    [],
  )

  // Distribute logos across columns when the component mounts
  useEffect(() => {
    const distributedLogos = distributeLogos(allLogos, columnCount)
    setLogoSets(distributedLogos)
  }, [allLogos])

  // Function to update the current time (used for logo cycling)
  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  // Set up an interval to update the time every 100ms
  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  // Render the logo columns
  return (
    <div className='flex justify-between w-full'>
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}
