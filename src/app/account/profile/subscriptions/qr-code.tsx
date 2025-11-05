import {ImageContextMenu} from '@/app/admin/_components/card-data-item-sheet'
import {QRCodeSVG} from '@/components/experimental/qr-viewer'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useMobile} from '@/hooks/use-mobile'
import {useNodeEnv} from '@/hooks/use-node-env'
import {cn} from '@/lib/utils'
import html2canvas from 'html2canvas'
import {Options} from 'qrcode-svg'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {UserProfileProps} from '../../../../../convex/userProfiles/d'

interface UserProfileQRCodeProps {
  userProfile: UserProfileProps | null | undefined
}

export const UserProfileQRCode = ({userProfile}: UserProfileQRCodeProps) => {
  const isMobile = useMobile()
  const {baseUrl} = useNodeEnv()

  const username =
    userProfile?.username ??
    userProfile?.displayName?.split(' ').shift() ??
    'QR-Code'
  const qrUrl = userProfile?.cardId ? `https://${baseUrl}/u/${username}` : ''
  const [svgData, setSvgData] = useState('')

  const qrRef = useRef<HTMLDivElement>(null)

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const generateImage = useCallback(async () => {
    if (imageUrl) {
      return imageUrl
    }

    // Use SVG data directly if available - avoids html2canvas color parsing issues
    if (svgData) {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return null

        // Set canvas size based on QR code dimensions (matching the options logic)
        const size = isMobile ? 240 : 320
        canvas.width = size
        canvas.height = size

        // Create image from SVG
        const img = new Image()
        const svgBlob = new Blob([svgData], {
          type: 'image/svg+xml;charset=utf-8',
        })
        const url = URL.createObjectURL(svgBlob)

        return new Promise<string>((resolve, reject) => {
          img.onload = () => {
            // Draw white background
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw SVG image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            const dataUrl = canvas.toDataURL('image/png')
            URL.revokeObjectURL(url)
            setImageUrl(dataUrl)
            resolve(dataUrl)
          }
          img.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('Failed to load SVG'))
          }
          img.src = url
        })
      } catch (error) {
        console.error('Failed to generate image from SVG:', error)
        // Fallback to html2canvas
      }
    }

    // Fallback to html2canvas if SVG method fails
    if (!qrRef.current) return null

    // Clone the element to avoid modifying the original
    const clonedElement = qrRef.current.cloneNode(true) as HTMLElement
    clonedElement.style.position = 'absolute'
    clonedElement.style.left = '-9999px'
    clonedElement.style.top = '-9999px'
    document.body.appendChild(clonedElement)

    // Remove problematic styles that use unsupported color functions
    clonedElement.style.background = '#ffffff'

    // Recursively fix child elements
    const fixElementStyles = (element: HTMLElement) => {
      const computedStyle = window.getComputedStyle(element)
      // Replace any oklch/lab colors with hex equivalents
      if (
        computedStyle.color &&
        (computedStyle.color.includes('oklch') ||
          computedStyle.color.includes('lab'))
      ) {
        element.style.color = '#000000'
      }
      if (
        computedStyle.backgroundColor &&
        (computedStyle.backgroundColor.includes('oklch') ||
          computedStyle.backgroundColor.includes('lab'))
      ) {
        element.style.backgroundColor = '#ffffff'
      }
      if (
        computedStyle.borderColor &&
        (computedStyle.borderColor.includes('oklch') ||
          computedStyle.borderColor.includes('lab'))
      ) {
        element.style.borderColor = '#cccccc'
      }
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          fixElementStyles(child)
        }
      })
    }

    fixElementStyles(clonedElement)

    const html2canvasOptions = {
      useCORS: true,
      logging: false,
      background: '#ffffff',
      ignoreElements: (element: Element) => {
        // Skip elements that might cause issues
        return (
          element.classList.contains('pointer-events-none') &&
          element.getAttribute('aria-hidden') === 'true'
        )
      },
      onclone: (clonedDoc: Document) => {
        // Additional cleanup on the cloned document
        const allElements = clonedDoc.querySelectorAll('*')
        allElements.forEach((el) => {
          const htmlEl = el as HTMLElement
          // Remove any inline styles that might have lab/oklch
          if (
            htmlEl.style.color?.includes('lab') ||
            htmlEl.style.color?.includes('oklch')
          ) {
            htmlEl.style.color = ''
          }
          if (
            htmlEl.style.backgroundColor?.includes('lab') ||
            htmlEl.style.backgroundColor?.includes('oklch')
          ) {
            htmlEl.style.backgroundColor = ''
          }
        })
      },
      scale: 2,
      allowTaint: false,
    }

    try {
      const canvas = await html2canvas(clonedElement, html2canvasOptions)
      const dataUrl = canvas.toDataURL('image/png')

      // Clean up
      document.body.removeChild(clonedElement)

      setImageUrl(dataUrl)
      return dataUrl
    } catch (error) {
      // Clean up on error
      if (document.body.contains(clonedElement)) {
        document.body.removeChild(clonedElement)
      }
      console.error('Failed to generate image:', error)
      throw error
    }
  }, [imageUrl, svgData, isMobile])

  const handleDownload = async () => {
    if (!qrRef.current) return
    const image = await generateImage()
    if (image) {
      const link = document.createElement('a')
      link.href = image
      link.download = `${username}.png`
      link.click()
    }
  }

  const handleShare = async () => {
    const image = await generateImage()
    if (image) {
      // Convert data URL to Blob
      const response = await fetch(image)
      const blob = await response.blob()
      const file = new File([blob], `${username}.png`, {
        type: 'image/png',
      })

      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share({
            title: `My QR Code`,
            text: qrUrl ?? 'QR Code',
            files: [file],
          })
          console.log('QR Code shared successfully')
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            console.log('User cancelled sharing')
            // Do nothing, user just cancelled
          } else {
            console.log('Error sharing receipt:', error)
            alert('Failed to share receipt. isProcessing instead.')
          }
          console.log('Error sharing receipt:', error)
        }
      } else {
        // Fallback for browsers that don't support the Web Share API
        alert(
          'Web Share API not supported in your browser. isProcessing instead.',
        )
        await handleDownload()
      }
    }
  }

  const handlePrint = async () => {
    const image = await generateImage()
    if (image) {
      // Create a new window for printing
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        alert('Please allow pop-ups to print the QR code')
        return
      }

      // Write HTML content with the image centered for printing
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${username} - QR Code</title>
            <style>
              @media print {
                @page {
                  margin: 0;
                  size: auto;
                }
                body {
                  margin: 0;
                  padding: 20mm;
                }
              }
              body {
                margin: 0;
                padding: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              }
              .qr-container {
                text-align: center;
              }
              .qr-image {
                max-width: 100%;
                height: auto;
                margin-bottom: 20px;
              }
              .qr-title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
                color: #000;
              }
              .qr-url {
                font-size: 14px;
                color: #666;
                word-break: break-all;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <div class="qr-title">${username}'s QR Code</div>
              <img src="${image}" alt="QR Code" class="qr-image" />
              ${qrUrl ? `<div class="qr-url">${qrUrl}</div>` : ''}
            </div>
          </body>
        </html>
      `)

      printWindow.document.close()

      // Wait for the window and image to load, then print
      const waitForPrint = () => {
        if (printWindow.document.readyState === 'complete') {
          // Wait a bit more for images to load
          setTimeout(() => {
            printWindow.print()
            // Optionally close the window after printing dialog is dismissed
            // Users can close it manually or we can close it after a delay
          }, 500)
        } else {
          printWindow.addEventListener('load', () => {
            setTimeout(() => {
              printWindow.print()
            }, 500)
          })
        }
      }

      waitForPrint()
    }
  }

  const options = useMemo(() => {
    if (!userProfile?.cardId) return null
    return {
      content: qrUrl,
      width: isMobile ? 240 : 320,
      height: isMobile ? 240 : 320,
    } as Options
  }, [baseUrl, isMobile])

  useEffect(() => {
    if (!options) {
      setSvgData('')
      return
    }

    // Generate SVG data directly using the same logic as QRCodeSVG
    const generateSVG = async () => {
      try {
        const QRCode = (await import('qrcode-svg')).default
        const code = new QRCode({
          content: options.content,
          padding: 4,
          width: options.width,
          height: options.height,
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
  }, [options])

  return (
    options && (
      <div className='w-fit md:flex justify-center'>
        <div ref={qrRef}>
          <QRCodeSVG
            className={cn(
              'w-[320px] md:w-[400px]',
              // {
              //   ' w-[300px] h-[300px] p-1': side === 'right',
              // },
            )}
            options={options}
          />
        </div>
        <ImageContextMenu image={svgData} qrUrl={options.content} />
        <div className='flex md:flex-col font-figtree tracking-tight -mt-16 md:pt-12 md:-ml-12'>
          <SexyButton
            variant='ghost'
            onClick={handleShare}
            leftIcon='content-share-solid'
            className='px-4 flex items-center justify-center space-x-2 mb-4 mr-3 md:md-0'>
            {/*<Icon name='content-share-solid' className='size-6' />*/}
            <p className='text-sm'>Share</p>
          </SexyButton>

          <SexyButton
            variant='ghost'
            leftIcon='download'
            onClick={handleDownload}
            className='px-4 flex items-center justify-center space-x-2 mb-4 mr-3 md:md-0'>
            {/*<Icon name='content-share-solid' className='size-6' />*/}
            <p className='text-sm'>Download</p>
          </SexyButton>
          <SexyButton
            variant='ghost'
            leftIcon='printer'
            onClick={handlePrint}
            className='px-4 flex items-center justify-center space-x-2 mr-3 md:md-0'>
            {/*<Icon name='content-share-solid' className='size-6' />*/}
            <p className='text-sm'>Print</p>
          </SexyButton>
        </div>
      </div>
    )
  )
}
