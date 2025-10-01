'use client'

import {
  type ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  createAnimatable,
  engine,
  utils,
  type Scope,
  createScope,
  animate,
} from 'animejs'

interface Props {
  shouldAnimate?: boolean;
  children?: ReactNode;
  fps?: number;
  duration?: number;
  count?: number;
  root: RefObject<HTMLDivElement | null>;
}
export const ScopeBurst = ({
  shouldAnimate = true,
  fps = 120,
  duration = 5000,
  children,
  count = 16,
  root,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [_fps] = useState(fps)
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; scale: number; delay: number }>
  >([])

  const scope = useRef<Scope>(null)
  const particleRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: utils.random(-10, 10, 2),
      y: utils.random(-3, 3, 2),
      scale: 0,
      delay: utils.random(0, 1000),
    }))
    setParticles(newParticles)
    particleRefs.current = new Array(count).fill(null)
  }, [count])

  useLayoutEffect(() => {
    if (!root.current || particles.length === 0) return

    scope.current = createScope({ root: root.current })

    particles.forEach((particle, i) => {
      const el = particleRefs.current[i]

      if (el) {
        createAnimatable(el, {
          x: 0,
          y: 0,
          scale: particle.scale,
          delay: particle.delay,
        })
        animate(el, {
          x:
            particle.x +
            utils.random(
              utils.random(-16, -6, 0),
              particle.x + utils.random(6, 16, 0),
              2
            ) +
            'rem',
          y:
            // utils.random(utils.random(-8, -2, 0), utils.random(0, 6, 0), 2) +
            particle.y + 'rem',
          scale: [
            { from: utils.random(0, 0.3, 2), to: utils.random(0.8, 1.2, 2) },
            { to: 0 },
          ],
          // width: [{ from: 1, to: utils.random(4, 8, 0) }, { to: 8 }],
          delay: particle.delay + utils.random(20, 60, 0),
          loop: true,
        })
      }
    })

    return () => {
      scope.current?.revert()
    }
  }, [particles, root])

  useEffect(() => {
    engine.fps = _fps
    engine.resume()
  }, [_fps])

  return (
    <div className='particles-wrapper size-full flex flex-col items-center justify-center'>
      <div
        className='relative w-[36rem] h-20 -rotate-12 flex justify-center items-center overflow-hidden'
        ref={containerRef}
      >
        {particles.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              particleRefs.current[i] = el
            }}
            className='relative particle origin-center bg-amber-100 h-1 w-2'
          >
            <div className='absolute top-0 left-0 bg-amber-100 blur-xs scale-110 w-full h-full' />
          </div>
        ))}
      </div>
    </div>
  )
}
