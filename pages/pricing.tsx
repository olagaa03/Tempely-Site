import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Image from 'next/image';

const plans = [
  {
    name: 'Basic',
    priceMonthly: 9.99,
    priceYearly: 99,
    creditsMonthly: 1000,
    creditsYearly: 12000,
    description: 'For individuals and creators getting started. Includes 1,000 credits/month and all core AI tools.',
    features: [
      '1,000 credits/month',
      'Access to all core AI tools',
      'Community support',
      '1 team member',
    ],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Pro',
    priceMonthly: 19.99,
    priceYearly: 199,
    creditsMonthly: 3000,
    creditsYearly: 36000,
    description: 'For professionals who want more power and flexibility. 3,000 credits/month, GPT-4, priority support.',
    features: [
      '3,000 credits/month',
      'GPT-4 & advanced models',
      'Priority support',
      'All templates & frameworks',
      '3 team members',
    ],
    cta: 'Buy Now',
    highlight: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: 99.99,
    priceYearly: 999,
    creditsMonthly: 15000,
    creditsYearly: 180000,
    description: 'For teams and agencies needing scale, collaboration, and custom solutions. 15,000 credits/month.',
    features: [
      '15,000 credits/month',
      'Team management',
      'Custom integrations',
      'Dedicated support',
      '5 team members',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const featureTable = [
  {
    feature: 'AI credits per month',
    basic: '1,000',
    pro: '3,000',
    enterprise: '15,000',
  },
  {
    feature: 'Unlimited projects',
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Access to all AI tools',
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Team members',
    basic: '1',
    pro: '3',
    enterprise: '5',
  },
  {
    feature: 'Priority support',
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Custom integrations',
    basic: false,
    pro: false,
    enterprise: true,
  },
  {
    feature: 'Dedicated onboarding',
    basic: false,
    pro: false,
    enterprise: true,
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
        <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl">Unlock the full power of Tempely. Choose the plan that fits your needs and scale your creativity with AI credits, tools, and more. <span className='font-semibold text-purple-700'>Coming soon: Buy extra credits anytime!</span></p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl mb-20">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`flex flex-col items-center rounded-3xl shadow-2xl border-2 transition-all duration-300 p-10 bg-white/90 backdrop-blur-2xl ${plan.highlight ? 'border-purple-600 scale-105 z-10' : 'border-gray-100'} ${plan.highlight ? 'shadow-3xl' : 'shadow-xl'} hover:scale-105 hover:shadow-2xl`}
            >
              {plan.highlight && (
                <div className="mb-3 px-4 py-1 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wide uppercase shadow">Most Popular</div>
              )}
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{plan.name}</h2>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-extrabold text-purple-700">${yearly ? plan.priceYearly : plan.priceMonthly}</span>
                <span className="text-base text-gray-500 font-semibold mb-1">/ {yearly ? 'year' : 'month'}</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">{yearly ? `${plan.creditsYearly.toLocaleString()} credits/year` : `${plan.creditsMonthly.toLocaleString()} credits/month`}</div>
              <div className="text-sm text-gray-400 mb-4">Billed {yearly ? 'yearly' : 'monthly'}</div>
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
        {/* Feature Comparison Table */}
        <div className="w-full max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 mb-16 overflow-x-auto">
          <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">Compare Features</h3>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-lg font-bold text-gray-700">Main Features</th>
                <th className="text-lg font-bold text-purple-700 text-center">Basic</th>
                <th className="text-lg font-bold text-purple-700 text-center">Pro</th>
                <th className="text-lg font-bold text-purple-700 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featureTable.map((row) => (
                <tr key={row.feature} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">{row.feature}</td>
                  <td className="py-3 text-center">{row.basic === true ? <span className="text-green-500 font-bold">✓</span> : row.basic === false ? <span className="text-gray-400">—</span> : row.basic}</td>
                  <td className="py-3 text-center">{row.pro === true ? <span className="text-green-500 font-bold">✓</span> : row.pro === false ? <span className="text-gray-400">—</span> : row.pro}</td>
                  <td className="py-3 text-center">{row.enterprise === true ? <span className="text-green-500 font-bold">✓</span> : row.enterprise === false ? <span className="text-gray-400">—</span> : row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        {/* Coming soon: Buy credits */}
        <div className="w-full max-w-2xl mx-auto text-center mt-8">
          <div className="inline-block bg-purple-100 text-purple-700 px-6 py-3 rounded-xl font-semibold text-lg shadow">Need more credits? <span className="font-bold">Buy extra credits (coming soon)</span></div>
        </div>
      </div>
    </Layout>
  );
} 