'use client'

import { Icon } from '@/lib/icons'
import { animate, svg, stagger, createScope } from 'animejs'
import { ReactNode, useEffect, useRef } from 'react'

interface PathTracerProps {
  className?: string;
  children?: ReactNode;
}

export const PathTracer = ({ className, children }: PathTracerProps) => {
  const scope = useRef<Animation | null>(null)
  useEffect(() => {
    if (!scope.current) {
      return
    }
    scope.current = createScope({ root: '#daddy' }).add((self) => {
      animate(svg.createDrawable('path, .nice-slow-strokes'), {
        draw: ['0 0', '0 0.5', '0 1', '1 1'],
        ease: 'inOutQuad',
        duration: 9600,
        delay: stagger(400),
        loop: true,
        autoplay: true,
      }).play()
    }) as unknown as Animation

    return () => {
      scope.current?.play()
    }
  }, [])

  return (
    <div id='daddy' className='daddy absolute w-full flex justify-center'>
      <Icon name='bell' className='size-20 text-blue-200 nice-slow-strokes' />
      <svg
        width='300'
        height='300'
        viewBox='0 0 849 849'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className='logo-outline text-orange-200'
          d='M442 437.562V166C442 158 442 158 434 158H166C158 158 158 158 158 166V434C158 442 158 442 166 442H300M442 446.438V555.825C442 584 442 584 470.175 584H584V470.175C584 442 584 442 555.825 442H300M300 442V555.825C300 584 300 584 271.825 584H44.1746C16 584 16 584 16 555.825V44.1746C16 16 16 16 44.1746 16H555.825C584 16 584 16 584 44.1746V271.825C584 300 584 300 555.825 300H443M300 442V302C300 300 300 300 302 300H441'
          stroke='currentColor'
          strokeWidth={16}
        />
      </svg>
    </div>
  )
}
