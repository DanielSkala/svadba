import React, { Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import AnimatedSection from './components/AnimatedSection';
import InvitationOpen from './components/InvitationOpen';
import 'leaflet/dist/leaflet.css';

// Lazy load below-fold components to prioritize video loading
const DetailsAndVenue = lazy(() => import('./components/DetailsAndVenue'));
const Program = lazy(() => import('./components/Program'));
const Accomodation = lazy(() => import('./components/Accomodation.jsx'));
const Gifts = lazy(() => import('./components/Gifts'));
const RSVP = lazy(() => import('./components/RSVP'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));


function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      {/* Elegant transition from Hero to content */}
      <SectionDivider color="#FFFFFF" />

      {/* Wedding invitation opening animation */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-white via-[#fdfcfa] to-white">
        {/* Subtle centered floral watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0.06 }}
        >
          <img
            src="/images/wedding_leaves/leaves_circular.png"
            alt=""
            className="w-[80%] max-w-3xl"
            aria-hidden="true"
          />
        </div>

        {/* Corner florals - very subtle */}
        <img
          src="/images/wedding_leaves/three_roses_t.png"
          alt=""
          className="absolute top-20 -left-10 w-48 md:w-64 opacity-[0.08] pointer-events-none rotate-12"
          aria-hidden="true"
        />
        <img
          src="/images/wedding_leaves/three_roses_t.png"
          alt=""
          className="absolute top-20 -right-10 w-48 md:w-64 opacity-[0.08] pointer-events-none -rotate-12 scale-x-[-1]"
          aria-hidden="true"
        />

        <InvitationOpen
          autoOpen={true}
          openPercent={0.8}
          triggerOnScroll={true}
        />
      </section>

      <Suspense fallback={<div className="min-h-screen" />}>
        <AnimatedSection>
          <DetailsAndVenue />
        </AnimatedSection>
        <AnimatedSection>
          <Program />
        </AnimatedSection>
        <AnimatedSection>
          <Accomodation />
        </AnimatedSection>
        <AnimatedSection>
          <Gifts />
        </AnimatedSection>
        <AnimatedSection>
          <RSVP />
        </AnimatedSection>
        <AnimatedSection>
          <FAQ />
        </AnimatedSection>
        {/* Elegant transition to Footer */}
        <SectionDivider flip color="#F5F1E8" />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
