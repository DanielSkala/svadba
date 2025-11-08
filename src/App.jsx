import React from 'react';
import Hero from './components/Hero';
import DetailsAndVenue from './components/DetailsAndVenue';
import Program from './components/Program';
import Travel from './components/Travel';
import Gifts from './components/Gifts';
import RSVP from './components/RSVP';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <DetailsAndVenue />
      <Program />
      <Travel />
      <Gifts />
      <RSVP />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
