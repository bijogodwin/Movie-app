// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2bvb8LRMB61qzyE1rp6YRSLTw-aWf8Z8",
  authDomain: "movie-app-b556c.firebaseapp.com",
  projectId: "movie-app-b556c",
  storageBucket: "movie-app-b556c.appspot.com",
  messagingSenderId: "363976537755",
  appId: "1:363976537755:web:f8e991cbf8b6e01927383e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
