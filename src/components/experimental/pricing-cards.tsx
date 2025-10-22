'use client'

import {Button} from '@/components/ui/button'
import {Icon} from '@/lib/icons'
import {useState} from 'react'
import {LightRays} from '../react-bits/light-rays'

export const ModernPricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly',
  )

  const plans = [
    {
      name: 'Protap',
      description: 'For newcomers exploring.',
      price: billingPeriod === 'monthly' ? 120 : 999,
      originalPrice: billingPeriod === 'yearly' ? 26 : null,
      tokens: '16k',
      features: [
        {text: 'NFC Smart Business Card', included: true},
        {text: 'Personal Accident Insurance', included: true},
        {text: 'Customizable Profile Page', included: true},
        {text: 'Professional Network Access', included: true},
        {text: 'Reward System', included: true},
      ],
      highlighted: false,
    },
    {
      name: 'Limited Edition',
      description:
        'Seasoned Web Crawling Magnet, Hackers, and High expecting capabilities.',
      price: billingPeriod === 'monthly' ? 549 : 4990,
      originalPrice: billingPeriod === 'yearly' ? 150 : null,
      tokens: '100k',
      features: [
        {text: 'NFC Smart Business Card', included: true},
        {text: 'Personal Accident Insurance', included: true},
        {text: 'Customizable Profile Page', included: true},
        {text: 'Professional Network Access', included: true},
        {text: 'Reward System', included: true},
      ],
      highlighted: true,
    },
    {
      name: 'Fleet',
      description: 'For Business and Enterprise. Contact our sales team.',
      price: billingPeriod === 'monthly' ? '' : '',
      originalPrice: billingPeriod === 'yearly' ? null : null,
      tokens: '400k',
      features: [
        {text: 'NFC Smart Business Card', included: true},
        {text: 'Personal Accident Insurance', included: true},
        {text: 'Customizable Profile Page', included: true},
        {text: 'Professional Network Access', included: true},
        {text: 'Reward System', included: true},
      ],
      highlighted: false,
    },
  ]

  return (
    <div className='relative min-h-screen bg-[#0a0a0f] text-white'>
      <main className='container mx-auto px-4 py-16'>
        <Rays />
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-8 bg-gradient-to-r from-teal-400 via-teal-100 to-white bg-clip-text text-transparent -tracking-wider'>
            Our Growth Focused Products
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
              <ul className='space-y-4 md:space-y-10'>
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
    </div>
  )
}

const Rays = () => (
  <div className='absolute h-[60vh] top-0 left-1/2 -translate-x-1/2'>
    <LightRays
      raysOrigin='top-center'
      raysColor='#00ffff'
      raysSpeed={1.5}
      lightSpread={0.8}
      rayLength={1.2}
      followMouse={true}
      mouseInfluence={0.1}
      noiseAmount={0.1}
      distortion={0.05}
      className='custom-rays'
    />
  </div>
)
