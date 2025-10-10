import {Loader} from '@/components/loader'
export default function Loading() {
  return (
    <div className='size-full flex items-center justify-center'>
      <Loader fullScreen />
    </div>
  )
}
