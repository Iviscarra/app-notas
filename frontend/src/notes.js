// src/Notes.js
import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, query, onSnapshot, where } from "firebase/firestore";

const Notes = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [search,setSearch] = useState("");//Estado para la busqueda

  // Función para agregar una nota a Firestore
  const handleAddNote = async () => {
    if (note.trim() === "") return alert("Escribe algo antes de guardar.");
    
    try {
      await addDoc(collection(db, "notas"), {
        text: note,
        userId: auth.currentUser.uid,
        createdAt: new Date()
      });
      setNote("");
    } catch (error) {
      alert("Error al guardar la nota: " + error.message);
    }
  };

  // Cargar notas en tiempo real del usuario autenticado
  useEffect(() => {
    if (!auth.currentUser) return;
    
    const q = query(collection(db, "notas"), where("userId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  //filtrar notas segun la busqueda

  const filteredNotes = notes.filter(n =>
    n.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Notas</h2>
    {/* Input de búsqueda */}
        <input 
            type="text"
            placeholder="Buscar nota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
      />



      <input 
        type="text" 
        placeholder="Escribe una nota" 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
      />
      <button onClick={handleAddNote}>Agregar Nota</button>

      <ul>
        {filteredNotes.map(n => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
