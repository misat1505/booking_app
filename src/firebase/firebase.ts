import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyChloVaa4mlH8n4pfuJzTigxlgg_to4-w4",
  authDomain: "booking-48735.firebaseapp.com",
  projectId: "booking-48735",
  storageBucket: "booking-48735.appspot.com",
  messagingSenderId: "150301275609",
  appId: "1:150301275609:web:cef7470f6f5c615ca955c8",
  measurementId: "G-R4S4554P2T",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

if (typeof window !== "undefined" && !getApps().length) {
  initializeApp(firebaseConfig, "frontend");
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Zalogowano za pomocą konta Google:", result.user);
    return result.user;
  } catch (error) {
    console.error("Błąd logowania za pomocą konta Google");
    throw error;
  }
};
