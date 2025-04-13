import { useState, useEffect } from "react";
import { getNotes, updateNote, deleteNote, toggleFavorite } from "./firebase";
import EditModal from "./components/EditModal"; // Asegúrate que la ruta sea correcta
import AddNoteModal from "./components/AddNoteModal"; // 👈 importa el nuevo componente
import Footer from "./components/Footer";



const Notes = ({ search, searchCategory, showFavorites }) => {
  const [notes, setNotes] = useState([]);

  const [editNoteId, setEditNoteId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  useEffect(() => {
    const unsubscribe = getNotes(setNotes);
    return () => unsubscribe && unsubscribe();
  }, []);

  const filteredNotes = notes
    .filter((n) =>
      n.text?.toLowerCase().includes(search.toLowerCase()) &&
      n.category?.toLowerCase().includes(searchCategory.toLowerCase())
    )
    .filter((n) => (showFavorites ? n.isFavorite : true))
    .sort((a, b) => {
      if (b.isFavorite !== a.isFavorite) return b.isFavorite - a.isFavorite;
      return a.text.localeCompare(b.text);
    });

  return (
    <div className="p-4">
      {/* Añadir nota */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={() => setIsAddModalOpen(true)}
      >
        Agregar Nota
      </button> 
      </div>

      {/* Lista de notas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-zinc-800 text-white p-4 rounded-lg shadow hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-300">
                [{note.category || "Sin categoría"}]
              </span>
              <button onClick={() => toggleFavorite(note.id, note.isFavorite)}>
                {note.isFavorite ? "⭐" : "☆"}
              </button>
            </div>
            <p className="mt-2">{note.text}</p>
            <div className="mt-4 flex justify-between text-sm">
              <button
                className="bg-yellow-400 text-black px-3 py-1 rounded"
                onClick={() => {
                  setEditNoteId(note.id);
                  setEditText(note.text);
                  setEditCategory(note.category);
                  setIsEditModalOpen(true);
                }}
              >
                ✏️ Editar
              </button>
              <button
                className="bg-red-500 px-3 py-1 rounded"
                onClick={() => deleteNote(note.id)}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {isEditModalOpen && (
        <EditModal
          text={editText} 
          note={{ text: editText, category: editCategory }}
          onClose={() => setIsEditModalOpen(false)}
          onSave={async (updatedText, updatedCategory) => {
            await updateNote(editNoteId, updatedText, updatedCategory);
            setIsEditModalOpen(false);
          }}
        />
      )}
            {isAddModalOpen && (
  <AddNoteModal onClose={() => setIsAddModalOpen(false)} />
)}
      <Footer />
    </div>
  );
};

export default Notes;
