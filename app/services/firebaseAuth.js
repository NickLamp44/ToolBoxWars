import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Helper: Get User by UID
const getUserByUID = async (uid) => {
  const userDoc = await getDoc(doc(db, "Users", uid));
  return userDoc.exists() ? userDoc.data() : null;
};

// Helper: Check if Username is Taken
const isUsernameTaken = async (userName) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("userName", "==", userName));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// Register New User
export const registerUser = async (userName, email, password) => {
  try {
    if (await isUsernameTaken(userName)) {
      throw new Error("🛑 Username is already taken. Please choose another.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "Users", user.uid), {
      userID: user.uid,
      userName,
      email,
      createdAt: new Date(),
    });

    await updateProfile(user, { displayName: userName });

    return user;
  } catch (error) {
    console.error("🔥 Error signing up:", error.message);
    throw new Error(error.message);
  }
};

// Login with Email
export const loginUserWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("🔥 Error logging in with email:", error.message);
    throw new Error("Invalid email or password.");
  }
};

// Login with Username
export const loginUserWithUsername = async (userName, password) => {
  try {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) throw new Error("Username not found.");

    const userData = querySnapshot.docs[0].data();
    return await loginUserWithEmail(userData.email, password);
  } catch (error) {
    console.error("🔥 Error logging in with username:", error.message);
    throw new Error("Invalid username or password.");
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("🔥 Error signing out:", error.message);
    throw new Error("Logout failed. Please try again.");
  }
};

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await saveUserToFirestore(user, "google");
    return user;
  } catch (error) {
    console.error("🔥 Google Sign-in Error:", error.message);
    throw new Error("Google sign-in failed. Please try again.");
  }
};

// Facebook Sign-In
export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await saveUserToFirestore(user, "facebook");
    return user;
  } catch (error) {
    console.error("🔥 Facebook Sign-in Error:", error.message);
    throw new Error("Facebook sign-in failed. Please try again.");
  }
};

// Helper: Save User to Firestore (Used by Google & Facebook Sign-In)
const saveUserToFirestore = async (user, provider) => {
  const userDocRef = doc(db, "Users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      userID: user.uid,
      userName: user.displayName || user.email.split("@")[0],
      email: user.email,
      profilePic: user.photoURL || "",
      authProvider: provider,
      createdAt: new Date(),
    });
  }
};

export { auth, onAuthStateChanged };
