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
      <div className="min-h-screen flex flex-col items-start justify-start pt-2 pb-12 px-1 md:pl-12 md:pr-4 animate-fade-in bg-[var(--background)]">
        <div className="w-full max-w-3xl ml-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-2 text-left">Pricing Plans</h1>
          <p className="text-base md:text-lg text-[var(--text-muted)] mb-8 text-left max-w-xl">Unlock the full power of Tempely. Choose the plan that fits your needs and scale your creativity with AI credits, tools, and more. <span className='font-semibold text-purple-400'>Coming soon: Buy extra credits anytime!</span></p>
          {/* Toggle */}
          <div className="flex items-center gap-4 mb-10">
            <span className={`font-semibold text-sm md:text-base ${!yearly ? 'text-purple-400' : 'text-[var(--text-muted)]'}`}>Monthly</span>
            <button
              className={`w-12 h-7 rounded-full bg-purple-200 relative transition-colors duration-200 focus:outline-none`}
              onClick={() => setYearly((v) => !v)}
              aria-label="Toggle yearly pricing"
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${yearly ? 'translate-x-5' : ''}`}
              />
            </button>
            <span className={`font-semibold text-sm md:text-base ${yearly ? 'text-purple-400' : 'text-[var(--text-muted)]'}`}>Yearly <span className="text-xs font-normal">(Save 17%)</span></span>
          </div>
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-14">
            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`flex flex-col items-center rounded-2xl shadow-xl border-2 transition-all duration-300 p-7 bg-[var(--surface)] backdrop-blur-2xl ${plan.highlight ? 'border-purple-600 scale-100 z-10' : 'border-[var(--border)]'} hover:scale-102 hover:shadow-2xl max-w-xs mx-auto`}
              >
                {plan.highlight && (
                  <div className="mb-2 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wide uppercase shadow">Most Popular</div>
                )}
                <h2 className="text-xl font-extrabold text-[var(--text-main)] mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-extrabold text-purple-700">${yearly ? plan.priceYearly : plan.priceMonthly}</span>
                  <span className="text-sm text-[var(--text-muted)] font-semibold mb-0.5">/ {yearly ? 'year' : 'month'}</span>
                </div>
                <div className="text-xs text-[var(--text-muted)] mb-1">{yearly ? `${plan.creditsYearly.toLocaleString()} credits/year` : `${plan.creditsMonthly.toLocaleString()} credits/month`}</div>
                <div className="text-xs text-[var(--text-muted)] mb-3">Billed {yearly ? 'yearly' : 'monthly'}</div>
                <p className="text-[var(--text-muted)] mb-4 text-center min-h-[36px] text-sm">{plan.description}</p>
                <ul className="text-[var(--text-main)] text-sm mb-6 space-y-1 w-full">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2"><span className="text-purple-500">✓</span> {f}</li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-bold text-base transition-all duration-200 shadow ${plan.highlight ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          {/* Feature Comparison Table */}
          <div className="w-full bg-[var(--surface)] rounded-xl shadow-lg p-6 mb-12 overflow-x-auto">
            <h3 className="text-xl font-bold text-purple-700 mb-4 text-left">Compare Features</h3>
            <table className="w-full text-left border-separate border-spacing-y-1 text-sm">
              <thead>
                <tr>
                  <th className="font-bold text-[var(--text-main)]">Main Features</th>
                  <th className="font-bold text-purple-700 text-center">Basic</th>
                  <th className="font-bold text-purple-700 text-center">Pro</th>
                  <th className="font-bold text-purple-700 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {featureTable.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-medium text-[var(--text-main)]">{row.feature}</td>
                    <td className="py-2 text-center">{row.basic === true ? <span className="text-green-500 font-bold">✓</span> : row.basic === false ? <span className="text-gray-400">—</span> : row.basic}</td>
                    <td className="py-2 text-center">{row.pro === true ? <span className="text-green-500 font-bold">✓</span> : row.pro === false ? <span className="text-gray-400">—</span> : row.pro}</td>
                    <td className="py-2 text-center">{row.enterprise === true ? <span className="text-green-500 font-bold">✓</span> : row.enterprise === false ? <span className="text-gray-400">—</span> : row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Feature List */}
          <div className="w-full max-w-2xl bg-[var(--surface)] rounded-xl shadow p-5 mb-6">
            <h3 className="text-lg font-bold text-purple-400 mb-2 text-left">All plans include:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[var(--text-main)] text-sm">
              <div>
                <span className="font-semibold">AI Audio, AI Chat, AI Design, AI Writer</span> and more
              </div>
              <div>
                <span className="font-semibold">Design Maker, Face Swapper, Image Maker, Logo Maker, Speech Maker, Video Maker</span>
              </div>
            </div>
          </div>
          {/* Coming soon: Buy credits */}
          <div className="w-full flex justify-start mt-6">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg bg-gradient-to-r from-purple-900/40 via-purple-800/30 to-pink-900/30 border border-purple-900/30">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-bold text-purple-400 text-base md:text-lg">Need more credits?</span>
              <span className="text-purple-400 font-semibold text-base md:text-lg">Buy extra credits <span className="opacity-70 font-normal">(coming soon)</span></span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 