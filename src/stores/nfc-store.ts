import {NFCData} from '@/hooks/use-nfc'
import {create} from 'zustand'

export interface NFCDataWithDuplicate extends NFCData {
  isDuplicate: boolean
  isOnlist: boolean
}

interface NFCStore {
  nfcScans: (NFCDataWithDuplicate | null)[]
  firestoreReceipt: string | null
  scannedSerials: Set<string>
  addScan: (scan: NFCData) => void
  clearList: () => void
  setFirestoreReceipt: (receipt: string | null) => void
  markAsOnList: (serialNumber: string) => void
}

export const useNFCStore = create<NFCStore>((set, get) => ({
  nfcScans: [],
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

  clearList: () => {
    set({nfcScans: [], firestoreReceipt: null, scannedSerials: new Set()})
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
    }))
  },
}))
