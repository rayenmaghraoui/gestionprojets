// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7q6psnjmhXgqrzEHS3XSYRcWOXizWbUM",
  authDomain: "gestion-projet-74361.firebaseapp.com",
  projectId: "gestion-projet-74361",
  storageBucket: "gestion-projet-74361.firebasestorage.app",
  messagingSenderId: "173135575111",
  appId: "1:173135575111:web:d24576a3ea47e1cad89962",
  measurementId: "G-8TYDYJG7JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 


