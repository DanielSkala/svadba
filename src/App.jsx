import React, { Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import AnimatedSection from './components/AnimatedSection';
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
