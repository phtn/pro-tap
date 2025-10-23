import {cn} from '@/lib/utils'
import {useNFCStore} from '@/stores/nfc-store'
import {macStr} from '@/utils/macstr'

export const NFCScanList = () => {
  const {nfcScans, firestoreReceipt} = useNFCStore()
  return (
    <div className='relative h-10'>
      {nfcScans
        .slice()
        .reverse()
        .map((history, index) => (
          <div
            key={`scan-${nfcScans[index]?.records[index]?.id}`}
            className='h-12 flex items-center justify-between border-b'>
            <p
              className={cn(
                'text-sm md:text-base font-space tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] px-1',
                {'text-slate-500': history?.isDuplicate},
              )}>
              <span className='font-thin text-xs opacity-50 font-space px-2'>
                {index + 1}
              </span>
              <span className='px-3 font-figtree font-medium'>
                {history && macStr(history?.serialNumber)}
              </span>
            </p>

            {history && (
              <span className='px-3 text-xs font-medium font-figtree uppercase'>
                {history.isOnlist && !history.isDuplicate && (
                  <span className='dark:text-amber-600 text-amber-600'>
                    onlist
                  </span>
                )}
                {history.isDuplicate && (
                  <span className='text-slate-500'>duplicate</span>
                )}
                {firestoreReceipt ? (
                  !history.isDuplicate &&
                  !history.isOnlist && (
                    <span className='dark:text-teal-400 text-teal-500'>ok</span>
                  )
                ) : (
                  <span className='text-zinc-600'></span>
                )}
              </span>
            )}
          </div>
        ))}
    </div>
  )
}
