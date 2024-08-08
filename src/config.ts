// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAthJdZF_jDW8_WXgRB2hofK6sHg1jIybA",
  authDomain: "chat-application-968a4.firebaseapp.com",
  projectId: "chat-application-968a4",
  storageBucket: "chat-application-968a4.appspot.com",
  messagingSenderId: "776596104603", 
  appId: "1:776596104603:web:996baf274e94d697376d3e",
  measurementId: "G-10BYDPLK65"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

