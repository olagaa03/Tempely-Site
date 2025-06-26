'use client';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from '@/components/NewsletterSignup';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function LoggedOutHome() {
  return (
    <main className="min-h-screen font-sans text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-white drop-shadow-lg">
            The Creator Growth System — Powered by AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 font-medium">
            Plan smarter. Post consistently. Track what actually grows. Tempely is your content command center, built for creators who want to go viral and stay there.
          </p>
          <div className="flex justify-center gap-6">
            <SignInButton mode="modal" fallbackRedirectUrl="/ai-tool">
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-xl transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                Log In
              </button>
            </SignInButton>
            <SignUpButton mode="modal" fallbackRedirectUrl="/ai-tool">
              <button className="bg-white/10 hover:bg-white/20 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-xl transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-white/20">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: 'Hooked',
              image: '/screenshots/hooked-cover.png',
              description: 'Write viral-worthy hooks using proven formulas and scripts.',
              link: '/products/hooked',
            },
            {
              title: 'Posted',
              image: '/screenshots/posted-cover.png',
              description: 'Plan content with clarity and avoid burnout with smart templates.',
              link: '/products/posted',
            },
            {
              title: 'Tracked',
              image: '/screenshots/tracked-cover.png',
              description: "See what's working, what's not, and evolve your content strategy.",
              link: '/products/tracked',
            },
          ].map((item) => (
            <Link href={item.link} key={item.title} className="group block transition duration-300">
              <div className="flex flex-col items-center group transition-transform duration-200 hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={180}
                  className="mx-auto rounded-xl transition-transform duration-300 group-hover:scale-[1.025] group-hover:shadow"
                />
                <h3 className="text-2xl font-bold mt-6 text-white group-hover:text-blue-400 transition">{item.title}</h3>
                <p className="text-gray-300 mt-3 text-base font-medium">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bundle Callout */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#232526]/80 to-[#414345]/80 text-center rounded-2xl mx-4 my-12 shadow-2xl border border-white/10">
        <h2 className="text-4xl font-bold mb-4 text-white drop-shadow">📦 Get the Creator Bundle</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
          Hooked, Posted, and Tracked — everything you need to create, plan, and grow your content — bundled together.
        </p>
        <Link
          href="/bundle"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-500 shadow-lg transition-transform duration-200 hover:scale-105"
        >
          View the Bundle
        </Link>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-white">What creators are saying</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-md">
            <p className="text-gray-200 italic text-lg">“Posted is the first planner I actually stick to – clean and super practical.”</p>
            <p className="mt-6 font-medium text-gray-400 text-base">— Jamie, Content Coach</p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-md">
            <p className="text-gray-200 italic text-lg">“Hooked helped me finally go viral. The categories and examples are gold.”</p>
            <p className="mt-6 font-medium text-gray-400 text-base">— Alex, Copywriter</p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-md">
            <p className="text-gray-200 italic text-lg">“Tracked showed me what actually works. My content is finally data-driven.”</p>
            <p className="mt-6 font-medium text-gray-400 text-base">— Sam, Creator</p>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </main>
  );
}
