'use client'

import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'

interface HyperButtonProps {
  label?: string
  onClick?: () => void
}

export default function HyperButton({
  label = 'click',
  onClick,
}: HyperButtonProps) {
  return (
    <div className='w-full h-96 flex items-center justify-center overflow-hidden'>
      <div className='relative'>
        {/* Deep shadow layer - creates the main depth */}
        <div
          className='absolute inset-0 rounded-full pointer-events-none'
          style={{
            filter: 'blur(40px)',
            transform: 'scale(1.8) translateY(25px)',
            background:
              'radial-gradient(ellipse 150% 100% at 50% 50%, rgba(100, 120, 150, 0.35) 0%, rgba(80, 100, 130, 0.15) 40%, transparent 40%)',
            zIndex: 0,
          }}
        />

        {/* Mid shadow layer - adds definition */}
        <div
          className='absolute inset-0 rounded-full pointer-events-none'
          style={{
            filter: 'blur(25px)',
            transform: 'scale(1.5) translateY(18px)',
            background:
              'radial-gradient(ellipse 140% 90% at 50% 50%, rgba(120, 135, 160, 0.25) 0%, rgba(100, 115, 140, 0.08) 50%, transparent 50%)',
            zIndex: 0,
          }}
        />

        {/* Primary backlight - intense white glow */}
        <div
          className='absolute inset-0 rounded-full pointer-events-none'
          style={{
            filter: 'blur(60px)',
            transform: 'scale(0.4) translateY(-15px)',
            background:
              'radial-gradient(ellipse 200% 150% at 50% 25%, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 0.7) 100%, rgba(255, 255, 240, 0.8) 60%, transparent 50%)',
            zIndex: 0,
          }}
        />

        {/* Secondary white glow - adds intensity */}
        <div
          className='absolute inset-0 rounded-full pointer-events-none'
          style={{
            filter: 'blur(70px)',
            transform: 'scale(2.0) translateY(-10px)',
            background:
              'radial-gradient(ellipse 180% 130% at 50% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 250, 0.4) 30%, transparent 65%)',
            zIndex: 0,
          }}
        />

        {/* Bottom warm glow - very subtle, just peeks through */}
        <div
          className={cn(
            'absolute left-1/4 -translate-x-1/2 -top-3 pointer-events-none',
            'bg-gradient-to-r from-[#fae4b4cc]/90 via-[#ffe9be99] to-[#fff5d266] ',
            'blur-[24px] h-20 w-32 z-40 rounded-3xl',
          )}
        />
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 -top-3 pointer-events-none',
            'bg-gradient-to-r from-[#fff5]/90 via-[#fff]/80 to-[#fff5]/80 ',
            'blur-[6px] h-20 w-32 z-40 rounded-full',
          )}
        />
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/3 -top-1/5 pointer-events-none',
            'bg-gradient-to-r from-[#fff5]/90 via-[#fff]/80 to-[#fff5]/80 ',
            'blur-[4px] h-18 w-24 z-50 rounded-full',
          )}
        />
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/4 -top-1/5 pointer-events-none',
            'bg-gradient-to-r from-[#fff5]/90 via-[#fff]/80 to-[#fff5]/80 ',
            'blur-[2px] h-18 w-36 z-50 rounded-full',
          )}
        />
        {/* Core */}
        <div
          className={cn(
            'z-10 absolute inset-0 rounded-full pointer-events-none',
            'bg-[radial-gradient(ellipse_180%_130%_at_50%_30%,rgba(250,250,230,0.95)_80%,rgba(250,255,240,0.9)_100%,transparent_95%)]',
            'h-20 w-40 translate-x-[40px] -translate-y-6 blur-lg',
          )}
        />

        {/* The button itself */}
        <button
          onClick={onClick}
          className='z-100 relative px-10 py-4 bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-full flex items-center justify-between gap-16 transition-all duration-400 cursor-pointer hover:scale-101 active:scale-96'
          style={{
            boxShadow: `
              0 2px 4px rgba(0, 0, 0, 0.08),
              0 6px 12px rgba(0, 0, 0, 0.06),
              0 12px 24px rgba(0, 0, 0, 0.05),
              0 20px 40px rgba(0, 0, 0, 0.04),
              0 30px 60px rgba(0, 0, 0, 0.03),
              inset 0 1px 2px rgba(255, 255, 255, 0.95),
              inset 0 -1px 2px rgba(0, 0, 0, 0.04)
            `,
            border: '1px solid rgba(255, 255, 255, 0.85)',
          }}>
          <div
            className='absolute top-0 left-3 right-3 h-2/5 rounded-full pointer-events-none'
            style={{
              background:
                'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3), transparent)',
              opacity: 0.8,
            }}
          />

          {/* Text */}
          <span className='capitalize relative text-gray-900 font-medium text-base tracking-tight'>
            {label}
          </span>

          {/* Search Icon */}
          <div className='relative flex items-center justify-center'>
            <Icon
              name='zap-solid'
              className='w-5 h-5 text-gray-700'
              strokeWidth={2.5}
            />
          </div>
        </button>
      </div>
    </div>
  )
}
