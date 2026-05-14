import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOM82yLG-J8s9xgNuNewMrI49pZN9cYEg",
  authDomain: "v33toolsltd.firebaseapp.com",
  projectId: "v33toolsltd",
  storageBucket: "v33toolsltd.firebasestorage.app",
  messagingSenderId: "233121936047",
  appId: "1:233121936047:web:8d6753242eea4103659a5a",
  measurementId: "G-V8Q89BWYCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore (THIS WAS MISSING)
export const db = getFirestore(app);

// Analytics (optional, safe to keep)
export const analytics = getAnalytics(app);