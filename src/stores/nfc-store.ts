import {NFCData} from '@/hooks/use-nfc'
import {NFCDataV2} from '@/hooks/use-nfc-reader-v2'
import {create} from 'zustand'

export interface NFCDataWithDuplicate extends NFCData {
  isDuplicate: boolean
  isOnlist: boolean
}
export interface NFCDataWithDuplicateV2 extends NFCDataV2 {
  isDuplicate: boolean
  isOnlist: boolean
}

interface NFCStore {
  nfcScans: (NFCDataWithDuplicate | null)[]
  nfcScansV2: (NFCDataWithDuplicateV2 | null)[]
  firestoreReceipt: string | null
  scannedSerials: Set<string>
  addScan: (scan: NFCData) => void
  addScanV2: (scan: NFCDataV2) => void
  clearList: () => void
  setFirestoreReceipt: (receipt: string | null) => void
  markAsOnList: (serialNumber: string) => void
}

export const useNFCStore = create<NFCStore>((set, get) => ({
  nfcScans: [],
  nfcScansV2: [],
  firestoreReceipt: null,
  scannedSerials: new Set(),

  addScan: (scan: NFCData) => {
    const {scannedSerials} = get()
    const serialNumber = scan.serialNumber
    const isLocalDuplicate = scannedSerials.has(serialNumber)

    // Add to scanned serials
    scannedSerials.add(serialNumber)

    // Add to list
    const newScan: NFCDataWithDuplicate = {
      ...scan,
      isDuplicate: isLocalDuplicate,
      isOnlist: false,
    }

    set((state) => ({
      nfcScans: [...state.nfcScans, newScan],
    }))
  },
  addScanV2: (scan: NFCDataV2) => {
    const {scannedSerials} = get()
    const serialNumber = scan.serialNumber
    const isLocalDuplicate = scannedSerials.has(serialNumber)

    // Add to scanned serials
    scannedSerials.add(serialNumber)

    // Add to list
    const newScan: NFCDataWithDuplicateV2 = {
      ...scan,
      isDuplicate: isLocalDuplicate,
      isOnlist: false,
    }

    set((state) => ({
      nfcScansV2: [...state.nfcScansV2, newScan],
    }))
  },

  clearList: () => {
    set({
      nfcScans: [],
      nfcScansV2: [],
      firestoreReceipt: null,
      scannedSerials: new Set(),
    })
  },

  setFirestoreReceipt: (receipt: string | null) => {
    set({firestoreReceipt: receipt})
  },

  markAsOnList: (serialNumber: string) => {
    set((state) => ({
      nfcScans: state.nfcScans.map((item) =>
        item && item.serialNumber === serialNumber
          ? {...item, isOnlist: true}
          : item,
      ),
      nfcScansV2: state.nfcScansV2.map((item) =>
        item && item.serialNumber === serialNumber
          ? {...item, isOnlist: true}
          : item,
      ),
    }))
  },
}))
