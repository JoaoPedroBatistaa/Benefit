// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  query,
  where
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMRimgNbP87S3joStD8kHRlYi-EgCoS5w",
  authDomain: "benefitclients-eaba4.firebaseapp.com",
  projectId: "benefitclients-eaba4",
  storageBucket: "benefitclients-eaba4.appspot.com",
  messagingSenderId: "172818196007",
  appId: "1:172818196007:web:c8b19c3fdb538805819002"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(firebase);
const storage = getStorage(firebase);



export {
  addDoc, auth, collection, db, doc, firebase, getDoc,
  getDownloadURL, query, ref, signInWithEmailAndPassword,
  signOut, storage, uploadBytesResumable, where
};
