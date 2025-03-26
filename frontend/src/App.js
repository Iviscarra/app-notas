// src/App.js

import { useState } from "react";
import Auth from "../src/auth";
import Notes from "./notes";
import { auth } from "./firebase";


function App() {
  const [user, setUser] = useState(null);
  auth.onAuthStateChanged((user) => setUser(user));
  return (
    <div>
      <h1>Mi App de Notas</h1>
      <Auth />

      {user ?<Notes/> : <auth/>}
    </div>
  );
}

export default App;
