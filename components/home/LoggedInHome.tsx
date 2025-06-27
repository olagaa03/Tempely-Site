'use client';
import Link from 'next/link';

export default function LoggedInHome() {
  return (
    <main className="min-h-screen font-sans px-0 py-0 text-gray-100 bg-transparent">
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto pt-32 pb-20 px-8 flex flex-col items-start">
        <div className="mb-8">
          <div className="h-2 w-16 bg-gradient-to-r from-[var(--tempely-purple)] to-blue-500 rounded-full mb-4"></div>
          <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
            Ready to Grow? <span className="text-[var(--tempely-purple)]">Unleash Your Creator Power.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-xl">
            Tempely is your launchpad for viral growth. Plan, create, and track with Notion templates and AI tools built for creators who want to win.
          </p>
          <a href="/ai-tool" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-[var(--tempely-purple)] hover:text-white shadow-lg transition-transform duration-200 hover:scale-105 text-lg border-2 border-transparent hover:border-[var(--tempely-purple)]">
            <svg className="w-5 h-5 mr-2 inline-block align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Start Creating
          </a>
        </div>
      </section>

      {/* Features - staggered grid */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-8 mb-24">
        {[
          {
            title: 'Quick Hook Maker',
            icon: '⚡',
            description: 'Create viral hooks in seconds. Spark ideas, break the scroll, and get noticed—fast.',
            link: '/ai-tool',
            accent: 'from-[var(--tempely-purple)] to-blue-400',
          },
          {
            title: 'Content Engine',
            icon: '🚀',
            description: 'Unlock unlimited content power with GPT-4. Go pro, go viral, and never run out of ideas.',
            link: '/ai-pro',
            accent: 'from-[var(--tempely-purple)] to-purple-400',
            checkoutUrl: 'https://tempely.lemonsqueezy.com/buy/92b33056-7bc1-43c8-a3c6-06c6df097a30',
          },
          {
            title: 'Products',
            icon: (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="products-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#fde047" />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="7" height="7" rx="2" fill="url(#products-gradient)" />
                <rect x="14" y="3" width="7" height="7" rx="2" fill="url(#products-gradient)" />
                <rect x="3" y="14" width="7" height="7" rx="2" fill="url(#products-gradient)" />
                <rect x="14" y="14" width="7" height="7" rx="2" fill="url(#products-gradient)" />
              </svg>
            ),
            description: 'Browse Hooked, Posted, Tracked, and more. Templates and tools for every creator.',
            link: '/products',
            accent: 'from-yellow-400 to-yellow-300',
          },
        ].map((item, idx) => (
          <div
            key={item.title}
            className={`group flex flex-col items-start p-8 rounded-md bg-white/5 backdrop-blur-md shadow-lg border border-transparent hover:border-[var(--tempely-purple)] transition-transform duration-200 hover:-translate-y-2 hover:shadow-[0_0_24px_0_rgba(124,58,237,0.25)] ${idx === 1 ? 'md:mt-12' : ''}`}
          >
            <span className={`text-4xl mb-4 bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}>{item.icon}</span>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--tempely-purple)] transition">{item.title}</h3>
            <p className="text-gray-300 text-base font-medium">{item.description}</p>
            {item.title === 'Content Engine' ? (
              <a
                href={item.checkoutUrl}
                className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-[var(--tempely-purple)] hover:text-white shadow transition-transform duration-200 hover:scale-105 border-2 border-transparent hover:border-[var(--tempely-purple)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
            ) : item.title === 'Quick Hook Maker' ? (
              <a
                href={item.link}
                className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-[var(--tempely-purple)] hover:text-white shadow transition-transform duration-200 hover:scale-105 border-2 border-transparent hover:border-[var(--tempely-purple)]"
              >
                Go to Tool
              </a>
            ) : (
              <a
                href={item.link}
                className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-[var(--tempely-purple)] hover:text-white shadow transition-transform duration-200 hover:scale-105 border-2 border-transparent hover:border-[var(--tempely-purple)]"
              >
                Browse Products
              </a>
            )}
          </div>
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
              href="/products/bundle"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-500 shadow-lg transition-transform duration-200 hover:scale-105"
            >
              View the Bundle
            </a>
          </div>
        </div>
      </section>

      {/* Free Plan Notice */}
      <div className="text-right text-base text-gray-500 px-8 mt-8">
        Using the Free plan? You can generate 5 times per day. Upgrade any time.
      </div>

      {/* Testimonial Section Placeholder */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-white">What creators are saying</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 border border-[var(--tempely-purple)] rounded-md p-8 shadow-xl backdrop-blur-md flex flex-col items-center">
            <span className="w-12 h-12 rounded-full bg-[var(--tempely-purple)] flex items-center justify-center text-white text-2xl mb-4">J</span>
            <p className="text-gray-200 italic text-lg">“Tempely made planning and posting so much easier. I finally feel in control of my content.”</p>
            <p className="mt-4 font-medium text-gray-400 text-base">Jamie, Content Coach</p>
          </div>
          <div className="bg-white/10 border border-[var(--tempely-purple)] rounded-md p-8 shadow-xl backdrop-blur-md flex flex-col items-center">
            <span className="w-12 h-12 rounded-full bg-[var(--tempely-purple)] flex items-center justify-center text-white text-2xl mb-4">A</span>
            <p className="text-gray-200 italic text-lg">“The Quick Hook Maker is my secret weapon for going viral.”</p>
            <p className="mt-4 font-medium text-gray-400 text-base">Alex, Copywriter</p>
          </div>
          <div className="bg-white/10 border border-[var(--tempely-purple)] rounded-md p-8 shadow-xl backdrop-blur-md flex flex-col items-center">
            <span className="w-12 h-12 rounded-full bg-[var(--tempely-purple)] flex items-center justify-center text-white text-2xl mb-4">S</span>
            <p className="text-gray-200 italic text-lg">“I can finally see what's working and double down. The Content Engine is a game changer.”</p>
            <p className="mt-4 font-medium text-gray-400 text-base">Sam, Creator</p>
          </div>
        </div>
      </section>
    </main>
  );
}
