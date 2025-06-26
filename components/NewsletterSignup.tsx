// components/NewsletterSignup.tsx
import React from 'react';

export default function NewsletterSignup() {
  return (
    <section className="py-16 flex justify-center items-center">
      <div className="max-w-2xl w-full mx-auto px-6 py-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Get free tips & templates to grow faster</h2>
        <p className="text-gray-300 mb-8 text-lg">Join the newsletter for creator insights, template drops, and exclusive deals.</p>
        <form
          action="https://buttondown.com/api/emails/embed-subscribe/templa"
          method="post"
          target="popupwindow"
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 bg-black/40 border border-white/20 text-white placeholder-gray-400 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 shadow-lg transition-transform duration-200 hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}


