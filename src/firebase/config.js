import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyClf0C3qZj5QQgwpNVvdkomneP3iTMnnys",
  authDomain: "fixora-d1cc2.firebaseapp.com",
  projectId: "fixora-d1cc2",
  storageBucket: "fixora-d1cc2.firebasestorage.app",
  messagingSenderId: "402081696626",
  appId: "1:402081696626:web:1c41255f8c2b00171d2beb",
  measurementId: "G-LYNXN6HL12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
