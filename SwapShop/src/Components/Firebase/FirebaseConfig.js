// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvguxZXL2Hg7urjY7gxY0LCax4QFgM66k",
  authDomain: "swapshop-11319.firebaseapp.com",
  projectId: "swapshop-11319",
  storageBucket: "swapshop-11319.firebasestorage.app",
  messagingSenderId: "984725080162",
  appId: "1:984725080162:web:d078da0baf43d1922ae93b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);