import { useUser, SignInButton } from '@clerk/nextjs';

export default function Posted() {
  const { isSignedIn } = useUser();
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans text-white pt-32 px-4">
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10 px-4 pt-6">

        {/* Product Image - Mobile optimized */}
        <div className="w-full md:w-1/2 max-h-[50vh] md:max-h-none overflow-hidden rounded-xl shadow-md">
          <img
            src="/screenshots/posted-cover.png"
            alt="Posted product preview"
            className="w-full object-cover"
          />
        </div>

        {/* Description + Buy Button */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left mt-4">Posted.</h1>
          <p className="text-lg md:text-xl text-gray-800 mb-4 text-center md:text-left">
            Posted is your all-in-one content HQ — a Notion dashboard designed to help you <strong>plan, organize, script, and repurpose</strong> your ideas with clarity.
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>30-Day Content Planner</strong> to map out your strategy in advance</li>
            <li><strong>Hook Bank</strong> to connect with high-performing hooks from <em>Hooked.</em></li>
            <li><strong>Recycling Tracker</strong> to resurface and republish your best posts</li>
            <li><strong>Smart columns</strong> for status, platforms, performance, and more</li>
            <li><strong>Built to reduce overwhelm</strong> — and help you post with purpose</li>
          </ul>

          <p className="text-gray-700 mb-6 text-center md:text-left">
            Use it to stay consistent, think clearly, and publish without stress.
          </p>

          {isSignedIn ? (
            <a
              href="https://tempely.lemonsqueezy.com/buy/92b33056-7bc1-43c8-a3c6-06c6df097a30"
              className="block w-full md:w-auto text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition"
            >
              Buy Posted. for $14.99
            </a>
          ) : (
            <SignInButton mode="modal" fallbackRedirectUrl="https://tempely.lemonsqueezy.com/buy/92b33056-7bc1-43c8-a3c6-06c6df097a30">
              <button className="block w-full md:w-auto text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 transition">
                Buy Posted. for $14.99
              </button>
            </SignInButton>
          )}
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
        <p>&copy; 2025 Tempely. All rights reserved.</p>
      </footer>
    </main>
  );
}
