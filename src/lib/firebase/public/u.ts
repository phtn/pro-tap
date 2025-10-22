import {
  collection,
  type CollectionReference,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import {db} from '..'

export interface PublicUser {
  id: string
  isVisible: boolean
  displayName: string | null
  email: string | null
  theme: 'light' | 'dark' | 'auto'
}

const publicCollection = (): CollectionReference<PublicUser> => {
  return collection(db, 'public') as CollectionReference<PublicUser>
}

const publicUsersCollection = (by: string): CollectionReference<PublicUser> => {
  const userColRef = doc(publicCollection(), 'u')
  return collection(userColRef, by) as CollectionReference<PublicUser>
}

export const getVisiblePublicUsers = async (by: string) => {
  const queryRef = query(
    publicUsersCollection(by),
    where('isVisible', '==', true),
  )
  const publicUsers = await getDocs(queryRef)
  return publicUsers.docs.map((doc) => doc.data())
}

export const getVisiblePublicUserById = async (
  id: string,
): Promise<PublicUser | null> => {
  const ref = query(publicUsersCollection('id'), where('id', '==', id))
  const snapshot = await getDocs(ref)
  const docs = snapshot.docs
  if (docs.length > 0) {
    const data = docs[0].data()
    return {
      id: data.id,
      isVisible: data.isVisible,
      displayName: data.displayName,
      email: data.email,
      theme: data.theme,
    }
  }
  return null
}
