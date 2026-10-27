import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyDXUPqZpPJKqOZjBQYWilNB9yTh8c6J-Ns",
  authDomain: "projeto-athena-e9864.firebaseapp.com",
  projectId: "projeto-athena-e9864",
  storageBucket: "projeto-athena-e9864.firebasestorage.app",
  messagingSenderId: "575776568864",
  appId: "1:575776568864:web:c42eaa2b41260aa9ceee45"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);