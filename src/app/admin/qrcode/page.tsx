'use client'
import {QRCodeSVG} from '@/components/experimental/qr-viewer'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useAuthCtx} from '@/ctx/auth'
import {onSuccess, onWarn} from '@/ctx/toast'
import {createBulkQRCodes} from '@/lib/firebase/cards'
import {Icon} from '@/lib/icons'
import {User} from 'firebase/auth'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {CountSelectDrop} from '../_components/count-select-drop'
import {AdminDock} from '../_components/dock'

const QRCodePage = () => {
  const {user} = useAuthCtx()
  const back = useRouter().back
  const [qrCodeGens, setQrCodeGens] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCount, setGeneratedCount] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(100)
  const [groupName, setGroupName] = useState('general')

  const generateQr = async (grp: string, count: number) => {
    if (isGenerating) return

    setIsGenerating(true)

    try {
      const generatedIds = await createBulkQRCodes(count, grp, user as User)

      setQrCodeGens((prev) => [...prev, ...generatedIds])
      setGeneratedCount(generatedIds.length)
      onSuccess(`Successfully generated ${generatedIds.length} QR codes`)
      return generatedIds
    } catch (error) {
      console.error('Bulk QR generation failed:', error)
      onWarn(
        `Failed to generate QR codes: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStartGeneration = async (grp?: string) => {
    if (isGenerating) return

    if (user && !grp) {
      setGroupName(user.uid.substring(-6).trim())
      return generateQr(groupName, selectedQuantity)
    }

    if (selectedQuantity <= 0) {
      onWarn('Please select a valid quantity')
      return
    }

    if (selectedQuantity > 10000) {
      onWarn('Maximum quantity allowed is 10,000')
      return
    }

    grp = groupName.trim() ?? 'general'
    await generateQr(grp, selectedQuantity)
  }

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      {/* Header */}
      <div className='fixed top-0 bg-zinc-800/10 dark:bg-zinc-700/10 flex flex-col w-full border-b border-zinc-500/10'>
        <div className='flex items-center justify-between w-full py-3 px-3 md:p-6 h-fit'>
          <div className='flex w-full space-x-10 md:space-x-12 lg:space-x-24 xl:space-x-32'>
            <div className='w-fit'>
              <div className='h-full w-full flex flex-col items-center font-figtree space-y-1'>
                <p className='opacity-60 md:text-base text-xs tracking-tight'>
                  Generated
                </p>
                <p className='text-sm md:text-xl font-semibold font-space tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] px-1'>
                  {generatedCount}
                </p>
              </div>
            </div>
          </div>

          <div className='w-full flex items-start justify-end space-x-1 md:space-x-4'>
            <CountSelectDrop setSelectedQuantity={setSelectedQuantity}>
              <button className='relative h-full w-full flex flex-col font-figtree tracking-tight whitespace-nowrap space-y-2'>
                <p className='opacity-60 md:text-lg font-medium text-xs tracking-tight'>
                  QR Codes
                </p>
                <div className='relative text-sm md:text-xl font-space tracking-tight text-right flex items-center justify-end space-x-2'>
                  <Icon
                    name='chevron-down'
                    className='size-3 md:size-4 mr-0.5 md:ml-1 text-mac-gray'
                  />
                  <span className='lg:w-14 md:w-10 w-8 font-semibold'>
                    {selectedQuantity}
                  </span>
                </div>
              </button>
            </CountSelectDrop>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className='h-full w-full md:mt-29 mt-19 flex items-center justify-center'>
        <div className='h-full w-full'>
          <div className=' h-screen overflow-scroll pb-64'>
            <div className='h-14 bg-slate-200 dark:bg-gray-800/20 w-full flex items-center justify-between px-2'>
              <SexyButton
                variant='ghost'
                size='sm'
                leftIcon='add'
                className='flex items-center space-x-2 bg-white dark:bg-background'>
                <span className='font-bold font-figtree tracking-tight'>
                  New Group
                </span>
              </SexyButton>
              <div className='w-full flex'></div>
              <SexyButton
                className='size-9 bg-white dark:bg-background'
                size='sq'
                variant='ghost'>
                <Icon name='bullet-list-square' className='size-6' />
              </SexyButton>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              {qrCodeGens.map((gen, idx) => (
                <div
                  className='relative size-full aspect-square flex items-center md:justify-start justify-center'
                  key={String(gen + ' ' + idx)}>
                  <div className='absolute size-10 aspect-square rounded-lg shadow-md bg-muted top-4 left-4 flex items-center justify-center border-[0.33px] border-zinc-600/20'>
                    <span className='font-space text-xl'>
                      {idx + 1} - {gen}
                    </span>
                  </div>
                  <div className='h-[160px] col-span-1 rounded overflow-hidden'>
                    <QRCodeSVG
                      options={{
                        content: `https://protap.ph/api/activation/?id=${gen}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dock */}
      <div className='fixed md:bottom-20 bottom-4 w-full'>
        <AdminDock
          back={back}
          selected='qrcode'
          startFn={handleStartGeneration}
          haltFn={() => {}}
          clearFn={() => {}}
          loading={isGenerating}
        />
      </div>
    </div>
  )
}

export default QRCodePage
