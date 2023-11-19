// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8tNJxjpTMNCB04PVjNkYrUEwu_y9Kv50",
  authDomain: "mmra-84e84.firebaseapp.com",
  databaseURL: "https://mmra-84e84-default-rtdb.firebaseio.com",
  projectId: "mmra-84e84",
  storageBucket: "mmra-84e84.appspot.com",
  messagingSenderId: "376821800349",
  appId: "1:376821800349:web:76dbf235222efef506a374",
  measurementId: "G-WWHE79B7KL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const database = getDatabase(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
