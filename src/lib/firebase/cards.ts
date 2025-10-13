import {NFCData} from '@/hooks/use-nfc'
import {macStr} from '@/utils/macstr'
import {User} from 'firebase/auth'
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import {db} from '.'

export interface ProtapCardDoc {
  id: string
  serialNumber: string
  nfcData?: NFCData
  qrcData?: string | null
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  createdByName: string | null
  createdByEmail: string | null
  ownerId: string | null
  isActive: boolean
  activatedOn: string | null
}

function cardsCollection(batch: string): CollectionReference<ProtapCardDoc> {
  const protapCol = collection(db, 'protap')
  const cardsDoc = doc(protapCol, 'cards')
  return collection(cardsDoc, batch) as CollectionReference<ProtapCardDoc>
}

function cardDocRef(id: string, grp: string): DocumentReference<ProtapCardDoc> {
  return doc(cardsCollection(grp), id) as DocumentReference<ProtapCardDoc>
}

export async function createCard(
  data: NFCData,
  user: User,
  grp: string,
): Promise<string> {
  const id = macStr(data.serialNumber)
  const ref = cardDocRef(id, grp)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    return snap.id
  }
  await setDoc(ref, {
    id,
    qrcData: null,
    nfcData: data,
    serialNumber: data.serialNumber,
    createdAt: new Date().toISOString(),
    createdBy: user.uid,
    createdByName: user.displayName,
    createdByEmail: user.email,
    updatedAt: new Date().toISOString(),
    updatedBy: user.uid,
    isActive: true,
    ownerId: null,
    activatedOn: null,
  })
  return id
}

export async function createQR(
  data: NFCData,
  user: User,
  grp: string,
): Promise<string> {
  const ref = cardDocRef(data.serialNumber, grp)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    return snap.id
  }
  await setDoc(ref, {
    id: data.serialNumber,
    qrcData: null,
    nfcData: data,
    serialNumber: data.serialNumber,
    createdAt: new Date().toISOString(),
    createdBy: user.uid,
    createdByName: user.displayName,
    createdByEmail: user.email,
    updatedAt: new Date().toISOString(),
    updatedBy: user.uid,
    isActive: true,
    ownerId: null,
    activatedOn: null,
  })
  return data.serialNumber
}

export async function createBulkQRCodes(
  count: number,
  grp = 'general',
  user: User,
  onProgress?: (progress: number) => void,
): Promise<string[]> {
  const batch = writeBatch(db)
  const timestamp = new Date().toISOString()
  const baseTime = Date.now().toString(12)
  const createdIds: string[] = []

  // Process in batches of 500 (Firestore limit)
  const batchSize = 500
  for (let i = 0; i < count; i += batchSize) {
    const currentBatchSize = Math.min(batchSize, count - i)

    for (let j = 0; j < currentBatchSize; j++) {
      const index = i + j
      const serialNumber = `qr-${baseTime}-${index}`
      const qrData: NFCData = {
        serialNumber,
        records: [
          {
            recordType: 'url',
            data: `https://protap.ph/activation/?id=${serialNumber}&grp=${grp}`,
          },
        ],
        timestamp: new Date(),
      }

      const ref = cardDocRef(serialNumber, grp)
      const docData = {
        id: serialNumber,
        qrcData: null,
        nfcData: qrData,
        serialNumber,
        createdAt: timestamp,
        createdBy: user.uid,
        createdByName: user.displayName,
        createdByEmail: user.email,
        updatedAt: timestamp,
        updatedBy: user.uid,
        isActive: true,
        ownerId: null,
        activatedOn: null,
      }

      batch.set(ref, docData)
      createdIds.push(serialNumber)
    }

    try {
      // Commit current batch
      await batch.commit()

      // Report progress
      const progress = Math.min(
        100,
        Math.round(((i + currentBatchSize) / count) * 100),
      )
      onProgress?.(progress)
    } catch (error) {
      console.error(`Failed to commit batch ${i / batchSize + 1}:`, error)
      throw new Error(`Failed to create QR codes batch: ${error}`)
    }

    // Small delay to avoid overwhelming Firestore
    if (i + batchSize < count) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  return createdIds
}

export async function checkCard(id: string, grp: string) {
  const ref = cardDocRef(id, grp)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return false
  }

  const data = snap.data()
  // Check if card exists and is not owned by anyone (ownerId is null)
  return data.ownerId === null && data.isActive
}

export async function activateCard(id: string, grp: string, uid: string) {
  const ref = cardDocRef(id, grp)
  const docData = {
    activatedOn: new Date().toISOString(),
    ownerId: uid,
  }

  await updateDoc(ref, docData)
}

export const getAllCards = async (collection = 'general') => {
  const q = query(cardsCollection(collection), where('ownerId', '!=', null))
  const querySnapshot = await getDocs(q)
  const cards = querySnapshot.docs.map((doc) => doc.data())
  return cards
}
export const getAllCards_ = async (collection = 'general') => {
  // const q = query(cardsCollection(collection), where('ownerId', '!=', null))
  const querySnapshot = await getDocs(cardsCollection(collection))
  const cards = querySnapshot.docs.map((doc) => doc.data())
  return cards
}
