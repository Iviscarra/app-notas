// src/Auth.js
import { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: userName });
        alert("✅ Usuario registrado exitosamente: " + userName);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Inicio de sesión exitoso");
      }
    } catch (error) {
      console.error("Error de autenticación:", error.code);
      switch (error.code) {
        case "auth/invalid-email":
          alert("❌ El correo es inválido.");
          break;
        case "auth/user-not-found":
          alert("❌ No existe el usuario.");
          break;
        case "auth/wrong-password":
          alert("❌ Contraseña incorrecta.");
          break;
        case "auth/email-already-in-use":
          alert("❌ El correo ya está registrado.");
          break;
        case "auth/weak-password":
          alert("❌ La contraseña es débil.");
          break;
        case "auth/invalid-credential":
          alert("❌ Usuario o contraseña incorrectos.");
          break;
        default:
          alert("❌ Error: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Registro" : "Iniciar Sesión"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 rounded bg-zinc-700 text-white"
              required
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-zinc-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-zinc-700 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded transition"
          >
            {isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 text-blue-400 hover:underline text-sm text-center block mx-auto"
        >
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </button>

        <button
          onClick={() => signOut(auth)}
          className="mt-4 text-red-400 hover:underline text-sm text-center block mx-auto"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Auth;
