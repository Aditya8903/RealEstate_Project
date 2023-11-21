// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-cae00.firebaseapp.com",
  projectId: "realestate-cae00",
  storageBucket: "realestate-cae00.appspot.com",
  messagingSenderId: "438832665032",
  appId: "1:438832665032:web:0a007f0e45e6dd5fabb0fd",
  measurementId: "G-TZ3YLDFS6D",
};

export const app = initializeApp(firebaseConfig);
