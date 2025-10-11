'use client'

import {Footer} from '@/components/experimental/modern-footer'
import {Button} from '@/components/ui/button'
import {Icon} from '@/lib/icons'
import {useState} from 'react'

export const ModernPricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly',
  )

  const plans = [
    {
      name: 'Protap',
      description: 'For newcomers exploring.',
      price: billingPeriod === 'monthly' ? 999 : 999,
      originalPrice: billingPeriod === 'yearly' ? 26 : null,
      tokens: '16k',
      features: [
        {text: '900 Film tokens upon purchase', included: true},
        {text: 'Unlock PRO templates', included: true},
        {text: 'Faster queue access', included: false},
        {text: 'Priority queue access', included: false},
        {text: '720p resolution images', included: false},
      ],
      highlighted: false,
    },
    {
      name: 'Limited Edition',
      description:
        'Seasoned Web Crawling Magnet, Hackers, and High expecting capabilities.',
      price: billingPeriod === 'monthly' ? 4990 : 4990,
      originalPrice: billingPeriod === 'yearly' ? 150 : null,
      tokens: '100k',
      features: [
        {text: '10K Film tokens upon purchase', included: true},
        {text: 'Unlock PRO templates', included: true},
        {text: 'Faster queue access', included: true},
        {text: '4K resolution images', included: true},
        {text: 'More benefits coming soon', included: true},
      ],
      highlighted: true,
    },
    {
      name: 'Fleet',
      description: 'For Business and Enterprise. Contact our sales team.',
      price: billingPeriod === 'monthly' ? '' : '',
      originalPrice: billingPeriod === 'yearly' ? 270 : null,
      tokens: '400k',
      features: [
        {text: '23K Film tokens upon purchase', included: true},
        {text: 'Unlock PRO templates', included: true},
        {text: 'Unlock PRO templates', included: true},
        {text: '4K resolution images', included: true},
        {text: 'More benefits coming soon', included: true},
      ],
      highlighted: false,
    },
  ]

  return (
    <div className='min-h-screen bg-[#0a0a0f] text-white'>
      <main className='container mx-auto px-4 py-16'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-8 bg-gradient-to-r from-teal-400 via-teal-100 to-white bg-clip-text text-transparent -tracking-wider'>
            Designed for Flexibility
          </h1>

          {/* Billing Toggle */}
          <div className='inline-flex items-center gap-3 bg-[#1a1a24] rounded-full p-1.5'>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-[#2a2a38] text-white'
                  : 'text-gray-400'
              }`}>
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full transition-colors flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-[#2a2a38] text-white'
                  : 'text-gray-400'
              }`}>
              Yearly
              <span className='bg-teal-600/20 text-teal-400 text-xs px-2 py-0.5 rounded'>
                -10%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-3 gap-6 max-w-7xl mx-auto'>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-cyan-500/10 via-transparent to-orange-500/10'
                  : 'bg-[#1a1a24]'
              }`}
              style={
                plan.highlighted
                  ? {
                      border: '2px solid transparent',
                      backgroundImage:
                        'linear-gradient(#1a1a24, #1a1a24), linear-gradient(135deg, #a855f7, #f97316)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                    }
                  : {}
              }>
              {/* Header */}
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-2xl font-bold'>{plan.name}</h3>
                <span className='text-sm text-gray-400'>{plan.tokens} +</span>
              </div>

              <p className='text-gray-400 text-sm mb-8 leading-relaxed'>
                {plan.description}
              </p>

              {/* Price */}
              <div className='mb-6'>
                <div className='flex items-baseline gap-2 mb-2'>
                  <span className='text-5xl'>
                    <span className='font-light'>₱</span>
                    <span className=' font-bold -tracking-widest'>
                      {plan.price}
                    </span>
                  </span>
                  {plan.originalPrice && (
                    <span className='text-gray-500 line-through text-xl'>
                      <span className='font-light'>₱</span>
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className='text-gray-400 text-lg'>/ monthly</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full'>
                    Bill yearly
                  </span>
                  <span className='bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full'>
                    30% off
                  </span>
                </div>
              </div>

              {/* Subscribe Button */}
              <Button
                className={`w-full rounded-full py-6 mb-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white'
                    : 'bg-[#2a2a38] hover:bg-[#3a3a48] text-white'
                }`}>
                Subscribe
              </Button>

              {/* Features */}
              <ul className='space-y-4'>
                {plan.features.map((feature, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    {feature.included ? (
                      <Icon
                        name='check'
                        className='w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5'
                      />
                    ) : (
                      <Icon
                        name='close'
                        className='w-5 h-5 text-red-400 flex-shrink-0 mt-0.5'
                      />
                    )}
                    <span className='text-sm text-gray-300'>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
