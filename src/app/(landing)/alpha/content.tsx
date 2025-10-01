'use client'

import { Navbar } from '@/components/ui/navbar'
import { Landing } from '../_components/landing'
import { NavChild } from '../_components/nav-child'

export const Content = () => {
  return (
    <div className='min-h-screen md:max-w-6xl mx-auto'>
      <Navbar label='Protap Digital Insurance'>
        <NavChild />
      </Navbar>
      <Landing />
    </div>
  )
}
