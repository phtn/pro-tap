'use client'

import { PricingCard } from '@/components/experimental/pricing-card'
import { Navbar } from '@/components/ui/navbar'
export const Content = () => {
  return (
    <div className='h-screen bg-background'>
      <Navbar />
      <main className='h-full pt-28 flex items-start justify-center gap-8'>
        <PricingCard
          title='PRO'
          price='999'
          popular
          period='12 month'
          billing='annually'
          buttonText='Get Protap'
          gradient='linear-gradient(to right, #ff6666, #ff9966)'
          features={[
            { icon: 'checkmark-circle', text: 'Personal Accident Protection' },
            { icon: 'arrow-up', text: 'Feature 2' },
            { icon: 'arrow-up', text: 'Feature 3' },
            { icon: 'arrow-up', text: 'Feature 4' },
            { icon: 'arrow-up', text: 'Feature 5' },
          ]}
          footerText='Payment Gateway'
        />
      </main>
    </div>
  )
}
