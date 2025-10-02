import {Content} from './content'

export default async function RootPage() {
  return (
    <div className='bg-background relative h-screen portrait:flex items-center justify-center'>
      <Content />
    </div>
  )
}
