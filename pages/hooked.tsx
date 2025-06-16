export default function Hooked() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-center font-sans px-6 py-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-left">
        <div className="md:w-1/2">
          <img
            src="/screenshots/hooked-cover.png"
            alt="Hooked product preview"
            className="rounded-xl w-full shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Hooked.</h1>
          <p className="text-lg md:text-xl text-gray-800 mb-6">
            Hooked. is your content idea generator — a categorized hook system built to help you create content that grabs attention fast.
          </p>
          <ul className="text-left text-gray-800 mb-6 list-disc list-inside space-y-2">
            <li><strong>50+ proven hooks</strong> for content that stops the scroll</li>
            <li><strong>Organized by category</strong> so you can find what fits your style</li>
            <li><strong>Designed to remix</strong> and reuse your ideas again and again</li>
            <li><strong>Includes step-by-step guide</strong> for how to use the hook system to generate content ideas</li>
            <li><strong>Bonus video script templates</strong> to structure scroll-stopping short-form videos fast</li>
            <li>Includes categories like <em>contrarian takes, curiosity builders, relatability, bold claims, and more</em></li>
          </ul>
          <p className="text-gray-700 mb-6">
          Delivered as a fully functional PDF — swipeable, strategic, and designed to help you create content that performs.
          </p>
          <a
            href="https://your-payment-link.com/hooked"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
          >
            Buy Hooked. for $9.99
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-sm mt-20">
        <p>&copy; 2025 Templa. All rights reserved.</p>
      </footer>
    </main>
  );
}
