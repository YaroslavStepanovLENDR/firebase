// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxyf8PU3OHnoYijNFBna9NljaU7XertRs",
  authDomain: "lendr-fc3a3.firebaseapp.com",
  projectId: "lendr-fc3a3",
  storageBucket: "lendr-fc3a3.appspot.com", // fixed typo: "storage.app" → "appspot.com"
  messagingSenderId: "823863719381",
  appId: "1:823863719381:web:4ef642c19fc0695f9e795c",
  measurementId: "G-7WMK0H2DYR"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
