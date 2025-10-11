import {Loader} from '@/components/loader'
export default function Loading() {
  return (
    <div className='size-screen flex items-center justify-center'>
      <Loader fullScreen />
    </div>
  )
}
