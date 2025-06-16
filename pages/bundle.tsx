export default function Bundle() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <section className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-left px-4 pt-6">

        {/* Product Image - Mobile optimized */}
        <div className="w-full max-h-[50vh] overflow-hidden rounded-xl shadow-md">
          <img
            src="/screenshots/bundle-cover.png"
            alt="Creator Bundle preview"
            className="w-full object-cover"
          />
        </div>

        {/* Description + Buy Button */}
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left mt-4">Creator Bundle.</h1>
          <p className="text-lg md:text-xl text-gray-800 mb-4 text-center md:text-left">
            Get all three premium templates — <strong>Hooked</strong>, <strong>Posted</strong>, and <strong>Tracked</strong> — in one bundle and save big.
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Hooked</strong>: A categorized hook bank for viral content ideas</li>
            <li><strong>Posted</strong>: A Notion planner to script, schedule, and stay consistent</li>
            <li><strong>Tracked</strong>: A dashboard to analyze performance and improve results</li>
            <li><strong>Bonus visuals</strong> and strategy tips included</li>
            <li><strong>Save 45%</strong> vs buying separately</li>
          </ul>

          <p className="text-gray-700 mb-6 text-center md:text-left">
            Whether you're starting from scratch or scaling your creative output, this bundle gives you everything you need to show up like a pro.
          </p>

          <a
            href="https://your-payment-link.com/bundle"
            className="block w-full md:w-auto text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
          >
            Buy the Bundle for $24.99 (Save 45%)
          </a>
        </div>
      </section>

      {/* Bundle Preview Thumbnails */}
      <section className="w-full mt-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Included Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <img src="/screenshots/hooked-cover.png" alt="Hooked preview" className="rounded-xl shadow-md hover:scale-105 transition-transform" />
          <img src="/screenshots/posted-cover.png" alt="Posted preview" className="rounded-xl shadow-md hover:scale-105 transition-transform" />
          <img src="/screenshots/tracked-cover.png" alt="Tracked preview" className="rounded-xl shadow-md hover:scale-105 transition-transform" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full mt-24 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What creators are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-2xl p-6 shadow-md">
            <p className="text-gray-700 italic text-sm">
              “Posted is the first content planner I actually stick to — clean and super practical.”
            </p>
            <p className="mt-4 font-medium text-gray-900 text-sm">— Jamie, Content Coach</p>
          </div>
          <div className="bg-white border rounded-2xl p-6 shadow-md">
            <p className="text-gray-700 italic text-sm">
              “Hooked helped me finally go viral. The categories and examples are gold.”
            </p>
            <p className="mt-4 font-medium text-gray-900 text-sm">— Alex, Copywriter</p>
          </div>
          <div className="bg-white border rounded-2xl p-6 shadow-md">
            <p className="text-gray-700 italic text-sm">
              “Tracked showed me what actually works. My content is finally data-driven.”
            </p>
            <p className="mt-4 font-medium text-gray-900 text-sm">— Sam, Creator</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-sm mt-20">
        <p>&copy; 2025 Templa. All rights reserved.</p>
      </footer>
    </main>
  );
}
