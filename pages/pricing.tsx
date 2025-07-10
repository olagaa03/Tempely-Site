import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Image from 'next/image';

const plans = [
  {
    name: 'Basic',
    priceMonthly: 9.99,
    priceYearly: 99,
    description: 'For individuals and creators getting started. 5 generations/day, core AI tools.',
    features: [
      '5 generations per day',
      'Access to all core AI tools',
      'Community support',
    ],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Pro',
    priceMonthly: 19.99,
    priceYearly: 199,
    description: 'For professionals who want unlimited power and advanced features. GPT-4, unlimited generations, priority support.',
    features: [
      'Unlimited generations',
      'GPT-4 & advanced models',
      'Priority support',
      'All templates & frameworks',
    ],
    cta: 'Buy Now',
    highlight: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: 99.99,
    priceYearly: 999,
    description: 'For teams and agencies needing scale, collaboration, and custom solutions.',
    features: [
      'Team management',
      'Custom integrations',
      'Dedicated support',
      'Onboarding & training',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  return (
    <Layout>
      <Head>
        <title>Pricing – Tempely</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col items-center justify-start pt-20 pb-32 px-4 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 mt-8 text-center">Pricing Plans</h1>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl">Unlock the full power of Tempely. Choose the plan that fits your needs and scale your creativity with AI tools, templates, and more.</p>
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`font-semibold text-base ${!yearly ? 'text-purple-700' : 'text-gray-400'}`}>Monthly</span>
          <button
            className={`w-14 h-8 rounded-full bg-purple-200 relative transition-colors duration-200 focus:outline-none`}
            onClick={() => setYearly((v) => !v)}
            aria-label="Toggle yearly pricing"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${yearly ? 'translate-x-6' : ''}`}
            />
          </button>
          <span className={`font-semibold text-base ${yearly ? 'text-purple-700' : 'text-gray-400'}`}>Yearly <span className="text-xs font-normal">(Save 17%)</span></span>
        </div>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`flex flex-col items-center rounded-3xl shadow-xl border-2 transition-all duration-300 p-8 bg-white/80 backdrop-blur-xl ${plan.highlight ? 'border-purple-500 scale-105 z-10' : 'border-gray-100'} ${plan.highlight ? 'shadow-2xl' : 'shadow-lg'}`}
            >
              {plan.highlight && (
                <div className="mb-3 px-4 py-1 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wide uppercase shadow">Most Popular</div>
              )}
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{plan.name}</h2>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-extrabold text-purple-700">${yearly ? plan.priceYearly : plan.priceMonthly}</span>
                <span className="text-base text-gray-500 font-semibold mb-1">/ {yearly ? 'year' : 'month'}</span>
              </div>
              <div className="text-sm text-gray-400 mb-4">{yearly ? `Billed yearly` : `Billed monthly`}</div>
              <p className="text-gray-700 mb-6 text-center min-h-[48px]">{plan.description}</p>
              <ul className="text-gray-700 text-base mb-8 space-y-2 w-full">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-purple-500">✓</span> {f}</li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-200 shadow ${plan.highlight ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        {/* Feature List */}
        <div className="w-full max-w-4xl mx-auto bg-white/70 rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">All plans include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base">
            <div>
              <span className="font-semibold">AI Audio, AI Chat, AI Design, AI Writer</span> and more
            </div>
            <div>
              <span className="font-semibold">Design Maker, Face Swapper, Image Maker, Logo Maker, Speech Maker, Video Maker</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 