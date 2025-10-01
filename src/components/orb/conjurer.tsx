'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { GlassFilter } from '../experimental/glass'
import { Palantir } from './palantir'
import { Burst } from '../experimental/burst'

const ConjurSight: React.FC = () => {

  const [sine, setSine] = useState(50)
  const [cosine, setCosine] = useState(50)
  const [showBlast, setShowBlast] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now() / 10000
      setSine(Math.min(Math.sin(now) * 100 * 2.5, 0))
      setCosine(Math.abs(Math.cos(now) * 100) * 1.5)
    }, 60)
    return () => clearInterval(interval)
  }, [])

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sine <= -1) {
      setShowBlast(true)
    } else {
      setShowBlast(false)
    }
  }, [sine])

  return (
    <div
      className={cn(
        'flex rounded-full flex-col items-center transition-all transform-gpu duration-1000 ease-in-out',
        ` bg-radial-[at_${cosine.toFixed(0)}%_${sine.toFixed(0)}%] from-sky-200 via-blue-300 to-indigo-400 to-90% backdrop-blur-md`
      )}
    >
      <Palantir
        darkness={0.002}
        size='50px'
        animationDuration={10}
        colors={{
          bg: 'var(--color-primary)',
        }}
        className='drop-shadow-xl'
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: oklch(0.646 0.03 352.53);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: oklch(0.2 0.2 352.53);
          cursor: pointer;
          border: none;
        }
      `}
      </style>
      <GlassFilter />
      <div className='hidden _flex space-x-3 text-pink-200 py-4'>
        <div
          ref={divRef}
          className='relative whitespace-nowrap rounded-sm w-16 h-5 text-right self-center text-xs text-stone-500 tracking-widest'
        >
          {showBlast && <Burst shouldAnimate />}
          {/* {showBlast && <BlastParticles ref={divRef} />} */}
          <span>
            {sine.toFixed(2)}-{showBlast ? 'T' : 'F'}
          </span>
        </div>
        <div className='opacity-60 font-thin px-2'>&middot;</div>
        <div className='w-16 text-left self-center h-5 text-xs text-gray-500 tracking-widest'>
          {cosine.toFixed(0)}
        </div>
      </div>
    </div>
  )
}

export default ConjurSight
