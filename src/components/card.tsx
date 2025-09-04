'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Card = () => {
  const controls = useAnimation()
  const progress = 65 // The progress percentage

  useEffect(() => {
    // Animate the width of the progress bar to the target percentage
    controls.start(
      { width: `${progress}%` },
      { duration: 1.5, ease: 'easeOut' }
    )
  }, [controls, progress])

  return (
    <div className='flex items-center justify-center min-h-screen bg-white p-4'>
      <div className='relative w-full max-w-md rounded-3xl bg-dark-card-bg p-6 shadow-xl'>
        {/* Header Section */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-2 text-white'>
            <Sparkles className='w-5 h-5 text-gray-400' />
            <h2 className='text-lg font-semibold'>Project Progress</h2>
          </div>
          {/* Button for "Onboarding prototype" with updated styling */}
          <Button className='bg-black text-white rounded-2xl px-4 py-2 shadow-beta-button hover:bg-gray-800 transition-all duration-200 ease-in-out active:translate-y-0.5 active:shadow-none'>
            Onboarding prototype
          </Button>
        </div>

        {/* Progress Bar Section */}
        <div className='mb-6'>
          <p className='text-5xl font-bold text-white mb-2'>{progress}%</p>
          <div className='relative h-4 rounded-full bg-gray-700'>
            {/* Glow layer - positioned behind the main bar */}
            <motion.div
              className='absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-progress-start to-progress-end z-0'
              style={{ filter: 'blur(10px)' }} // Apply blur directly for the glow effect
              initial={{ width: 0 }}
              animate={controls}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            {/* Actual progress bar - on top of the glow */}
            <motion.div
              className='absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-progress-start to-progress-end z-10'
              initial={{ width: 0 }}
              animate={controls}
            />
            <span className='absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-white z-20'>
              Due July 28
            </span>
          </div>
        </div>

        {/* Collaborators Section */}
        <div className='flex items-center justify-between mb-6'>
          <p className='text-gray-300 text-sm'>Collaborators 3</p>
          <div className='flex -space-x-2'>
            <div className='w-10 h-10 border-2 border-dark-card-bg' />
            <div className='w-10 h-10 border-2 border-dark-card-bg' />
            <div className='w-10 h-10 border-2 border-dark-card-bg' />
          </div>
        </div>

        {/* More details button */}
        <div className='flex justify-end'>
          <Button
            variant='ghost'
            className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-full px-4 py-2'
          >
            More details <ArrowRight className='ml-2 w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface InfoCardProps {
  doc: string;
  title: string;
  status: string;
  value: number;
  extra?: string;
}
export const InfoCard = ({
  doc,
  title,
  status,
  value,
  extra,
}: InfoCardProps) => {
  return (
    <div className='flex items-center min-w-2xs h-40 overflow-hidden justify-center'>
      <div className='w-full max-w-sm bg-gradient-to-r from-slate-600 via-slate-500 to-slate-500 rounded-lg p-4 border border-muted-foreground/50 shadow-xs'>
        <div className='mb-6'>
          <p className='flex items-center space-x-1 text-[8px] font-mono uppercase tracking-widest text-slate-200/80'>
            <span>{doc}</span>
          </p>
          <h2 className='mt-1 flex items-center justify-between text-2xl capitalize tracking-tighter font-space font-semibold text-slate-200'>
            <span>{title}</span>
            <span className='text-lg'>{extra}</span>
          </h2>
        </div>
        {/*
        <div className="flex items-center py-2">
          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
          <span className="ml-3 text-base text-white">Sent</span>
          <span className="ml-auto text-base text-gray-300">29,486</span>
          <span className="ml-2 text-base text-gray-300">100%</span>
        </div>

        <div className="my-2 border-t border-gray-800" />
        */}
        <div className='flex items-center text-slate-200 pt-2 capitalize tracking-tighter'>
          <div
            className={cn(
              'size-2.5 aspect-square flex-shrink-0 drop-shadow-xs rounded-full bg-sky-500',
              { 'bg-red-500': value < 50, 'bg-orange-300': value < 70 }
            )}
          />
          <span className='ml-2 text-base'>{status}</span>
          <span className='ml-auto text-base text-slate-300'>status:</span>
          <span className='ml-2 text-base text-slate-200'>
            <span className='font-medium px-px'>{value}</span>
            <span className='text-sm'>%</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export const GlassCard = () => {
  return (
    <div
      className='relative flex items-center justify-center min-h-screen bg-cover bg-center p-4'
      style={{
        backgroundImage: 'url(\'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-06%20at%209.58.45%E2%80%AFAM-UeYXVFVPAtFva91a8myP0eRL9TjpBN.png\')',
      }}
    >
      {/* Outer container for the stacked cards */}
      <div className='relative w-88 h-[380px]'>
        {/* Bottom Card (larger, slightly more translucent) */}
        <div
          className='absolute inset-0 rounded-3xl overflow-hidden size-96
                     bg-gray-900 bg-opacity-20 backdrop-filter backdrop-blur-md backdrop-brightness-75 aspect-square
                     border border-white border-opacity-15 shadow-lg'
        />

        {/* Top Card (main content, slightly smaller and centered) */}
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-80 h-80 p-6 rounded-3xl overflow-hidden
                     bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-lg backdrop-brightness-75
                     border border-white border-opacity-20 shadow-lg flex flex-col'
        >
          {/* Top Section: Money Left */}
          <div className='mb-6'>
            <p className='text-sm text-gray-300 uppercase tracking-wide mb-2'>
              MONEY LEFT
            </p>
            <div className='flex items-baseline text-white'>
              <span className='text-5xl font-bold'>$892</span>
              <span className='text-2xl font-semibold'>.64</span>
            </div>
            <p className='text-sm text-gray-400 mt-1'>/ $6,200 BUDGETED</p>
          </div>

          {/* Chart Section */}
          <div className='flex-grow flex items-center justify-center py-4'>
            <svg viewBox='0 0 300 150' className='w-full h-auto'>
              <defs>
                <linearGradient
                  id='chartGradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='0%'
                >
                  <stop offset='0%' stopColor='#FF6B6B' /> {/* Red */}
                  <stop offset='50%' stopColor='#FFD166' />{' '}
                  {/* Orange/Yellow */}
                  <stop offset='100%' stopColor='#28C76F' /> {/* Green */}
                </linearGradient>
              </defs>

              {/* Dashed trend line */}
              <path
                d='M 20 120 L 280 30'
                stroke='#A0AEC0'
                strokeDasharray='5,5'
                strokeWidth='2'
                fill='none'
                opacity='0.5'
              />

              {/* Main data line (simplified path for demonstration) */}
              <path
                d='M 20 100 C 60 60, 100 120, 140 80 S 220 40, 280 50'
                stroke='url(#chartGradient)'
                strokeWidth='4'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              />

              {/* End point circle */}
              <circle cx='280' cy='50' r='6' fill='#28C76F' />
            </svg>
          </div>

          {/* Bottom Section: Budget Delta */}
          <div className='flex justify-between items-center mt-auto pt-4'>
            <p className='text-sm text-gray-300 uppercase tracking-wide'>
              BUDGET DELTA
            </p>
            <p className='text-lg font-semibold text-[#28C76F]'>+ $120</p>
          </div>
        </div>
      </div>
    </div>
  )
}
