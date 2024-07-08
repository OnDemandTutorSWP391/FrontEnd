// firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZoBBO6vsPl0Qu3b5qwSdD0D8KEXHE-iI",
  authDomain: "swp391-fbb3f.firebaseapp.com",
  projectId: "swp391-fbb3f",
  storageBucket: "swp391-fbb3f.appspot.com",
  messagingSenderId: "874946989223",
  appId: "1:874946989223:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, firestore, storage };
