import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDHm_3qUd3XWz_WwUJVRX9oKEr2GWQVvYw",
  authDomain: "clipmaster-pro.firebaseapp.com",
  projectId: "clipmaster-pro",
  storageBucket: "clipmaster-pro.appspot.com",
  messagingSenderId: "458796123547",
  appId: "1:458796123547:web:9b8f9b0f8f9b0f8f9b0f8f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();