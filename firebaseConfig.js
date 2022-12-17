
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2oB1bMFPtxZc08Q_56KS0jebnIRsfutc",
  authDomain: "typroject-4eb39.firebaseapp.com",
  projectId: "typroject-4eb39",
  storageBucket: "typroject-4eb39.appspot.com",
  messagingSenderId: "502042466614",
  appId: "1:502042466614:web:337881afc4079570303b97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ****** THIS WAS CAUSING ERRORS, COME BACK LATER****
// let app;
// if (!firebase.app.length) {
//   app = initializeApp(firebaseConfig)
// } else {
//   app = firebaseConfig.app()
// }

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db }
