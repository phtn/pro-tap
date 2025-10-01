import { type ClassName } from '@/app/types'
import { cn } from '@/lib/utils'
import { type ReactNode, useRef } from 'react'

interface Props {
  size?: number;
  children?: ReactNode;
  className?: ClassName;
  rotate?: number;
}

export const HEX_SIZE = 80 // Overall width of the hexagon (point to point)

export const Hex = ({
  size = HEX_SIZE,
  rotate = 0,
  children,
  className,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div
      className={cn(
        'size-full rotate-90 relative flex items-center justify-center z-100',
        className
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          'size-full py-1 flex items-center justify-center absolute transition-all duration-1000 ease-linear'
        )}
      >
        <svg
          width={size + 20}
          height={size}
          viewBox='0 0 140 120'
          className={cn(
            'absolute z-0 group-hover/tile:opacity-100 opacity-0 transition-all duration-300'
          )}
        >
          <path
            d='M 40 0 L 100 0 Q 110 0 115 10 L 135 50 Q 140 60 135 70 L 115 110 Q 110 120 100 120 L 40 120 Q 30 120 25 110 L 5 70 Q 0 60 5 50 L 25 10 Q 30 0 40 0 Z'
            // stroke="#e0e0e01c" // Darker gray stroke for the gap effect
            strokeWidth='0'
          />
        </svg>
        <svg
          width={size}
          height={size + 20}
          viewBox='0 0 140 120'
          className='absolute [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]'
        >
          <path
            d='M 40 0 L 100 0 Q 110 0 115 10 L 135 50 Q 140 60 135 70 L 115 110 Q 110 120 100 120 L 40 120 Q 30 120 25 110 L 5 70 Q 0 60 5 50 L 25 10 Q 30 0 40 0 Z'
            // stroke="#e0e0e01c" // Darker gray stroke for the gap effect
            strokeWidth='0'
            className={cn('group-hover/tile:shadow-xs z-10 ', className)}
          />
        </svg>
      </div>
      <div className='relative z-10 flex items-center justify-center'>
        {children}
      </div>
    </div>
  )
}
