"use client";

import { db } from "@/lib/firebase";
import type { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  type CollectionReference,
  type DocumentReference,
  type Timestamp,
  type FieldValue,
} from "firebase/firestore";

type ServerTime = FieldValue | Timestamp;

export interface ProtapUserDoc {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerIds: string[];
  createdAt: ServerTime;
  lastLogin: ServerTime;
}

function usersCollection(): CollectionReference<ProtapUserDoc> {
  const protapCol = collection(db, "protap");
  const usersDoc = doc(protapCol, "users");
  return collection(usersDoc, "account") as CollectionReference<ProtapUserDoc>;
}

function accountDocRef(uid: string): DocumentReference<ProtapUserDoc> {
  return doc(usersCollection(), uid) as DocumentReference<ProtapUserDoc>;
}

export async function updateUser(user: User): Promise<void> {
  const ref = accountDocRef(user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const data: ProtapUserDoc = {
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      providerIds: user.providerData.map((p) => p.providerId),
      createdAt: serverTimestamp() as ServerTime,
      lastLogin: serverTimestamp() as ServerTime,
    };
    await setDoc(ref, data);
    return;
  }

  await updateDoc(ref, {
    lastLogin: serverTimestamp(),
  });
}

export function getUserDocRef(uid: string): DocumentReference<ProtapUserDoc> {
  return accountDocRef(uid);
}
