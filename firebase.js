import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "fizzy-3205a.firebaseapp.com",
  projectId: "fizzy-3205a",
  storageBucket: "fizzy-3205a.firebasestorage.app",
  messagingSenderId: "616577890533",
  appId: "1:616577890533:web:eb89eef73378190743fc0c",
  measurementId: "G-CMM1KLDZN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { app, auth  };