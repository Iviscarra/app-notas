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



// Función para agregar una nota
const addNote = async (text, category) => {
  if (!auth.currentUser) return;
  console.log("📤 Enviando a Firestore:", text, "Categoría:", category); // 🔍 Verificar en consola

  await addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
    text,
    category: category || "otros", // Si `category` está vacío, usa "Otro"
    createdAt: new Date()
  });
};

// Función para obtener notas en tiempo real
const getNotes = (callback) => {
  if (!auth.currentUser) return;

  const q = query(collection(db, "users", auth.currentUser.uid, "notes"));
  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(notes);
  });
};

//  Función para editar una nota
const updateNote = async (noteId, newText,newCategory) => {
  if (!auth.currentUser) return;

  const noteRef = doc(db, "users", auth.currentUser.uid, "notes", noteId);
  await updateDoc(noteRef, { text: newText, category: newCategory });
};

// Función para eliminar una nota
const deleteNote = async (noteId) => {
  if (!auth.currentUser) return;

  const noteRef = doc(db, "users", auth.currentUser.uid, "notes", noteId);
  await deleteDoc(noteRef);
};

export { addNote, getNotes, updateNote, deleteNote };