// src/FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3IxVfwGKJrR7uGxa5Fc658gIhvxKB2Ig",
  authDomain: "bella-flormanicure-919fc.firebaseapp.com",
  projectId: "bella-flormanicure-919fc",
  storageBucket: "bella-flormanicure-919fc.firebasestorage.app",
  messagingSenderId: "120852618679",
  appId: "1:120852618679:web:11c16aaf1994eefc7a5c32"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
