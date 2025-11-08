import React from 'react';

const Program = () => {
  const schedule = [
    {
      time: '13:00',
      title: 'Obrad',
      description: 'Svadobný obrad v Stodole Pohanské'
    },
    {
      time: '15:00',
      title: 'Novomanželské fotenie',
      description: 'Fotenie v krásnom okolí stodoly'
    },
    {
      time: '16:00',
      title: 'Večere',
      description: 'Slávnostná večera a prípitky'
    },
    {
      time: '18:00',
      title: 'Krájenie dortu',
      description: 'Prvý tanec a krájenie svadobnej torty'
    },
    {
      time: '19:00',
      title: 'Zábava',
      description: 'Tanec, hudba a oslava do ranných hodin'
    }
  ];

  return (
    <section id="program" className="py-24 px-4 bg-cream bg-opacity-30">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-gray-800 mb-4 font-bold">
            Program dňa
          </h2>
          <div className="w-24 h-1 bg-sage mx-auto mb-6"></div>
          <p className="font-sans text-lg text-gray-600">
            Načasovanie najdôležitejších momentov nášho dňa
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - elegant spine */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-sage bg-opacity-20 rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-0">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="relative"
              >
                {/* Desktop: Alternating layout */}
                <div className={`hidden md:grid md:grid-cols-2 gap-8 items-center mb-12 ${
                  index % 2 === 0 ? '' : ''
                }`}>
                  {/* Left side */}
                  <div className={`${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12 order-2'}`}>
                    <div className={`inline-block ${index % 2 === 0 ? '' : 'text-left'}`}>
                      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-sage">
                        <h3 className="font-serif text-2xl text-gray-800 mb-3 font-bold">
                          {item.title}
                        </h3>
                        <p className="font-sans text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Time badge in center */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-sage shadow-xl border-4 border-white">
                      <span className="font-serif text-xl text-white font-bold">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Right side (empty or content depending on index) */}
                  <div className={index % 2 === 0 ? 'order-2' : ''}></div>
                </div>

                {/* Mobile: Simple stacked layout */}
                <div className="md:hidden flex gap-4 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sage shadow-lg flex-shrink-0">
                      <span className="font-serif text-lg text-white font-bold">
                        {item.time}
                      </span>
                    </div>
                    {index < schedule.length - 1 && (
                      <div className="w-1 flex-grow bg-sage bg-opacity-20 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-grow pb-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sage">
                      <h3 className="font-serif text-xl text-gray-800 mb-2 font-bold">
                        {item.title}
                      </h3>
                      <p className="font-sans text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-16 text-center">
          <p className="font-sans text-sm text-gray-600 italic">
            *Časy sú orientačné a môžu sa mierne meniť
          </p>
        </div>
      </div>
    </section>
  );
};

export default Program;
