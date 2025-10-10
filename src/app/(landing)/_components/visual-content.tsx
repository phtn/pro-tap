import {Hex} from '@/components/experimental/hex'
import {ProtapCard} from '@/components/experimental/protap-card'
import {useToggle} from '@/hooks/use-toggle'
import {cn} from '@/lib/utils'

export const VisualContent = () => {
  const {on, toggle} = useToggle()
  return (
    <div className='relative h-full flex flex-col justify-center xl:overflow-visible overflow-hidden'>
      <div className='aspect-square m-w-sm md:max-w-xl mx-auto relative'>
        {/* Main character illustration placeholder */}
        <div className='relative h-full w-full rotate-90 flex items-center justify-center'>
          <Hex
            size={320}
            className={cn(
              'scale-75 md:scale-100 absolute blur-sm -bottom-4 dark:skew-x-[45deg] -skew-x-[50deg] right-2 dark:fill-teal-100/70 fill-foreground/60',
              'transition-all duration-700 delay-0',
              {'-skew-x-[35deg] scale-70 md:-translate-y-6': on},
            )}
          />
          <Hex
            size={240}
            className={cn(
              'scale-75 md:scale-100 dark:fill-cyan-300 fill-primary-hover rounded-full blur-2xl -skew-x-6',
            )}
          />
        </div>
      </div>
      <div
        onClick={toggle}
        className='absolute -top-6 size-full flex items-center justify-center'>
        <ProtapCard />
      </div>
    </div>
  )
}
