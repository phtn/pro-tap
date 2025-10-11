import {Icon} from '@/lib/icons'
import SectionTitle from './section'

export const SmartIntro = () => {
  return (
    <div className='p-4 h-24 lg:mt-10 border bg-primary/5 w-fit flex flex-col tracking-snug px-4 justify-center border-primary-hover rounded-2xl'>
      <div className='pt-3 flex space-x-2.5 items-center text-foreground-accent text-sm md:-text-sm lg:text-left'>
        <span className='font-medium font-space'>FAQs</span>
        <div className='size-6 overflow-hidden flex items-center justify-center aspect-square bg-primary-hover text-white rounded-full text-sm'>
          <Icon name='arrow-right' className='size-4' />
        </div>
        <span className='italic font-medium font-space'>anything</span>
      </div>
      <SectionTitle>
        <h2 className='my-3 leading-snug! lg:max-w-sm md:text-center tracking-tighter lg:text-left'>
          Good to know
        </h2>
      </SectionTitle>
    </div>
  )
}
