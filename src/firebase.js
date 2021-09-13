import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { service } from "./services/api-services";

// App's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC7afxWe_u-17-dzDx1ecAc8Z--ZIPKp2w",
//   authDomain: "alumni-network-f6a3a.firebaseapp.com",
//   projectId: "alumni-network-f6a3a",
//   storageBucket: "alumni-network-f6a3a.appspot.com",
//   messagingSenderId: "949461843310",
//   appId: "1:949461843310:web:bb0e7dd96fb489288fd57f",
// };
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

/**
 * * Using this function to sign in with google.
 */
const signInWithGoogle = async () => {
  const response = await auth.signInWithPopup(googleProvider);
  const user = response.user;

  console.log(user);

  service.createUser(user.uid, user.displayName, user.photoURL);
  getIdToken();
};

const getIdToken = () => {
  auth.currentUser.getIdToken(true).then((idToken) => console.log(idToken));
};

/**
 * * This function is working but i creates a users collection in firestore.
 * *
 * @param {*} email
 * @param {*} password
 */
// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//         photoURL: user.photoURL,
//       });
//       service.createUser(user.uid, user.displayName, user.photoURL);
//       getIdToken();
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

//This needs to be fixed
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    console.log("hello world");
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    service.createUser(user.uid, name);
  } catch (err) {
    console.error(err);
    alert(err.message);
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
