'use client'
import {FooterProps, VCard} from '@/components/experimental/v-card'
import {TextureSeparator} from '@/components/ui/texture-card'
import {DialogWindow} from '@/components/ui/window'
import {useDevtools} from '@/hooks/use-devtools'
import {useToggle} from '@/hooks/use-toggle'
import {useWindow} from '@/hooks/use-window'
import {Icon} from '@/lib/icons'
import {Tabs} from './_components/tabs'

export const Content = () => {
  const meta = useDevtools()
  // const [open, setOpen] = useState(false);
  const {on, toggle} = useToggle()
  // const [state, setState] = useState(false)
  const {open} = useWindow(on, toggle)
  return (
    <DialogWindow keyCode='k' open={open} setOpen={toggle}>
      <VCard
        toggle={toggle}
        toolbar={
          <>
            <div className='text-xs text-indigo-300 flex items-center space-x-1.5 font-semibold font-figtree px-2 py-0.5 rounded-md bg-zinc-800 dark:bg-zinc-900'>
              <span className='size-1.5 rounded-full aspect-square shrink-0 bg-indigo-400' />
              <span>Devtools</span>
            </div>
          </>
        }
        footer={<Footer meta={meta} />}>
        <Tabs />
      </VCard>
    </DialogWindow>
  )
}

interface ServerInfo {
  ip: string | null
  port: string | null
}

const Footer = ({meta}: FooterProps<ServerInfo>) => {
  return (
    <div className='dark:bg-neutral-800 bg-stone-800 pt-px rounded-b-[20px] overflow-hidden w-full'>
      <TextureSeparator className='border-t-neutral-600 border-b-neutral-900/5' />
      <div className='flex flex-col items-center justify-center '>
        <div className='py-2 px-5 w-full'>
          <div className='w-full flex items-center justify-between text-xs tracking-wide font-light font-mono text-teal-400'>
            <div className='flex items-center space-x-1.5'>
              <Icon name='reactjs' className='size-4 text-[#58c4dc]' />
              <Icon name='typescript' className='size-4 text-[#3078c6]' />
              <Icon name='nextjs' className='size-4' />
            </div>
            <div className='flex items-center space-x-1'>
              <span className='dark:bg-background/40 px-2 py-1 rounded-lg'>
                {meta?.ip}:{meta?.port}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
