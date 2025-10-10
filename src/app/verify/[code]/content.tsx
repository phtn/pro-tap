'use client'

// import {Verifier} from '@/components/kokonutui/verifier'
import {Navbar} from '@/components/ui/navbar'
// import {useState} from 'react'
import {NavChild} from './_components/nav-child'

export const Content = ({code}: {code: string}) => {
  // const [_code] = useState(code)
  return (
    <div className='min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-white to-background text-foreground'>
      <Navbar>
        <NavChild code={code} />
      </Navbar>
      <main className='flex justify-center items-center h-[50lvh] max-w-7xl mx-auto'>
        {/*<Verifier code={_code} />*/}
      </main>
    </div>
  )
}
