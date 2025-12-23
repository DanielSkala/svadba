import React from 'react';

const Program = () => {
  const schedule = [
    {
      time: '15:00',
      title: 'Obrad',
      description: 'Svadobný obrad priamo v areáli Stodole Pohanské.',
      image: '/images/program_images/obrad.png'
    },
    {
      time: '16:15',
      title: 'Novomanželské fotenie',
      description: 'Fotenie v krásnom okolí stodoly',
      image: '/images/program_images/fotenie.png'
    },
    {
      time: '18:00',
      title: 'Večera',
      description: 'Slávnostná štvorchodová večera a prípitky',
      image: '/images/program_images/vecera.png'
    },
    {
      time: '19:00',
      title: 'Program',
      description: 'Pripravujeme pre vás prekvapenie ;)',
      image: '/images/program_images/program.png'
    },
    {
      time: '23:30',
      title: 'Torta a zábava',
      description: 'Tanec, hudba a oslava do ranných hodín',
      image: '/images/program_images/zabava.png'
    },
      {
      time: '04:00',
      title: 'Koniec',
      description: 'Lúčime sa s vami, papik',
      image: '/images/program_images/koniec.png'
    }
  ];

  return (
    <section id="program" className="relative py-16 px-4 bg-cream bg-opacity-30 overflow-hidden">
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

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-3 font-bold">
            Program dňa
          </h2>
          <div className="w-24 h-1 bg-sage mx-auto mb-4"></div>
          <p className="font-serif text-lg text-gray-600">
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
                <div className={`hidden md:grid md:grid-cols-2 gap-8 items-center mb-8 ${
                  index % 2 === 0 ? '' : ''
                }`}>
                  {/* Left side */}
                  <div className={`${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12 order-2'}`}>
                    <div className={`inline-block ${index % 2 === 0 ? '' : 'text-left'}`}>
                      <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-sage flex items-start gap-4">
                        {/* Image on left side of card when index is even */}
                        {index % 2 === 0 && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-32 h-auto object-contain rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-grow self-center">
                          <h3 className="font-serif text-xl text-gray-800 mb-2 font-bold">
                            {item.title}
                          </h3>
                          <p className="font-serif text-gray-600 text-base leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        {/* Image on right side of card when index is odd */}
                        {index % 2 !== 0 && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-32 h-auto object-contain rounded-lg flex-shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Time badge in center */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sage shadow-xl border-4 border-white">
                      <span className="font-serif text-lg text-white font-bold">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Right side (empty or content depending on index) */}
                  <div className={index % 2 === 0 ? 'order-2' : ''}></div>
                </div>

                {/* Mobile: Simple stacked layout */}
                <div className="md:hidden flex gap-3 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sage shadow-lg flex-shrink-0">
                      <span className="font-serif text-base text-white font-bold">
                        {item.time}
                      </span>
                    </div>
                    {index < schedule.length - 1 && (
                      <div className="w-1 flex-grow bg-sage bg-opacity-20 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-grow pb-4">
                    <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-sage flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-auto object-contain rounded-lg flex-shrink-0"
                      />
                      <div className="flex-grow self-center">
                        <h3 className="font-serif text-lg text-gray-800 mb-1 font-bold">
                          {item.title}
                        </h3>
                        <p className="font-serif text-gray-600 text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="font-serif text-base text-gray-600 italic">
            *Časy sú orientačné a môžu sa mierne meniť
          </p>
        </div>
      </div>
    </section>
  );
};

export default Program;
