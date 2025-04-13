import { useState } from "react";
import { addNote } from "../firebase";

const categories = ["Trabajo", "Personal", "Ideas", "Urgente", "Otros"];

const AddNoteModal = ({ onClose }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Otros");

  const handleAdd = async () => {
    if (text.trim()) {
      await addNote(text, category);
      setText("");
      setCategory("Otros");
      onClose(); // Cierra el modal después de añadir
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Agregar Nota</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe una nota..."
          className="w-full p-2 mb-4 border rounded text-black"
          rows={4}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-black"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
