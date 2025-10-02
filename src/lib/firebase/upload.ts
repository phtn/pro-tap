// This is a MOCK Firebase service file.
// In a real application, you would use the Firebase SDKs.
// e.g., import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// e.g., import { getFirestore, doc, updateDoc } from "firebase/firestore";

/**
 * Simulates uploading a file to Firebase Storage.
 * @param uid The user's ID.
 * @param file The image blob to upload.
 * @returns A promise that resolves with a public URL for the image.
 */
export const uploadProfilePicture = async (
  uid: string,
  file: Blob,
): Promise<string> => {
  console.log(`[MOCK] Uploading profile picture for user: ${uid}`)
  console.log(`[MOCK] File size: ${file.size} bytes`)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const mockUrl = `https://picsum.photos/seed/${uid}/400`
  console.log(`[MOCK] Upload complete. File available at: ${mockUrl}`)

  return mockUrl
}

/**
 * Simulates updating a user's profile in Firestore.
 * @param uid The user's ID.
 * @param data The data to update in the user's document.
 */
export const updateUserProfile = async (
  uid: string,
  data: {photoURL: string},
): Promise<void> => {
  console.log(`[MOCK] Updating Firestore for user: ${uid}`)
  console.log('[MOCK] Data to update:', data)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log('[MOCK] Firestore update complete.')
}
