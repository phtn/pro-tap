'use client'

import { NavChild } from '@/app/(landing)/_components/nav-child'
import { Navbar } from '@/components/ui/navbar'

export const Landing = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-white to-background text-foreground'>
      <Navbar>
        <NavChild />
      </Navbar>

      <main className='max-w-7xl mx-auto' />
    </div>
  )
}
