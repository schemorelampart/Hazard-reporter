// components/LocationPicker.jsx
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// ✅ Fix for default marker icons in Vite/React builds
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl; // ⬅ forces Leaflet to use mergeOptions below

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function LocateButton({ setPosition }) {
  const map = useMap();

  const locateUser = () => {
    map.locate({ setView: true, maxZoom: 15 });
  };

  useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
    },
  });

  return (
    <button
      type="button" // ⬅ prevents form submission
      onClick={locateUser}
      className="absolute top-2 right-2 z-[1000] bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
      title="Recenter to my location"
    >
      📍
    </button>
  );
}

function LocationMarker({ position, setPosition }) {
  return (
    position && (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const newPos = e.target.getLatLng();
            setPosition(newPos);
          },
        }}
      />
    )
  );
}

export default function LocationPicker({ onChange }) {
  const [position, setPosition] = useState(null);

  // Detect location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(coords);
        onChange(coords);
      },
      () => {
        const fallback = { lat: 51.505, lng: -0.09 }; // London fallback
        setPosition(fallback);
        onChange(fallback);
      }
    );
  }, [onChange]);

  // Update form when position changes
  useEffect(() => {
    if (position) {
      onChange(position);
    }
  }, [position, onChange]);

  if (!position) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        📍 Detecting location...
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border relative">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
        <LocateButton setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}
