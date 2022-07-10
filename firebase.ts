// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3k3_xoXwEaCVLz6bShLpjiKzRMw4EprE",
  authDomain: "nflix-typscript.firebaseapp.com",
  projectId: "nflix-typscript",
  storageBucket: "nflix-typscript.appspot.com",
  messagingSenderId: "893046911022",
  appId: "1:893046911022:web:93690b8543b1dcebef2fbf"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }






































// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB3k3_xoXwEaCVLz6bShLpjiKzRMw4EprE",
//   authDomain: "nflix-typscript.firebaseapp.com",
//   projectId: "nflix-typscript",
//   storageBucket: "nflix-typscript.appspot.com",
//   messagingSenderId: "893046911022",
//   appId: "1:893046911022:web:93690b8543b1dcebef2fbf"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);