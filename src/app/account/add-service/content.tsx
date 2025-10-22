'use client'

import {CachedScanResult, getCookie} from '@/app/actions'
import {ProtapCard} from '@/components/experimental/protap-card'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {HyperList} from '@/components/list'
import {CardBody} from '@/components/ui/animated-card'
import {CardDescription, CardTitle} from '@/components/ui/card'
import TextAnimate from '@/components/ui/text-animate'
import {GridLayer} from '@/components/ui/visual-1'
import {Widget, WidgetHeader} from '@/components/ui/widget'
import {useToggle} from '@/hooks/use-toggle'
import {Icon, IconName} from '@/lib/icons'
import {serverTimestamp} from 'firebase/firestore'
import Link from 'next/link'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {ActivationProgress} from '../_components/progress'
import {ElectricCard} from './electric-card'

export function AddServiceContent() {
  const {on, toggle} = useToggle()
  const [data, setData] = useState<CachedScanResult>()
  const getScanResults = useCallback(
    async () => await getCookie('protapScanResult'),
    [],
  )
  const nfcData = useMemo(
    () =>
      data
        ? {
            serialNumber: data.id,
            records: [
              {
                recordType: 'url',
                data: `https://protap.ph/u/${data.id}`,
                id: data.id,
              },
              {
                recordType: 'text',
                data: String(data.id.split('-').shift()),
                id: 'type',
              },
            ],
            timestamp: serverTimestamp(),
          }
        : null,
    [data],
  )

  useEffect(() => {
    getScanResults()
      .then((r) => setData(r))
      .catch(console.error)
  }, [])
  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <div className='grid grid-cols-1 md:grid-cols-9 md:gap-4 gap-4'>
        <FeaturesPanel />
        <ActivationPanel activateFn={toggle} />
      </div>
      <ActivationProgress open={on} onOpenChange={toggle} nfcData={nfcData} />
    </div>
  )
}

interface ActivationPanelProps {
  activateFn: VoidFunction
}

const ActivationPanel = ({activateFn}: ActivationPanelProps) => (
  <div className='h-full w-full col-span-1 md:col-span-4 relative mt-12'>
    <Widget className='h-full space-y-0 md:h-[65lvh] w-full overflow-hidden p-0'>
      <GridLayer color='#fffff0' className='opacity-5 bg-[size:20px_10px]' />
    </Widget>
    <div className='absolute top-8 h-fit w-full rounded-[19px] flex justify-center'>
      <ElectricCard>
        <div className='relative rounded-4xl -p-2 border-3 border-[#bec4a9]/0'>
          <div className='absolute w-126 h-82 border-2 rounded-4xl border-[#dec4af]/90 blur-[1px] -translate-y-1 -translate-x-1' />
          <div className='absolute w-126 h-82 border-4 rounded-4xl border-[#becfcf]/80 blur-[4px] -translate-y-1 -translate-x-1' />
          <ProtapCard className='p-1' />
          <div className='absolute z-10 h-10 w-50 bg-yellow-100/30 top-14 -left-4 blur-3xl -rotate-40' />
        </div>
      </ElectricCard>
    </div>
    <div className='space-y-6 absolute bottom-10 md:h-[32lvh] w-full px-6 py-10'>
      <WidgetHeader
        description=''
        icon='right-double'
        title='Protap Activation'
        className='text-white'
      />
      <div className='py-6 text-white opacity-90 text-sm max-w-[45ch] mx-auto'>
        by continuing and clicking "Complete Activation", you agree to our
        <Link
          className='pl-1 hover:underline underline-offset-4 decoration-[0.33px] decoration-dashed decoration-white font-medium'
          href={'/legal/terms-of-use'}>
          Terms of Service
        </Link>
        ,
        <Link
          href={'/legal/privacy-policy'}
          className='pl-1 hover:underline underline-offset-4 decoration-[0.33px] decoration-dashed decoration-white font-medium'>
          Privacy Policy
        </Link>
        , and
        <Link
          href={'/legal/purchase-policy'}
          className='pl-1 hover:underline underline-offset-4 decoration-[0.33px] decoration-dashed decoration-white font-medium'>
          Purchase Policy
        </Link>
        .
      </div>
      <SexyButton
        size='lg'
        fullWidth
        className=''
        variant='tertiary'
        onClick={activateFn}
        rightIcon='flag-finish'>
        <span className='text-xl'>Complete Activation</span>
      </SexyButton>
    </div>
  </div>
)

interface IFeature {
  title: string
  icon: IconName
  description?: string
  children?: React.ReactNode
}
const FeaturesPanel = () => {
  const features = useMemo(
    () =>
      [
        {
          icon: 'nfc',
          title: 'Smart NFC Business Card',
          description: 'Personalized business card with NFC technology.',
        },
        {
          icon: 'shield-checkmark',
          title: 'Personal Accident Insurance',
          description: 'Protect yourself from unexpected accidents.',
        },
        {
          icon: 'sign-pen',
          title: 'Account Personalization',
          description:
            'Customize your account with your preferred settings and preferences.',
        },
        {
          icon: 'general',
          title: 'Affiliate Program',
          description: 'Earn commissions by referring friends and family.',
        },
        {
          icon: 'bag-light',
          title: 'Merchant Account',
          description: 'Manage your business finances with ease.',
        },
        {
          icon: 'globe-solid',
          title: 'Professional Networking Hub',
          description: 'Connect with professionals and expand your network.',
        },
      ] as IFeature[],
    [],
  )
  return (
    <div className='w-full h-[64lvh] col-span-1 p-4 md:p-8 md:pl-0 md:col-span-5 mt-0'>
      <div className='pt-4 size-full rounded-4xl flex items-start'>
        <div className='w-full h-full space-y-8'>
          <div className=''>
            <div className='mb-8 h-9 w-fit px-4 text-sm rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary-hover/15 tracking-widest font-thin font-figtree uppercase'>
              features
            </div>
            <div className='w-full flex justify-start'>
              <TextAnimate
                type='whipInUp'
                className='text-2xl md:text-3xl tracking-tight font-extrabold font-figtree '>
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

export function AnimatedFeatureCard({title, description, icon}: IFeature) {
  return (
    <div className='flex items-center space-x-3 font-figtree'>
      <div className='size-14 bg-dark-origin aspect-square border flex items-center justify-center rounded-2xl'>
        <Icon name={icon} className='size-8 text-primary' />
      </div>
      <CardBody className='border-none max-w-[38ch]'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardBody>
    </div>
  )
}
