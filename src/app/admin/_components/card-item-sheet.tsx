'use client'

import {QRCodeSVG} from '@/components/experimental/qr-viewer'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {useCopy} from '@/hooks/use-copy'
import {ProtapActivationInfo} from '@/lib/firebase/cards'
import {cn} from '@/lib/utils'
import {tsToDate} from '@/utils/helpers'
import {Timestamp} from 'firebase/firestore'
import {useCallback, useEffect, useMemo} from 'react'

interface CardItemSheetProps {
  open: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
  onOpenChange: (open: boolean) => void
  isMobile: boolean
  item: ProtapActivationInfo | null
}

export const CardItemSheet = ({
  open,
  item,
  onOpenChange,
  isMobile,
  side = 'bottom',
}: CardItemSheetProps) => {
  const debug = true
  useEffect(() => {
    if (open) {
      console.log(side)
    }
  }, [open, side])

  if (!open || !item) return null
  const createdAt = useMemo(
    () => tsToDate(item.createdAt as unknown as Timestamp, 'PPpp'),
    [item],
  )

  const details = useMemo(
    () => [
      {label: 'id', value: item.id},
      {label: 'series', value: item.series},
      {label: 'group', value: item.group},
      {label: 'batch', value: item.batch},
      {label: 'timestamp', value: createdAt},
      {
        label: 'url',
        value: `https://${debug ? '192.168.1.2:3000' : 'protap.ph'}/api/verify/?id=${item.id}&series=${item.series}&group=${item.group}&batch=${item.batch}`,
      },
    ],
    [item, createdAt],
  )

  const {copy} = useCopy({timeout: 2000})

  const handleCopyValue = useCallback(
    (detail: {label: string; value: string}) => () => {
      copy(detail.label, detail.value)
    },
    [],
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetHeader>
        <SheetTitle className='hidden'>Card Item Details</SheetTitle>
        <SheetDescription className='hidden'>
          Card Item Details
        </SheetDescription>
      </SheetHeader>

      <SheetContent
        side={side}
        className={cn(
          'z-200 space-y-3 md:space-y-0 h-[80vh] md:h-[60vh] dark:bg-zinc-800 rounded-t-3xl overflow-hidden p-4 md:p-6',
          {
            'md:h-screen h-screen rounded-none': side === 'right',
          },
          'selection:bg-sky-300/80',
        )}>
        <div
          className={cn(
            'flex flex-col w-full md:flex-row md:gap-6 gap-2 h-full',
            {'md:flex-col items-start': side === 'right'},
          )}>
          {item ? (
            <>
              {/* QR Code Section - Large for scanning */}
              <div
                className={cn(
                  'flex items-center justify-center md:items-start md:justify-start p-4 md:p-2',
                  {
                    'justify-center md:py-2 px-0': side === 'right',
                  },
                )}>
                <div
                  className={cn(
                    'flex items-center md:items-start justify-center p-3 md:p-2 w-full h-full md:h-fit rounded-3xl',
                    {
                      'w-full h-full md:w-fit md:h-fit flex md:justify-center md:items-center p-0':
                        side === 'right',
                    },
                  )}>
                  <QRCodeSVG
                    className={cn(
                      'flex items-center justify-center p-3 md:p-0 md:w-[400px] md:h-[400px]',
                      {
                        ' w-[300px] h-[300px] p-1': side === 'right',
                      },
                    )}
                    options={{
                      content: `https://${debug ? '192.168.1.2:3000' : 'protap.ph'}/api/verify/?id=${item.id}&series=${item.series}&group=${item.group}&batch=${item.batch}`,
                      width: isMobile ? 280 : 400,
                      height: isMobile ? 280 : 400,
                    }}
                  />
                </div>
              </div>

              {/* Details Section - Below on mobile, right side on desktop */}
              <div className='flex-1 space-y-1 md:space-y-6 md:p-2 overflow-y-scroll'>
                <div className='space-y-1 md:space-y-4 w-full'>
                  <div className='space-y-1 md:space-y-4 pb-12 w-full'>
                    {details.map((detail, idx) => (
                      <div
                        key={idx}
                        onClick={handleCopyValue(detail)}
                        className='cursor-pointer border-b border-origin/40 p-2 md:px-3 md:py-3 font-figtree rounded-lg space-y-2.5'>
                        <div className='text-xs text-muted-foreground uppercase tracking-wide font-medium'>
                          {detail.label}
                        </div>
                        <div className='font-mono text-sm font-medium text-foreground break-all'>
                          {detail.value}
                        </div>
                      </div>
                    ))}

                    <div className='h-10'></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Loading state when item is not yet available */
            <div className='flex items-center justify-center w-full h-full'>
              <div className='flex flex-col items-center gap-4'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                <p className='text-muted-foreground'>Loading card details...</p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
