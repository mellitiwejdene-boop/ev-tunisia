export const LABELS = { disponible: "Disponible", occupee: "Occupée", hors_service: "Hors service" };

export default function BornesList({ bornes, selectedId, onSelect }) {
  if (bornes.length === 0) {
    return <p className="empty">Aucune borne ne correspond. Modifiez la recherche ou le filtre.</p>;
  }
  return (
    <ul className="list">
      {bornes.map((b) => (
        <li key={b.id}>
          <button className={b.id === selectedId ? "card sel" : "card"} onClick={() => onSelect(b.id)}>
            <span className="card-top">
              <strong>{b.nom}</strong>
              <span className={`badge ${b.statut}`}>{LABELS[b.statut]}</span>
            </span>
            <span className="muted">{b.ville}</span>
            {b.id === selectedId && (
              <dl className="details">
                <div><dt>Puissance</dt><dd>{b.puissance} kW</dd></div>
                <div><dt>Connecteur</dt><dd>{b.connecteur}</dd></div>
                <div><dt>Ports</dt><dd>{b.ports}</dd></div>
                <div><dt>Tarif</dt><dd>{b.prix.toFixed(2)} TND/kWh</dd></div>
              </dl>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}