import {Icon} from '@/lib/icons'

export function Footer() {
  return (
    <footer className='pt-12 pb-28 bg-zinc-200 dark:bg-zinc-800/40'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12'>
          {/* Brand Section */}
          <div className='font-figtree'>
            <Icon name='protap' className='h-20 w-auto' />
            <p className='text-gray-400 mb-2'>Digital Insurance Platforms</p>
            <a
              href='mailto:support@pxgen.com'
              className='text-white hover:text-purple-400 transition-colors'>
              support@protap.ph
            </a>

            {/* Social Icons */}
            <div className='flex items-center gap-4 mt-6'>
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
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z' />
                </svg>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Twitter'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Facebook'>
                <Icon name='linkedin' className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='LinkedIn'>
                <Icon name='x-twitter' className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className='font-semibold mb-4'>Company</h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  About us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4 className='font-semibold mb-4'>Resource</h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Customer Stories
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  About us
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className='font-semibold mb-4'>Help</h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
