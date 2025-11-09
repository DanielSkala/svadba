import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-sage border-opacity-20 py-12 px-4 overflow-hidden">
      {/* Decorative images */}
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Floral decoration */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-16 bg-sage bg-opacity-30"></div>
          <Heart className="w-6 h-6 mx-4 text-blush" strokeWidth={1.5} fill="currentColor" />
          <div className="h-px w-16 bg-sage bg-opacity-30"></div>
        </div>

        {/* Monogram */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-sage border-opacity-30 mb-4">
            <span className="font-serif text-2xl text-gray-800">V & D</span>
          </div>
        </div>

        {/* Names and date */}
        <div className="text-center mb-8">
          <p className="font-serif text-xl text-gray-700 mb-2">
            Veronika & Daniel
          </p>
          <p className="font-sans text-sm text-gray-600">
            30. mája 2025
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <a
            href="#details"
            className="font-sans text-gray-600 hover:text-sage transition-colors"
          >
            Detaily
          </a>
          <a
            href="#program"
            className="font-sans text-gray-600 hover:text-sage transition-colors"
          >
            Program
          </a>
          <a
            href="#travel"
            className="font-sans text-gray-600 hover:text-sage transition-colors"
          >
            Doprava
          </a>
          <a
            href="#gifts"
            className="font-sans text-gray-600 hover:text-sage transition-colors"
          >
            Dary
          </a>
          <a
            href="#rsvp"
            className="font-sans text-gray-600 hover:text-sage transition-colors"
          >
            RSVP
          </a>
        </div>

        {/* Floral accent */}
        <div className="flex justify-center mb-6">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="20" r="3" fill="#B4C5A8" opacity="0.5" />
            <circle cx="20" cy="22" r="2" fill="#C7BDD4" opacity="0.4" />
            <circle cx="40" cy="22" r="2" fill="#F0DC82" opacity="0.4" />
            <line x1="30" y1="23" x2="30" y2="32" stroke="#B4C5A8" strokeWidth="1" opacity="0.4"/>
          </svg>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-sans text-xs text-gray-500">
            © 2025 Veronika & Daniel. Vytvorené s láskou.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
