'use client';

import * as React from 'react';
import { motion, isMotionComponent, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<keyof HTMLElementTagNameMap>,
  'ref'
>;

type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  children?: React.ReactElement | null;
} & DOMMotionProps<T>;

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

function mergeProps<T extends HTMLElement>(
  childProps: AnyProps,
  slotProps: DOMMotionProps<T>,
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className as string,
      slotProps.className as string,
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    };
  }

  return merged;
}

const Slot = React.forwardRef(function SlotInner<T extends HTMLElement = HTMLElement>(
  { children, ...props }: SlotProps<T>,
  ref: React.Ref<T>,
) {
  // Determine a safe type without touching children.type before validation
  const safeType = React.isValidElement(children) ? children.type : 'div';

  const isAlreadyMotion =
    typeof safeType === 'object' &&
    safeType !== null &&
    isMotionComponent(safeType as React.ElementType);

  const Base = React.useMemo<React.ForwardRefExoticComponent<DOMMotionProps<T> & React.RefAttributes<T>>>(
    () =>
      isAlreadyMotion
        ? (safeType as unknown as React.ForwardRefExoticComponent<DOMMotionProps<T> & React.RefAttributes<T>>)
        : (motion.create(safeType as React.ElementType) as unknown as React.ForwardRefExoticComponent<DOMMotionProps<T> & React.RefAttributes<T>>),
    [isAlreadyMotion, safeType],
  );

  if (!React.isValidElement(children)) return null;

  const { ref: childRef, ...childProps } = children.props as AnyProps;

  const mergedProps = mergeProps<T>(childProps, props as DOMMotionProps<T>);

  return (
    <Base
      {...mergedProps}
      ref={mergeRefs(childRef as React.Ref<T>, ref)}
    />
  );
}) as unknown as <T extends HTMLElement = HTMLElement>(
  props: SlotProps<T> & React.RefAttributes<T>,
) => React.ReactElement | null;

export {
  Slot,
  type SlotProps,
  type WithAsChild,
  type DOMMotionProps,
  type AnyProps,
};
