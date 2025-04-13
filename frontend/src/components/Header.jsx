import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // ajusta la ruta según tu estructura
import { UserCircle } from "lucide-react"; // o usa un icono que prefieras

const Header = ({ user }) => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="p-4 bg-zinc-900 text-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">📝 Mis Notas</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <UserCircle className="w-6 h-6 text-white" />
          <span>{user?.displayName || "Usuario"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
