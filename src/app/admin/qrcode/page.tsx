'use client'

import {Note, useTone} from '@/ctx/tone'
import {useMobile} from '@/hooks/use-mobile'
import {useQrGen} from '@/hooks/use-qr-gen'
import {Icon} from '@/lib/icons'
import {useRouter} from 'next/navigation'
import {useEffect, useMemo, useState} from 'react'
import {BatchName} from '../_components/batch-name'
import {CardCounter} from '../_components/card-counter'
import {CardItem} from '../_components/card-item'
import {CardItemSheet} from '../_components/card-item-sheet'
import {CountSelectDrop} from '../_components/count-select-drop'
import {AdminDock, DockItems} from '../_components/dock'
import {GroupName} from '../_components/group-name'
import {SeriesSelect} from '../_components/select-series'

const QRCodePage = () => {
  const {
    group,
    batch,
    series,
    setBatch,
    setGroup,
    createdAt,
    setSeries,
    qrCodeGens,
    openCardItem,
    isGenerating,
    selectedItem,
    generatedCount,
    handleClearGens,
    selectedQuantity,
    handleOpenCardItem,
    setSelectedQuantity,
    handleStartGeneration,
    handleSheetOpenChange,
  } = useQrGen()
  const back = useRouter().back
  const isMobile = useMobile()

  const {playNote, isStarted, startAudio, stopAudio} = useTone()
  const [noteIdx, setNoteIdx] = useState<number>(0)

  const notes: Note[] = ['E4', 'G4', 'C5']

  useEffect(() => {
    if (qrCodeGens.length > 0) {
      playNote(notes[noteIdx], '16n')
    }
  }, [qrCodeGens.length, noteIdx])

  useEffect(() => {
    setNoteIdx((prev) => (prev + 1) % notes.length)
  }, [notes.length])

  const dockItems = useMemo(
    () =>
      ({
        nav: [{id: 'back', icon: 'back', fn: back, label: 'Dashboard'}],
        toolbar: [
          {
            name: 'start scan',
            fn: handleStartGeneration,
            icon: isGenerating ? 'spinners-ring' : 'play',
            style: 'text-zinc-600 dark:text-slate-300',
          },
          {
            name: isStarted ? 'mute' : 'sound',
            fn: isStarted ? stopAudio : startAudio,
            icon: isStarted ? 'volume' : 'volume-mute',
            style: isStarted
              ? 'text-zinc-600 dark:text-blue-300'
              : 'text-zinc-400 dark:text-slate-600',
          },
          {
            name: 'settings',
            fn: isGenerating ? () => {} : () => handleClearGens(),
            icon: 'settings',
            style: isGenerating
              ? 'text-zinc-400/80 dark:text-zinc-700'
              : 'text-zinc-600 dark:text-slate-300',
          },
        ],
        options: [
          {
            name: 'clear list',
            fn: handleClearGens,
            icon: 'eraser',
            style:
              isGenerating || qrCodeGens.length === 0
                ? 'text-zinc-400/80 dark:text-zinc-700'
                : 'text-zinc-600 dark:text-slate-300',
          },
        ],
      }) as DockItems,
    [
      isStarted,
      stopAudio,
      startAudio,
      isGenerating,
      handleClearGens,
      handleStartGeneration,
      qrCodeGens,
    ],
  )

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      {/* Header */}
      <div className='fixed z-60 top-0 bg-origin dark:bg-dark-origin backdrop-blur-2xl flex flex-col w-full border-b border-origin dark:border-origin/60'>
        <div className='flex items-center justify-between w-full py-3 px-3 md:p-6 h-fit'>
          <div className='flex item-center justify-center space-x-3 md:space-x-6 lg:space-x-8 xl:space-x-12'>
            <SeriesSelect disabled={generatedCount > 0} setSeries={setSeries} />
            <GroupName
              group={group}
              setGroup={setGroup}
              disabled={generatedCount > 0}
            />
            <BatchName
              batch={batch}
              setBatch={setBatch}
              disabled={generatedCount > 0}
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
      {/*
  const notes: string[] = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  */}
      {/* Bottom Dock */}
      <div className='fixed md:bottom-20 bottom-4 w-full flex flex-col items-center'>
        <AdminDock dockItems={dockItems} />
        {/*{isStarted ? (
          <SexyButton onClick={() => playNote('C4', '16n')}>Play</SexyButton>
        ) : (
          <SexyButton onClick={startAudio}>Start</SexyButton>
        )}*/}
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
