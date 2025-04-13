import { useState, useEffect } from "react";
import Auth from "../src/auth";
import Notes from "./notes";
import { auth } from "./firebase";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {user && (
        <>
          <main className="max-w-4xl w-full mx-auto">
            <Header user={user} toggleTheme={toggleTheme} darkMode={darkMode} />
          </main>

          <main className="max-w-4xl w-full mx-auto">
            <SearchBar
              search={search}
              setSearch={setSearch}
              searchCategory={searchCategory}
              setSearchCategory={setSearchCategory}
              showFavorites={showFavorites}
              setShowFavorites={setShowFavorites}
            />
          </main>
        </>
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto">
        {user ? (
          <Notes
            search={search}
            searchCategory={searchCategory}
            showFavorites={showFavorites}
          />
        ) : (
          <Auth />
        )}
      </main>
    </div>
  );
}

export default App;
