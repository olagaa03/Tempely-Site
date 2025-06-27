'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function LoggedOutHome() {
  return (
    <main className="min-h-screen font-sans text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight md:leading-[1.1] mb-12 tracking-tight text-white drop-shadow-lg max-w-3xl mx-auto">
            Grow Your Audience. <span className="text-[var(--tempely-purple)]">Create Your Breakout Moment.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-medium max-w-2xl mx-auto">
            Tempely gives creators the power to <span className="text-white font-bold">stand out, scale up, and spark real growth</span> on social. Plan, create, and track with Notion templates and AI tools built for viral momentum.
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
              description: 'Unlock scroll-stopping hooks that grab attention and spark engagement. Proven formulas, instant inspiration.',
              link: '/products/hooked',
            },
            {
              title: 'Posted',
              image: '/screenshots/posted-cover.png',
              description: 'Never run out of ideas or lose your flow. Plan, script, and publish with clarity—no burnout, just results.',
              link: '/products/posted',
            },
            {
              title: 'Tracked',
              image: '/screenshots/tracked-cover.png',
              description: 'See what\'s working, double down on your wins, and evolve your strategy with real creator data.',
              link: '/products/tracked',
            },
          ].map((item, idx) => (
            <Link href={item.link} key={item.title} className="group block transition duration-300">
              <div className="flex flex-col items-center group transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_24px_0_rgba(124,58,237,0.25)] border border-transparent hover:border-[var(--tempely-purple)] rounded-md bg-white/5 p-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={180}
                  className="mx-auto rounded-md transition-transform duration-300 group-hover:scale-[1.025] group-hover:shadow"
                />
                <h3 className="text-2xl font-bold mt-6 text-white group-hover:text-[var(--tempely-purple)] transition">{item.title}</h3>
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

      {/* Testimonial Section Placeholder */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-white">What creators are saying</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 border border-[var(--tempely-purple)] rounded-md p-8 shadow-xl backdrop-blur-md flex flex-col items-center">
            <Image src="/branding/tempely-logo.png" alt="Jamie avatar" width={48} height={48} className="rounded-full mb-4" />
            <p className="text-gray-200 italic text-lg">“Posted is the first planner I actually stick to — clean and super practical.”</p>
            <p className="mt-4 font-medium text-gray-400 text-base">Jamie, Content Coach</p>
          </div>
          <div className="bg-white/10 border border-[var(--tempely-purple)] rounded-md p-8 shadow-xl backdrop-blur-md flex flex-col items-center">
            <Image src="/branding/tempely-logo.png" alt="Alex avatar" width={48} height={48} className="rounded-full mb-4" />
            <p className="text-gray-200 italic text-lg">“Hooked helped me finally go viral. The categories and examples are gold.”</p>
            <p className="mt-4 font-medium text-gray-400 text-base">Alex, Copywriter</p>
          </div>
          <div className="bg-white/10 border border-[var(--tempely-purple)] rounded-md p-8 shadow-xl backdrop-blur-md flex flex-col items-center">
            <Image src="/branding/tempely-logo.png" alt="Sam avatar" width={48} height={48} className="rounded-full mb-4" />
            <p className="text-gray-200 italic text-lg">“Tracked showed me what actually works. My content is finally data-driven.”</p>
            <p className="mt-4 font-medium text-gray-400 text-base">Sam, Creator</p>
          </div>
        </div>
      </section>
    </main>
  );
}
