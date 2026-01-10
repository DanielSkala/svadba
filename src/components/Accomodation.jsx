import React, { useEffect, useRef, useState, useCallback } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Home, Building, Trees, ChevronLeft, ChevronRight, ExternalLink, Users, MapPin } from "lucide-react";

// ---- DATA with real images and verified GPS coordinates ----
const stays = [
  {
    name: "Horská Vilenka",
    type: "chata",
    place: "Mýto pod Ďumbierom",
    lat: 48.8505345,
    lng: 19.6286277,
    url: "https://horskavilenka.sk/",
    image: "/images/accomodation_images/vilenka.png",
    capacity: "8-10 osôb",
    price: "od 180€/noc",
    distance: "0.8 km"
  },
  {
    name: "Chata Zinka",
    type: "chata",
    place: "Mýto pod Ďumbierom",
    lat: 48.8474872,
    lng: 19.6244609,
    url: "https://chatazinka.sk/",
    image: "/images/accomodation_images/zinka.png",
    capacity: "6-8 osôb",
    price: "od 150€/noc",
    distance: "1.2 km"
  },
  {
    name: "Penzión Rojas",
    type: "penzión",
    place: "Mýto pod Ďumbierom",
    lat: 48.847878,
    lng: 19.626356,
    url: "https://rojas.sk/",
    image: "/images/accomodation_images/rojas.png",
    capacity: "2-4 osoby/izba",
    price: "od 45€/noc",
    distance: "1 km"
  },
  {
    name: "Penzión v Stráni",
    type: "penzión",
    place: "Mýto pod Ďumbierom",
    lat: 48.8485,
    lng: 19.6275,
    url: "https://penzionvstrani.sk/",
    image: "/images/accomodation_images/strani.png",
    capacity: "2-3 osoby/izba",
    price: "od 40€/noc",
    distance: "0.9 km"
  },
  {
    name: "Zruby Bystrá",
    type: "zruby",
    place: "Bystrá",
    lat: 48.846588,
    lng: 19.6056,
    url: "https://www.zrubybystra.sk/",
    image: "/images/accomodation_images/bystra.png",
    capacity: "4-6 osôb/zrub",
    price: "od 120€/noc",
    distance: "3.5 km"
  },
  {
    name: "Hotel Partizán",
    type: "hotel",
    place: "Bystrá – Tále",
    lat: 48.87402,
    lng: 19.6001,
    url: "https://www.partizan.sk/",
    image: "/images/accomodation_images/partizan.png",
    capacity: "2 osoby/izba",
    price: "od 85€/noc",
    distance: "5 km"
  },
  {
    name: "Hotel Stupka",
    type: "hotel",
    place: "Bystrá – Tále",
    lat: 48.87424,
    lng: 19.59706,
    url: "https://www.tale.sk/hotel-stupka/",
    image: "/images/accomodation_images/tale.png",
    capacity: "2 osoby/izba",
    price: "od 75€/noc",
    distance: "5 km"
  },
  {
    name: "Apartmány Pinus",
    type: "apartmán",
    place: "Horná Lehota – Tále",
    lat: 48.85981,
    lng: 19.604265,
    url: "https://www.pinus.sk/",
    image: "/images/accomodation_images/pinus.png",
    capacity: "2-6 osôb/apt",
    price: "od 90€/noc",
    distance: "4 km"
  },
  {
    name: "Chata Glianka",
    type: "chata",
    place: "Brezno – Gliane",
    lat: 48.826333,
    lng: 19.659083,
    url: "https://www.chataglianka.sk/",
    image: "/images/accomodation_images/glianka.png",
    capacity: "10-12 osôb",
    price: "od 200€/noc",
    distance: "4 km"
  },
];

const venue = { name: "Stodola Pohanské", lat: 48.849866, lng: 19.645154, url: "https://pohanske.sk/" };

// Get icon component for accommodation type
const getTypeIcon = (type) => {
  switch (type) {
    case 'hotel': return Building;
    case 'penzión': return Home;
    case 'chata': return Trees;
    case 'zruby': return Trees;
    case 'apartmán': return Home;
    default: return Home;
  }
};

