export default function Hooked() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10 px-4 pt-6">


        {/* Product Image - Mobile optimized */}
        <div className="w-full md:w-1/2 max-h-[50vh] md:max-h-none overflow-hidden rounded-xl shadow-md">
          <img
            src="/screenshots/hooked-cover.png"
            alt="Hooked product preview"
            className="w-full object-cover"
          />
        </div>

        {/* Description + Buy Button */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left mt-4">Hooked.</h1>
          <p className="text-lg md:text-xl text-gray-800 mb-4 text-center md:text-left">
            Hooked is your content idea generator — a categorized hook system built to help you create content that grabs attention fast.
          </p>

          <ul className="text-left text-gray-800 mb-6 list-disc list-inside space-y-2">
            <li><strong>50+ proven hooks</strong> for content that stops the scroll</li>
            <li><strong>Organized by category</strong> so you can find what fits your style</li>
            <li><strong>Designed to remix</strong> and reuse your ideas again and again</li>
            <li><strong>Includes step-by-step guide</strong> for generating content ideas</li>
            <li><strong>Bonus video script templates</strong> for scroll-stopping short-form content</li>
            <li><em>Includes categories like</em> contrarian takes, curiosity builders, relatability, bold claims, and more</li>
          </ul>

          <p className="text-gray-700 mb-6 text-center md:text-left">
            Delivered as a fully functional PDF — swipeable, strategic, and designed to help you create content that performs.
          </p>

          <a
            href="https://your-payment-link.com/hooked"
            className="block w-full md:w-auto text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
          >
            Buy Hooked. for $9.99
          </a>
        </div>
      </section>

      {/* Bundle Offer */}
      <section className="w-full mt-20 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Get the Creator Bundle</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Buy <strong>Hooked</strong>, <strong>Posted</strong>, and <strong>Tracked</strong> together in one powerful bundle — and save while you're at it.
        </p>
        <a
          href="/#bundle"
          className="inline-block bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold shadow hover:opacity-90 transition"
        >
          Buy the Bundle
        </a>
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
