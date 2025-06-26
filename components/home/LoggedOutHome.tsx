'use client';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from '@/components/NewsletterSignup';
import { SignInButton } from "@clerk/nextjs"; 

export default function LoggedOutHome() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 text-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The Creator Growth System — Powered by AI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Plan smarter. Post consistently. Track what actually grows. Tempely is your content command center, built for creators who want to go viral and stay there.
          </p>
          <SignInButton mode="modal" redirectUrl="/ai-tool">
  <div className="inline-block">
    <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
      Try the Free AI Tool
    </button>
  </div>
</SignInButton>

        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Image src="/screenshots/hooked-cover.png" alt="Hooked" width={300} height={180} className="mx-auto rounded-xl shadow-md" />
            <h3 className="text-xl font-bold mt-4">Hooked</h3>
            <p className="text-gray-600 mt-2 text-sm">Write viral-worthy hooks using proven formulas and scripts.</p>
          </div>
          <div>
            <Image src="/screenshots/posted-cover.png" alt="Posted" width={300} height={180} className="mx-auto rounded-xl shadow-md" />
            <h3 className="text-xl font-bold mt-4">Posted</h3>
            <p className="text-gray-600 mt-2 text-sm">Plan content with clarity and avoid burnout with smart templates.</p>
          </div>
          <div>
            <Image src="/screenshots/tracked-cover.png" alt="Tracked" width={300} height={180} className="mx-auto rounded-xl shadow-md" />
            <h3 className="text-xl font-bold mt-4">Tracked</h3>
            <p className="text-gray-600 mt-2 text-sm">See what’s working, what’s not, and evolve your content strategy.</p>
          </div>
        </div>
      </section>

      {/* Bundle Callout */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">📦 Get the Creator Bundle</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Hooked, Posted, and Tracked — everything you need to create, plan, and grow your content — bundled together.
        </p>
        <Link
          href="/bundle"
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          View the Bundle
        </Link>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">What creators are saying</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 border rounded-2xl p-6 shadow">
            <p className="text-gray-700 italic text-sm">“Posted is the first planner I actually stick to – clean and super practical.”</p>
            <p className="mt-4 font-medium text-gray-900 text-sm">— Jamie, Content Coach</p>
          </div>
          <div className="bg-gray-50 border rounded-2xl p-6 shadow">
            <p className="text-gray-700 italic text-sm">“Hooked helped me finally go viral. The categories and examples are gold.”</p>
            <p className="mt-4 font-medium text-gray-900 text-sm">— Alex, Copywriter</p>
          </div>
          <div className="bg-gray-50 border rounded-2xl p-6 shadow">
            <p className="text-gray-700 italic text-sm">“Tracked showed me what actually works. My content is finally data-driven.”</p>
            <p className="mt-4 font-medium text-gray-900 text-sm">— Sam, Creator</p>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </main>
  );
}
