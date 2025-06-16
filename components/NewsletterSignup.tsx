// components/NewsletterSignup.tsx
import React from 'react';

export default function NewsletterSignup() {
  return (
    <section className="bg-white border-t border-b py-12 mt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          Get free tips & templates to grow faster
        </h2>
        <p className="text-gray-600 mb-6">
          Join the newsletter for creator insights, template drops, and exclusive deals.
        </p>
        <form
          action="https://buttondown.com/api/emails/embed-subscribe/templa"
          method="post"
          target="popupwindow"
          className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto"
        >
          <input
  type="email"
  name="email"
  placeholder="Enter your email"
  className="w-full px-4 py-2 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}


