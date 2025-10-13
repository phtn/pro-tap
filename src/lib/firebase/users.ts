'use client'

import {db} from '@/lib/firebase'
import type {User} from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  type CollectionReference,
  type DocumentReference,
} from 'firebase/firestore'
import {ProtapUserDoc, ServerTime} from './types/user'

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
    avatar: null,
    firstName: null,
    middleName: null,
    lastName: null,
    gender: null,
    theme: 'auto',
    bio: null,
    providerIds: user.providerData.map((p) => p.providerId),
    createdAt: serverTimestamp() as ServerTime,
    updatedAt: serverTimestamp() as ServerTime,
    lastLogin: serverTimestamp() as ServerTime,
    isActivated: false,
    ntag: {
      serialNumber: '',
      scanTime: null,
      metadata: {},
      type: '',
    },
    userBioData: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: null,
    },
    userType: 'INDIVIDUAL',
    purchaseType: '',
    loyaltyPoints: 0,
    isMerchant: false,
    isAffiliate: false,
    userInfo: null,
    role: 'user',
    deactivationReason: null,
    username: null,
    isPublished: false,
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
    metadata: {id},
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
