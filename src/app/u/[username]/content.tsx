'use client'

import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {MiniVerifier} from '@/components/kokonutui/verifier'
import {HyperId} from '@/components/react-bits/hyper-id'
import {Navbar} from '@/components/ui/navbar'
import TextAnimate from '@/components/ui/text-animate'
import {useParams} from 'next/navigation'

interface ContentProps {
  username: string
}

export const Content = ({username}: ContentProps) => {
  const params = useParams()
  console.log(params.username, username)
  return (
    <main className='max-w-6xl mx-auto'>
      {/*<ProfileView profile={profile} />*/}
      <Navbar>
        <TextAnimate className='font-doto'>
          {username.split('-').pop()}
        </TextAnimate>
      </Navbar>
      <div className='relative flex justify-center'>
        <HyperId>
          <div className='relative w-96 flex justify-center'>
            <div className='absolute h-96 left-0 top-1/2 -translate-y-1/2 rounded-full'>
              <MiniVerifier isGood={true} />
            </div>
          </div>
        </HyperId>
        <div className='rounded-[1.25rem] border dark:bg-catnip/20 dark:backdrop-blur-3xl border-catnip/20 flex items-center z-100 h-12 absolute left-1/2 -translate-x-1/2 bottom-20'>
          <SexyButton fullWidth className='px-8'>
            <span className='text-lg'>Proceed to Activation</span>
          </SexyButton>
        </div>
      </div>
    </main>
  )
}
