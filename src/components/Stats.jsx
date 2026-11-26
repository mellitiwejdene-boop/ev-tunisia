export default function Stats({ bornes }) {
  const total = bornes.length;

  const parStatut = bornes.reduce((acc, b) => {
    acc[b.statut] = (acc[b.statut] || 0) + 1;
    return acc;
  }, {});

  const puissanceTotale = bornes.reduce((sum, b) => sum + b.puissance * b.ports, 0);
  const puissanceMoyenne = total ? bornes.reduce((s, b) => s + b.puissance, 0) / total : 0;
  const prixMoyen = total ? bornes.reduce((s, b) => s + b.prix, 0) / total : 0;

  const parVille = bornes.reduce((acc, b) => {
    acc[b.ville] = (acc[b.ville] || 0) + 1;
    return acc;
  }, {});
  const topVille = Object.entries(parVille).reduce(
    (best, cur) => (cur[1] > best[1] ? cur : best),
    ["-", 0]
  );

  const taux = total ? Math.round(((parStatut.disponible || 0) / total) * 100) : 0;

  const items = [
    [total, "bornes affichées"],
    [`${taux} %`, "disponibles"],
    [`${puissanceMoyenne.toFixed(0)} kW`, "puissance moyenne"],
    [`${puissanceTotale} kW`, "capacité installée"],
    [`${prixMoyen.toFixed(2)} TND`, "prix moyen par kWh"],
    [topVille[0], `ville la mieux équipée (${topVille[1]})`],
  ];

  return (
    <section className="stats">
      {items.map(([value, label]) => (
        <div key={label} className="stat">
          <span className="stat-v">{value}</span>
          <span className="muted">{label}</span>
        </div>
      ))}
    </section>
  );
}