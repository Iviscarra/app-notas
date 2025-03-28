import { useState, useEffect } from "react";
import { addNote, getNotes, updateNote, deleteNote } from "./firebase";

const categories = ["Trabajo", "personal", "Ideas", "Urgente", "Otros"];

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Otros")

  const [editNoteId, setEditNoteId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState ("");
 
  const [search, setSearch] = useState(""); // Estado para la búsqueda de texto

  const [searchCategory, setSearchCategory] = useState(""); //estado para la busqueda de categoria

  

  useEffect(() => {
    const unsubscribe = getNotes(setNotes);
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleAddNote = async () => {
    if (text.trim()) {
        console.log("📌 Nota a agregar:", text, "🗂 Categoría seleccionada:", category); // 🔍 Verificar en consola
      await addNote(text, category);
      setText("");
      setCategory("Otros");
    }
  };

  const handleEditNote = async () => {
    if (editText.trim() && editNoteId) {
      await updateNote(editNoteId, editText,editCategory);
      setEditNoteId(null);
      setEditText("");
      setCategory("");
    }
  };

    // Filtrar notas según la búsqueda
    const filteredNotes = notes.filter(n =>
        n.text.toLowerCase().includes(search.toLowerCase()) &&
        n.category.toLowerCase().includes(searchCategory.toLowerCase())
      );
    
  return (
    <div>
      <h2>📌 Tus Notas</h2>
      <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
        <option value="">Todas las categorías</option>
        {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
  ))}
</select>
        <label>Buscar notas de texto: </label>
        {/* Input de búsqueda */}
        <input 
            type="text"
            placeholder="Buscar nota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
      />

      {/* Input para agregar nuevas notas */}
      <label>  Agregar nota: </label>
      <input 
        type="text" 
        placeholder="Escribe una nota..."
        value={text} 
        onChange={(e) => setText(e.target.value)}
      />

<label> Categoria: </label>
<select 
  value={category} 
  onChange={(e) => {
    setCategory(e.target.value);
    console.log("✅ Categoría seleccionada correctamente:", e.target.value); // 🔍 Verificar en consola
  }}
>
  {categories.map(cat => (
    <option key={cat} value={cat}>{cat}</option>
  ))}
</select>
      <button onClick={handleAddNote}>Agregar Nota</button>
      <button onClick={() => setEditNoteId(null)}>Cancelar</button>
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

                <trong> Categora:</trong>
            <select //editar categoria
                value={editCategory} 
                onChange={(e) => setEditCategory(e.target.value)}
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
          </select>
                <button onClick={handleEditNote}>Guardar</button>
                <button onClick={() => setEditNoteId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>[{note.category || "Sin categoría"}]</strong> {note.text}
                <button onClick={() => {
                  setEditNoteId(note.id);
                  setEditText(note.text);
                  setEditCategory(note.category || "otros")
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
