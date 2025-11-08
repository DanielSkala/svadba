import React from 'react';
import { Heart } from 'lucide-react';

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
      style={{
        backgroundImage: 'url(/images/hero_main.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"></div>

      {/* Main content */}
      <div className="relative z-30 max-w-5xl mx-auto text-center px-4 py-20">
        {/* Decorative element */}
        <div className="animate-fade-in mb-6">
          <Heart className="w-10 h-10 mx-auto text-white drop-shadow-2xl" strokeWidth={1.5} fill="currentColor" />
        </div>

        {/* Names - using elegant script font with white text */}
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4 animate-fade-in-up drop-shadow-2xl">
          Veronika <span className="text-white">&</span> Daniel
        </h1>

        {/* Surnames */}
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-10 animate-fade-in-up animation-delay-200 font-bold tracking-wide drop-shadow-2xl">
          Greňová & Skala
        </p>

        {/* Date */}
        <div className="animate-fade-in-up animation-delay-400 mb-8">
          <div className="inline-block bg-white/95 backdrop-blur-md px-8 py-5 rounded-lg shadow-2xl border border-sage/30">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-2 tracking-wider font-bold">
              30 · 5 · 2025
            </p>
            <p className="font-sans text-base sm:text-lg text-gray-700 font-medium">
              Stodola Pohanské, Myto pod Ďumbierom
            </p>
          </div>
        </div>

        {/* Invitation text */}
        <div className="animate-fade-in-up animation-delay-600 max-w-2xl mx-auto mb-10">
          <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-lg shadow-xl inline-block">
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-gray-900 leading-relaxed text-balance font-semibold">
              Srdečne vás pozývame na obrad a oslavu nášho manželstva
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <a
            href="#rsvp"
            className="px-10 py-4 bg-sage text-white rounded-full font-sans font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-2xl text-lg"
          >
            Potvrdiť účasť
          </a>
          <a
            href="#details"
            className="px-10 py-4 bg-white/95 backdrop-blur-md border-2 border-white text-gray-900 rounded-full font-sans font-semibold hover:bg-white transition-all duration-300 shadow-2xl text-lg"
          >
            Viac informácií
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-6 h-10 border-2 border-white bg-white/30 backdrop-blur-sm rounded-full flex items-start justify-center p-2 shadow-2xl">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
