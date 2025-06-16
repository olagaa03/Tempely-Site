export default function Hooked() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans px-4 py-12">
      <section className="max-w-6xl mx-auto flex flex-row flex-wrap md:flex-nowrap items-center gap-6 text-left">
        {/* Cover Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/screenshots/hooked-cover.png"
            alt="Hooked product preview"
            className="w-full max-w-sm rounded-xl shadow-md"
          />
        </div>

        {/* Description & Buy Button */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">Hooked.</h1>
          <p className="text-lg text-gray-800 mb-6 text-center md:text-left">
            Hooked is your content idea generator — a categorized hook system built to help you create content that grabs attention fast.
          </p>

          <ul className="text-left text-gray-800 mb-6 list-disc list-inside space-y-2">
  <li><strong>50+ proven hooks</strong> for content that stops the scroll</li>
  <li><strong>Organized by category</strong> so you can find what fits your style</li>
  <li><strong>Designed to remix</strong> and reuse your ideas again and again</li>
  <li><strong>Includes step-by-step guide</strong> for generating content ideas</li>
  <li><strong>Bonus video script templates</strong> to structure scroll-stopping short-form videos fast</li>
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

      <footer className="w-full text-center text-gray-500 text-sm mt-20">
        <p>&copy; 2025 Templa. All rights reserved.</p>
      </footer>
    </main>
  );
}
