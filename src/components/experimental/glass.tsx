import { useId } from 'react'

export function GlassFilter () {
  const filterId = useId()

  return (
    <svg className='hidden'>
      <title>Glass Effect Filter</title>
      <defs>
        <filter
          id={filterId}
          x='-50%'
          y='-50%'
          width='150%'
          height='150%'
          colorInterpolationFilters='sRGB'
        >
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.05 0.05'
            numOctaves='1'
            seed='1'
            result='turbulence'
          />
          <feGaussianBlur
            in='turbulence'
            stdDeviation='2'
            result='blurredNoise'
          />
          <feDisplacementMap
            in='SourceGraphic'
            in2='blurredNoise'
            scale='80'
            xChannelSelector='R'
            yChannelSelector='B'
            result='displaced'
          />
          <feGaussianBlur in='displaced' stdDeviation='4' result='finalBlur' />
          <feComposite in='finalBlur' in2='finalBlur' operator='over' />
        </filter>
      </defs>
    </svg>
  )
}
