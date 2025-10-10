import type {Viewport} from 'next'
import {Content} from './content'

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#F2F2F2'},
    {media: '(prefers-color-scheme: dark)', color: '#090909'},
  ],
}

export default async function RootPage() {
  return (
    <div className='bg-background relative h-screen portrait:flex items-center justify-center'>
      <Content />
    </div>
  )
}
