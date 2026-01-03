import React, { useState } from 'react';
import { Gift, Copy, Check } from 'lucide-react';

const Gifts = () => {
  const [copied, setCopied] = useState(false);

  // Placeholder IBAN - replace with your actual IBAN
  const iban = "SK95 1100 0000 0029 3482 0124";

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText(iban.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gifts" className="relative py-20 px-4 bg-cream-center-glow overflow-hidden">
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
          <Gift className="w-16 h-16 mx-auto mb-6 text-sage" strokeWidth={1.5} />
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-6 font-bold">
            Dary
          </h2>
        </div>

        {/* Main message */}
        <div className="text-center mb-12">
          <p className="font-serif text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
            Vaša prítomnosť je pre nás tým najkrajším darom. Ak nás však chcete obdarovať,
            budeme vďační za príspevok na našu spoločnú budúcnosť.
          </p>
        </div>

        {/* Payment options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* IBAN */}
          <div className="text-center">
            <h3 className="font-serif text-2xl text-gray-800 mb-4 font-bold">Bankový prevod</h3>
            <div className="bg-white p-4 rounded-xl shadow-md border border-sage border-opacity-20 mb-4">
              <p className="font-mono text-sm text-gray-700 break-all">{iban}</p>
            </div>
            <button
              onClick={handleCopyIBAN}
              className="inline-flex items-center gap-2 px-6 py-2 bg-sage text-white rounded-full font-serif text-base hover:bg-opacity-90 transition-all duration-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" strokeWidth={2} />
                  Skopírované!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" strokeWidth={2} />
                  Kopírovať IBAN
                </>
              )}
            </button>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <h3 className="font-serif text-2xl text-gray-800 mb-4 font-bold">QR platba</h3>
            <div className="bg-white p-6 rounded-xl shadow-md border border-sage border-opacity-20 mb-4 flex items-center justify-center">
              <img
                src="/images/qr_pay.jpeg"
                alt="QR kód pre platbu"
                className="w-40 h-40 object-contain rounded"
              />
            </div>
            <p className="font-serif text-base text-gray-600">
              Naskenujte QR kód vašou bankovou aplikáciou
            </p>
          </div>
        </div>

        {/* Thank you message */}
        <div className="text-center mt-12">
          <p className="font-serif text-lg text-gray-600 italic">
            Ďakujeme za vašu štedrosť a podporu! ♥
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gifts;
