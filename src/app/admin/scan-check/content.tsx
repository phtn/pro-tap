'use client'
import {useAuthCtx} from '@/ctx/auth'
import {useTone} from '@/ctx/tone'
import {useNFC} from '@/hooks/use-nfc'
import {useToggle} from '@/hooks/use-toggle'
import {checkCard} from '@/lib/firebase/cards'
import {Icon} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {useNFCStore} from '@/stores/nfc-store'
import {secureRef} from '@/utils/crypto'
import {macStr} from '@/utils/macstr'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {CardSeries} from '../../../../convex/cards/d'
import {AdminDock, DockItems} from '../_components/dock'

export const ScanCheckContent = () => {
  const {user} = useAuthCtx()
  const back = useRouter().back

  const {
    scanDetails,
    isScanning,
    startScanning,
    clearHistory,
    stopScanning,
    setBatch,
    setGroup,
    setSeries,
    series,
    group,
    batch,
    payload,
  } = useNFC({
    autoStop: false,
    withWrite: true,
  })
  const {nfcScans, addScan, clearList, setFirestoreReceipt, markAsOnList} =
    useNFCStore()
  const coll = 'general'

  const [, setIsSupported] = useState(false)

  useEffect(() => {
    const supported =
      typeof window !== 'undefined' &&
      window.isSecureContext &&
      'NDEFReader' in window

    setIsSupported(supported)
    if (!supported) {
      console.error('NFC is not supported')
    }
  }, [])

  useEffect(() => {
    if (!scanDetails) return

    // Add scan to store
    addScan(scanDetails)

    // Check Firestore and create if needed
    const serialNumber = scanDetails.serialNumber
    const id = macStr(serialNumber)
    ;(async () => {
      const exists = await checkCard(id, coll)
      if (exists) {
        markAsOnList(serialNumber)
      }

      // Only create for non-duplicates within this session
      // if (user) {
      //   setFirestoreReceipt(
      //     await createCard(scanDetails, {series, group, batch}, user, coll),
      //   )
      // }
    })()
  }, [
    scanDetails,
    coll,
    user,
    series,
    group,
    batch,
    addScan,
    setFirestoreReceipt,
    markAsOnList,
  ])

  const handleClearList = () => {
    clearList()
    clearHistory()
  }

  const {isStarted, startAudio, stopAudio, playNote} = useTone()

  useEffect(() => {
    if (scanDetails) {
      playNote('E5', '16n')
    }
  }, [scanDetails])

  const {on: toolOpen, toggle: toggleTool} = useToggle()
  const seriesList: CardSeries[] = [
    'individual',
    'fleet',
    'limited-edition',
    'other',
  ]

  const handleRandom = useCallback(() => {
    const random = Math.floor(Math.random() * 3)
    setSeries(seriesList[random])
    setGroup(secureRef(4))
    setBatch(secureRef(3))
    toggleTool()
  }, [])

  const dockItems = useMemo(
    () =>
      ({
        nav: [{id: 'back', icon: 'back', fn: back, label: 'Dashboard'}],
        toolbar: [
          {
            name: 'Toggle View',
            fn: handleRandom,
            icon: toolOpen ? 'widget-v' : 'phone',
            style: cn('text-zinc-600 dark:text-slate-300', {
              '-rotate-90': toolOpen,
            }),
          },
          {
            name: 'start scan',
            fn: startScanning,
            icon: isScanning ? 'nfc' : 'play-solid',
            style: isScanning
              ? 'animate-pulse text-zinc-600 dark:text-slate-700'
              : 'text-zinc-600 dark:text-slate-300',
          },
          {
            name: 'halt',
            fn: stopScanning,
            icon: 'pause-solid',
            style: isScanning
              ? 'text-amber-500'
              : 'text-zinc-400/80 dark:text-slate-400',
          },
          {
            name: isStarted ? 'mute' : 'sound',
            fn: isStarted ? stopAudio : startAudio,
            icon: isStarted ? 'volume' : 'volume-mute',
            style: isStarted
              ? 'text-zinc-600 dark:text-blue-300'
              : 'text-zinc-400 dark:text-slate-600',
          },
        ],
        options: [
          {
            name: 'clear list',
            fn: handleClearList,
            icon: 'eraser',
            style:
              isScanning || !scanDetails
                ? 'text-zinc-400/80 dark:text-zinc-700'
                : 'text-zinc-600 dark:text-slate-300',
          },
        ],
      }) as DockItems,
    [
      back,
      isScanning,
      scanDetails,
      stopScanning,
      startScanning,
      handleClearList,
      isStarted,
      startAudio,
      stopAudio,
    ],
  )

  const trueCount = useMemo(
    () => nfcScans.filter((scan) => !scan?.isDuplicate).length,
    [nfcScans],
  )

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      {/* Header */}
      <div className='fixed z-60 top-0 bg-origin dark:bg-dark-origin backdrop-blur-3xl flex flex-col w-full border-b border-origin dark:border-origin/60'>
        <div className='flex justify-between w-full py-3 px-3 md:p-6 h-fit'>
          <div className='flex item-center justify-center space-x-3 md:space-x-6 lg:space-x-8 xl:space-x-12'>
            <ScanStatus isScanning={isScanning} />
          </div>

          <div className='flex items-start justify-end space-x-1 md:space-x-10 h-full'>
            <div className='h-full w-full flex flex-col items-center font-figtree space-y-1'>
              <p className='text-lg md:text-3xl font-semibold font-space tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] px-1'>
                {trueCount}
              </p>
            </div>
          </div>
        </div>
      </div>
      {!nfcScans.length && (
        <div className='hidden _flex items-center justify-center mt-22 h-40 md:h-80 w-full'>
          <div className='flex w-fit bg-dark-origin/60 p-3 rounded-full italic items-center space-x-1 text-sm md:text-base font-figtree tracking-tight opacity-60'>
            <span>Press</span>
            <Icon name='play-solid' className='size-5' />
            <span>to start NFC Scanner.</span>
          </div>
        </div>
      )}
      <div className='h-full flex justify-center'>
        <div className='w-full'>
          <div className='h-22 w-full' />
          <div className='px-4'>
            <pre>{JSON.stringify({...scanDetails, ...payload}, null, 2)}</pre>
          </div>
        </div>
      </div>

      <div className='fixed md:bottom-20 bottom-4 w-full flex flex-col items-center'>
        <AdminDock dockItems={dockItems} />
      </div>
    </div>
  )
}

interface ScanStatusProps {
  isScanning: boolean
}

const ScanStatus = ({isScanning}: ScanStatusProps) => {
  return (
    <div className='hidden md:flex items-center justify-start text-xs md:text-base font-figtree'>
      <div className='h-full flex flex-col items-start justify-start font-figtree'>
        <div className='flex items-center w-full text-sm md:text-lg font-semibold font-figtree tracking-tight'>
          <span className={isScanning ? 'animate-pulse' : ''}>
            {isScanning ? 'Scanning' : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  )
}
