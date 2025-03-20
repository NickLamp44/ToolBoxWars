import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "../../config/constants"; // Ensure path is correct

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
signInAnonymously(auth).catch(console.error);

console.log("🔥 Firebase Initialized Successfully!");
console.log("✅ Firestore DB Loaded:", db);
console.log("✅ Firebase Auth Loaded:", auth);
console.log("✅ Firebase Storage Loaded:", storage);

export { auth, db, storage };
export default app;
