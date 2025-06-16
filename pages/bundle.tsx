export default function Bundle() {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-center font-sans px-6 py-12">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-left">
          <div className="md:w-1/2 relative">
            <img
              src="/screenshots/bundle-cover.png"
              alt="The Creator Bundle Cover"
              className="rounded-xl shadow-md w-full max-w-md mx-auto mb-6 transform transition-transform duration-300 hover:scale-105"
            />
            {/* Save Badge */}
            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Save 44%
            </div>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Creator Bundle</h1>
            <p className="text-lg md:text-xl text-gray-800 mb-6">
              Get all 3 systems — Hooked, Posted, and Tracked — at a discounted price. Everything you need to plan smarter, post better, and grow faster.
            </p>
            <ul className="text-left text-gray-800 mb-6 list-disc list-inside space-y-2">
              <li><strong>Hooked.</strong> — Viral hook system with 150+ content ideas and scripts</li>
              <li><strong>Posted.</strong> — All-in-one content HQ to plan and publish stress-free</li>
              <li><strong>Tracked.</strong> — Growth dashboard to analyze, track, and improve</li>
              <li>Built to work together and save you time every step of the way</li>
            </ul>
            <p className="text-gray-700 mb-6">
  <span className="line-through text-red-500 mr-2">$44.97</span>
  <span className="text-blue-600 font-bold text-lg">$24.99</span> — one-time payment for the full bundle
</p>
<a
  href="https://your-payment-link.com/bundle"
  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
>
  Buy the Bundle for $24.99
</a>

          </div>
        </section>
  
        {/* Thumbnails */}
        <section className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What’s Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-start">
            <a href="/hooked" className="transform transition-transform duration-300 hover:scale-105">
              <img
                src="/screenshots/hooked-cover.png"
                alt="Hooked"
                className="rounded-lg shadow-md w-full"
              />
              <p className="mt-2 text-center font-medium text-gray-700">Hooked.</p>
            </a>
            <a href="/posted" className="transform transition-transform duration-300 hover:scale-105">
              <img
                src="/screenshots/posted-cover.png"
                alt="Posted"
                className="rounded-lg shadow-md w-full"
              />
              <p className="mt-2 text-center font-medium text-gray-700">Posted.</p>
            </a>
            <a href="/tracked" className="transform transition-transform duration-300 hover:scale-105">
              <img
                src="/screenshots/tracked-cover.png"
                alt="Tracked"
                className="rounded-lg shadow-md w-full"
              />
              <p className="mt-2 text-center font-medium text-gray-700">Tracked.</p>
            </a>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="w-full text-center text-gray-500 text-sm mt-20">
          <p>&copy; 2025 Templa. All rights reserved. | <a href="/about" className="text-blue-600 hover:underline">About</a> | <a href="/" className="text-blue-600 hover:underline">Back to Home</a></p>
        </footer>
      </main>
    );
  }
  