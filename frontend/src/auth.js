// src/Auth.js
import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,updateProfile } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const [userName, setUserName] = useState(""); // Cambio de "name" a "userName"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Actualizar perfil con nombre de usuario
        await updateProfile(userCredential.user, { displayName: userName });
        alert("Usuario registrado exitosamente"+ userName);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso");
      }
    } catch (error) {
      console.error("Error de autenticación:", error.code);

    // Manejo de errores comunes
    switch (error.code) {
      case "auth/invalid-email":
        alert("❌ El formato del correo es inválido. Verifica y vuelve a intentarlo.");
        break;
      case "auth/user-not-found":
        alert("❌ No hay una cuenta con este correo. Regístrate primero.");
        break;
      case "auth/wrong-password":
        alert("❌ Contraseña incorrecta. Inténtalo de nuevo.");
        break;
      case "auth/email-already-in-use":
        alert("❌ Este correo ya está registrado. Intenta iniciar sesión.");
        break;
      case "auth/weak-password":
        alert("❌ La contraseña es muy débil. Usa al menos 6 caracteres.");
        break;
        case "auth/invalid-credential":
          alert("❌ usuario o contraseña incorrecto");
          break;
      default:
        alert("❌ Error desconocido: " + error.message);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Sesión cerrada");
  };

  return (
    <div>
      <h2>{isRegister ? "Registro" : "Iniciar Sesión"}</h2>
      <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nombre de usuario"
        value={userName} 
        onChange={(e) => setUserName(e.target.value)} 
      />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? "Registrarse" : "Iniciar Sesión"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Auth;
