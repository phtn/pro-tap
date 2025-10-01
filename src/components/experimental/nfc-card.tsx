'use client'

import type React from 'react'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { LogoPro } from '../logo'

interface CreditCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  variant?: 'visa' | 'mastercard' | 'amex';
  className?: string;
}

export function CreditCard ({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  variant = 'visa',
  className,
}: CreditCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  const getCardGradient = () => {
    switch (variant) {
      case 'visa':
        return 'from-blue-600 via-blue-700 to-blue-800'
      case 'mastercard':
        return 'from-red-600 via-red-700 to-red-800'
      case 'amex':
        return 'from-green-600 via-green-700 to-green-800'
      default:
        return 'from-blue-600 via-blue-700 to-blue-800'
    }
  }

  const getCardLogo = () => {
    switch (variant) {
      case 'visa':
        return 'VISA'
      case 'mastercard':
        return 'MasterCard'
      case 'amex':
        return 'AMEX'
      default:
        return 'VISA'
    }
  }

  return (
    <div className={cn('perspective-1000', className)}>
      <div
        className={cn(
          'relative w-96 h-60 transition-all duration-700 transform-style-preserve-3d cursor-pointer',
          isFlipped && 'rotate-y-180'
        )}
        style={{
          transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) ${isFlipped ? 'rotateY(180deg)' : ''}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 w-full h-full rounded-3xl shadow-2xl backface-hidden',
            // "bg-gradient-to-br",
            // getCardGradient(),
            "bg-[url('/svg/card.svg')] bg-cover",
            'border border-neutral-400/80'
          )}
        >
          {/* Card shine effect */}
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60' />

          {/* Chip */}
          <div className='absolute top-16 left-8'>
            <div className='w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md shadow-lg'>
              <div className='w-full h-full bg-gradient-to-br from-yellow-200/50 to-transparent rounded-md' />
            </div>
          </div>

          {/* Card number */}
          <div className='absolute top-32 left-8 right-8'>
            <p className='text-white text-xl font-mono tracking-wider drop-shadow-lg'>
              {cardNumber}
            </p>
          </div>

          {/* Card holder and expiry */}
          <div className='absolute bottom-8 left-8 right-8 flex justify-between items-end'>
            <div>
              <p className='text-white/80 text-xs uppercase tracking-wide mb-1'>
                Card Holder
              </p>
              <p className='text-white text-sm font-semibold tracking-wide drop-shadow-lg'>
                {cardHolder}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-white/80 text-xs uppercase tracking-wide mb-1'>
                Expires
              </p>
              <p className='text-white text-sm font-semibold tracking-wide drop-shadow-lg'>
                {expiryDate}
              </p>
            </div>
          </div>

          {/* Card logo */}
          <div className='absolute top-8 right-8'>
            <p className='text-white text-lg font-bold tracking-wider drop-shadow-lg'>
              <LogoPro />
            </p>
          </div>

          {/* Contactless symbol */}
          <div className='absolute top-16 right-16'>
            <div className='w-6 h-6 border-2 border-white/60 rounded-full'>
              <div className='w-4 h-4 border-2 border-white/60 rounded-full m-0.5'>
                <div className='w-2 h-2 border-2 border-white/60 rounded-full m-0.5' />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 w-full h-full rounded-2xl shadow-2xl backface-hidden rotate-y-180',
            'bg-gradient-to-br',
            getCardGradient(),
            'border border-white/20'
          )}
        >
          {/* Magnetic stripe */}
          <div className='absolute top-12 left-0 right-0 h-12 bg-black' />

          {/* Signature strip */}
          <div className='absolute top-32 left-8 right-8 h-10 bg-white rounded'>
            <div className='absolute right-2 top-2 bottom-2 w-16 bg-white border border-gray-300 rounded flex items-center justify-center'>
              <span className='text-black text-sm font-mono'>{cvv}</span>
            </div>
          </div>

          {/* Terms text */}
          <div className='absolute bottom-8 left-8 right-8'>
            <p className='text-white/80 text-xs leading-relaxed'>
              This card is property of the bank. If found, please return to any
              branch. Authorized signature required. Not transferable.
            </p>
          </div>

          {/* Card logo on back */}
          <div className='absolute bottom-8 right-8'>
            <p className='text-white text-sm font-bold tracking-wider drop-shadow-lg'>
              {getCardLogo()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
