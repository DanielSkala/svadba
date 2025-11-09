import React, { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// ---------- Custom icons (sage) ----------
const stayIcon = L.icon({
  iconUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.25)"/>
    </filter>
  </defs>
  <path filter="url(#shadow)" d="M15 0C7.27 0 1 6.27 1 14c0 9.1 12 25 14 27 2-2 14-17.9 14-27C29 6.27 22.73 0 15 0z" fill="#8BAE8A"/>
  <circle cx="15" cy="14" r="5.5" fill="white"/>
</svg>`),
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  tooltipAnchor: [0, -34],
});

const venueIcon = L.icon({
  iconUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg width="34" height="46" viewBox="0 0 34 46" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow2" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.25)"/>
    </filter>
  </defs>
  <path filter="url(#shadow2)" d="M17 0C8.16 0 1 7.16 1 16c0 10.5 13.6 28.1 16 30 2.4-1.9 16-19.5 16-30C33 7.16 25.84 0 17 0Z" fill="#6D4570"/>
  <path d="M22 19v6h-4v-4h-2v4h-4v-6h-2l7-6 7 6h-2Z" fill="white"/>
</svg>`),
  iconSize: [40, 50],
  iconAnchor: [17, 46],
  tooltipAnchor: [0, -38],
});

// ---- DATA (same as before; tweak coords anytime) ----
const stays = [
  { name: "Horská Vilenka",  type: "chata",    place: "Mýto pod Ďumbierom", lat: 48.850535, lng: 19.630814, url: "https://horskavilenka.sk/" },
  { name: "Chata Zinka",     type: "chata",    place: "Mýto pod Ďumbierom", lat: 48.847391, lng: 19.628255, url: "https://chatazinka.sk/" },
  { name: "Penzión Rojas",   type: "penzión",  place: "Mýto pod Ďumbierom", lat: 48.847744, lng: 19.626385, url: "https://rojas.sk/" },
  { name: "Penzión v Stráni",type: "penzión",  place: "Mýto pod Ďumbierom", lat: 48.848535, lng: 19.628137, url: "https://penzionvstrani.sk/" },
  { name: "Vila pod lesom",  type: "penzión",  place: "Bystrá",             lat: 48.847988, lng: 19.605086, url: "https://vilapodlesom.sk/" },
  { name: "Zruby Bystrá",    type: "zruby",    place: "Bystrá",             lat: 48.846588, lng: 19.6056,   url: "https://www.zrubybystra.sk/" },
  { name: "Hotel Partizán",  type: "hotel",    place: "Tále",               lat: 48.87402,  lng: 19.6001,  url: "https://www.partizan.sk/" },
  { name: "Hotel Stupka",    type: "hotel",    place: "Tále",               lat: 48.87424,  lng: 19.59706, url: "https://www.tale.sk/hotel-stupka/" },
  { name: "Apartmány Pinus", type: "apartmán", place: "Tále / Horná Lehota",lat: 48.85981,  lng: 19.604265,url: "https://www.pinus.sk/" },
  { name: "Chata Glianka",   type: "chata",    place: "Brezno – Gliane",    lat: 48.826387, lng: 19.658991,url: "https://www.chataglianka.sk/" },
];

const venue = { name: "Stodola Pohanské (svadba)", lat: 48.8569, lng: 19.6469, url: "https://pohanske.sk/" };

// Fit bounds to all markers once
function FitToBounds() {
  const map = useMap();
  useEffect(() => {
    const all = [...stays, venue].map((s) => [s.lat, s.lng]);
    const bounds = L.latLngBounds(all);
    map.fitBounds(bounds.pad(0.015));
  }, [map]);
  return null;
}

export default function TravelMap() {
  const center = useMemo(() => ({ lat: 48.855, lng: 19.635 }), []);

  return (
    <section id="travel" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-3 font-bold">
            Doprava · Ubytovanie
          </h2>
          <p className="font-sans text-gray-600">Pozrite si odporúčané ubytovania priamo na mape</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden ring-1 ring-sage/20 shadow-lg">
          <MapContainer center={center} zoom={12} style={{ height: 520, width: "100%" }} scrollWheelZoom>
            {/* Cleaner, modern basemap */}
            <TileLayer
              attribution='© OpenStreetMap, © CartoDB'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              maxZoom={19}
            />

            {/* Venue marker (click opens website) */}
            <Marker
              position={[venue.lat, venue.lng]}
              icon={venueIcon}
              eventHandlers={{ click: () => window.open(venue.url, "_blank", "noopener") }}
            >
              <Tooltip direction="top" offset={[0, -6]} className="leaflet-tooltip-own">
                <div className="font-sans text-sm">
                  <div className="font-semibold">{venue.name}</div>
                  <div className="text-gray-600">Kliknite pre otvorenie stránky</div>
                </div>
              </Tooltip>
            </Marker>

            {/* Stay markers */}
            {stays.map((s, i) => (
              <Marker
                key={i}
                position={[s.lat, s.lng]}
                icon={stayIcon}
                eventHandlers={{ click: () => window.open(s.url, "_blank", "noopener") }}
              >
                <Tooltip direction="top" offset={[0, -6]} className="leaflet-tooltip-own">
                  <div className="font-sans text-sm">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-gray-600">{s.type} · {s.place}</div>
                    <div className="text-sage">Kliknite pre viac info</div>
                  </div>
                </Tooltip>
              </Marker>
            ))}

            <FitToBounds />
          </MapContainer>

          {/* Legend */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow font-sans text-sm flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#6D9570", border: "1px solid #4d6f50" }} />
              Miesto svadby
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-3 h-5 bg-[#8BAE8A] rounded-[2px]" />
              Ubytovania
            </span>
          </div>
        </div>

        <p className="mt-4 text-center font-sans text-xs text-gray-500">
          *Niektoré súradnice sú približné; doplňte presné GPS podľa poskytovateľov.
        </p>
      </div>
    </section>
  );
}
