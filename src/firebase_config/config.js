// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth ,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCknYkcyUTdZ0O53mfAEQ_WyrN_w0d-oks",
  authDomain: "my-website-listerr.firebaseapp.com",
  projectId: "my-website-listerr",
  storageBucket: "my-website-listerr.firebasestorage.app",
  messagingSenderId: "1072012498177",
  appId: "1:1072012498177:web:760750a8c9beea96a6b700",
  measurementId: "G-P2RLLV7EMT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
// console.log(auth);
export const db= getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider= new GoogleAuthProvider();
