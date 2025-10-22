'use client'

import {ProtapCard} from '@/components/experimental/protap-card'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {HyperList} from '@/components/list'
import {CardBody} from '@/components/ui/animated-card'
import {CardDescription, CardTitle} from '@/components/ui/card'
import TextAnimate from '@/components/ui/text-animate'
import {Visual1} from '@/components/ui/visual-1'
import {Widget, WidgetHeader} from '@/components/ui/widget'
import {Icon} from '@/lib/icons'
import {useMemo} from 'react'
import {ElectricCard} from './electric-card'

export default function AddServicePage() {
  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <div className='grid grid-cols-1 md:grid-cols-9 md:gap-4 gap-4'>
        <FeaturesPanel />
        <ActivationPanel />
      </div>
    </div>
  )
}

const ActivationPanel = () => (
  <div className='h-full w-full col-span-1 md:col-span-4 relative mt-12'>
    <Widget className='h-full space-y-0 md:h-[60lvh] w-full overflow-hidden p-0'>
      <Visual1 />
    </Widget>
    <div className='absolute top-8 h-fit w-full rounded-[19px] shadow-xl flex justify-center'>
      <ElectricCard>
        <div className='relative rounded-4xl m-0.5 border-4 border-[#bec4a9]'>
          <ProtapCard className='-m-0.5' />
          <div className='absolute h-10 w-52 bg-yellow-100/40 top-14 -left-4 blur-3xl -rotate-40' />
        </div>
      </ElectricCard>
    </div>
    <div className='absolute bottom-10 md:h-[28lvh] w-full px-6 py-10'>
      <WidgetHeader
        icon='right-double'
        title='Protap Activation'
        description=''
      />
      <div className='py-6 opacity-70 text-sm max-w-[45ch] text-center'>
        by continuing and clicking "Complete Activation", you agree to our Terms
        of Service, Privacy Policy, and Purchase Polices.{' '}
      </div>
      <SexyButton
        variant='tertiary'
        size='lg'
        className=''
        fullWidth
        rightIcon='flag-finish'>
        <span className='text-xl'>Complete Activation</span>
      </SexyButton>
    </div>
  </div>
)

interface IFeature {
  title: string
  description?: string
  children?: React.ReactNode
}
const FeaturesPanel = () => {
  const features = useMemo(
    () => [
      {
        title: 'Account Personalization',
        description:
          'Customize your account with your preferred settings and preferences.',
      },
      {
        title: 'Advanced Analytics',
        description: 'Gain insights into your account usage and behavior.',
      },
      {
        title: 'Secure Transactions',
        description: 'Ensure your transactions are safe and secure.',
      },
      {
        title: 'Customer Support',
        description:
          'Get assistance with any questions or issues you may have.',
      },
      {
        title: '24/7 Availability',
        description: 'Access our support services anytime, anywhere.',
      },
      {
        title: 'Privacy Protection',
        description: 'Your data is protected with advanced encryption.',
      },
    ],
    [],
  )
  return (
    <div className='w-full h-[64lvh] col-span-1 p-4 md:p-8 md:pl-0 md:col-span-5 mt-0'>
      <div className='pt-4 size-full rounded-4xl flex items-start'>
        <div className='w-full h-full space-y-8'>
          <div className=''>
            <div className='mb-4 h-9 w-fit px-4 text-sm rounded-full flex items-center justify-center dark:bg-teal-100/20 tracking-widest font-thin font-figtree uppercase'>
              features
            </div>
            <div className='w-full flex justify-start'>
              <TextAnimate
                type='whipInUp'
                className='text-3xl tracking-tighter font-bold font-figtree '>
                What's included on this service
              </TextAnimate>
            </div>
          </div>
          <div className=''>
            <HyperList
              data={features}
              component={AnimatedFeatureCard}
              container='space-y-3'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function AnimatedFeatureCard({title, description}: IFeature) {
  return (
    <div className='flex items-center space-x-3 font-figtree'>
      <div className='size-18 bg-dark-origin aspect-square border flex items-center justify-center rounded-3xl'>
        <Icon name='shield-keyhole' className='size-10 opacity-60' />
      </div>
      <CardBody className='border-none max-w-[35ch]'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardBody>
    </div>
  )
}
