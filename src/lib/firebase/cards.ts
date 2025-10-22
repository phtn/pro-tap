'use client'

import {NFCData} from '@/hooks/use-nfc'
import {macStr} from '@/utils/macstr'
import {Effect} from 'effect'
import {User} from 'firebase/auth'
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import {useState} from 'react'
import {db} from '.'
import {ServerTime} from './types/user'

// Define Firestore service interface
// interface FirestoreService {
//   readonly getFirestore: () => Firestore
// }

// Create a Tag for the Firestore service

// Error types
export class FirestoreError {
  readonly _tag = 'FirestoreError'
  constructor(
    readonly message: string,
    readonly cause?: unknown,
  ) {}
}

export class DocumentNotFoundError {
  readonly _tag = 'DocumentNotFoundError'
  constructor(readonly docId: string) {}
}

export interface ProtapCardDoc {
  id: string
  serialNumber: string
  nfcData?: NFCData
  qrcData?: string | null
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
  createdBy: string
  updatedBy: string
  createdByName: string | null
  createdByEmail: string | null
  ownerId: string | null
  isActive: boolean
  activatedOn: Timestamp | null
  series: string
  group: string
  batch: string
}

export type ProtapActivationInfo = Pick<
  ProtapCardDoc,
  'id' | 'series' | 'group' | 'batch' | 'createdAt'
>

function cardsCollection(col: string): CollectionReference<ProtapCardDoc> {
  const protapCol = collection(db, 'protap')
  const cardsDoc = doc(protapCol, 'cards')
  return collection(cardsDoc, col) as CollectionReference<ProtapCardDoc>
}

function cardDocRef(id: string, col: string): DocumentReference<ProtapCardDoc> {
  return doc(cardsCollection(col), id) as DocumentReference<ProtapCardDoc>
}

interface ScanItem {
  series: string
  group: string
  batch: string
}

export async function createCard(
  data: NFCData,
  item: ScanItem,
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
    createdAt: serverTimestamp(),
    createdBy: user.uid,
    createdByName: user.displayName,
    createdByEmail: user.email,
    updatedAt: serverTimestamp(),
    updatedBy: user.uid,
    isActive: true,
    ownerId: null,
    activatedOn: null,
    ...item,
  })
  return id
}

export async function createQR(
  data: NFCData,
  user: User,
  item: ScanItem,
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
    createdAt: serverTimestamp(),
    createdBy: user.uid,
    createdByName: user.displayName,
    createdByEmail: user.email,
    updatedAt: serverTimestamp(),
    updatedBy: user.uid,
    isActive: true,
    ownerId: null,
    activatedOn: null,
    ...item,
  })
  return data.serialNumber
}

export async function createBulkQRCodes(
  count: number,
  series: string,
  group: string,
  batch: string,
  user: User,
  onProgress?: (progress: number) => void,
): Promise<{createdIds: string[]; createdAt: Timestamp}> {
  const col = 'general'
  const countBatch = writeBatch(db)
  const baseTime = Date.now().toString(12)
  const createdIds: string[] = []
  const [createdAt, setCreatedAt] = useState<ServerTime | null>(null)

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
            data: `https://protap.ph/api/verify/?id=${serialNumber}&series=${series}&group=${group}&batch=${batch}`,
          },
        ],
        timestamp: serverTimestamp(),
      }

      const ref = cardDocRef(serialNumber, col)
      const timestamp = serverTimestamp()
      setCreatedAt(timestamp)
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
        series,
        group,
        batch,
        isActive: true,
        ownerId: null,
        activatedOn: null,
      }

      countBatch.set(ref, docData)
      createdIds.push(serialNumber)
    }

    try {
      // Commit current batch
      await countBatch.commit()

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

  return {createdIds, createdAt: createdAt as Timestamp}
}

export async function checkCard(id: string, col: string) {
  const ref = cardDocRef(id, col)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return false
  }

  const data = snap.data()
  // Check if card exists and is not owned by anyone (ownerId is null)
  return data.ownerId === null && data.isActive
}

export interface CardStatus {
  id: string | null
  ownerId: string | null
  nfcData: NFCData | null
}

export async function checkCardStatus(
  id: string,
  col: string,
): Promise<CardStatus> {
  const ref = cardDocRef(id, col)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return {id: null, ownerId: null, nfcData: null}
  }

  const data = snap.data()
  // Check if card exists and is not owned by anyone (ownerId is null)
  return {
    id: data.id,
    ownerId: data.ownerId,
    nfcData: data.nfcData ?? null,
  }
}

export const getCardStatus = (
  id: string,
): Effect.Effect<
  ProtapCardDoc,
  FirestoreError | DocumentNotFoundError,
  Firestore
> =>
  Effect.gen(function* (_) {
    const docRef = cardDocRef(id, 'general')
    const docSnap = yield* _(
      Effect.tryPromise({
        try: async () => {
          return await getDoc(docRef)
        },
        catch: (error) => new FirestoreError('Failed to get user', error),
      }),
    )

    if (!docSnap.exists()) {
      return yield* _(Effect.fail(new DocumentNotFoundError(id)))
    }

    const data = docSnap.data()
    return {
      id: docSnap.id,
      ownerId: data.ownerId,
    } as ProtapCardDoc
  })

export async function activateCard(id: string, grp: string, uid: string) {
  const ref = cardDocRef(id, grp)
  const docData = {
    activatedOn: serverTimestamp(),
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

export const queryProductSeries = async (qry = 'individual') => {
  const q = query(cardsCollection('general'), where('series', '==', qry))
  const querySnapshot = await getDocs(q)
  const cards = querySnapshot.docs.map((doc) => doc.data())
  return cards
}

export const getAllIndividualCards = async (qry: string) => {
  const q = query(
    cardsCollection('general'),
    where('series', '==', String(qry)),
  )
  const querySnapshot = await getDocs(q)
  const cards = querySnapshot.docs.map((doc) => doc.data())
  return cards
}

export const deleteInactiveCards = async (
  collection = 'general',
  onProgress?: (progress: number) => void,
) => {
  const q = query(cardsCollection(collection), where('ownerId', '==', null))
  const querySnapshot = await getDocs(q)
  const cards = querySnapshot.docs.map((doc) => doc.id)

  const batchSize = 500
  const count = cards.length

  for (let i = 0; i < count; i += batchSize) {
    const batchIds = cards.slice(i, i + batchSize)
    const batchRefs = batchIds.map((id) => cardDocRef(id, collection))

    const batch = writeBatch(db)
    batchRefs.forEach((ref) => batch.delete(ref))

    await batch.commit()

    // Report progress
    const progress = Math.min(100, Math.round(((i + batchSize) / count) * 100))
    onProgress?.(progress)
  }
}
