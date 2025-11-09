import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Môžem prísť s partnerom/partnerkou?',
      answer: 'Áno, s radosťou! Prosím, uveďte počet hostí pri potvrdení účasti v RSVP formulári.'
    },
    {
      question: 'Je možné prísť s deťmi?',
      answer: 'Samozrejme! Deti sú vítané. Budeme mať pre ne pripravené zábavné aktivity. Prosím, uveďte počet detí v RSVP formulári.'
    },
    {
      question: 'Aký je dress code?',
      answer: 'Dress code je cocktail/semi-formal. Prosíme, vyvarujte sa bielej farby, ktorá je vyhradená pre nevestu. Pánov prosíme o oblek alebo košeľu s nohavicami, dámy o koktejlové šaty alebo elegantný outfit.'
    },
    {
      question: 'Bude zabezpečená fotograf?',
      answer: 'Áno, budeme mať profesionálneho fotografa. Fotografie vám potom pošleme. Samozrejme, môžete si robiť vlastné fotky a prosíme o zdieľanie!'
    },
    {
      question: 'Do kedy mám potvrdiť účasť?',
      answer: 'Prosíme o potvrdenie účasti do 30. apríla 2025, aby sme mohli dokončiť organizačné detaily.'
    },
    {
      question: 'Kde môžem prenocovať?',
      answer: 'V sekcii "Doprava · Ubytování" nájdete odporúčané hotely a penzióny v okolí. Je potrebné si rezervovať vopred.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 px-4 bg-cream bg-opacity-30 overflow-hidden">
      {/* Background pattern with sprinkled leaves */}
      <img
        src="/images/wedding_leaves/TS-Wedding-Leaves.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-6 font-bold">
            Časté otázky
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-sage border-opacity-20 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-cream hover:bg-opacity-30 transition-colors duration-200"
              >
                <span className="font-serif text-lg md:text-xl text-gray-800 pr-4 font-semibold">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-sage flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="font-sans text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional contact */}
        <div className="mt-12 text-center">
          <p className="font-sans text-gray-700 mb-4">
            Máte ďalšie otázky?
          </p>
          <a
            href="#rsvp"
            className="inline-block px-6 py-2 border border-sage text-sage rounded-full font-sans text-sm hover:bg-sage hover:text-white transition-all duration-300"
          >
            Kontaktujte nás
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
