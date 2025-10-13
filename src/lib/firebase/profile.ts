import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import {db} from '.'
import {ProfileFormData, ProtapUserDoc, UserProfile} from './types/user'

function usersCollection(): CollectionReference<ProtapUserDoc> {
  const protapCol = collection(db, 'protap')
  const usersDoc = doc(protapCol, 'users')
  return collection(usersDoc, 'account') as CollectionReference<ProtapUserDoc>
}

function accountDocRef(uid: string): DocumentReference<ProtapUserDoc> {
  return doc(usersCollection(), uid) as DocumentReference<ProtapUserDoc>
}
export class ProfileService {
  // Check if username is available
  static async isUsernameAvailable(username: string): Promise<boolean> {
    const q = query(
      usersCollection(),
      where('username', '==', username.toLowerCase()),
    )
    const snapshot = await getDocs(q)
    return snapshot.empty
  }

  // Get profile by username
  static async getProfileByUsername(
    username: string,
  ): Promise<ProtapUserDoc | null> {
    const q = query(
      usersCollection(),
      where('username', '==', username.toLowerCase()),
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    const userData = snapshot.docs[0].data()
    return userData.isPublished ? userData : null
  }

  // Get profile by UID
  static async getProfileByUid(uid: string): Promise<ProtapUserDoc | null> {
    const docSnap = await getDoc(accountDocRef(uid))

    if (!docSnap.exists()) {
      return null
    }

    return docSnap.data() as ProtapUserDoc
  }

  // Create new profile
  static async createProfile(
    uid: string,
    username: string,
    email: string,
  ): Promise<void> {
    const isAvailable = await this.isUsernameAvailable(username)

    if (!isAvailable) {
      throw new Error('Username is already taken')
    }

    const newProfile: UserProfile = {
      username: username.toLowerCase(),
      displayName: username,
      bio: '',
      avatar: '',
      socialLinks: {},
      theme: 'auto',
      isPublished: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    await setDoc(doc(db, 'users', uid), newProfile)
  }

  // Update profile
  static async updateProfile(
    uid: string,
    data: ProfileFormData,
  ): Promise<void> {
    const docRef = doc(db, 'users', uid)

    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    })
  }

  // Publish profile
  static async publishProfile(uid: string, publish: boolean): Promise<void> {
    const docRef = doc(db, 'users', uid)

    await updateDoc(docRef, {
      isPublished: publish,
      updatedAt: new Date().toISOString(),
    })
  }

  // Update username (use with caution)
  static async updateUsername(uid: string, newUsername: string): Promise<void> {
    const isAvailable = await this.isUsernameAvailable(newUsername)

    if (!isAvailable) {
      throw new Error('Username is already taken')
    }

    const docRef = doc(db, 'users', uid)

    await updateDoc(docRef, {
      username: newUsername.toLowerCase(),
      updatedAt: new Date().toISOString(),
    })
  }
}
