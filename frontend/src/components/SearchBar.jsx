
const categories = ["Trabajo", "personal", "Ideas", "Urgente", "Otros"];

const SearchBar = ({ 
    search,
    setSearch,
    searchCategory,
    setSearchCategory,
    showFavorites,
    setShowFavorites,  
}) => {
  return (
<div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-card-bg rounded-xl shadow-md">
  {/* Búsqueda por texto */}
  <input
    type="text"
    placeholder="🔍 Buscar nota..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full sm:w-1/3 px-4 py-2 rounded-lg bg-background text-foreground border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
  />

  {/* Filtro por categoría */}
  <select
    value={searchCategory}
    onChange={(e) => setSearchCategory(e.target.value)}
    className="w-full sm:w-1/4 px-4 py-2 rounded-lg bg-background text-foreground border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
  >
    <option value="">Todas las categorías</option>
    {categories.map(cat => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between rounded-xl ">
  {/* Mostrar favoritas toggle */}
  <button
    onClick={() => setShowFavorites(!showFavorites)}
    className={`px-4 py-2 rounded-lg font-semibold transition-all   ${
      showFavorites ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
    }`}
  >
    {showFavorites ? "⭐ Favoritas" : "📄 Todas"}
  </button>

  </div>

</div>
  );
};




export default SearchBar;
