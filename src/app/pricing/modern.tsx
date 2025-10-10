import {ModernPricingPage} from '@/components/experimental/pricing-cards'
import {Navbar} from '@/components/ui/navbar'

export const ModernContent = () => {
  return (
    <div className='h-screen overflow-scroll'>
      <Navbar />
      <ModernPricingPage />
    </div>
  )
}
