import React, { useState } from 'react';
import { Gift, Copy, Check } from 'lucide-react';

const Gifts = () => {
  const [copied, setCopied] = useState(false);

  // Placeholder IBAN - replace with your actual IBAN
  const iban = "SK00 0000 0000 0000 0000 0000";

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText(iban.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gifts" className="py-20 px-4 bg-cream bg-opacity-30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Gift className="w-16 h-16 mx-auto mb-6 text-sage" strokeWidth={1.5} />
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-6 font-bold">
            Dary
          </h2>
        </div>

        {/* Main message */}
        <div className="text-center mb-12">
          <p className="font-sans text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
            Vaša prítomnosť je pre nás tým najkrajším darom. Ak nás však chcete obdarovať,
            budeme vďační za príspevok na našu spoločnú budúcnosť.
          </p>
        </div>

        {/* Payment options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* IBAN */}
          <div className="bg-cream bg-opacity-50 p-8 rounded-lg text-center">
            <h3 className="font-serif text-2xl text-gray-800 mb-4 font-bold">Bankový prevod</h3>
            <div className="bg-white p-4 rounded border border-sage border-opacity-20 mb-4">
              <p className="font-mono text-sm text-gray-700 break-all">{iban}</p>
            </div>
            <button
              onClick={handleCopyIBAN}
              className="inline-flex items-center gap-2 px-6 py-2 bg-sage text-white rounded-full font-sans text-sm hover:bg-opacity-90 transition-all duration-300"
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
          <div className="bg-cream bg-opacity-50 p-8 rounded-lg text-center">
            <h3 className="font-serif text-2xl text-gray-800 mb-4 font-bold">QR platba</h3>
            <div className="bg-white p-6 rounded border border-sage border-opacity-20 mb-4 flex items-center justify-center">
              {/* Placeholder for QR code - replace with actual QR code image */}
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded">
                <span className="text-gray-500 text-xs text-center px-4">
                  QR kód<br/>
                  (nahraďte vlastným)
                </span>
              </div>
            </div>
            <p className="font-sans text-sm text-gray-600">
              Naskenujte QR kód vaším bankovým aplikáciou
            </p>
          </div>
        </div>

        {/* Thank you message */}
        <div className="text-center mt-12">
          <p className="font-sans text-gray-600 italic">
            Ďakujeme za vašu štedrosť a podporu! ♥
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gifts;
