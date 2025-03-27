import { useState, useEffect } from "react";
import { addNote, getNotes, updateNote, deleteNote } from "./firebase";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState(""); // Estado para la búsqueda

  

  useEffect(() => {
    const unsubscribe = getNotes(setNotes);
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleAddNote = async () => {
    if (text.trim()) {
      await addNote(text);
      setText("");
    }
  };

  const handleEditNote = async () => {
    if (editText.trim() && editNoteId) {
      await updateNote(editNoteId, editText);
      setEditNoteId(null);
      setEditText("");
    }
  };

    // Filtrar notas según la búsqueda
    const filteredNotes = notes.filter(n =>
        n.text.toLowerCase().includes(search.toLowerCase())
      );
    
  return (
    <div>
      <h2>📌 Tus Notas</h2>

            {/* Input de búsqueda */}
            <input 
        type="text"
        placeholder="Buscar nota..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Input para agregar nuevas notas */}
      <input 
        type="text" 
        placeholder="Escribe una nota..."
        value={text} 
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddNote}>Agregar Nota</button>

      {/* Lista de notas */}
      <ul>
        {filteredNotes.map(note => (
          <li key={note.id}>
            {editNoteId === note.id ? (
              <>
                <input 
                  type="text" 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleEditNote}>Guardar</button>
                <button onClick={() => setEditNoteId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {note.text}
                <button onClick={() => {
                  setEditNoteId(note.id);
                  setEditText(note.text);
                }}>✏️ Editar</button>
                <button onClick={() => deleteNote(note.id)}>🗑 Eliminar</button>
              </>
            )}
          </li>
        ))}

      </ul>


    </div>
  );
};

export default Notes;
