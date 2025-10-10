'use client'
import {type ClassName} from '@/app/types'
import {QRCodeSVG} from '@/components/experimental/qr-viewer'
import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {type TabItem} from '@/components/kokonutui/smooth-tab'
import {useAuthCtx} from '@/ctx/auth'
import {onSuccess, onWarn} from '@/ctx/toast'
import {useNFC} from '@/hooks/use-nfc'
import {checkCard, createBulkQRCodes, createCard} from '@/lib/firebase/cards'
import {Icon, type IconName} from '@/lib/icons'
import {cn} from '@/lib/utils'
import {opts} from '@/utils/helpers'
import {macStr} from '@/utils/macstr'
import {User} from 'firebase/auth'
import {AnimatePresence, motion} from 'motion/react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {BaseTabProps} from '../account/_components/tab-activation'
import {CountSelectDrop} from './_components/count-select-drop'
import {AdminDock} from './_components/dock'
import {NFCDataWithDuplicate, NFCScanList} from './_components/nfc-list'
import {StatItem} from './_components/stat-item'

interface ActivationItem {
  icon: IconName
  iconStyle?: ClassName
  description?: string
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.95,
    position: 'absolute' as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    position: 'absolute' as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.95,
    position: 'absolute' as const,
  }),
}
const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
}

export const Content = () => {
  const onChange = (id: string) => {
    console.log('onChange', id)
  }
  return <AdminTabs onChange={onChange} />
}

