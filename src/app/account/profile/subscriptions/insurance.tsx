import {RowItem} from '@/app/sign/_components/row-items'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import TextAnimate from '@/components/ui/text-animate'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {motion} from 'motion/react'
export const UserInsurance = () => {
  return (
    <motion.div
      initial={{opacity: 0, scale: 0.8, y: -8}}
      animate={{opacity: 1, scale: 1, y: 0}}
      exit={{opacity: 0, scale: 0.6, y: -10}}
      transition={{
        type: 'spring',
        visualDuration: 0.5,
        bounce: 0.3,
      }}
      className='z-20 mt-10 md:mt-2 absolute bg-dark-origin/60 backdrop-blur-2xl border border-dark-origin left-1/2 -translate-1/2 top-1/3 -translate-y-1/3 w-96 h-96 rounded-4xl flex items-start py-8 font-figtree'>
      <div className='space-y-10 w-full flex flex-col items-start'>
        <div
          className={cn(
            'ml-7 flex items-center space-x-1 border rounded-full bg-foreground dark:bg-background text-white text-xs md:text-sm px-3 py-1.5 ',
            'dark:border-slate-500/60',
          )}>
          <motion.div
            initial={{opacity: 0, scale: 0.2, x: -48}}
            animate={{opacity: 1, scale: 1, x: 0}}
            transition={{
              type: 'spring',
              visualDuration: 0.5,
              bounce: 0.3,
            }}
            className=''>
            <Icon
              name={'shield-checkmark'}
              className={cn('size-5 text-amber-400', {})}
            />
          </motion.div>
          <TextAnimate
            type='whipInUp'
            className='text-white text-sm font-bold tracking-tight'>
            {'My Insurance Policy'}
          </TextAnimate>
        </div>
        <RowItem
          className='text-primary opacity-100 dark:text-primary-hover'
          bullet='square-check-solid'
          title={<span>Personal Accident Insurance</span>}>
          <div className='pl-3 text-sm'>
            Your Free 1 Year coverage is ready for activation.
          </div>
        </RowItem>
        <div className='w-full flex justify-center overflow-x-visible'>
          <div className='h-[3px] bg-origin/60 dark:bg-origin/30 w-full rounded-full -mx-24' />
        </div>
        <RowItem
          className='text-teal-600 opacity-100 dark:text-teal-500 size-4'
          bullet='right-double'
          title='next step'>
          <SexyButton
            // variant='ghost'
            leftIcon='zap-solid'
            // onClick={handlePrint}
            className='px-4 flex items-center justify-center space-x-2'>
            {/*<Icon name='content-share-solid' className='size-6' />*/}
            <p className=''>Activate Insurance</p>
          </SexyButton>
        </RowItem>
      </div>
    </motion.div>
  )
}
