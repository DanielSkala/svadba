import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Môžem prísť len na obrad?',
      answer: 'Chápeme, že by ste radi prišli aspoň na obrad, ale obrad aj hostinu máme v úzkom kruhu a len pre pozvaných hostí. Ide najmä o kapacitu a organizáciu. Budeme veľmi radi, keď sa stretneme inokedy na posedení alebo večeri!'
    },
    {
      question: 'Je obrad vonku?',
      answer: 'Áno, obrad sa bude konať vonku na terase stodoly. V prípade nepriaznivého počasia máme pripravený záložný plán v interiéri.'
    },
    {
      question: 'Bude zabezpečený fotograf?',
      answer: (
        <>
          Áno, budeme mať profesionálneho fotografa, ktorý vám samozrejme fotky po svadbe pošle. Link na prípadné zdielanie vašich fotiek nájdete{' '}
          <a
            href="https://drive.google.com/drive/folders/1s6XRC3vFKIBc37ZThUC3O6Qj7Aqm7eYz?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage underline hover:text-sage/80 transition-colors"
          >
            tu
          </a>
          .
        </>
      )
    },
    {
      question: 'Do kedy mám potvrdiť účasť?',
      answer: 'Prosíme o potvrdenie účasti najneskôr do 15. Apríla 2025, aby sme mohli dokončiť organizačné detaily.'
    },
    {
      question: 'Kde môžem prenocovať?',
      answer: 'V sekcii "Doprava · Ubytovanie" nájdete odporúčané hotely a penzióny v okolí. Je potrebné si rezervovať vopred. Odporúčame aj Airbnb alebo Booking.'
    },
          {
      question: 'Môžem vám darovať kvety?',
      answer: 'Najviac nás poteší finančný dar na našu spoločnú budúcnosť. Pokiaľ nás chcete predsalen obdarovať kvetmi, viac nám urobia radosť rastlinky v kvetináči. Ale radšej nie ;)'
    },
    {
      question: 'Môžeme vám darovať alkohol?',
      answer: 'Keďže alkohol veľmi nepijeme, viac nás poteší finančný dar alebo niečo zo zoznamu.'
    },
    {
      question: 'Dá sa aj stanovať priamo na mieste?',
      answer: 'Áno, dá sa stanovať aj na terase stodoly alebo priamo na lúke pod hviezdami. Prosíme, uveďte to v RSVP formulári, aby sme mohli zabezpečiť dostatok priestoru (počet ľudí, stanov a pod.)'
    },
    {
      question: 'Ako sa v noci dostanem späť na ubytovanie?',
      answer: 'Po 22:00 máme zabezpečeného šoféra, ktorý vás odvezie späť na vaše ubytovanie v okolí.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 px-4 bg-cream-glow overflow-hidden">
      {/* Elegant rose accent - unique to this section */}
      <img
        src="/images/wedding_leaves/three_roses_t.png"
        alt=""
        className="absolute bottom-16 -right-16 w-80 md:w-96 lg:w-[28rem] opacity-20 pointer-events-none rotate-12"
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
                  <p className="font-serif text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional contact */}
        <div className="mt-12 text-center">
          <p className="font-serif text-lg text-gray-700 mb-4">
            Máte ďalšie otázky?
          </p>
          <a
            href="mailto:danko.skala@gmail.com"
            className="inline-block px-6 py-2 border border-sage text-sage rounded-full font-serif text-base hover:bg-sage hover:text-white transition-all duration-300"
          >
            Napíšte nám
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
