export default function SearchBar({ query, onQuery, statut, onStatut }) {
  const options = [
    ["tous", "Toutes"],
    ["disponible", "Disponibles"],
    ["occupee", "Occupées"],
    ["hors_service", "Hors service"],
  ];
  return (
    <div className="search">
      <input
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Rechercher par nom ou par ville"
      />
      <div className="chips">
        {options.map(([value, label]) => (
          <button
            key={value}
            className={statut === value ? "chip on" : "chip"}
            onClick={() => onStatut(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}