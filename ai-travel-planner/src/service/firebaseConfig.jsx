// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7RJNJm-ELBxRNX33mYOgPuGBjzIlQwnA",
  authDomain: "travel-app-760c4.firebaseapp.com",
  projectId: "travel-app-760c4",
  storageBucket: "travel-app-760c4.firebasestorage.app",
  messagingSenderId: "904954492705",
  appId: "1:904954492705:web:71330939b7758864383060",
  measurementId: "G-NTNL3D1B46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//const analytics = getAnalytics(app);