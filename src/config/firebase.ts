// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcB5H_UL6tG1maBnhrvJz2JCeq6gQBXAc",
  authDomain: "calculator-kcal.firebaseapp.com",
  projectId: "calculator-kcal",
  storageBucket: "calculator-kcal.appspot.com",
  messagingSenderId: "1084373415179",
  appId: "1:1084373415179:web:fc60dd66d337e674621e0e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // get the Auth instance
export const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app); // db is the firestore instance 

