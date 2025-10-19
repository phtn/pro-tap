import {QRCodeSVG} from '@/components/experimental/qr-viewer'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {format} from 'date-fns'

interface CardItemSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isMobile: boolean
  item?: {
    id: string
    series: string
    batch: string
  } | null
}

export const CardItemSheet = ({
  open,
  item,
  onOpenChange,
  isMobile,
}: CardItemSheetProps) => {
  if (!item) return null

  return (
    <div className='flex flex-col gap-4'>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetHeader>
          <SheetTitle className='hidden'>Card Item Details</SheetTitle>
          <SheetDescription className='hidden'>
            Card Item Details
          </SheetDescription>
        </SheetHeader>

        <SheetContent
          side='bottom'
          className='space-y-3 md:space-y-0 h-[80vh] md:h-[60vh] dark:bg-zinc-800 rounded-t-3xl overflow-hidden p-4 md:p-6'>
          <div className='flex flex-col w-full md:flex-row md:gap-6 gap-2 h-full'>
            {/* QR Code Section - Large for scanning */}
            <div className='flex items-center justify-center md:items-start md:justify-start p-4 md:p-2'>
              <div className='flex items-center md:items-start justify-center p-3 md:p-2 w-full h-full md:h-fit rounded-3xl'>
                <QRCodeSVG
                  className='flex items-center justify-center p-3 md:p-0 md:w-[400px] md:h-[400px]'
                  options={{
                    content: `https://protap.ph/api/activation/?id=${item.id}&series=${item.series}&batch=${item.batch}`,
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
                  <div className='bg-zinc-50 dark:bg-zinc-700 p-2 md:p-3 font-figtree rounded-lg'>
                    <div className='text-xs md:text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1'>
                      ID
                    </div>
                    <div className='font-mono text-sm font-medium text-foreground break-all'>
                      {item.id}
                    </div>
                  </div>

                  <div className='bg-zinc-50 dark:bg-zinc-700 p-2 rounded-lg'>
                    <div className='text-xs md:text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1'>
                      Series
                    </div>
                    <div className='font-medium text-foreground capitalize font-space'>
                      {item.series}
                    </div>
                  </div>

                  <div className='bg-zinc-50 dark:bg-zinc-700 p-2 rounded-lg'>
                    <div className='text-xs md:text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1'>
                      Batch
                    </div>
                    <div className='font-medium text-foreground capitalize font-space'>
                      {item.batch}
                    </div>
                  </div>

                  <div className='bg-zinc-50 dark:bg-zinc-700 p-2 rounded-lg'>
                    <div className='text-xs md:text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1'>
                      Timestamp
                    </div>
                    <div className='font-medium text-foreground font-mono'>
                      {format(Date.now(), 'PPpp')}
                    </div>
                  </div>

                  <div className='bg-zinc-50 dark:bg-zinc-700 p-2 rounded-lg'>
                    <div className='text-xs md:text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1'>
                      Activation URL
                    </div>
                    <div className='font-mono w-full whitespace-nowrap overflow-x-scroll text-xs text-slate-400 break-all'>
                      https://protap.ph/api/activation/?id={item.id}&series=
                      {item.series}&batch={item.batch}
                    </div>
                  </div>
                  <div className='h-10'></div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
