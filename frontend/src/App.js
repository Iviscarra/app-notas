// src/App.js
import { useState,useEffect } from "react";
import Auth from "../src/auth";
import Notes from "./notes";
import { auth,getUserName } from "./firebase";



function App() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setUserName(user ? getUserName() : ""); // Obtener el nombre del usuario
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Mi App de Notas</h1>
      
      {user ? (
        <>
          <h2>Bienvenido, {userName} 👋</h2>
          <Notes />
          <button onClick={() => auth.signOut()}>Cerrar Sesión</button>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
