'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'

import {
  Slot,
  type WithAsChild,
  type DOMMotionProps,
} from '@/components/animate-ui/primitives/animate/slot'

type ButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
  }
>

function Button ({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonProps) {
  // const Component = asChild ? Slot : motion.button;

  if (asChild) {
    const { children, ...rest } = props as HTMLMotionProps<'button'> & {
      children: React.ReactElement;
    }

    return (
      <Slot<HTMLButtonElement>
        data-slot='button'
        {...(rest as DOMMotionProps<HTMLButtonElement>)}
      >
        {children}
      </Slot>
    )
  }

  return (
    <motion.button
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props}
    />
  )
}

export { Button, type ButtonProps }
