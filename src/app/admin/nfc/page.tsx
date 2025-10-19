'use client'
import {useAuthCtx} from '@/ctx/auth'
import {onWarn} from '@/ctx/toast'
import {useNFC} from '@/hooks/use-nfc'
import {checkCard, createCard} from '@/lib/firebase/cards'
import {macStr} from '@/utils/macstr'
import {useRouter} from 'next/navigation'
import {useEffect, useMemo, useState} from 'react'
import {BatchName} from '../_components/batch-name'
import {AdminDock, DockItems} from '../_components/dock'
import {GroupName} from '../_components/group-name'
import {NFCDataWithDuplicate, NFCScanList} from '../_components/nfc-list'
import {SeriesSelect} from '../_components/select-series'

const NFCPage = () => {
  const {user} = useAuthCtx()
  const back = useRouter().back

  const {scanDetails, isScanning, startScanning, clearHistory, stopScanning} =
    useNFC({
      autoStop: false,
    })

  const [nfcScans, setNCFScans] = useState<(NFCDataWithDuplicate | null)[]>([])
  const [firestoreReceipt, setFirestoreReceipt] = useState<string | null>(null)
  const col = 'general'

  const [series, setSeries] = useState<string>('individual')
  const [group, setGroup] = useState('indv')
  const [batch, setBatch] = useState(Date.now().toString())

  useEffect(() => {
    if (!scanDetails) return

    const serialNumber = scanDetails.serialNumber
    const isLocalDuplicate = nfcScans.some(
      (item) => item?.serialNumber === serialNumber,
    )

    // Append new scan with duplicate flag and initial isOnlist=false
    setNCFScans((prev) => [
      ...prev,
      {
        ...scanDetails,
        isDuplicate: isLocalDuplicate,
        isOnlist: false,
      },
    ])

    // Check Firestore and create if needed
    const id = macStr(serialNumber)
    ;(async () => {
      const exists = await checkCard(id, col)
      if (exists) {
        onWarn('Card already on the list')
        // Mark all scans with this serial as onlist
        setNCFScans((prev) =>
          prev.map((item) =>
            item && item.serialNumber === serialNumber
              ? {...item, isOnlist: true}
              : item,
          ),
        )
        return
      }

      // Only create for non-duplicates within this session
      if (!isLocalDuplicate && user) {
        setFirestoreReceipt(
          await createCard(scanDetails, {series, group, batch}, user, col),
        )
      }
    })()
  }, [scanDetails, col, nfcScans, user])

  const clearList = () => {
    setNCFScans([])
    clearHistory()
  }

  const dockItems = useMemo(
    () =>
      ({
        nav: [{id: 'back', icon: 'back', fn: back, label: 'Dashboard'}],
        toolbar: [
          {
            name: 'start scan',
            fn: startScanning,
            icon: isScanning ? 'nfc' : 'play-solid',
            style: 'text-blue-400 dark:text-blue-300',
          },
          {
            name: 'halt',
            fn: stopScanning,
            icon: 'pause-solid',
            style: isScanning
              ? 'text-amber-500'
              : 'text-slate-300 dark:text-slate-600',
          },
          {
            name: 'toggle view',
            fn: isScanning ? () => {} : () => console.log('toggle view'),
            icon: 'split-vertical',
            style: isScanning ? 'text-zinc-800' : 'text-zinc-500',
          },
        ],
        options: [
          {
            name: 'clear list',
            fn: isScanning ? () => {} : clearList,
            icon: 'eraser',
            style: isScanning
              ? 'text-zinc-800'
              : 'text-red-500 dark:text-red-400',
          },
        ],
      }) as DockItems,
    [isScanning],
  )

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      {/* Header */}
      <div className='fixed top-0 bg-zinc-800/10 dark:bg-zinc-700/10 flex flex-col w-full border-b border-zinc-500/10'>
        <div className='flex w-full items-center justify-between py-3 px-3 md:p-6 h-fit'>
          {/*<div className='w-full h-full flex items-center justify-end r-2'>
            <div className='h-full w-full flex flex-col items-end overflow-hidden font-figtree tracking-tight'>
              <ScanStatus isScanning={isScanning} />
            </div>
          </div>*/}

          <div className='flex item-center justify-center space-x-6'>
            <SeriesSelect setSeries={setSeries} disabled={isScanning} />
            <GroupName
              disabled={isScanning}
              setGroup={setGroup}
              group={group}
            />
            <BatchName
              disabled={isScanning}
              setBatch={setBatch}
              batch={batch}
            />
            <ScanStatus isScanning={isScanning} />
          </div>

          <div className='flex items-start justify-end space-x-1 md:space-x-4'>
            <div className='h-full w-full flex flex-col items-center font-figtree space-y-1'>
              <p className='opacity-60 md:text-base text-xs tracking-tight'>
                Cards
              </p>
              <p className='text-sm md:text-xl font-semibold font-space tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] px-1'>
                {nfcScans.filter((scan) => !scan?.isDuplicate).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className='h-full w-full md:mt-29 mt-19 flex items-center justify-center'>
        <div className='h-full w-full'>
          <div className='p-4'>
            <NFCScanList list={nfcScans} firestoreReceipt={firestoreReceipt} />
          </div>
        </div>
      </div>

      {/* Bottom Dock */}
      <div className='fixed md:bottom-20 bottom-4 w-full'>
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
    <div className='w-full hidden md:flex items-center justify-start text-xs md:text-base font-figtree'>
      <div className='h-full w-full flex flex-col items-start justify-center font-figtree space-y-1'>
        <p className='opacity-60 md:text-base text-xs tracking-tight'>state</p>
        <div className='flex items-center w-full text-sm md:text-xl font-semibold font-figtree tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]'>
          <span className={isScanning ? 'animate-pulse' : ''}>
            {isScanning ? 'Scanning' : 'ready'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default NFCPage
