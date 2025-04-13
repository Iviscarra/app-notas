import { useState, useEffect } from "react";

const categories = ["Trabajo", "Personal", "Ideas", "Urgente", "Otros"];

const EditModal = ({ text, note, onClose, onSave }) => {
  const [newText, setNewText] = useState(note.text || "");
  const [newCategory, setNewCategory] = useState(note.category || "");

  useEffect(() => {
    setNewText(note.text || "");
    setNewCategory(note.category || "");
  }, [note]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-zinc-800 text-black dark:text-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Nota</h2>

        <textarea
          className="w-full h-32 p-3 rounded-lg bg-gray-100 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />

        <label className="block mt-4 text-sm">Categoría:</label>
        <select
          className="w-full p-2 mt-1 rounded bg-gray-100 dark:bg-zinc-700"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex justify-end mt-6 gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-zinc-600 text-black dark:text-white hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-accent text-white hover:opacity-90"
            onClick={() => onSave(newText, newCategory)}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

