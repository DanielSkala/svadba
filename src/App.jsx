import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import DetailsAndVenue from './components/DetailsAndVenue';
import Program from './components/Program';
import Accomodation from './components/Accomodation.jsx';
import Gifts from './components/Gifts';
import RSVP from './components/RSVP';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      {/* Elegant transition from Hero to content */}
      <SectionDivider color="#FFFFFF" />
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
    </div>
  );
}

export default App;
