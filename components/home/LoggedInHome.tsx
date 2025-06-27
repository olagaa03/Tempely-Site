'use client';
import Link from 'next/link';

export default function LoggedInHome() {
  return (
    <main className="min-h-screen font-sans px-0 py-0 text-gray-100 bg-transparent">
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto pt-32 pb-20 px-8 flex flex-col items-start">
        <div className="mb-8">
          <div className="h-2 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>
          <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg">Welcome back, Creator</h1>
          <p className="text-xl text-gray-400 mb-8 max-w-xl">
            Your growth system is ready. Start generating, planning, and tracking what works — all powered by AI.
          </p>
          <a href="/ai-tool" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-500 shadow-lg transition-transform duration-200 hover:scale-105 text-lg">
            🚀 Start Creating
          </a>
        </div>
      </section>

      {/* Features - staggered grid */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-8 mb-24">
        {[
          {
            title: 'Free AI Tool',
            icon: '🤖',
            description: 'Generate hooks and posts instantly. 5/day on Free plan.',
            link: '/ai-tool',
            accent: 'from-blue-500 to-blue-400',
            checkoutUrl: 'https://tempely.lemonsqueezy.com/buy/5a13a2b9-b4e6-4bcc-8fcf-5229dab2dce8',
          },
          {
            title: 'AI Pro',
            icon: '🚀',
            description: 'Unlock GPT-4, unlimited generations, and advanced tools.',
            link: '/ai-pro',
            accent: 'from-purple-500 to-purple-400',
            checkoutUrl: 'https://tempely.lemonsqueezy.com/buy/92b33056-7bc1-43c8-a3c6-06c6df097a30',
          },
          {
            title: 'Products',
            icon: '📚',
            description: 'Browse Hooked, Posted, Tracked, and more.',
            link: '/products',
            accent: 'from-yellow-400 to-yellow-300',
            checkoutUrl: 'https://tempely.lemonsqueezy.com/buy/bc3fc2b8-6d58-46f9-85ae-aa664d9ea48a',
          },
        ].map((item, idx) => (
          <a
            href={item.link}
            key={item.title}
            className={`group flex flex-col items-start p-8 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500 ${idx === 1 ? 'md:mt-12' : ''}`}
          >
            <span className={`text-4xl mb-4 bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}>{item.icon}</span>
            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-300 text-base font-medium">{item.description}</p>
            <a
              href={item.checkoutUrl}
              className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-500 shadow transition-transform duration-200 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          </a>
        ))}
      </section>

      {/* Bundle Callout */}
      <section className="w-full py-16 px-8 flex justify-center">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <span>📦</span> The Creator Bundle
            </h2>
            <p className="text-gray-300 mb-4">
              Get all three core systems — <strong>Hooked</strong>, <strong>Posted</strong>, and <strong>Tracked</strong> — in one powerful bundle.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-end">
            <a
              href="/bundle"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-500 shadow-lg transition-transform duration-200 hover:scale-105"
            >
              View the Bundle
            </a>
            <a
              href="https://tempely.lemonsqueezy.com/buy/ac691241-ed9c-4150-9818-fba70ac8402c"
              className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 shadow-lg transition-transform duration-200 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Bundle
            </a>
          </div>
        </div>
      </section>

      {/* Free Plan Notice */}
      <div className="text-right text-base text-gray-500 px-8 mt-8">
        Using the Free plan? You can generate 5 times per day. Upgrade any time.
      </div>
    </main>
  );
}
