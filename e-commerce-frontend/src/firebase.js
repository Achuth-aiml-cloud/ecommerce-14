import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyALMXctcK0khxFpxnamxwrhaZyRQ7k_aZY",
    authDomain: "spare-commerce-16.firebaseapp.com",
    projectId: "spare-commerce-16",
    storageBucket: "spare-commerce-16.appspot.com",
    messagingSenderId: "792324203425",
    appId: "1:792324203425:web:1597b267716006587661e0",
    measurementId: "G-JMZXDHJMKZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db , storage };
