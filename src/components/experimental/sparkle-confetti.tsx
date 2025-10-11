import {Icon} from '@/lib/icons'
import confetti from 'canvas-confetti'
import {RefObject} from 'react'
import {SexyButton} from './sexy-button-variants'

interface ConfettiOptions {
  origin?: {y: number}
  shapes?: confetti.Shape[]
  scalar?: number
  spread?: number
  startVelocity?: number
  decay?: number
  ticks?: number
  particleCount?: number
}

export const SparkleConfetti = ({
  ref,
}: {
  ref: RefObject<HTMLButtonElement | null>
}) => {
  const fireSparkles = (): void => {
    const sparkleShape = confetti.shapeFromPath({
      path: 'M7.53 1.282a.5.5 0 0 1 .94 0l.478 1.306a7.5 7.5 0 0 0 4.464 4.464l1.305.478a.5.5 0 0 1 0 .94l-1.305.478a7.5 7.5 0 0 0-4.464 4.464l-.478 1.305a.5.5 0 0 1-.94 0l-.478-1.305a7.5 7.5 0 0 0-4.464-4.464L1.282 8.47a.5.5 0 0 1 0-.94l1.306-.478a7.5 7.5 0 0 0 4.464-4.464Z',
    })

    const count = 320
    const defaults: ConfettiOptions = {
      origin: {y: 0.7},
      shapes: [sparkleShape],
      scalar: 1.44,
      spread: 180,
      startVelocity: 42,
      decay: 0.96,
      ticks: 256,
    }

    const fire = (particleRatio: number, opts: ConfettiOptions): void => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        origin: {y: 0.3},
        colors: [
          '#22d3ee',
          '#3c8df5',
          '#efefef',
          '#dedede',
          '#2f3c4f',
          '#ccfbf1',
        ],
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    fire(0.2, {
      spread: 60,
    })

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  return (
    <SexyButton
      ref={ref}
      size='sq'
      onClick={fireSparkles}
      className='rounded-full absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none hidden'>
      <Icon name='sparkle' className='size-2' />
    </SexyButton>
  )
}
