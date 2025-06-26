'use client';
import Link from 'next/link';

export default function LoggedInHome() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 font-sans px-6 py-16">
      {/* Welcome */}
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome to Tempely 👋</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Your creator growth system is ready. Start generating, planning, and tracking what works — all powered by AI.
        </p>
      </section>

      {/* Quick Actions */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        <Link href="/ai-tool" className="bg-white border rounded-2xl shadow-sm hover:shadow-md p-6 transition group">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">🤖 Use Free AI Tool</h3>
          <p className="text-gray-600 text-sm">Generate hooks and posts instantly. Limited to 5/day on Free plan.</p>
        </Link>

        <Link href="/ai-pro" className="bg-white border rounded-2xl shadow-sm hover:shadow-md p-6 transition group">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition">🚀 Upgrade to AI Pro</h3>
          <p className="text-gray-600 text-sm">Unlock GPT-4 access, unlimited generations, and advanced content tools.</p>
        </Link>

        <Link href="/products" className="bg-white border rounded-2xl shadow-sm hover:shadow-md p-6 transition group">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition">🛍️ Explore Products</h3>
          <p className="text-gray-600 text-sm">Browse our full product suite: Hooked, Posted, Tracked — and more.</p>
        </Link>
      </section>

      {/* Creator Bundle Highlight */}
      <section className="max-w-5xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">📦 The Creator Bundle</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Get all three core systems — <strong>Hooked</strong>, <strong>Posted</strong>, and <strong>Tracked</strong> — in one powerful bundle.
        </p>
        <Link
          href="/bundle"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          View the Bundle
        </Link>
      </section>

      {/* Subtle Reminder */}
      <div className="text-center text-sm text-gray-500">
        Using the Free plan? You can generate 5 times per day. Upgrade any time.
      </div>
    </main>
  );
}