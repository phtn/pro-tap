'use client'

import {HyperCard} from '@/components/experimental/card/hyper-card'
import {HyperList} from '@/components/list'
import {CardContent} from '@/components/ui/card'
import {Note, useTone} from '@/ctx/tone'
import {useMobile} from '@/hooks/use-mobile'
import {useQrGen} from '@/hooks/use-qr-gen'
import {Icon} from '@/lib/icons'
import {TokenMetadata} from '@/lib/jwt/tok.types'
import {useRouter} from 'next/navigation'
import {ReactNode, useEffect, useMemo, useState} from 'react'
import {BatchName} from '../_components/batch-name'
import {CardCounter} from '../_components/card-counter'
import {CardItemSheet} from '../_components/card-selected'
import {CountSelectDrop} from '../_components/count-select-drop'
import {AdminDock, DockItems} from '../_components/dock'
import {GroupName} from '../_components/group-name'
import {SeriesSelect} from '../_components/select-series'

export const QRCodeGenerator = () => {
  const back = useRouter().back
  const isMobile = useMobile()
  const {
    tokens,
    generateQRCode,
    isGenerating,
    generatedCount,
    selectedQuantity,
    setSelectedQuantity,
    setSeries,
    batch,
    setBatch,
    group,
    setGroup,
    handleClearGens,
    selectedCard,
    openCardItem,
    handleSheetOpenChange,
    handleSelectCard,
  } = useQrGen()

  const {playNote, isStarted, startAudio, stopAudio} = useTone()
  const [noteIdx, setNoteIdx] = useState<number>(0)

  const notes: Note[] = ['E4', 'G4', 'C5']

  useEffect(() => {
    if (tokens.length > 0) {
      console.log(tokens[0])
      playNote(notes[noteIdx], '16n')
    }
  }, [tokens.length, noteIdx])

  useEffect(() => {
    setNoteIdx((prev) => (prev + 1) % notes.length)
  }, [notes.length])

  const dockItems = useMemo(
    () =>
      ({
        nav: [{id: 'back', icon: 'back', fn: back, label: 'Dashboard'}],
        toolbar: [
          {
            name: 'start',
            fn: generateQRCode,
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
              isGenerating || tokens.length === 0
                ? 'text-zinc-400/80 dark:text-zinc-700'
                : 'text-zinc-600 dark:text-slate-300',
          },
        ],
      }) as DockItems,
    [isStarted, stopAudio, startAudio, isGenerating, handleClearGens],
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
            <div>
              {/**/}
              {tokens.length > 0 && (
                <HyperList
                  data={tokens.map((t, i) => ({
                    ...t,
                    count: i + 1,
                    viewFn: () => handleSelectCard(t),
                  }))}
                  component={CardItem}
                  container='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 lg:gap-4 md:gap-6 gap-4 pt-24 md:pt-36 px-3 md:px-4'
                  itemStyle='col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-1'
                  max={tokens.length}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='fixed md:bottom-20 bottom-4 w-full flex flex-col items-center'>
        <AdminDock dockItems={dockItems} />
      </div>
      <CardItemSheet
        open={openCardItem}
        onOpenChange={handleSheetOpenChange}
        item={selectedCard}
        isMobile={isMobile}
      />
    </div>
  )
}

const CardItem = (
  card: TokenMetadata & {count: number; viewFn: (token: TokenMetadata) => void},
) => {
  const handleView = () => {
    card.viewFn(card)
  }
  const rows = useMemo(
    () => [
      {
        label: 'token',
        value: (
          <div className='flex items-center w-full'>
            <span className='whitespace-nowrap tracking-wide 2xl:hidden xl:w-20'>
              {card.token ? card.token.substring(0, 8) : 'N/A'}
            </span>
            <Icon
              name='line-node'
              className='size-4 rotate-45 mx-4 opacity-60'
            />
            <span className='whitespace-nowrap tracking-wide  2xl:w-28 text-right'>
              {card.token
                ? card.token.substring(card.token.length - 12)
                : 'N/A'}
            </span>
          </div>
        ),
      },
      {label: 'series', value: card.payload?.series},
      {label: 'group', value: card.payload?.group},
    ],
    [card.payload, card.token],
  )

  return (
    <HyperCard className='w-full rounded-md dark:bg-dysto bg-white border-origin dark:border-terminal'>
      <CardContent className='space-y-2 p-1'>
        <CardHeader
          id={card.payload.uid}
          count={card.count}
          loading={!card.payload}
          viewFn={handleView}
        />
        <HyperList
          data={rows}
          component={RowItem}
          itemStyle=' border-b border-dotted dark:border-greyed last:border-none'
        />
      </CardContent>
    </HyperCard>
  )
}

interface CardHeaderProps {
  id: any
  count: number
  loading: boolean
  viewFn: VoidFunction
}

const CardHeader = ({id, count, loading, viewFn}: CardHeaderProps) => {
  return (
    <div className='border-b border-dotted dark:border-greyed h-8 px-1 flex items-center justify-between'>
      {!loading && id ? (
        <div className='flex items-center space-x-3'>
          <span className='font-tek w-7 font-bold text-greyed bg-indigo-50 dark:bg-dark-origin/60 text-center dark:text-catnip rounded-sm'>
            {count}
          </span>
          <label className='text-xs font-space tracking-wider opacity-80'>
            {id}
          </label>
        </div>
      ) : (
        <Icon name='spinners-dots' className='size-3.5' />
      )}
      <Icon
        name='eye'
        onClick={viewFn}
        className='size-6 dark:text-catnip hover:bg-dark-origin/80 p-1 rounded-md shrink-0'
      />
    </div>
  )
}

interface RowItemProps {
  label?: string
  value?: ReactNode
  children?: ReactNode
}

const RowItem = ({label, value, children}: RowItemProps) => (
  <div className='flex items-center justify-between font-space p-3 text-xs break-all'>
    <div className='text-xs w-full font-medium font-figtree uppercase text-foreground'>
      {label}
    </div>
    <div className='flex w-fit whitespace-nowrap'>
      {value}
      {children}
    </div>
  </div>
)
