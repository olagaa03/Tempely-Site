import Link from 'next/link';
import { Sparkles, Rocket, Crown } from 'lucide-react';

export default function AiToolsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#18181B] to-[#1a1a2e] font-sans px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Choose your AI tool
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pick the perfect AI companion for your content creation journey
          </p>
        </div>

        {/* Cards + Divider Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Quick Hook Maker Card */}
          <div className="flex-1 flex">
            <div className="group relative w-full flex flex-col justify-stretch h-full">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/10 p-10 flex flex-col items-center text-center hover:scale-105 hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-300 ease-out h-full">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-12 h-12 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Quick Hook Maker</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Generate viral hooks for your content in seconds. Free, fast, and fun—perfect for creators who want to break the scroll.
                </p>
                <Link 
                  href="/ai-tool" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-2xl px-8 py-4 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Try Hook Maker
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 lg:my-0 lg:mx-4 flex flex-col items-center justify-center">
            <div className="hidden lg:block h-32 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-gray-400 px-4 py-2 rounded-full text-sm font-medium shadow">
                or
              </span>
            </div>
            <div className="lg:hidden flex items-center justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
              <div className="mx-4 bg-gray-800 text-gray-400 px-4 py-2 rounded-full text-sm font-medium">
                or
              </div>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            </div>
          </div>

          {/* Content Engine Pro Card */}
          <div className="flex-1 flex">
            <div className="group relative w-full flex flex-col justify-stretch h-full">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/10 p-10 flex flex-col items-center text-center hover:scale-105 hover:shadow-yellow-500/20 hover:border-yellow-500/30 transition-all duration-300 ease-out relative h-full">
                {/* Recommended Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                  <Crown className="w-4 h-4" />
                  Recommended
                </div>
                <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-12 h-12 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Content Engine Pro</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Unlock GPT-4 powered content creation: strategic captions, marketing copy, and more. Pro features for serious growth.
                </p>
                <Link 
                  href="/ai-pro" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 font-semibold rounded-2xl px-8 py-4 shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explore Pro Engine
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 