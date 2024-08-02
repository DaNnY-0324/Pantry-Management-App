// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe3gND-zBp2YuCw6eNZUIcy6jeEjyVezk",
  authDomain: "inventory-management-app-50486.firebaseapp.com",
  projectId: "inventory-management-app-50486",
  storageBucket: "inventory-management-app-50486.appspot.com",
  messagingSenderId: "312913503719",
  appId: "1:312913503719:web:727d2afe9434aa13080942",
  measurementId: "G-4SZXWCSLQN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
