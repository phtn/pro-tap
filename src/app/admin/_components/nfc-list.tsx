import {NFCData} from '@/hooks/use-nfc'
import {cn} from '@/lib/utils'
import {macStr} from '@/utils/macstr'

export interface NFCDataWithDuplicate extends NFCData {
  isDuplicate: boolean
  isOnlist: boolean
}

interface Props {
  list: (NFCDataWithDuplicate | null)[]
  firestoreReceipt: string | null
}

export const NFCScanList = ({list, firestoreReceipt}: Props) => {
  return (
    <div className='relative h-10'>
      {list
        .slice()
        .reverse()
        .map((history, index) => (
          <div
            key={`scan-${list[index]?.records[index]?.id}`}
            className='h-full flex items-center justify-between'>
            <p
              className={cn(
                'text-sm md:text-base font-semibold font-space tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] px-1',
                {'text-slate-500': history?.isDuplicate},
              )}>
              <span className='font-thin text-xs opacity-50 font-space px-2'>
                {index + 1}
              </span>
              <span className='px-3 font-sans'>
                {history && macStr(history?.serialNumber)}
              </span>
            </p>

            {history && (
              <span className='px-3 text-xs font-medium font-figtree uppercase'>
                {history.isOnlist && !history.isDuplicate && (
                  <span className='dark:text-orange-300 text-orange-400'>
                    onlist
                  </span>
                )}
                {history.isDuplicate && (
                  <span className='text-slate-500 '>duplicate</span>
                )}
                {firestoreReceipt ? (
                  !history.isDuplicate &&
                  !history.isOnlist && (
                    <span className='dark:text-teal-400 text-teal-500'>ok</span>
                  )
                ) : (
                  <span className='text-zinc-600 '>--</span>
                )}
              </span>
            )}
          </div>
        ))}
    </div>
  )
}
