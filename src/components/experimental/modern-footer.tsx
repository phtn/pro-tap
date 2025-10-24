'use client'

import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useRouter} from 'next/navigation'
import {GridLayer} from '../ui/visual-1'

export function Footer() {
  const router = useRouter()
  return (
    <footer
      className={cn(
        // 'pt-12 pb-28 dark:bg-gray-900/20 bg-zinc-800',
        'relative rounded-t-4xl pt-12 pb-28 bg-gradient-to-b from-[#1a1a24] to-[#1a1a24] dark:from-zinc-600/50 dark:to-zinc-700/50 backdrop-blur-sm overflow-hidden',
      )}>
      <div className='container mx-auto px-10 font-figtree'>
        <div className='grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12'>
          {/* Brand Section */}
          <div className='font-figtree'>
            <div className='h-10 flex items-center overflow-hidden'>
              <Icon
                onClick={() => router.push('/alpha')}
                name='protap'
                className='text-zinc-200 md:h-36 h-20 w-auto cursor-pointer'
              />
            </div>
            <p className='opacity-70 text-zinc-200 tracking-wider font-tek mb-2'>
              Digital Insurance
            </p>

            {/* Social Icons */}
            <div className='flex items-center gap-6 mt-8'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Instagram'>
                <Icon name='instagram' className='size-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='YouTube'>
                <Icon name='facebook-solid' className='size-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='TikTok'>
                <svg
                  className='size-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />
                </svg>
              </a>

              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='x.com'>
                <Icon name='x-twitter' className='size-4' />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className='text-zinc-300'>
            <h4 className='font-semibold mb-4'>Company</h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='/pricing'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Products
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hidden text-gray-400 hover:text-white transition-colors text-sm'>
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Resource Links */}
          <div className='text-zinc-300'>
            <h4 className='font-semibold mb-4'>Resource</h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='#'
                  className='hidden text-gray-400 hover:text-white transition-colors text-sm'>
                  Careers
                </a>
              </li>
              <li>
                <a
                  href='/legal'
                  className='text-gray-400 hover:text-white transition-colors text-sm hover:underline decoration-dashed decoration-[0.33px] underline-offset-4 decoration-primary-hover dark:decoration-primary'>
                  Legal
                </a>
              </li>
            </ul>
          </div>
          <div className='text-zinc-300'>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='mailto:support@pxgen.com'
                  className='font-figtree text-primary-hover text-xs md:text-sm hover:text-primary transition-colors'>
                  support@protap.ph
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hidden text-gray-400 hover:text-white transition-colors text-sm'>
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <GridLayer className='absolute -rotate-10 skew-16 translate-y-8 -translate-x-6  bg-[size:40px_32px] opacity-40' />
    </footer>
  )
}
