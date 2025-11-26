import React, { useState, useEffect } from "react";
import CharacterCard from "./components/CharacterCard";

const API_BASE = "https://api.jikan.moe/v4/characters";

export default function App() {
const [characters, setCharacters] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(true);
const [hasMore, setHasMore] = useState(true);
const [search, setSearch] = useState("");

const fetchCharacters = async (pageNum = 1) => {
setLoading(true);
try {
const res = await fetch(`${API_BASE}?page=${pageNum}`);
const data = await res.json();
setCharacters((prev) => [...prev, ...(data.data || [])]);
setHasMore(data.pagination?.has_next_page ?? false);
} catch (err) {
console.error("Erreur API :", err);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchCharacters(page);
}, [page]);

const loadMore = () => {
if (hasMore) setPage((prev) => prev + 1);
};

// Filtrer les personnages par recherche
const filteredCharacters = characters.filter((c) =>
c.name.toLowerCase().includes(search.toLowerCase())
);

return ( <div className="min-h-screen p-6 bg-linear-to-br from-purple-500 via-pink-500 to-indigo-600 animate-gradient-xy"> <h1 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
Anime Characters </h1>

```
  {/* Barre de recherche */}
  <div className="flex justify-center mb-8">
    <input
      type="text"
      placeholder="Rechercher un personnage..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full max-w-md px-4 py-2 rounded-xl shadow-lg border-0 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-gray-200 text-white bg-white/20 backdrop-blur-sm"
    />
  </div>

  {/* Grid des cards */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {filteredCharacters.map((c, i) => (
      <CharacterCard key={c.mal_id ?? i} character={c} />
    ))}
  </div>

  {/* Bouton charger plus */}
  <div className="mt-8 flex justify-center">
    {loading ? (
      <button
        disabled
        className="px-6 py-3 rounded-full bg-white/30 text-white font-semibold animate-pulse shadow-lg"
      >
        Chargement...
      </button>
    ) : hasMore ? (
      <button
        onClick={loadMore}
        className="px-6 py-3 rounded-full bg-white/30 text-white font-semibold hover:bg-white/50 transition-colors shadow-lg"
      >
        Charger plus
      </button>
    ) : (
      <span className="text-white text-lg font-medium">Plus de personnages.</span>
    )}
  </div>
</div>


);
}
