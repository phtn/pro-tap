import {Footer} from '@/components/experimental/modern-footer'
import {ModernPricingPage} from '@/components/experimental/pricing-cards'
import {Navbar} from '@/components/ui/navbar'

export const ModernContent = () => {
  return (
    <div className='h-screen bg-[#0a0a0f] overflow-scroll'>
      <Navbar />
      <ModernPricingPage />
      <Footer />
    </div>
  )
}
