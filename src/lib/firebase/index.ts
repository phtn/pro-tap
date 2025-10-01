import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseOptions,
} from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
}

const app = getApps().length ? getApp() : initializeApp(config)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Running on localhost to connect to emulators
const FIRESTORE_EMULATOR_PORT = 8080 // Default port for Firestore
const AUTH_EMULATOR_PORT = 9099 // Default port for Auth

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, '127.0.0.1', FIRESTORE_EMULATOR_PORT)
  connectAuthEmulator(auth, `http://127.0.0.1:${AUTH_EMULATOR_PORT}`)
}
