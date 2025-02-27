import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLL3P5gE5Rgg2ELA5kb5OhotXJ68P3y9I",
  authDomain: "toolboxwars-d5bd0.firebaseapp.com",
  projectId: "toolboxwars-d5bd0",
  storageBucket: "toolboxwars-d5bd0.appspot.com",
  messagingSenderId: "582787301204",
  appId: "1:582787301204:web:e63b5ae5114a55decc92c1",
  measurementId: "G-JW0CRP978L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
