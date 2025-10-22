import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useRouter} from 'next/navigation'
import {ReactNode, useCallback} from 'react'
import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
} from '../ui/texture-card'
import {SexyButton} from './sexy-button-variants'

interface Feature {
  icon: IconName
  text: string
}

interface PricingCardProps {
  title: ReactNode
  price: string
  period: string
  billing: string
  buttonText: string
  gradient: string
  features: Feature[]
  footerText: string
  popular?: boolean
}

export function PricingCard({
  title,
  price,
  period,
  billing,
  buttonText,
  gradient,
  features,
  footerText,
  popular = false,
}: PricingCardProps) {
  const router = useRouter()
  const handleRoute = useCallback(() => {
    router.push('https://checkout.xendit.co/od/autoprotectprotap2025')
  }, [router])
  return (
    <div
      className={cn(
        'min-w-sm h-fit overflow-hidden rounded-4xl',
        'bg-gradient-to-b from-white/95 to-white/95 dark:from-zinc-600/95 dark:to-zinc-700/95 backdrop-blur-sm',
        ' border-[0.33px] border-zinc-300 dark:border-zinc-800/60',
        ' shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20',
        'font-figtree font-semibold',
      )}>
      {popular && (
        <div className='font-figtree absolute top-0 left-1/2 transform -translate-x-1/2 z-10'>
          <div className='bg-gradient-to-b from-teal-600/40 via-teal-500/40 via-33% to-teal-500/40 text-white tracking-normal px-6 py-1 rounded-b-lg text-xs font-medium shadow-md'>
            Most Popular
          </div>
        </div>
      )}

      <TextureCardHeader>
        <div
          className={cn(
            'h-fit p-8 text-zinc-700 dark:text-foreground font-sans',
            '',
          )}>
          <div className='space-y-6'>
            <h3 className='text-xl text-orange-200 tracking-tighter font-bold'>
              {title}
            </h3>

            <div className='space-y-1'>
              <div className='flex items-center'>
                <div className='text-4xl font-bold font-sans tracking-tighter'>
                  <span className='font-figtree font-light opacity-80 pr-1'>
                    ₱
                  </span>
                  {price}
                </div>
                <div className='max-w-[14ch] leading-4 px-3 text-base tracking-tight font-figtree'>
                  {period} coverage
                </div>
              </div>
              <p className='text-sm italic opacity-80 font-space font-normal'>
                billed {billing}
              </p>
            </div>

            <div className='relative'>
              <div className='hidden absolute select-none pointer-events-none z-0 bottom-8 -left-16 h-6 w-32 -rotate-3 dark:bg-yellow-200 rounded-full blur-xl' />
              <div className='hidden absolute select-none pointer-events-none z-0 -bottom-2 -left-16 h-6 w-32 -rotate-3 dark:bg-orange-300/80 rounded-full blur-xl' />
              <div className='hidden absolute select-none pointer-events-none z-0 bottom-10 -right-16 h-6 w-32 -rotate-12 dark:bg-yellow-200 rounded-full blur-xl' />
              <div className='hidden absolute select-none pointer-events-none z-0 bottom-1 -right-16 h-10 w-32 rotate-6 dark:bg-orange-300/60 rounded-full blur-xl' />
              <SexyButton
                onClick={handleRoute}
                className='relative z-20 w-full'
                size='lg'
                variant='primary'>
                {buttonText}
              </SexyButton>
            </div>
          </div>
        </div>
      </TextureCardHeader>
      <TextureCardContent className='h-full text-zinc-700 px-2 dark:text-foreground'>
        <div className='bg-white dark:bg-transparent space-y-4'>
          <div className='space-y-2.5 px-3'>
            {features.map((feature, index) => (
              <div key={index} className='h-10 flex items-center gap-4'>
                <Icon name={feature.icon} className='h-5 w-5 flex-shrink-0' />
                <span className=''>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </TextureCardContent>
      {/* <TextureSeparator /> */}
      <TextureCardFooter className='dark:bg-zinc-800/50 bg-slate-100 h-12'>
        <div className='w-full flex items-center justify-between pt-1.5 px-5 font-figtree '>
          <div className='flex item-center space-x-1'>
            <Icon
              name='shield-checkmark'
              className='size-3.5 flex-shrink-0 opacity-50'
            />
            <p className='text-xs text-zinc-600 dark:text-zinc-200 font-space font-bold opacity-60'>
              {footerText}
            </p>
          </div>
          <p className='text-sm text-teal-500 dark:text-teal-400 font-normal'>
            All systems secure.
          </p>
        </div>
      </TextureCardFooter>
    </div>
  )
}