// Custom marker component for stays
const StayMarker = ({ isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer transition-transform duration-200 ${isActive ? 'scale-125 z-10' : 'hover:scale-110'}`}
  >
    <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <path filter="url(#shadow)" d="M15 0C7.27 0 1 6.27 1 14c0 9.1 12 25 14 27 2-2 14-17.9 14-27C29 6.27 22.73 0 15 0z" fill={isActive ? '#6D4570' : '#8BAE8A'}/>
      <circle cx="15" cy="14" r="5.5" fill="white"/>
    </svg>
  </div>
);

// Custom marker component for venue
const VenueMarker = ({ onClick }) => (
  <div onClick={onClick} className="cursor-pointer hover:scale-110 transition-transform duration-200">
    <svg width="40" height="52" viewBox="0 0 34 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow2" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <path filter="url(#shadow2)" d="M17 0C8.16 0 1 7.16 1 16c0 10.5 13.6 28.1 16 30 2.4-1.9 16-19.5 16-30C33 7.16 25.84 0 17 0Z" fill="#6D4570"/>
      <path d="M22 19v6h-4v-4h-2v4h-4v-6h-2l7-6 7 6h-2Z" fill="white"/>
    </svg>
  </div>
);

// MapTiler API key from environment variable
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;

export default function TravelMap() {
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initial view state
  const [viewState, setViewState] = useState({
    longitude: 19.625,
    latitude: 48.855,
    zoom: 11.5,
    pitch: 50,  // 3D tilt angle
    bearing: -20  // Rotation
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to specific card when marker is clicked
  const scrollToCard = (index) => {
    setActiveIndex(index);
    setPopupInfo(stays[index]);
    if (cardRefs.current[index] && scrollRef.current) {
      const card = cardRefs.current[index];
      const container = scrollRef.current;
      const scrollLeft = card.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  // Add terrain when map loads
  const onMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (map) {
      // Add terrain source
      map.addSource('terrain', {
        type: 'raster-dem',
        url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${MAPTILER_KEY}`,
        tileSize: 256
      });

      // Enable 3D terrain
      map.setTerrain({ source: 'terrain', exaggeration: 1.5 });

      // Add sky for better 3D effect
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });

      setMapLoaded(true);
    }
  }, []);

  return (
    <section id="travel" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-3 font-bold">
            Doprava · Ubytovanie
          </h2>
          <p className="font-serif text-lg text-gray-600">Kliknite na značku na mape alebo prezrite karty nižšie</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden ring-1 ring-sage/20 shadow-lg">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{ width: '100%', height: 420 }}
            mapStyle={`https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`}
            onLoad={onMapLoad}
            attributionControl={false}
          >
            <NavigationControl position="bottom-left" />

            {/* Venue marker */}
            <Marker
              longitude={venue.lng}
              latitude={venue.lat}
              anchor="bottom"
            >
              <VenueMarker onClick={() => window.open(venue.url, "_blank", "noopener")} />
            </Marker>

            {/* Stay markers */}
            {stays.map((stay, i) => (
              <Marker
                key={i}
                longitude={stay.lng}
                latitude={stay.lat}
                anchor="bottom"
              >
                <StayMarker
                  isActive={activeIndex === i}
                  onClick={() => scrollToCard(i)}
                />
              </Marker>
            ))}

            {/* Popup for active marker */}
            {popupInfo && (
              <Popup
                longitude={popupInfo.lng}
                latitude={popupInfo.lat}
                anchor="bottom"
                offset={[0, -45]}
                closeButton={false}
                closeOnClick={false}
                className="custom-popup"
              >
                <div className="font-serif text-sm p-1">
                  <div className="font-semibold text-gray-800">{popupInfo.name}</div>
                  <div className="text-gray-500 text-xs">{popupInfo.type} · {popupInfo.place}</div>
                </div>
              </Popup>
            )}
          </Map>

          {/* Legend */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow font-serif text-sm flex items-center gap-3 z-[1000]">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#6D4570" }} />
              Svadba
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-sage" />
              Ubytovanie
            </span>
          </div>

          {/* 3D hint */}
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full font-serif text-xs text-white z-[1000]">
            Použite Ctrl + myš pre 3D rotáciu
          </div>
        </div>

        {/* Scrollable accommodation cards */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl text-gray-800 font-semibold">Odporúčané ubytovania ({stays.length})</h3>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-sage/10 hover:bg-sage/20 transition-colors"
                aria-label="Posunúť doľava"
              >
                <ChevronLeft className="w-5 h-5 text-sage" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-sage/10 hover:bg-sage/20 transition-colors"
                aria-label="Posunúť doprava"
              >
                <ChevronRight className="w-5 h-5 text-sage" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stays.map((stay, index) => {
              const IconComponent = getTypeIcon(stay.type);
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  className={`flex-shrink-0 w-80 bg-white rounded-xl border-2 shadow-md hover:shadow-xl transition-all duration-300 snap-start overflow-hidden group cursor-pointer ${
                    isActive ? 'border-sage ring-2 ring-sage/20 scale-[1.02]' : 'border-sage/20 hover:-translate-y-1'
                  }`}
                  onMouseEnter={() => { setActiveIndex(index); setPopupInfo(stays[index]); }}
                  onMouseLeave={() => { setActiveIndex(null); setPopupInfo(null); }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Type badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
                      <div className="flex items-center gap-1">
                        <IconComponent className="w-3.5 h-3.5 text-sage" strokeWidth={2} />
                        <span className="font-serif text-xs text-gray-700 capitalize">{stay.type}</span>
                      </div>
                    </div>
                    {/* Distance badge */}
                    <div className="absolute top-3 right-3 bg-sage/90 backdrop-blur px-2 py-1 rounded-full">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-white" strokeWidth={2} />
                        <span className="font-serif text-xs text-white">{stay.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <h4 className="font-serif text-lg font-bold text-gray-800 mb-1">{stay.name}</h4>
                    <p className="font-serif text-sm text-gray-500 mb-3">{stay.place}</p>

                    {/* Info row */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-sage" strokeWidth={1.5} />
                        <span className="font-serif text-sm text-gray-600">{stay.capacity}</span>
                      </div>
                      <div className="font-serif text-sm font-semibold text-sage">{stay.price}</div>
                    </div>

                    {/* CTA button */}
                    <a
                      href={stay.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-sage/10 hover:bg-sage hover:text-white text-sage rounded-lg font-serif text-sm font-medium transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Zobraziť ubytovanie</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accommodation info box */}
        <div className="mt-10 bg-sage/5 border border-sage/20 rounded-2xl p-6 sm:p-8">
          <h3 className="font-serif text-xl sm:text-2xl text-gray-800 font-semibold mb-4 text-center">
            Kde sa ubytovať?
          </h3>
          <div className="font-serif text-gray-600 space-y-3 max-w-3xl mx-auto">
            <p>
              Ubytovania uvedené vyššie sú odporúčania priamo od Stodoly Pohanské - mali by byť overené a kvalitné, no nič nevieme garantovať.
            </p>
            <p>
              <strong>Ďalšie možnosti:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Hľadajte na{" "}
                <a
                  href="https://www.airbnb.com/s/M%C3%BDto-pod-%C4%8Eumbierom--Slovakia/homes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage hover:text-sage/80 underline underline-offset-2"
                >
                  Airbnb - Mýto pod Ďumbierom
                </a>
              </li>
              <li>
                Skúste{" "}
                <a
                  href="https://www.booking.com/searchresults.html?ss=M%C3%BDto+pod+%C4%8Eumbierom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage hover:text-sage/80 underline underline-offset-2"
                >
                  Booking.com
                </a>
                {" "}pre ďalšie možnosti v okolí
              </li>
              <li>
                Pre dobrodružnejšie duše - môžete si postaviť stan priamo v areáli Stodoly Pohanské alebo na priľahlej lúke
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
