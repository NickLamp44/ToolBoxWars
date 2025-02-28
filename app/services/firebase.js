import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../config/config";

// 🔥 Initialize Firebase App 🔥
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);

// Anonymous Sign-In  (For Development Only)
const enableAnonymousSignIn = true; // Set to false in production

if (enableAnonymousSignIn) {
  signInAnonymously(auth)
    .then(() => console.log("✅ Signed in anonymously"))
    .catch((error) =>
      console.error("🔥 Anonymous sign-in error:", error.message)
    );
}

console.log("🔥 Firebase Initialized");
console.log("✅ Firestore Connected");
console.log("✅ Firebase Auth Ready");

export { app, auth, db };
export default app;
