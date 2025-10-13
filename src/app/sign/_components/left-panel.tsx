import {Prism} from '@/components/react-bits/prism'
import {TextTrain} from '@/components/ui/text-train'
import {useMobile} from '@/hooks/use-mobile'
import {Icon} from '@/lib/icons'

export const LeftPanel = () => {
  const isMobile = useMobile()
  return (
    <div className='relative lg:w-full h-screen md:h-[74lvh] overflow-hidden bg-gradient-to-br from-orange-200/0 via-amber-50/0 to-cyan-100/0 flex flex-col'>
      <div className='absolute w-full h-full md:opacity-100 opacity-30'>
        <Prism
          animationType='3drotate'
          timeScale={0.001}
          height={isMobile ? 4.8 : 4.8}
          baseWidth={5.0}
          scale={1}
          hueShift={0.1}
          colorFrequency={1}
          noise={0.1}
          glow={1}
        />
      </div>
      <div className='h-full p-12 relative z-50'>
        {/* Brand Logo */}
        <div className='md:hidden absolute top-0 left-8 flex items-center text-foreground'>
          <Icon name='protap' className='size-20 opacity-80' />
        </div>

        {/* Main Content */}
        <div className='flex flex-col space-y-6'>
          <div className='hidden _flex flex-col justify-center items-center pt-12 md:pt-20 space-y-1 md:space-y-3'>
            <div className='block'>
              <TextTrain
                words={[
                  'Level up',
                  'Grow your',
                  'Break thru your',
                  'Start building',
                  'Make the world',
                  'Become famous',
                  "It's your turn",
                ]}
                className='text-sky-950 md:dark:text-sky-50 dark:text-sky-50 font-semibold md:font-extrabold text-3xl tracking-tighter md:text-6xl whitespace-nowrap md:tracking-tight'
              />
            </div>
            <div>
              <TextTrain
                delay={50}
                words={[
                  'your Web Presence.',
                  'Professional Network.',
                  'current Revenue limits.',
                  'your brand the right way.',
                  'listen to your Masterpiece.',
                  'Become an Inspiration.',
                  'for Status Upgrade.',
                ]}
                className='text-sky-950 md:dark:text-orange-50 dark:text-sky-50/80 text-xl md:text-3xl font-space font-medium max-w-[20ch] tracking-tighter'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
