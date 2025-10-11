'use client'

import { UserRole } from '@/ctx/auth/types'
import { db } from '@/lib/firebase'
import { UserInfo } from '@/schema/user-account'
import type { User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  type CollectionReference,
  type DocumentReference,
  type FieldValue,
  type Timestamp,
} from 'firebase/firestore'

type ServerTime = FieldValue | Timestamp

interface NTag {
  serialNumber: string
  scanTime: number | null
  metadata?: Record<string, string>
  type: string
}

interface UserInputData {
  firstName: string
  middleName: string
  lastName: string
  birthdate: Date | null
  type: string
}

interface DeactivationReason {
  reason: string
  timestamp: number
  type: 'MANUAL' | 'AUTO'
}

export interface ProtapUserDoc {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  providerIds: string[]
  createdAt: ServerTime
  lastLogin: ServerTime
  isActivated: boolean
  ntag: NTag
  userInputData: UserInputData
  userType: 'INDIVIDUAL' | 'FLEET' | 'ORGANIZATION'
  purchaseType: string
  loyaltyPoints: number
  isMerchant: boolean
  isAffiliate: boolean
  userInfo: UserInfo | null
  role: UserRole
  deactivationReason: DeactivationReason | null
}

function usersCollection(): CollectionReference<ProtapUserDoc> {
  const protapCol = collection(db, 'protap')
  const usersDoc = doc(protapCol, 'users')
  return collection(usersDoc, 'account') as CollectionReference<ProtapUserDoc>
}

function accountDocRef(uid: string): DocumentReference<ProtapUserDoc> {
  return doc(usersCollection(), uid) as DocumentReference<ProtapUserDoc>
}

export const getUser = async (uid: string): Promise<ProtapUserDoc | null> => {
  const ref = accountDocRef(uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return null
  }

  return snap.data()
}

export async function createUser(user: User): Promise<void> {
  const ref = accountDocRef(user.uid)
  const data: ProtapUserDoc = {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
    providerIds: user.providerData.map((p) => p.providerId),
    createdAt: serverTimestamp() as ServerTime,
    lastLogin: serverTimestamp() as ServerTime,
    isActivated: false,
    ntag: {
      serialNumber: '',
      scanTime: null,
      metadata: {},
      type: '',
    },
    userInputData: {
      firstName: '',
      middleName: '',
      lastName: '',
      birthdate: null,
      type: '',
    },
    userType: 'INDIVIDUAL',
    purchaseType: '',
    loyaltyPoints: 0,
    isMerchant: false,
    isAffiliate: false,
    userInfo: null,
    role: 'user',
    deactivationReason: null,
  }
  await setDoc(ref, data)
}

export async function updateUser(user: User): Promise<void> {
  const ref = accountDocRef(user.uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    // For backwards compatibility, create user if doesn't exist
    await createUser(user)
    return
  }

  await updateDoc(ref, {
    lastLogin: serverTimestamp(),
  })
}

export function getUserDocRef(uid: string): DocumentReference<ProtapUserDoc> {
  return accountDocRef(uid)
}

export function activateUser(
  uid: string,
  id: string,
  serialNumber: string,
): Promise<void> {
  const ref = accountDocRef(uid)
  const ntag = {
    serialNumber: `${id}:${serialNumber}`,
    scanTime: new Date().toISOString(),
    metadata: { id },
    type: '',
  }
  return updateDoc(ref, {
    isActivated: true,
    ntag,
  })
}

export const deactivateUser = async (uid: string): Promise<void> => {
  const ref = accountDocRef(uid)
  await updateDoc(ref, {
    isActivated: false,
  })
}
