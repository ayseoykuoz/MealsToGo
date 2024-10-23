import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA5YtUmftFCY_edTvYAqzx0RlYv57we3Xc',
  authDomain: 'mealstogo-327c6.firebaseapp.com',
  projectId: 'mealstogo-327c6',
  storageBucket: 'mealstogo-327c6.appspot.com',
  messagingSenderId: '877655811237',
  appId: '1:877655811237:web:1b1632f88fd6923fe3194c',
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // Use getApp() if an app is already initialized

// Get Firebase services (auth and Firestore)
const auth = getAuth(app);
const firestore = getFirestore(app);

console.log(auth); // This should log the initialized auth object

export { auth, firestore };
