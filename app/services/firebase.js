import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../config/constants";

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
signInAnonymously(auth).catch(console.error);

console.log("🔥 Firebase 🔥 Initialized:", app);
console.log("✅ Firestore DB:", db);
console.log("✅ Firebase Auth:", auth);

// Export Firebase instances (ONLY)
export { db };
