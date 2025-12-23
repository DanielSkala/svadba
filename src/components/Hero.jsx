import React, { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    '/images/hero_main.jpeg',
    '/images/hero_main_2.jpeg',
    '/images/hero_main_3.jpeg'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      aria-label="Veronika a Daniel – svadba"
    >
      {/* Fixed background image with darkening overlay */}
      <div className="fixed inset-0 w-full h-full">
        <img
          src={heroImages[currentImageIndex]}
          alt="Wedding background"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Dark overlay with vignette effect */}
        <div className="absolute inset-0 bg-black/15"></div>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)'
          }}
        ></div>
        {/* Light texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        ></div>
      </div>

      {/* Main content - no glass background */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[12vh] sm:top-[10vh] md:top-[12vh] z-10 w-[92%] max-w-[1120px]">
        <div className="relative text-center px-4 sm:px-10 md:px-14 py-5 sm:py-8 md:py-10 space-y-2 sm:space-y-4">

          <Heart className="w-7 h-7 sm:w-8 sm:h-8 mx-auto text-red-500 drop-shadow-lg" fill="currentColor" strokeWidth={1.5} aria-hidden="true" style={{ filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))' }} />

          {/* Only script here */}
          <h1 className="font-script text-white leading-none text-[clamp(2.5rem,12vw,6.5rem)]" style={{ textShadow: '0 6px 20px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.3)' }}>
            Veronika <span className="align-[-0.08em]">&</span> Daniel
          </h1>

            {/* Invite line */}
          <p className="font-serif text-white text-base sm:text-xl md:text-2xl leading-relaxed" style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)' }}>
            Srdečne vás pozývame na obrad a oslavu nášho manželstva
          </p>

          {/* Date */}
          <p className="font-serif text-white text-lg sm:text-2xl md:text-3xl font-semibold" style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)' }}>
            Máj 30, 2026
          </p>

          {/* Venue */}
          <p className="font-serif text-white text-sm sm:text-lg md:text-xl" style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)' }}>
            Stodola Pohanské, Mýto pod Ďumbierom
          </p>


        </div>
      </div>

      {/* Background image navigation arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
        aria-label="Previous background image"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
        aria-label="Next background image"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
      </button>

      {/* Image counter indicator */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-serif z-20">
        {currentImageIndex + 1} / {heroImages.length}
      </div>

      {/* Bottom-aligned CTAs */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-20 sm:bottom-28 z-10 w-full px-4">
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
          <a
            href="#rsvp"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-serif font-semibold text-base sm:text-lg shadow-xl bg-sage text-white hover:scale-[1.02] transition-transform text-center"
          >
            Potvrdiť účasť
          </a>
          <a
            href="#details"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-serif font-semibold text-base sm:text-lg shadow-xl bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white transition-colors text-center"
          >
            Viac informácií
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border-2 border-white/90 bg-white/20 backdrop-blur-sm flex items-start justify-center p-2 shadow-2xl">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
