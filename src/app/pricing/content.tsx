'use client'

import {PricingCard} from '@/components/experimental/pricing-card'
import {Navbar} from '@/components/ui/navbar'
export const Content = () => {
  return (
    <div className='h-screen bg-background'>
      <Navbar />
      <main className='h-full pt-28 flex items-start justify-center gap-8'>
        <PricingCard
          popular
          title='PRO'
          price='999'
          period='12 month'
          billing='annually'
          buttonText='Get Protap'
          gradient='linear-gradient(to right, #ff6666, #ff9966)'
          features={[
            {icon: 'checkmark-circle', text: 'NFC Enabled Business Card'},
            {icon: 'arrow-up', text: 'Fully Customizable Web Page'},
            {icon: 'arrow-up', text: 'Personal Accident Insurance'},
            {icon: 'arrow-up', text: 'Affiliate Account'},
            {icon: 'arrow-up', text: 'Merchant Account'},
          ]}
          footerText='Payment Gateway'
        />
      </main>
    </div>
  )
}
