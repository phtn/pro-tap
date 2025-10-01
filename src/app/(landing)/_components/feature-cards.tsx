import {
  AnimatedCard,
  CardBody,
  CardDescription,
  CardTitle,
  CardVisual,
} from '@/components/ui/animated-card'
import { Visual1 } from '@/components/ui/visual-1'
import { Visual2 } from '@/components/ui/visual-2'

export const FeatureCards = () => {
  return (
    <div className='relative z-100 lg:h-[38vh] py-20 lg:py-0 h-fit space-y-10 lg:space-y-0 gap-x-8 flex-grow overflow-auto flex-col lg:flex-row flex items-center justify-evenly md:justify-between w-full'>
      {/* <BasicCard title="Account Personalization" /> */}
      <AnimatedFeatureCard title='Account Personalization'>
        <Visual2 mainColor='#ff6900' secondaryColor='#f54900' />
      </AnimatedFeatureCard>
      <AnimatedFeatureCard title='Account Personalization'>
        <Visual1 mainColor='#ff6900' secondaryColor='#f54900' />
      </AnimatedFeatureCard>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function AnimatedFeatureCard({ title, children }: FeatureCardProps) {
  return (
    <AnimatedCard>
      <CardVisual>{children}</CardVisual>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          This card will tell everything you want
        </CardDescription>
      </CardBody>
    </AnimatedCard>
  )
}
