'use client';

import { useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { CheckCircle, Rocket, Sparkles, BarChart2, MessageCircle, Unlock, DownloadCloud } from 'lucide-react';

export default function AiProPage() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 glass-strong rounded-3xl p-12 shadow-2xl animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text drop-shadow-lg">
            Sign in to access <span className="text-blue-400">Tempely Pro</span>
          </h1>
          <p className="text-gray-300 mb-8 text-xl max-w-lg mx-auto leading-relaxed">
            Tempely Pro is exclusive to members. Please log in or sign up to unlock GPT-4 powered tools.
          </p>
          <SignInButton mode="modal" fallbackRedirectUrl="/ai-pro">
            <button className="group bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:from-yellow-300 hover:to-purple-400 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 hover-lift">
              <span className="flex items-center gap-3">
                <span className="text-2xl animate-float">🛡</span>
                Access GPT-4 with Pro
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </SignInButton>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 pt-32">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg gradient-text animate-fade-in">
            Unlock <span className="text-blue-400">GPT-4</span> Power<br />with <span className="text-yellow-400">Temply Pro</span>
          </h1>
          <p className="text-2xl text-gray-100 mb-3 max-w-2xl mx-auto leading-snug animate-fade-in">
            Unlock <span className="font-bold text-blue-400">GPT-4</span> marketing mastery—get <span className="font-bold text-purple-300">advanced strategies</span>, <span className="font-bold text-pink-300">expert insights</span>, and <span className="font-bold text-green-300">high-converting copy</span>.
          </p>
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Powered by a specially trained AI built for creators who want to grow faster, smarter, and further—with what actually works.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 animate-slide-in">
          {/* Free Plan */}
          <div className="bg-white/10 rounded-2xl p-8 shadow border border-white/5 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Free Plan</h2>
            <ul className="text-base space-y-3 mb-6 w-full">
              <li className="flex items-center gap-2 text-gray-300"><span className="w-4 h-4 inline-block rounded-full border border-green-400 bg-green-400 mr-1" style={{minWidth:'1rem'}}></span> Access to ChatGPT 3.5</li>
              <li className="flex items-center gap-2 text-gray-300"><span className="w-4 h-4 inline-block rounded-full border border-green-400 bg-green-400 mr-1" style={{minWidth:'1rem'}}></span> Generate basic content ideas</li>
              <li className="flex items-center gap-2 text-gray-300"><span className="w-4 h-4 inline-block rounded-full border border-green-400 bg-green-400 mr-1" style={{minWidth:'1rem'}}></span> 2 viral hook suggestions per request</li>
              <li className="flex items-center gap-2 text-red-300"><span className="w-4 h-4 inline-block rounded-full border border-red-400 bg-red-400 mr-1" style={{minWidth:'1rem'}}></span> Limited to 2 caption examples per use</li>
              <li className="flex items-center gap-2 text-red-300"><span className="w-4 h-4 inline-block rounded-full border border-red-400 bg-red-400 mr-1" style={{minWidth:'1rem'}}></span> Restricted form access</li>
            </ul>
            <p className="mt-auto text-base font-medium text-gray-400">Free Forever</p>
          </div>
          {/* Pro Plan */}
          <div className="glass rounded-2xl p-8 shadow-xl border-2 border-yellow-300 flex flex-col items-center" style={{background:'rgba(255,255,255,0.08)'}}>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
              <Rocket className="text-yellow-200 w-5 h-5" /> Pro Plan
            </h2>
            <ul className="text-base space-y-3 text-yellow-50 mb-6 w-full font-normal">
              <li className="flex items-center gap-2"><Sparkles className="text-pink-200 w-4 h-4" /> GPT-4 content generation</li>
              <li className="flex items-center gap-2"><Sparkles className="text-yellow-200 w-4 h-4" /> 2x more viral hook ideas</li>
              <li className="flex items-center gap-2"><BarChart2 className="text-blue-200 w-4 h-4" /> Niche-specific strategy breakdowns</li>
              <li className="flex items-center gap-2"><MessageCircle className="text-purple-200 w-4 h-4" /> Captions optimized for conversion</li>
              <li className="flex items-center gap-2"><Unlock className="text-green-200 w-4 h-4" /> Unlimited submissions</li>
              <li className="flex items-center gap-2"><DownloadCloud className="text-cyan-200 w-4 h-4" /> Monthly premium templates drop</li>
            </ul>
            <p className="mt-auto text-2xl font-semibold text-yellow-200 mb-4">$19.99<span className="text-lg font-medium text-yellow-100">/month</span></p>
            <a
              href="https://tempely.lemonsqueezy.com/buy/9fcbd47a-9c87-4d31-9639-2e38b5a84326"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-300 hover:from-yellow-100 hover:to-purple-200 text-gray-900 shadow transition-all duration-300 hover:scale-105 hover-lift mb-2 text-center block"
            >
              Upgrade to Temply Pro
            </a>
            <Link
              href="/ai-pro-access"
              className="mt-2 inline-block text-center text-yellow-100 font-medium hover:underline w-full"
            >
              Already upgraded? Access AI Pro Assistant →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
