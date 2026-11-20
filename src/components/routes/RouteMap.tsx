import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

interface RoutePoint {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

interface RouteMapProps {
  points: RoutePoint[];
}

function MapBounds({ points }: RouteMapProps) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map((point) => [point.lat, point.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [map, points]);

  return null;
}

export function RouteMap({ points }: RouteMapProps) {
  if (!points.length) return null;

  const center: [number, number] = [points[0].lat, points[0].lng];
  const positions = points.map(
    (point): [number, number] => [point.lat, point.lng],
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom
        className="h-[420px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        <MapBounds points={points} />

        <Polyline
          positions={positions}
          pathOptions={{
            weight: 5,
          }}
        />

        {points.map((point, index) => (
          <Marker
            key={`${point.name}-${index}`}
            position={[point.lat, point.lng]}
          >
            <Popup>
              <div className="min-w-[180px]">
                <strong>{point.name}</strong>
                <p className="mt-1 text-sm">{point.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
