import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "studysathi-ai.firebaseapp.com",
  projectId: "studysathi-ai",
  storageBucket: "studysathi-ai.firebasestorage.app",
  messagingSenderId: "958793376981",
  appId: "1:958793376981:web:f02565099ae6b4ff816e5c"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}