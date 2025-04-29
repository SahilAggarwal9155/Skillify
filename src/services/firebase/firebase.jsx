import { useState, useEffect } from "react";
import firebaseConfig from "./firebaseConfig";
// eslint-disable-next-line no-unused-vars
import firebaseContext from "../../context/AuthContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {
  addDocument,
  readOrCreateDocument,
  updateDocument,
} from "../firebase/cloudFirestore";
import { handleError, handleSuccess } from "../../utils/tostify";

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(firebaseApp);

export const FirebaseProvider = ({ children }) => {
  const [loggedIn, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user || null);
      setLoading(false);
     
    });

    return () => unsubscribe();
  }, []);

  const userLoggedIn = loggedIn ? loggedIn : null;

  const signupWithEmailAndPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleError(error.message);
    }
  };

  const UserSignInwithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleError(error.message);
    }
  };

  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      return error;
    }
  };

  const signupWithPhone = async (phone, appVerifier) => {
    try {
      await signInWithPhoneNumber(auth, phone, appVerifier);
    } catch (error) {
      return error;
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);

    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const addUserToFirestore = async (user) => {
    try {
      const userData = {
        email: user.email,
      };
      await addDocument(db, "users", userData);
      console.log("User added to Firestore:", userData);
      handleSuccess("User added to Firestore successfully!");
    } catch (error) {
      handleError(error.message);
    }
  };

  const readUserFromFirestore = async (
    collectionname,
    fieldname,
    fieldvalue
  ) => {
    try {
      const data = await readOrCreateDocument(
        db,
        collectionname,
        fieldname,
        fieldvalue
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const UpdateUser = async (collectionName, docid, updatedData) => {
    try {
      const data = await updateDocument(db, collectionName, docid, updatedData);
      console.log("updated Data", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <firebaseContext.Provider
      value={{
        signupWithEmailAndPassword,
        signupWithGoogle,
        signupWithPhone,
        userLoggedIn,
        handleLogout,
        UserSignInwithEmailAndPassword,
        loading,
        addUserToFirestore,
        readUserFromFirestore,
        UpdateUser
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
