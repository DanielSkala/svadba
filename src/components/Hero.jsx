import React from "react";
import { Heart } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url(/images/hero_main.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      aria-label="Veronika a Daniel – svadba"
    >
      {/* Wide + short glass banner (higher to reveal photo center) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[8vh] sm:top-[10vh] md:top-[12vh] z-10 w-[92%] max-w-[1120px]">
        <div className="text-center rounded-2xl md:rounded-3xl bg-white/50 backdrop-blur-xl shadow-2xl
                        px-6 sm:px-10 md:px-14 py-6 sm:py-8 md:py-10 space-y-4">
          <Heart className="w-6 h-6 mx-auto text-sage/90" strokeWidth={1.5} aria-hidden="true" />

          {/* Only script here */}
          <h1 className="font-script text-slate-900 leading-none text-[clamp(2.75rem,7.5vw,6.5rem)]">
            Veronika <span className="align-[-0.08em]">&</span> Daniel
          </h1>

          {/* Bigger surnames (same sans) */}
          <p className="mt-1 font-sans text-slate-700 uppercase tracking-[0.2em] text-sm sm:text-base md:text-lg">
            Greňová • Skala
          </p>

          {/* Date — same sans, unified look */}
          <div className="pt-2 font-sans text-slate-900 font-semibold tabular-nums text-xl sm:text-2xl md:text-3xl">
            <span>30</span>
            <span className="px-3 opacity-60">·</span>
            <span>5</span>
            <span className="px-3 opacity-60">·</span>
            <span>2025</span>
          </div>

          {/* Venue */}
          <p className="font-sans text-slate-800 text-sm sm:text-base">
            Stodola Pohanské, Mýto pod Ďumbierom
          </p>

          {/* Invite line */}
          <p className="font-sans text-slate-800/90 text-sm sm:text-base leading-relaxed">
            Srdečne vás pozývame na obrad a oslavu nášho manželstva.
          </p>
        </div>
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
