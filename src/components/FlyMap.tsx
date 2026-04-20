import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from "react-leaflet";
import { startIcon, destIcon } from "@/lib/leafletSetup";

export interface LatLng {
  lat: number;
  lng: number;
}

interface MapProps {
  start: LatLng | null;
  destination: LatLng | null;
  onSelect: (pt: LatLng) => void;
}

const BENGALURU: [number, number] = [12.9716, 77.5946];

const ClickHandler = ({ onSelect }: { onSelect: (p: LatLng) => void }) => {
  useMapEvents({
    click(e) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

export const FlyMap = ({ start, destination, onSelect }: MapProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-muted animate-pulse rounded-2xl" />;

  return (
    <MapContainer
      center={BENGALURU}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onSelect={onSelect} />
      {start && (
        <Marker position={[start.lat, start.lng]} icon={startIcon}>
          <Popup>Pickup point</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.lat, destination.lng]} icon={destIcon}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      {start && destination && (
        <Polyline
          positions={[
            [start.lat, start.lng],
            [destination.lat, destination.lng],
          ]}
          pathOptions={{ color: "hsl(12, 78%, 48%)", weight: 4, dashArray: "8 8", opacity: 0.85 }}
        />
      )}
    </MapContainer>
  );
};
