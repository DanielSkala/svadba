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
      style={{
        backgroundImage: `url(${heroImages[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      aria-label="Veronika a Daniel – svadba"
    >
      {/* Wide + short glass banner (higher to reveal photo center) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[8vh] sm:top-[10vh] md:top-[12vh] z-10 w-[92%] max-w-[1120px]">
        <div className="relative text-center rounded-2xl md:rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl
                        px-6 sm:px-10 md:px-14 py-6 sm:py-8 md:py-10 space-y-4">

          {/* Three roses decoration in top right corner */}
          <img
            src="/images/wedding_leaves/three_roses_t.png"
            alt=""
            className="absolute -top-12 -right-12 w-32 md:w-40 lg:w-48 opacity-90 pointer-events-none"
            aria-hidden="true"
          />

          {/* Three roses decoration in bottom left corner */}
          <img
            src="/images/wedding_leaves/three_roses_t.png"
            alt=""
            className="absolute -bottom-12 -left-12 w-32 md:w-40 lg:w-48 opacity-90 pointer-events-none transform scale-x-[-1]"
            aria-hidden="true"
          />

          <Heart className="w-6 h-6 mx-auto text-sage/90" strokeWidth={1.5} aria-hidden="true" />

          {/* Only script here */}
          <h1 className="font-script text-slate-900 leading-none text-[clamp(2.75rem,100vw,6.5rem)]">
            Veronika <span className="align-[-0.08em]">&</span> Daniel
          </h1>

            {/* Invite line */}
          <p className="font-sans text-slate-800 text-sm sm:text-base leading-relaxed">
            Srdečne vás pozývame na obrad a oslavu nášho manželstva
          </p>

          {/* Venue */}
          <p className="font-sans text-slate-800 text-sm sm:text-base">
            Máj 30, 2026 • Stodola Pohanské, Mýto pod Ďumbierom
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
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-sans z-20">
        {currentImageIndex + 1} / {heroImages.length}
      </div>

      {/* Bottom-aligned CTAs */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-28 z-10">
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#rsvp"
            className="px-8 py-3 rounded-full font-sans font-semibold text-base shadow-xl bg-sage text-white hover:scale-[1.02] transition-transform"
          >
            Potvrdiť účasť
          </a>
          <a
            href="#details"
            className="px-8 py-3 rounded-full font-sans font-semibold text-base shadow-xl bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white transition-colors"
          >
            Viac informácií
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border-2 border-white/90 bg-white/20 backdrop-blur-sm flex items-start justify-center p-2 shadow-2xl">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
