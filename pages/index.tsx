
import NewsletterSignup from '@/components/NewsletterSignup';


export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-center font-sans px-6 py-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-left">
        <div className="md:w-1/2">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
  The Creator Growth System — Powered by AI
</h1>
<p className="text-lg md:text-xl text-gray-800 mb-6">
  Plan smarter. Post consistently. Track what actually grows. Tempely is your content command center, built for creators who want to go viral and stay there.
</p>

<a
  href="/ai-tool" // <- update this once your AI page exists
  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
>
  Try the Free AI Tool
</a>

        </div>
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4">
  <a href="/hooked">
    <img
      src="/screenshots/hooked-cover.png"
      alt="Hooked product preview"
      className="rounded-xl w-full shadow-md hover:opacity-90 transition transition-transform duration-300 hover:scale-105"

    />
  </a>
  <a href="/posted">
    <img
      src="/screenshots/posted-cover.png"
      alt="Posted product preview"
      className="rounded-xl w-full shadow-md hover:opacity-90 transition transition-transform duration-300 hover:scale-105"

    />
  </a>
  <a href="/tracked">
    <img
      src="/screenshots/tracked-cover.png"
      alt="Tracked product preview"
      className="rounded-xl w-full shadow-md hover:opacity-90 transition transition-transform duration-300 hover:scale-105"

    />
  </a>
</div>

      </section>

      {/* Bundle CTA */}
      <section className="w-full mt-24 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Get the Creator Bundle</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Buy <strong>Hooked</strong>, <strong>Posted</strong>, and <strong>Tracked</strong> together in one powerful bundle — and save while you're at it.
        </p>
        <a
  href="/bundle"
  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
>
  View the Bundle
</a>

      </section>

      {/* Testimonials */}
      <section className="w-full mt-24 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">What creators are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-2xl p-6 shadow-md">
            <p className="text-gray-700 italic text-sm">
              “Posted is the first content planner I actually stick to – clean and super practical.”
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

      <NewsletterSignup />
      
  
    </main>
  );
}
