'use client'
import {useAuthCtx} from '@/ctx/auth'
import {onSuccess, onWarn} from '@/ctx/toast'
import {useMobile} from '@/hooks/use-mobile'
import {createBulkQRCodes, ProtapActivationInfo} from '@/lib/firebase/cards'
import {Icon} from '@/lib/icons'
import {User} from 'firebase/auth'
import {Timestamp} from 'firebase/firestore'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {BatchName} from '../_components/batch-name'
import {CardCounter} from '../_components/card-counter'
import {CardItem} from '../_components/card-item'
import {CardItemSheet} from '../_components/card-item-sheet'
import {CountSelectDrop} from '../_components/count-select-drop'
import {AdminDock, DockItems} from '../_components/dock'
import {GroupName} from '../_components/group-name'
import {SeriesSelect} from '../_components/select-series'

const QRCodePage = () => {
  const {user} = useAuthCtx()
  const back = useRouter().back
  const [qrCodeGens, setQrCodeGens] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCount, setGeneratedCount] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(100)
  const [series, setSeries] = useState('individual')
  const [group, setGroup] = useState('indv')
  const [batch, setBatch] = useState(Date.now().toString())
  const [createdAt, setCreatedAt] = useState<Timestamp | null>(null)
  const isMobile = useMobile()

  const generateQr = async (coll: string, count: number) => {
    if (isGenerating) return

    setIsGenerating(true)

    try {
      const {createdIds, createdAt} = await createBulkQRCodes(
        coll,
        count,
        series,
        group,
        batch,
        user as User,
      )

      setQrCodeGens((prev) => [...prev, ...createdIds])
      setCreatedAt(createdAt)
      setGeneratedCount(createdIds.length)
      onSuccess(`Successfully generated ${createdIds.length} QR codes`)
      return createdIds
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
      setGroup(user.uid.substring(-4).trim())
      return generateQr(group, selectedQuantity)
    }

    if (selectedQuantity <= 0) {
      onWarn('Please select a valid quantity')
      return
    }

    if (selectedQuantity > 10000) {
      onWarn('Maximum quantity allowed is 10,000')
      return
    }

    await generateQr(group.trim(), selectedQuantity)
  }

  const handleClearGens = () => {
    setQrCodeGens([])
    setGeneratedCount(0)
  }

  const [openCardItem, setOpenCardItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ProtapActivationInfo | null>(
    null,
  )

  const handleOpenCardItem = (item: ProtapActivationInfo | null) => {
    if (item) {
      setSelectedItem(item)
      setOpenCardItem(true)
    } else {
      setOpenCardItem((prev) => !prev)
    }
  }

  const handleSheetOpenChange = (open: boolean) => {
    setOpenCardItem(open)
    if (!open) {
      setSelectedItem(null)
    }
  }

  const dockItems: DockItems = {
    nav: [{id: 'back', icon: 'back', fn: back, label: 'Dashboard'}],
    toolbar: [
      {
        name: 'start scan',
        fn: handleStartGeneration,
        icon: isGenerating ? 'spinners-ring' : 'play-solid',
        style: 'text-blue-400 dark:text-blue-300',
      },
      {
        name: 'halt',
        fn: () => {},
        icon: 'pause-solid',
        style: isGenerating
          ? 'text-amber-500'
          : 'text-slate-300 dark:text-slate-600',
      },
      {
        name: 'clear list',
        fn: isGenerating ? () => {} : handleClearGens,
        icon: 'split-vertical',
        style: isGenerating ? 'text-zinc-800' : 'text-zinc-500',
      },
    ],
    options: [
      {
        name: 'clear list',
        fn: isGenerating ? () => {} : handleClearGens,
        icon: 'eraser',
        style: isGenerating
          ? 'text-zinc-800'
          : 'text-red-500 dark:text-red-400',
      },
    ],
  }

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      {/* Header */}
      <div className='fixed z-60 top-0 bg-zinc-800/10 dark:bg-zinc-700/10 backdrop-blur-2xl flex flex-col w-full border-b border-zinc-500/10'>
        <div className='flex items-center justify-between w-full py-3 px-3 md:p-6 h-fit'>
          <div className='flex item-center justify-center space-x-3 md:space-x-6 lg:space-x-8 xl:space-x-12'>
            <SeriesSelect disabled={generatedCount > 0} setSeries={setSeries} />
            <GroupName
              disabled={generatedCount > 0}
              group={group}
              setGroup={setGroup}
            />
            <BatchName
              disabled={generatedCount > 0}
              batch={batch}
              setBatch={setBatch}
            />
          </div>
          <div className='w-full flex items-start justify-end space-x-1 md:space-x-4'>
            <CountSelectDrop setSelectedQuantity={setSelectedQuantity}>
              <button className='relative h-full w-full flex flex-col font-figtree tracking-tight whitespace-nowrap space-y-2'>
                <p className='opacity-60 pb-2 md:text-lg font-medium text-xs tracking-tight'>
                  QR Codes
                </p>
                <div className='relative text-sm md:text-xl font-space tracking-tight text-right flex items-center justify-end space-x-2'>
                  <Icon
                    name='chevron-down'
                    className='size-3 md:size-4 mr-0.5 md:ml-1 text-mac-gray'
                  />
                  <div className='lg:w-14 md:w-10 w-8 font-semibold'>
                    <CardCounter value={selectedQuantity} />
                  </div>
                </div>
              </button>
            </CountSelectDrop>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className='flex items-center justify-center h-full w-full '>
        <div className='h-full w-full'>
          <div className='h-screen overflow-scroll pb-64'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-24 md:pt-36 px-3 md:px-4'>
              {qrCodeGens.map((gen) => (
                <CardItem
                  id={gen}
                  key={gen}
                  group={group}
                  batch={batch}
                  series={series}
                  viewFn={() =>
                    handleOpenCardItem({
                      id: gen,
                      series,
                      group,
                      batch,
                      createdAt,
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dock */}
      <div className='fixed md:bottom-20 bottom-4 w-full'>
        <AdminDock dockItems={dockItems} />
      </div>
      <CardItemSheet
        open={openCardItem}
        onOpenChange={handleSheetOpenChange}
        item={selectedItem}
        isMobile={isMobile}
      />
    </div>
  )
}

export default QRCodePage
