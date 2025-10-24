import {UserInfoType} from '@/app/account/profile/editor/_components/user-schema'
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
import {ProtapUserDoc} from './types/user'

interface UserData extends ProtapUserDoc {}

function usersCollection(): CollectionReference<ProtapUserDoc> {
  const protapCol = collection(db, 'protap')
  const usersDoc = doc(protapCol, 'users')
  return collection(usersDoc, 'account') as CollectionReference<ProtapUserDoc>
}

function accountDocRef(uid: string): DocumentReference<UserInfoType> {
  return doc(usersCollection(), uid) as DocumentReference<UserInfoType>
}
export class UserInfoService {
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
  static async getUserInfoByUsername(
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
  static async getUserByUid(uid: string): Promise<UserInfoType | null> {
    const docSnap = await getDoc(accountDocRef(uid))

    if (!docSnap.exists()) {
      return null
    }

    return docSnap.data() as UserInfoType
  }

  // Create new profile
  static async createUserInfo(
    uid: string,
    username: string,
    email: string,
  ): Promise<void> {
    const isAvailable = await this.isUsernameAvailable(username)

    if (!isAvailable) {
      throw new Error('Username is already taken')
    }

    const newUserInfo: UserData = {
      uid,
      displayName: username,
      email,
      bio: '',
      avatar: '',
      theme: 'auto',
      isPublished: false,
      firstName: '',
      lastName: '',
      middleName: '',

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      username: null,
      gender: null,
      photoURL: null,
      providerIds: [],
      lastLogin: serverTimestamp(),
      isActivated: false,
      activatedOn: null,
      ntag: null,
      userBioData: null,
      userType: null,
      purchaseType: '',
      loyaltyPoints: 0,
      isMerchant: false,
      isAffiliate: false,
      userInfo: null,
      role: 'user',
      deactivationReason: null,
    }

    await setDoc(doc(db, 'users', uid), newUserInfo)
  }

  // Update profile
  static async updateUserInfo(uid: string, data: UserInfoType): Promise<void> {
    await updateDoc(accountDocRef(uid), {
      ...data,
      updatedAt: serverTimestamp(),
    }).catch((error) => {
      console.error('Error updating profile:', error)
    })
  }

  // Publish profile
  static async publishUserInfo(uid: string, publish: boolean): Promise<void> {
    await updateDoc(accountDocRef(uid), {
      isPublished: publish,
      updatedAt: new Date().toISOString(),
    }).catch((error) => {
      console.error('Error publishing profile:', error)
    })
  }

  // Update username (use with caution)
  static async updateUsername(uid: string, newUsername: string): Promise<void> {
    const isAvailable = await this.isUsernameAvailable(newUsername)

    if (!isAvailable) {
      throw new Error('Username is already taken')
    }

    await updateDoc(accountDocRef(uid), {
      username: newUsername.toLowerCase(),
      updatedAt: new Date().toISOString(),
    })
  }
}
