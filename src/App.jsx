import { useState } from "react";
import bornes from "./data/bornes.js";
import Welcome from "./components/Welcome.jsx";
import MapView from "./components/MapView.jsx";
import BornesList from "./components/BornesList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Stats from "./components/Stats.jsx";

export default function App() {
  const [started, setStarted] = useState(false);
  const [query, setQuery] = useState("");
  const [statut, setStatut] = useState("tous");
  const [selectedId, setSelectedId] = useState(null);

  // Page d'accueil affichée au démarrage
  if (!started) {
    return <Welcome onStart={() => setStarted(true)} />;
  }

  const q = query.trim().toLowerCase();
  const resultats = bornes
    .filter((b) => b.nom.toLowerCase().includes(q) || b.ville.toLowerCase().includes(q))
    .filter((b) => statut === "tous" || b.statut === statut);

  return (
    <div className="app">
      <header className="top">
        <h1>EV Tunisia</h1>
        <p className="muted">Trouvez une borne de recharge près de votre route.</p>
        <button className="back-btn" onClick={() => setStarted(false)}>
          ← Accueil
        </button>
      </header>
      <Stats bornes={resultats} />
      <main className="main">
        <aside className="side">
          <SearchBar query={query} onQuery={setQuery} statut={statut} onStatut={setStatut} />
          <BornesList bornes={resultats} selectedId={selectedId} onSelect={setSelectedId} />
        </aside>
        <MapView bornes={resultats} selectedId={selectedId} onSelect={setSelectedId} />
      </main>
    </div>
  );
}