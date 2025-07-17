// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { signOut } from "firebase/auth/cordova";

// Firebase config - replace with your actual Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyCp4cYa6QJIIcMqlFPd28Uuh06UvjM4Z_o",
  authDomain: "your-project-id.firebaseapp.com",  // Replace with your Firebase Auth domain
  projectId: "your-project-id", // Replace with your Firebase project ID
  storageBucket: "your-project-id.appspot.com", // Replace with your Firebase Storage bucket
  messagingSenderId: "your-messaging-sender-id",  // Replace with your Firebase messaging sender ID
  appId: "your-app-id", // Replace with your Firebase app ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signOut , app};
