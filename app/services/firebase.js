import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../config/config";

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign in anonymously for testing (optional)
signInAnonymously(auth)
  .then(() => console.log("✅ Signed in anonymously"))
  .catch(console.error);

console.log("🔥 Firebase Initialized:", app);
console.log("✅ Firestore DB:", db);
console.log("✅ Firebase Auth:", auth);

export { app, auth, db };
