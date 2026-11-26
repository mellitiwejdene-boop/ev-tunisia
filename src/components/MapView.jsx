import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { LABELS } from "./BornesList.jsx";

const COLORS = { disponible: "#16a368", occupee: "#e0922f", hors_service: "#c0453a" };

function FlyTo({ borne }) {
  const map = useMap();
  useEffect(() => {
    if (borne) map.flyTo([borne.lat, borne.lng], 11, { duration: 0.8 });
  }, [borne, map]);
  return null;
}

function Resize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

export default function MapView({ bornes, selectedId, onSelect }) {
  const selected = bornes.find((b) => b.id === selectedId);
  return (
    <MapContainer center={[34.3, 9.6]} zoom={6} className="map">
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo borne={selected} />
      <Resize />
      {bornes.map((b) => (
        <CircleMarker
          key={b.id}
          center={[b.lat, b.lng]}
          radius={b.id === selectedId ? 13 : 9}
          pathOptions={{ color: "#fff", weight: 2, fillColor: COLORS[b.statut], fillOpacity: 1 }}
          eventHandlers={{ click: () => onSelect(b.id) }}
        >
          <Popup>
            <strong>{b.nom}</strong><br />
            {b.ville} : {LABELS[b.statut]}<br />
            {b.puissance} kW, {b.connecteur}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}