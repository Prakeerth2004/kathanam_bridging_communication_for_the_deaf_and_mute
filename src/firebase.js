import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (Replace with your actual Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyAO_jmbTqpBPvEv_xko0JIROBOgFiN6o4I",
    authDomain: "kathanam-d023e.firebaseapp.com",
    projectId: "kathanam-d023e",
    storageBucket: "kathanam-d023e.firebasestorage.app",
    messagingSenderId: "579117653333",
    appId: "1:579117653333:web:37a53f0e8cff7a3312e3dc",
    measurementId: "G-J0H8KEP9E0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
