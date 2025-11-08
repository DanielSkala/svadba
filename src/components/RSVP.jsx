import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    attendance: 'yes',
    dietaryRestrictions: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend or form service
    // For now, we'll just show the thank you message
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-20 px-4 bg-cream bg-opacity-30">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-20 h-20 mx-auto mb-6 text-sage" strokeWidth={1.5} />
          <h2 className="font-serif text-4xl text-gray-800 mb-6 font-bold">Ďakujeme!</h2>
          <p className="font-sans text-lg text-gray-700 mb-8">
            Vaša odpoveď bola úspešne odoslaná. Tešíme sa na vás!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 border border-sage text-sage rounded-full font-sans text-sm hover:bg-sage hover:text-white transition-all duration-300"
          >
            Odoslať ďalšiu odpoveď
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-800 mb-6 font-bold">
            Potvrdenie účasti
          </h2>
          <p className="font-sans text-gray-700 mt-4">
            Prosíme, potvrďte svoju účasť do <strong>30. apríla 2025</strong>
          </p>
        </div>

        {/* RSVP Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-sage border-opacity-20">
          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block font-sans text-gray-700 mb-2">
              Meno a priezvisko <span className="text-blush">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sage transition-colors"
              placeholder="Vaše celé meno"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block font-sans text-gray-700 mb-2">
              Email <span className="text-blush">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sage transition-colors"
              placeholder="vas@email.sk"
            />
          </div>

          {/* Attendance */}
          <div className="mb-6">
            <label className="block font-sans text-gray-700 mb-2">
              Zúčastníte sa? <span className="text-blush">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === 'yes'}
                  onChange={handleChange}
                  className="mr-2 accent-sage"
                />
                <span className="font-sans">Áno, prídem</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === 'no'}
                  onChange={handleChange}
                  className="mr-2 accent-sage"
                />
                <span className="font-sans">Bohužiaľ, nemôžem</span>
              </label>
            </div>
          </div>

          {/* Number of guests */}
          {formData.attendance === 'yes' && (
            <>
              <div className="mb-6">
                <label htmlFor="guests" className="block font-sans text-gray-700 mb-2">
                  Počet osôb
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sage transition-colors"
                >
                  <option value="1">1 osoba</option>
                  <option value="2">2 osoby</option>
                  <option value="3">3 osoby</option>
                  <option value="4">4 osoby</option>
                  <option value="5">5+ osôb</option>
                </select>
              </div>

              {/* Dietary restrictions */}
              <div className="mb-6">
                <label htmlFor="dietaryRestrictions" className="block font-sans text-gray-700 mb-2">
                  Diétne obmedzenia alebo alergie
                </label>
                <input
                  type="text"
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sage transition-colors"
                  placeholder="Napr. vegetarián, bezlepková strava..."
                />
              </div>
            </>
          )}

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block font-sans text-gray-700 mb-2">
              Správa pre novomanželov
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sage transition-colors resize-none"
              placeholder="Vaše prianie alebo poznámka..."
            ></textarea>
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 bg-sage text-white rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
            >
              <Send className="w-5 h-5" strokeWidth={2} />
              Odoslať potvrdenie
            </button>
          </div>
        </form>

        {/* Alternative: Google Form embed option */}
        {/* Uncomment and replace URL to use Google Forms instead */}
        {/*
        <div className="bg-white p-4 rounded-lg shadow-sm border border-sage border-opacity-20">
          <iframe
            src="YOUR_GOOGLE_FORM_URL"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Načítavanie…
          </iframe>
        </div>
        */}
      </div>
    </section>
  );
};

export default RSVP;
