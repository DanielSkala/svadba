import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Shirt, Navigation, ChevronLeft, ChevronRight } from 'lucide-react';

const DetailsAndVenue = () => {
  // Coordinates for Stodola Pohanské, Myto pod Ďumbierom - Satellite view
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2631.0!2d19.645258446464485!3d48.850218419521475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzAwLjgiTiAxOcKwMzgnNDMuMCJF!5e1!3m2!1sen!2ssk!4v1234567890";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/stodola_pohanske.jpg',
    '/images/IMG_0035.png',
    '/images/IMG_0062.png',
    '/images/IMG_0072.png',
    '/images/IMG_7636.png'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDirections = () => {
    window.open('https://www.google.com/maps/dir//48.850218419521475,19.645258446464485', '_blank');
  };

  return (
    <section id="details" className="relative py-24 px-4 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-gray-800 mb-4 font-bold">
            Detaily svadby
          </h2>
          <div className="w-24 h-1 bg-sage mx-auto mb-6"></div>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Všetko, čo potrebujete vedieť o našom veľkom dni
          </p>
        </div>

        {/* Key Information Cards - Beautiful Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Date & Time Card */}
          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-white border-2 border-sage/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-sage" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4 text-center font-bold">Kedy</h3>
              <p className="font-sans text-lg text-gray-700 text-center mb-2 font-medium">
                Piatok
              </p>
              <p className="font-serif text-3xl text-sage text-center mb-4 font-bold">
                30. 5. 2026
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-sage" strokeWidth={1.5} />
                <p className="font-sans text-base">Začiatok o 15:00</p>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-white border-2 border-sage/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-sage" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4 text-center font-bold">Kde</h3>
              <p className="font-serif text-2xl text-gray-800 text-center mb-2 font-semibold">
                Stodola Pohanské
              </p>
              <p className="font-sans text-sm text-gray-600 mb-6 text-center">
                Myto pod Ďumbierom<br/>Slovensko
              </p>
              <div className="text-center">
                <a
                  href="https://stodola.pohanske.sk"
                  target="_blank"
                  rel="noopener noreferrer"You
                  className="inline-block px-6 py-2.5 bg-sage text-white rounded-full font-sans text-sm font-medium hover:bg-sage/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Navštíviť web
                </a>
              </div>
            </div>
          </div>

          {/* Dress Code Card */}
          <div className="group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-white border-2 border-sage/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
                  <Shirt className="w-8 h-8 text-sage" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-gray-800 mb-4 text-center font-bold">Dress Code</h3>
              <p className="font-serif text-xl text-gray-700 text-center mb-4 font-medium">
                Cocktail / Semi-formal
              </p>
              <p className="font-sans text-sm text-gray-600 text-center leading-relaxed">
                Prídte ako len sa cítite najlepšie!
              </p>
            </div>
          </div>
        </div>

        {/* Venue Showcase Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="font-serif text-4xl text-gray-800 mb-3 font-bold">Miesto konania</h3>
            <p className="font-sans text-gray-600">Stodola Pohanské - krásne miesto v srdci Slovenska</p>
          </div>

          {/* Images and Map Layout - Square Left, Rectangular Right (split) */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Photo Carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative bg-gray-100" style={{ paddingBottom: '100%' }}>
                <img
                  src={images[currentImageIndex]}
                  alt={`Wedding Photo ${currentImageIndex + 1}`}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-sans">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Right: Stacked Obrad photo and Map (perfectly calculated to match left square) */}
            <div className="flex flex-col gap-6">
              {/* Stodola Obrad - Rectangular half height (47% accounting for 1.5rem gap) */}
              <div className="relative group rounded-2xl overflow-hidden shadow-xl flex-1">
                <div className="relative bg-gray-100 h-full">
                  <img
                    src="/images/stodola_obrad.jpg"
                    alt="Stodola Pohanské - Obrad"
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Map - Rectangular half height (47% accounting for 1.5rem gap) */}
              <div className="space-y-4 flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-sage/10 h-full">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Stodola Pohanské location"
                  ></iframe>
                </div>
                <p className="text-center font-sans text-xs text-gray-500">
                  GPS: 48.8502°N, 19.6453°E
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner & CTA */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Info Box */}
          <div className="bg-sage/5 border-2 border-sage/20 rounded-2xl p-8">
            <p className="font-sans text-lg text-gray-700 leading-relaxed">
              Parkovanie je zabezpečené priamo pri stodole.
              <br className="hidden sm:block" />
              Tešíme sa na vás!
            </p>
          </div>

          {/* Navigate Button */}
          <button
            onClick={handleDirections}
            className="inline-flex items-center gap-3 px-10 py-4 bg-sage text-white rounded-full font-sans text-lg font-semibold hover:bg-sage/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <Navigation className="w-6 h-6" strokeWidth={2} />
            Navigovať do stodoly
          </button>
        </div>
          <img
            src="/images/wedding_leaves/rose_corner.png"
            alt=""
            className="absolute bottom-0 right-0 w-80 md:w-96 lg:w-[32rem] opacity-60 pointer-events-none transform scale-y-[-1]"
            aria-hidden="true"
          />

          <img
            src="/images/wedding_leaves/leaf_in_corner.png"
            alt=""
            className="absolute bottom-0 left-0 w-64 md:w-80 lg:w-96 opacity-50 pointer-events-none transform scale-y-[-1]"
            aria-hidden="true"
          />
      </div>
    </section>
  );
};

export default DetailsAndVenue;
