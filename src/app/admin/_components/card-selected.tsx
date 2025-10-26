'use client'
import {QRCodeSVG} from '@/components/experimental/qr-viewer'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {useCopy} from '@/hooks/use-copy'
import {Icon} from '@/lib/icons'
import {TokenMetadata} from '@/lib/jwt/tok.types'
import {cn} from '@/lib/utils'
import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react'

interface CardItemSheetProps {
  open: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
  onOpenChange: (open: boolean) => void
  isMobile: boolean
  item: TokenMetadata | null
}

export const CardItemSheet = ({
  open,
  item,
  onOpenChange,
  isMobile,
  side = 'bottom',
}: CardItemSheetProps) => {
  const debug = false
  const baseUrl = useMemo(
    () => (debug ? '192.168.1.2:3000' : 'protap.ph'),
    [debug],
  )
  useEffect(() => {
    if (open) {
      console.log(side)
    }
  }, [open, side])

  const details = useMemo(
    () => [
      {label: 'id', value: item?.payload.uid},
      {label: 'series', value: item?.payload.series},
      {label: 'group', value: item?.payload.series},
      {label: 'batch', value: item?.payload.sub},
      {label: 'token', value: item?.token},
      {
        label: 'url',
        value: `https://${debug ? '192.168.1.2:3000' : 'protap.ph'}/i/activate?token=${item?.token}&id=${item?.payload.uid}`,
      },
    ],
    [item],
  )

  const {copy} = useCopy({timeout: 2000})

  const qrOptions = useMemo(() => {
    if (!item) return null
    return {
      content: `https://${baseUrl}/i/activate?token=${item.token}&id=${item.payload.uid}`,
      width: isMobile ? 240 : 400,
      height: isMobile ? 240 : 400,
    }
  }, [baseUrl, item, isMobile])

  const [svgData, setSvgData] = useState('')

  useEffect(() => {
    if (!qrOptions) {
      setSvgData('')
      return
    }

    // Generate SVG data directly using the same logic as QRCodeSVG
    const generateSVG = async () => {
      try {
        const QRCode = (await import('qrcode-svg')).default
        const code = new QRCode({
          content: qrOptions.content,
          padding: 4,
          width: qrOptions.width,
          height: qrOptions.height,
          color: '#12121a',
          background: '#ffffff',
          ecl: 'M' as const,
        })
        setSvgData(code.svg())
      } catch (error) {
        console.error('Failed to generate QR code SVG:', error)
        setSvgData('')
      }
    }

    generateSVG()
  }, [qrOptions])

  const handleCopyValue = useCallback(
    (detail: {label: string; value: string | undefined}) => () => {
      copy(detail.label, detail?.value ?? '')
    },
    [copy],
  )

  if (!open || !item) return null

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
                    'relative flex items-center md:items-start justify-center p-3 md:p-2 w-full h-full md:h-fit rounded-3xl',
                    {
                      'w-full h-full md:w-fit md:h-fit flex md:justify-center md:items-center p-0':
                        side === 'right',
                    },
                  )}>
                  {qrOptions && (
                    <>
                      <QRCodeSVG
                        className={cn(
                          'flex items-center justify-center p-3 md:p-0 md:w-[400px] md:h-[400px]',
                          {
                            ' w-[300px] h-[300px] p-1': side === 'right',
                          },
                        )}
                        options={qrOptions}
                      />
                      <ImageContextMenu
                        image={svgData}
                        qrUrl={qrOptions.content}
                      />
                    </>
                  )}
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

interface IContextMenuProps {
  image: string
  qrUrl: string
  children?: ReactNode
}

const ImageContextMenu = ({image, qrUrl, children}: IContextMenuProps) => {
  const {copy} = useCopy({timeout: 2000})

  const handleCopyUrl = useCallback(() => {
    copy('QR Code URL', qrUrl)
  }, [copy, qrUrl])

  const handleDownloadImage = useCallback(async () => {
    try {
      // Create a canvas element to convert SVG to PNG
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Create an image element from the SVG data
      const img = new Image()
      const svgData = image

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        if (ctx) {
          ctx.drawImage(img, 0, 0)

          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `qr-code-${Date.now().toString(12)}.png`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            }
          }, 'image/png')
        }
      }

      // For SVG data, we need to create a data URL
      if (svgData) {
        const svgBlob = new Blob([svgData], {
          type: 'image/svg+xml;charset=utf-8',
        })
        img.src = URL.createObjectURL(svgBlob)
      }
    } catch (error) {
      console.error('Failed to download QR code:', error)
    }
  }, [image])

  const handlePrintQr = useCallback(() => {
    try {
      // Create a new window for printing
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.open(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print QR Code</title>
              <style>
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  margin: 0;
                  background: white;
                }
                .qr-container {
                  text-align: center;
                  padding: 20px;
                }
                .qr-code {
                  max-width: 400px;
                  width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <div class="qr-container">
                <h2>QR Code</h2>
                <div class="qr-code">${image}</div>
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  };
                };
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    } catch (error) {
      console.error('Failed to print QR code:', error)
    }
  }, [image])

  return (
    <ContextMenu>
      <ContextMenuTrigger className='md:size-120 absolute z-50'>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className='dark:bg-dysto bg-dark-origin shadow-xl dark:border-dark-origin relative z-200 font-figtree md:w-[175px] rounded-4xl px-4 py-5'>
        <ContextMenuItem
          onClick={handleCopyUrl}
          className='h-12 rounded-xl cursor-pointer'>
          <Icon name='shape-subtract' className='size-5' />
          <span className='pl-2'>Copy Image URL</span>
        </ContextMenuItem>
        <ContextMenuSeparator className='bg-origin/40' />
        <ContextMenuItem
          onClick={handleDownloadImage}
          className='h-12 rounded-xl cursor-pointer'>
          <Icon name='download' className='size-5' />
          <span className='pl-2'>Download Image</span>
        </ContextMenuItem>
        <ContextMenuSeparator className='bg-origin/40' />
        <ContextMenuItem
          onClick={handlePrintQr}
          className='h-12 rounded-xl cursor-pointer'>
          <Icon name='printer' className='size-5' />
          <span className='pl-2'>Print QR Code</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
