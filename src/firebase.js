import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { apiServices } from "./services/api-services";

const firebaseConfig = {
  apiKey: "AIzaSyAftIa5-QflBvQ9udoLWXGSB12n5a5jkAQ",
  authDomain: "alumni-network-experis-54ed8.firebaseapp.com",
  projectId: "alumni-network-experis-54ed8",
  storageBucket: "alumni-network-experis-54ed8.appspot.com",
  messagingSenderId: "798737045784",
  appId: "1:798737045784:web:e8b8599513b2797174a66d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/** Auth methods */
const db = firebase.firestore();
const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  const response = await auth.signInWithPopup(googleProvider);
  const user = response.user;
  apiServices.addUserToPostgres(user.uid, user.displayName, user.photoURL);
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    apiServices.addUserToPostgres(user.uid, name, user.photoURL);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//This needs to be fixed
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    console.log("hello world");
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};
export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
