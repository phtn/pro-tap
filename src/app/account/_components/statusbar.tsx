import {ClassName} from '@/app/types'
import {Counter} from '@/components/experimental/counter'
import {CircleProgress} from '@/components/kokonutui/apple-activity-card'
import TextAnimate from '@/components/ui/text-animate'
import {useMobile} from '@/hooks/use-mobile'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import React, {useMemo} from 'react'

interface ControlItem {
  id: string
  icon: IconName
  title: string
  status: string
  enabled: boolean
  className?: ClassName
  href: string
  progress: number
}

interface StatusbarProps {
  progressOne: number
  progressTwo: number
}

export const StatusBar: React.FC<StatusbarProps> = ({
  progressOne,
  progressTwo,
}) => {
  const isMobile = useMobile()

  const controls = useMemo(
    () =>
      [
        {
          id: 'protap-user',
          icon: 'shield-keyhole',
          title: 'Protap',
          status: 'Activate now',
          className: 'text-teal-600 dark:text-teal-300',
          href: '/pricing',
          enabled: true,
          progress: progressOne,
        },
        {
          id: 'profile',
          icon: 'user-profile',
          title: 'Personalize',
          status: 'Get Started',
          className: 'text-primary-hover dark:text-sky-300',
          href: '#',
          enabled: true,
          progress: progressTwo,
        },
        // {
        //   id: "next",
        //   icon: "chevron-right",
        //   title: "Next Steps",
        //   status: "Enable Chat",
        //   className: "dark:text-orange-200",
        //   href: "#",
        //   enabled: !isMobile,
        // },
        // {
        //   id: "affiliate",
        //   icon: "checkmark-circle",
        //   title: "Affiliate Account",
        //   status: "Get Started",
        //   enabled: false,
        // },
        // {
        //   id: "merchant",
        //   icon: "search",
        //   title: "Merchant Account",
        //   status: "Get Started",
        //   enabled: false,
        // },
      ] as ControlItem[],
    [],
  )

  const statusList = useMemo(
    () => (isMobile ? controls.slice(0, 2) : controls),
    [controls],
  )

  const t1 = useMemo(
    () => ({
      title: 'Progress',
      from: 0,
      target: progressOne,
      gradient: 'from-gray-100 to-blue-200',
      suffix: '%',
      size: 'small',
    }),
    [progressOne],
  )

  const protapStatus = useMemo(
    () => ({
      label: 'Activation',
      value: progressOne,
      color: 'oklch(0.70 0.12 183)',
      size: 44,
      current: progressOne,
      target: 100,
      unit: '%',
    }),
    [progressOne],
  )

  return (
    <div
      className={cn(
        'flex items-center justify-evenly w-[94lvw] mx-auto md:w-6xl h-24 md:h-28 overflow-hidden px-2 rounded-4xl',
        'bg-gradient-to-b from-white/95 to-white/95 dark:from-zinc-600/95 dark:to-zinc-700/95 backdrop-blur-sm',
        ' border-[0.33px] border-zinc-300 dark:border-zinc-800/60',
        ' shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20',
        'font-figtree font-semibold',
      )}
      // className="w-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center"
    >
      <div className='flex items-center justify-around w-full'>
        <div className='flex items-center justify-center w-full'>
          {statusList
            .filter((control) => !!control.enabled)
            .map((control, i) => (
              <div
                key={control.id}
                className='flex items-center justify-center px-3 w-fit border-r-[0.33px] dark:border-zinc-600 last:border-r-0 flex-1 min-w-0'>
                <Link
                  href={control.href}
                  className='hover:bg-zinc-400/15 py-3 flex items-center justify-center rounded-3xl gap-10 min-w-0 w-full'>
                  <div className='relative flex items-center justify-center text-zinc-500 dark:text-zinc-300 size-12 aspect-square flex-shrink-0'>
                    {/* <Icon name={control.icon} className="size-8" /> */}
                    <CircleProgress
                      width={3}
                      index={i}
                      data={protapStatus}
                      className='rotate-[180deg]'
                    />
                    <div className='absolute font-space font-semibold text-xl'>
                      <Counter task={t1} index={i} />
                    </div>
                  </div>
                  <div className='flex flex-col min-w-0'>
                    <TextAnimate
                      text={control.title}
                      type='whipInUp'
                      delay={(i + 1) * 100}
                      className='text-lg md:text-xl truncate font-semibold font-figtree tracking-tight'
                    />

                    <div
                      className={cn(
                        'leading-none font-semibold flex items-center space-x-2 w-fit text-sm py-px rounded-full truncate',
                        control.className,
                      )}>
                      <p className=''>{control.status}</p>
                      <Icon
                        name='arrow-right'
                        className='size-4 hidden md:flex'
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
