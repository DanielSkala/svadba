import React from 'react';

const RSVP = () => {
  return (
    <section id="rsvp" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-6 font-bold">
            Potvrdenie účasti
          </h2>
          <p className="font-serif text-gray-700 mt-4">
            Prosíme, potvrďte svoju účasť do <strong>30. apríla 2025</strong>
          </p>
        </div>

        {/* Google Form Embed */}
        <div className="bg-white rounded-lg shadow-lg border border-sage border-opacity-20 overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdFM761AEdqoLoSVd7aJb4QBvfkg9HXxu91-Rr4eJjBdaL6vA/viewform?usp=dialog"
            width="100%"
            height="1200"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="RSVP Form"
          >
            Načítavanie formulára…
          </iframe>
        </div>

        {/* Note */}
        <div className="mt-6 text-center">
          <p className="font-serif text-sm text-gray-500 italic">
            Ak máte problémy s formulárom, kontaktujte nás prosím priamo
          </p>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
