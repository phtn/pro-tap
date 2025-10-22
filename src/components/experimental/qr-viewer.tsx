'use client'

import { ClassName } from '@/app/types'
import { cn } from '@/lib/utils'
import QRCodeStyling, { Options } from 'qr-code-styling'
import QRCode, { Options as QRCodeSVGOptions } from 'qrcode-svg'
import { useEffect, useRef, useState } from 'react'

interface QrViewerProps {
  id: string
  grp: string
}

export default function QrViewer({ id, grp }: QrViewerProps) {
  const options: Options = {
    shape: 'square',
    width: 300,
    height: 300,
    data: `https://protap.ph/activation/?id=${id}${grp ? `&grp=${grp}` : ''}`,
    margin: 3,
    qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' },
    image: '/svg/protap-final.svg',
    imageOptions: {
      saveAsBlob: true,
      hideBackgroundDots: true,
      imageSize: 0.42,
      margin: 1,
    },
    dotsOptions: {
      type: 'dots',
      roundSize: true,
      gradient: {
        type: 'radial',
        rotation: 0,
        colorStops: [
          { offset: 0, color: '#12121a' },
          { offset: 1, color: '#14141b' },
        ],
      },
    },
    backgroundOptions: { round: 0, color: '#ffffff' },

    cornersSquareOptions: { type: 'extra-rounded', color: '#12121a' },

    cornersDotOptions: { type: 'square', color: '#000000' },
  }

  const [qrCode, setQrCode] = useState<QRCodeStyling>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQrCode(new QRCodeStyling(options))
  }, [])

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current)
    }
  }, [qrCode, ref])

  useEffect(() => {
    if (!qrCode) return
    qrCode?.update(options)
  }, [qrCode, options])

  return (
    <>
      <div className='size-[27.5rem] border flex items-center justify-center'>
        <div className='w-fit h-auto border rounded-md overflow-hidden'>
          <div className='bg-white aspect-square' ref={ref} />
        </div>
      </div>
    </>
  )
}

interface QRCodeSVGProps {
  options: QRCodeSVGOptions
  className?: ClassName
}

export const QRCodeSVG = ({ options, className }: QRCodeSVGProps) => {
  const code = new QRCode({
    content: options.content,
    padding: 4,
    width: options.width ?? 160,
    height: options.height ?? 160,
    color: '#12121a',
    background: '#ffffff',
    ecl: 'M' as const,
  })

  const svgString = code.svg()

  return (
    <div className={cn('size-full', className)}>
      {
        <svg
          className='aspect-square'
          dangerouslySetInnerHTML={{ __html: svgString }}
        />
      }
    </div>
  )
}

// Hook to get QR code SVG data for downloading/printing
export const useQRCodeSVG = ({ options }: { options: QRCodeSVGOptions }) => {
  const code = new QRCode({
    content: options.content,
    padding: 4,
    width: options.width ?? 160,
    height: options.height ?? 160,
    color: '#12121a',
    background: '#ffffff',
    ecl: 'M' as const,
  })

  return code.svg()
}