const AdminTabs = ({onChange}: BaseTabProps) => {
  const {user} = useAuthCtx()
  const {scanDetails, isScanning, startScanning, clearHistory, stopScanning} =
    useNFC({
      autoStop: false,
    })

  const [selected, setSelected] = useState<string>('qrcode')
  const [direction, setDirection] = useState(0)

  const [nfcScans, setNCFScans] = useState<(NFCDataWithDuplicate | null)[]>([])
  const [qrCodeGens, setQrCodeGens] = useState<string[]>([])
  const [firestoreReceipt, setFirestoreReceipt] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [, setGenerationProgress] = useState(0)
  const [generatedCount, setGeneratedCount] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(100)
  const [groupName, setGroupName] = useState('general')

  const activationTabs = useMemo(
    () =>
      [
        {
          id: 'qrcode',
          title: 'QR Codes',
          label: 'QR Codes',
          description:
            'Scan QR Code with your smartphone camera or upload an image',
          color: 'bg-zinc-500 hover:bg-zinc-600',
          icon: 'qr-code',
          iconStyle: 'text-white md:size-54 size-36 translate-y-6',
          content: <div />,
        },
        {
          id: 'ntag',
          title: 'NFC Cards',
          label: 'NFC Cards',
          description: 'Scan NTAG Card with your NFC enabled smartphone',
          color: 'bg-neutral-300 hover:bg-neutral-500',
          icon: 'nfc',
          iconStyle:
            'absolute md:size-96 size-64 top-20 md:top-24 left-1/2 -translate-x-1/2',
          content: (
            <div className='p-4'>
              <pre>
                {scanDetails ? JSON.stringify(scanDetails, null, 2) : 'idle'}
              </pre>
            </div>
          ),
        },
      ] as (TabItem & ActivationItem)[],
    [scanDetails],
  )

  // Reference for the selected button
  const selectedItem = activationTabs.find((tab) => tab.id === selected)

  // Update dimensions whenever selected tab changes or on mount
  const handleTabClick = (tabId: string) => () => {
    const currentIndex = activationTabs.findIndex((tab) => tab.id === selected)
    const newIndex = activationTabs.findIndex((tab) => tab.id === tabId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setSelected(tabId)
    onChange?.(tabId)
  }

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
      const exists = await checkCard(id, groupName)
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
        setFirestoreReceipt(await createCard(scanDetails, user, groupName))
      }
    })()
  }, [scanDetails])

  const clearList = () => {
    setNCFScans([])
    clearHistory()
  }

  const generateQr = async (grp: string, count: number) => {
    if (isGenerating) return

    setIsGenerating(true)
    setGenerationProgress(0)
    setGeneratedCount(0)

    try {
      const generatedIds = await createBulkQRCodes(
        count,
        grp,
        user as User,
        (progress) => setGenerationProgress(progress),
      )

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
      setGenerationProgress(0)
    }
  }

  // Wrapper function for AdminDock compatibility - using selected values
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

  // const qrCodeList = useMemo(() => {
  //   if (!qrCodeGens) return []
  //   const qrCodes = Array.from({length: qrCodeGens.length}, (id, i) => {
  //     const url = `https://example.com/?id=${id}&grp=${groupName}`
  //     return {id, url}
  //   })
  //   return qrCodes
  // }, [selectedQuantity])

  const ListViewer = useCallback(() => {
    const options = opts(
      <NFCScanList list={nfcScans} firestoreReceipt={firestoreReceipt} />,
      <div className=' h-screen overflow-scroll pb-64'>
        <div className='h-16 border-b border-muted-foreground/20 w-full flex items-center justify-between px-2'>
          <SexyButton
            variant='ghost'
            leftIcon='add'
            className='flex items-center space-x-2'>
            <span className='font-bold font-figtree tracking-tight'>
              New Group
            </span>
          </SexyButton>
          <div className='w-full flex'></div>
          <SexyButton className='size-10 ' size='sq' variant='ghost'>
            <Icon name='bullet-list-square' className='size-6' />
          </SexyButton>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {qrCodeGens.map((gen, idx) => (
            <div
              className='relative size-full aspect-square flex items-center md:justify-start justify-center'
              key={String(gen + ' ' + idx)}>
              <div className='absolute size-10 aspect-square rounded-lg shadow-md bg-muted top-4 left-4 flex items-center justify-center border-[0.33px] border-zinc-600/20'>
                <span className='font-space text-xl'>{idx + 1}</span>
              </div>
              <div className='h-[160px] col-span-1 rounded overflow-hidden'>
                <QRCodeSVG
                  options={{content: `https://protap.ph/activation/?id=${gen}`}}
                />
              </div>
            </div>
          ))}
        </div>
        ,
      </div>,
    )
    return <>{options.get(selected === 'ntag')}</>
  }, [nfcScans, firestoreReceipt, qrCodeGens, selected])

  useEffect(() => {
    if (qrCodeGens) {
      console.log(JSON.stringify(qrCodeGens, null, 2))
    }
  }, [qrCodeGens])

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      {/* Card Content Area */}
      <div className='flex-1 h-full relative'>
        <div className='w-full h-full relative overflow-hidden'>
          <div className='h-fit absolute inset-0'>
            <AnimatePresence
              initial={false}
              mode='popLayout'
              custom={direction}>
              <motion.div
                key={`card-${selected}`}
                custom={direction}
                variants={slideVariants as any}
                initial='enter'
                animate='center'
                exit='exit'
                transition={transition as any}
                className='absolute inset-0 w-full will-change-transform'
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}>
                <div className='fixed top-0 bg-zinc-800/10 flex flex-col w-full '>
                  <div className='flex items-center justify-between w-full py-3 px-3 md:p-6 h-fit border-b border-zinc-500/20'>
                    <div className='w-full h-full flex items-center justify-end pr-2'>
                      <div className='h-full w-full flex flex-col items-end overflow-hidden font-figtree tracking-tight'>
                        <ScanStatus isScanning={isScanning} />
                      </div>
                    </div>

                    {selected === 'ntag' ? (
                      <div className='flex w-full space-x-10 md:space-x-12 lg:space-x-24 xl:space-x-32'>
                        <div className='w-fit'>
                          <div className='h-full w-full flex flex-col items-center font-figtree space-y-1'>
                            <p className='opacity-60 md:text-base text-xs tracking-tight'>
                              Scans
                            </p>
                            <p className='text-sm md:text-xl font-semibold font-space tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] px-1'>
                              {
                                nfcScans.filter((scan) => !scan?.isDuplicate)
                                  .length
                              }
                            </p>
                          </div>
                        </div>
                        <div className='w-fit'>
                          <div className='h-full w-full flex flex-col items-center font-figtree space-y-1'>
                            <p className='opacity-60 md:text-lg text-xs tracking-tight'>
                              Duplicates
                            </p>
                            <p className='text-sm md:text-xl font-semibold font-space tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)] px-1'>
                              {
                                nfcScans.filter((scan) => scan?.isDuplicate)
                                  .length
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='flex w-full space-x-10 md:space-x-12 lg:space-x-24 xl:space-x-32'>
                        <StatItem title='active' value={'yes'} />
                        <StatItem title='#' value={String(generatedCount)} />
                      </div>
                    )}

                    <div className='w-full flex items-start justify-end space-x-1 md:space-x-4'>
                      <CountSelectDrop
                        setSelectedQuantity={setSelectedQuantity}>
                        <button className='relative h-full w-full flex flex-col font-figtree tracking-tight whitespace-nowrap space-y-2'>
                          <p className='opacity-60 md:text-lg font-medium text-xs tracking-tight'>
                            {selectedItem?.title}
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
              </motion.div>
            </AnimatePresence>
          </div>
          <div className='size-full md:mt-29 mt-19 flex items-center justify-center'>
            <div className='h-full w-full'>
              <ListViewer />
            </div>
          </div>
        </div>
      </div>

      <div className='fixed md:bottom-20 bottom-4 w-full'>
        <AdminDock
          tabClick={handleTabClick}
          selected={selected}
          startFn={selected === 'ntag' ? startScanning : handleStartGeneration}
          haltFn={stopScanning}
          clearFn={clearList}
          loading={isScanning || isGenerating}
        />
      </div>
    </div>
  )
}

interface ScanStatusProps {
  isScanning: boolean
}

const ScanStatus = ({isScanning}: ScanStatusProps) => {
  return (
    <div className='w-full flex items-center justify-start text-xs md:text-base font-figtree'>
      <div className='h-full w-full flex flex-col items-start justify-center font-figtree space-y-1'>
        <p className='opacity-60 md:text-base text-xs tracking-tight'>state</p>
        <div className='flex items-center w-full text-sm md:text-xl font-semibold font-figtree tracking-tight [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]'>
          {/*<Icon
            name={isScanning ? 'scan-waves' : 'check'}
            className='size-3.5 md:size-4 mr-0.5 md:mr-1 text-teal-600 dark:text-accent'
          />*/}
          <span className={cn('', {'animate-pulse': isScanning})}>
            {isScanning ? 'Scanning' : 'ready'}
          </span>
          <Icon
            name={isScanning ? 'scan-waves' : 'check'}
            className={cn(
              'size-3 md:size-4 mr-0.5 md:ml-1 text-teal-600 dark:text-accent',
              {' -scale-100': isScanning},
            )}
          />
        </div>
      </div>
    </div>
  )
}
