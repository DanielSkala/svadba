import React from 'react';
import { Car, Home, MapPin } from 'lucide-react';

const Travel = () => {
  const accommodations = [
    {
      name: 'Hotel Galant',
      location: 'Břeclav',
      distance: '10 km',
      link: '#'
    },
    {
      name: 'Penzion U Lva',
      location: 'Pohansko',
      distance: '2 km',
      link: '#'
    },
    {
      name: 'Apartments Lednice',
      location: 'Lednice',
      distance: '8 km',
      link: '#'
    }
  ];

  return (
    <section id="travel" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-6 font-bold">
            Doprava · Ubytování
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Parking */}
          <div className="text-center p-8 rounded-lg bg-cream bg-opacity-50">
            <Car className="w-12 h-12 mx-auto mb-4 text-sage" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-gray-800 mb-4 font-bold">Parkovanie</h3>
            <p className="font-sans text-gray-700 leading-relaxed">
              Parkovanie je možné priamo pri Stodole Pohanské. K dispozícii je dostatok parkovacích miest pre všetkých hostí.
            </p>
          </div>

          {/* How to get there */}
          <div className="text-center p-8 rounded-lg bg-cream bg-opacity-50">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-sage" strokeWidth={1.5} />
            <h3 className="font-serif text-2xl text-gray-800 mb-4 font-bold">Ako sa dostať</h3>
            <p className="font-sans text-gray-700 leading-relaxed mb-4">
              Stodola Pohanské sa nachádza v krásnom Myte pod Ďumbierom, v srdci Slovenska.
            </p>
            <a
              href="#map"
              className="inline-block px-6 py-2 bg-sage text-white rounded-full font-sans text-sm hover:bg-opacity-90 transition-all duration-300"
            >
              Zobrazit mapu
            </a>
          </div>
        </div>

        {/* Accommodation */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <Home className="w-12 h-12 mx-auto mb-4 text-sage" strokeWidth={1.5} />
            <h3 className="font-serif text-3xl text-gray-800 mb-2 font-bold">Doporučené ubytování</h3>
            <p className="font-sans text-gray-600">Tipy na ubytování v okolí</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {accommodations.map((hotel, index) => (
              <div
                key={index}
                className="bg-white border border-sage border-opacity-20 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="font-serif text-xl text-gray-800 mb-2 font-bold">{hotel.name}</h4>
                <p className="font-sans text-gray-600 text-sm mb-1">{hotel.location}</p>
                <p className="font-sans text-sage text-sm mb-4">~ {hotel.distance} od stodoly</p>
                <a
                  href={hotel.link}
                  className="inline-block px-4 py-2 border border-sage text-sage rounded-full font-sans text-sm hover:bg-sage hover:text-white transition-all duration-300"
                >
                  Více info
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Travel;
