// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Importar Firestore
import {collection, addDoc, onSnapshot, query, updateDoc, deleteDoc, doc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBU5bs8qILp627b4FFqSnF9N2-KLb9l6hk",
    authDomain: "proyecto-app-notas-e3081.firebaseapp.com",
    projectId: "proyecto-app-notas-e3081",
    storageBucket: "proyecto-app-notas-e3081.firebasestorage.app",
    messagingSenderId: "238068271871",
    appId: "1:238068271871:web:0cd79a774ba5e491c55aca",
    measurementId: "G-KTJ9N92BER"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);// <-- Inicializar Firestore

// Función para obtener el nombre del usuario
const getUserName = () => auth.currentUser?.displayName || "Usuario";
export { auth, db, getUserName,updateProfile};

