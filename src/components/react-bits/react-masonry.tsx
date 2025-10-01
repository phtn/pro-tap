import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const get = () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof matchMedia === 'undefined') {
      return defaultValue
    }
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue
  }

  const [value, setValue] = useState<number>(get)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof matchMedia === 'undefined') {
      return
    }

    const handler = () => setValue(get)
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler))
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener('change', handler)
      )
  }, [queries])

  return value
}

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return [ref, size] as const
}

interface ReactMasonryItem {
  id: string;
  content: ReactNode;
  height: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface ReactGridItem extends ReactMasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ReactMasonryProps {
  items: ReactMasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  gap?: number;
  columns?: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  className?: string;
  itemClassName?: string;
}

export const ReactMasonry: React.FC<ReactMasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = false,
  gap = 24,
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  className = '',
  itemClassName = '',
}) => {
  const responsiveColumns = useMedia(
    [
      '(min-width: 1280px)', // xl
      '(min-width: 1024px)', // lg
      '(min-width: 768px)', // md
      '(min-width: 640px)', // sm
    ],
    [columns.xl, columns.lg, columns.md, columns.sm],
    1
  )

  const [measureRef, { width }] = useMeasure<HTMLDivElement>()

  // Combine refs for both measuring and GSAP scope
  const containerScope = useRef<HTMLDivElement>(null)
  const setRefs = (element: HTMLDivElement | null) => {
    measureRef.current = element
    containerScope.current = element
  }

  const getInitialPosition = (item: ReactGridItem) => {
    const containerRect = containerScope.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }

    let direction = animateFrom
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right']
      direction = dirs[
        Math.floor(Math.random() * dirs.length)
      ] as typeof animateFrom
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 }
      case 'bottom':
        return { x: item.x, y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 200 }
      case 'left':
        return { x: -200, y: item.y }
      case 'right':
        return { x: (typeof window !== 'undefined' ? window.innerWidth : 1200) + 200, y: item.y }
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        }
      default:
        return { x: item.x, y: item.y + 100 }
    }
  }

  const grid = useMemo<ReactGridItem[]>(() => {
    if (!width) return []
    const colHeights = new Array(responsiveColumns).fill(0)
    const totalGaps = (responsiveColumns - 1) * gap
    const columnWidth = (width - totalGaps) / responsiveColumns

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights))
      const x = col * (columnWidth + gap)
      const height = item.height
      const y = colHeights[col]

      colHeights[col] += height + gap
      return { ...item, x, y, w: columnWidth, h: height }
    })
  }, [responsiveColumns, items, width, gap])

  const hasMounted = useRef(false)

  useGSAP(
    () => {
      if (!containerScope.current) return

      grid.forEach((item, index) => {
        const element = containerScope.current!.querySelector(
          `[data-masonry-id="${item.id}"]`
        )
        if (!element) return

        const animProps = {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
        }

        if (!hasMounted.current) {
          const start = getInitialPosition(item)
          gsap.fromTo(
            element,
            {
              opacity: 0,
              x: start.x,
              y: start.y,
              width: item.w,
              height: item.h,
              ...(blurToFocus && { filter: 'blur(10px)' }),
            },
            {
              opacity: 1,
              ...animProps,
              ...(blurToFocus && { filter: 'blur(0px)' }),
              duration: 0.8,
              ease: 'power3.out',
              delay: index * stagger,
            }
          )
        } else {
          gsap.to(element, {
            ...animProps,
            duration,
            ease,
            overwrite: 'auto',
          })
        }
      })

      hasMounted.current = true
    },
    {
      scope: containerScope,
      dependencies: [grid, stagger, animateFrom, blurToFocus, duration, ease],
    }
  )

  const handleMouseEnter = (element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = (element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const totalHeight = useMemo(() => {
    if (grid.length === 0) return 0
    const colHeights = new Array(responsiveColumns).fill(0)

    grid.forEach((item) => {
      const col = Math.floor(item.x / (item.w + gap))
      colHeights[col] = Math.max(colHeights[col], item.y + item.h)
    })

    return Math.max(...colHeights)
  }, [grid, responsiveColumns, gap])

  return (
    <div
      ref={setRefs}
      className={`relative w-full ${className}`}
      style={{ height: totalHeight }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-masonry-id={item.id}
          className={`absolute cursor-pointer ${itemClassName} ${item.className || ''}`}
          style={{
            willChange: 'transform, width, height, opacity',
            ...item.style,
          }}
          onClick={item.onClick}
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}

// Example usage component
export const ReactMasonryExample: React.FC = () => {
  const sampleItems: ReactMasonryItem[] = [
    {
      id: '1',
      height: 200,
      content: (
        <div className='w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg p-4 text-white'>
          <h3 className='text-lg font-bold mb-2'>Card Title 1</h3>
          <p className='text-sm'>
            This is a sample card with gradient background.
          </p>
        </div>
      ),
      onClick: () => console.log('Clicked card 1'),
    },
    {
      id: '2',
      height: 300,
      content: (
        <div className='w-full h-full bg-white border-2 border-gray-200 rounded-lg p-4 shadow-lg'>
          <div className='w-12 h-12 bg-green-500 rounded-full mb-3' />
          <h3 className='text-lg font-bold mb-2 text-gray-800'>Feature Card</h3>
          <p className='text-sm text-gray-600'>
            This card demonstrates how you can render any React content inside
            the masonry layout. You have full control over styling and
            interactivity.
          </p>
          <button className='mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors'>
            Learn More
          </button>
        </div>
      ),
    },
    {
      id: '3',
      height: 150,
      content: (
        <div className='w-full h-full bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg flex items-center justify-center'>
          <div className='text-center text-white'>
            <div className='text-2xl font-bold'>42</div>
            <div className='text-sm'>Metric Value</div>
          </div>
        </div>
      ),
    },
    {
      id: '4',
      height: 250,
      content: (
        <div className='w-full h-full bg-gray-900 text-white rounded-lg p-4'>
          <h3 className='text-lg font-bold mb-2'>Code Snippet</h3>
          <pre className='text-xs bg-gray-800 p-2 rounded overflow-auto'>
            <code>{`const greeting = "Hello World!";
console.log(greeting);

function animate() {
  requestAnimationFrame(animate);
}`}
            </code>
          </pre>
        </div>
      ),
    },
    {
      id: '5',
      height: 180,
      content: (
        <div className='w-full h-full bg-white border border-gray-200 rounded-lg p-4 shadow-md'>
          <div className='flex items-center mb-2'>
            <div className='w-8 h-8 bg-blue-500 rounded-full mr-2' />
            <h4 className='font-semibold'>User Profile</h4>
          </div>
          <p className='text-sm text-gray-600 mb-3'>
            Interactive user profile card with avatar and details.
          </p>
          <div className='flex space-x-2'>
            <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded'>
              React
            </span>
            <span className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded'>
              TypeScript
            </span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        React Masonry Example
      </h1>
      <ReactMasonry
        items={sampleItems}
        gap={16}
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        animateFrom='bottom'
        scaleOnHover
        hoverScale={0.98}
        stagger={0.1}
        className='max-w-6xl mx-auto'
        itemClassName='transition-all duration-300'
      />
    </div>
  )
}
