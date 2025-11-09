import React from 'react';
import Hero from './components/Hero';
import DetailsAndVenue from './components/DetailsAndVenue';
import Program from './components/Program';
import Accomodation from './components/Accomodation.jsx';
import Gifts from './components/Gifts';
import RSVP from './components/RSVP';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <DetailsAndVenue />
      <Program />
      <Accomodation />
      <Gifts />
      <RSVP />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
