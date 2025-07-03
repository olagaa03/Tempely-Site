'use client';

import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function AiToolPage() {
  const { isSignedIn, user } = useUser();

  const [formData, setFormData] = useState({
    niche: '',
    platform: '',
    audience: '',
    tone: '',
    goal: '',
  });

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    setError('');

    try {
      const res = await fetch('/api/generate-free-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.result);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch {
      setError('Failed to reach server.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number | string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const hasUnlimited = user?.publicMetadata?.unlimitedGenerations || user?.publicMetadata?.pro;

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] text-center px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10">
          <div className="glass-strong rounded-3xl p-12 shadow-2xl animate-slide-in">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg gradient-text">
              Unlock Your AI Power
            </h1>
            <p className="text-gray-300 mb-8 text-xl max-w-lg mx-auto leading-relaxed">
              Create stunning content with our free AI tool. Sign in to start generating audience-ready captions and hooks instantly.
            </p>
            <SignInButton mode="modal" fallbackRedirectUrl="/ai-tool">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400/50 hover-lift">
                <span className="flex items-center gap-3">
                  <span className="text-2xl animate-float">🚀</span>
                  Start Creating with AI
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </SignInButton>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 pt-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            ✨ AI Content Creator
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Generate <span className="font-bold text-blue-400">audience-ready content</span> ideas, 
            <span className="font-bold text-purple-400"> scroll-stopping hooks</span>, and 
            <span className="font-bold text-pink-400"> engaging captions</span> — instantly.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-6 py-2 text-blue-300 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Powered by GPT-3.5 • Free Tier
          </div>
        </div>

        {/* Main Form */}
        <div className="glass-strong rounded-3xl shadow-2xl p-8 mb-8 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Your Niche</label>
                <input
                  type="text"
                  name="niche"
                  placeholder="e.g., Fitness, Tech, Fashion, Business"
                  value={formData.niche}
                  onChange={handleChange}
                  className="w-full p-4 bg-black/30 border border-white/20 text-white placeholder-gray-400 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-white/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Platform</label>
                <input
                  type="text"
                  name="platform"
                  placeholder="e.g., Instagram, TikTok, LinkedIn"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full p-4 bg-black/30 border border-white/20 text-white placeholder-gray-400 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-white/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Target Audience</label>
                <input
                  type="text"
                  name="audience"
                  placeholder="e.g., Young professionals, Fitness enthusiasts"
                  value={formData.audience}
                  onChange={handleChange}
                  className="w-full p-4 bg-black/30 border border-white/20 text-white placeholder-gray-400 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-white/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Content Tone</label>
                <input
                  type="text"
                  name="tone"
                  placeholder="e.g., Professional, Casual, Motivational"
                  value={formData.tone}
                  onChange={handleChange}
                  className="w-full p-4 bg-black/30 border border-white/20 text-white placeholder-gray-400 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-white/30"
                  required
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Content Goal</label>
                <input
                  type="text"
                  name="goal"
                  placeholder="e.g., Drive engagement, Generate leads, Build brand awareness"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full p-4 bg-black/30 border border-white/20 text-white placeholder-gray-400 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-white/30"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 hover-lift ${
                loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white hover:scale-[1.02] hover:shadow-blue-500/25'
              }`}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-3 text-white">
                  <div className="relative">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                  <span>Creating your content...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <span className="text-2xl animate-pulse-glow">✨</span>
                  Generate AI Content
                  <span className="text-lg">→</span>
                </span>
              )}
            </button>
            <div className="w-full flex justify-center mt-3">
              <span className="text-xs text-gray-300 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-center" style={{maxWidth: '90%'}}>
                {hasUnlimited ? (
                  <span className="text-emerald-400">✨ Unlimited generations active - generate as much as you want!</span>
                ) : (
                  <span>Note: Free users can generate up to 5 pieces of AI content per day.</span>
                )}
              </span>
            </div>
          </form>
        </div>

        {/* Unlimited Generations Upgrade Section */}
        {!hasUnlimited && (
          <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-400/30 text-green-200 rounded-3xl p-8 mb-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⚡</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-green-300">Unlimited Generations</h3>
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 text-black text-xs px-3 py-1 rounded-full font-bold">$9.99/mo</span>
              </div>
              <p className="text-green-100 mb-4 leading-relaxed">
                Love the speed? Get <strong>unlimited generations</strong> with the same fast GPT-3.5 engine. Perfect for creators who want to generate content without limits.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>Unlimited daily generations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>Same fast GPT-3.5 engine</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>No setup fees</span>
                </div>
              </div>
              <a
                href="https://tempely.lemonsqueezy.com/buy/unlimited-generations"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                🚀 Get Unlimited Access
              </a>
            </div>
          </div>
        </div>
        )}

        {/* Pro Upgrade Section */}
        <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-400/30 text-yellow-200 rounded-3xl p-8 mb-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🚀</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-yellow-300">Upgrade to Tempely Pro</h3>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-3 py-1 rounded-full font-bold">GPT-4</span>
                <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold ml-2">$19.99/mo</span>
              </div>
              <p className="text-yellow-100 mb-4 leading-relaxed">
                Supercharge your content creation with <strong>Tempely Pro</strong> and unlock our most powerful AI tools built on <strong>GPT-4</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>Hyper-relevant content</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>Emotionally driven copy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span>Conversion strategies</span>
                </div>
              </div>
              <Link href="/ai-pro">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                  🔓 Unlock Full Power with GPT-4
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-300 rounded-2xl p-6 mb-8 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-200 mb-1">Generation Failed</h3>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="glass-strong rounded-3xl p-8 shadow-2xl space-y-8 animate-slide-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-400 mb-2 gradient-text">
                ✨ Your AI-Powered Content
              </h2>
              <p className="text-gray-400">Copy any piece with one click</p>
            </div>

            {/* Content Ideas */}
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <span className="animate-pulse-glow">💡</span>
                Content Ideas
              </h3>
              <div className="space-y-3">
                {result
                  .split('Captions:')[0]
                  .split('\n')
                  .filter(line => line.trim() && !/^\d+\.$/.test(line.trim()) && !/^Content Idea[:：]?$/i.test(line.trim()))
                  .map((line, idx) => (
                    <div key={`idea-${idx}`} className="group relative hover-lift">
                      <div className="bg-green-500/10 border border-green-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-green-400/40 hover:bg-green-500/15">
                        <p className="text-base leading-relaxed">{line.trim()}</p>
                        <button
                          onClick={() => copyToClipboard(line.trim(), idx)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-green-500/20 hover:bg-green-500/40 p-2 rounded-lg hover:scale-110"
                          title="Copy to clipboard"
                        >
                          {copiedIndex === idx ? (
                            <span className="text-green-400 text-sm animate-fade-in">✓</span>
                          ) : (
                            <span className="text-green-400 text-sm">📋</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Captions */}
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <span className="animate-pulse-glow">📢</span>
                Captions
              </h3>
              <div className="space-y-3">
                {result
                  .split('Hooks:')[0]
                  .split('Captions:')[1]
                  ?.split('\n')
                  .filter(line => line.trim() && !/^\d+\.$/.test(line.trim()))
                  .map((line, idx) => (
                    <div key={`caption-${idx}`} className="group relative hover-lift">
                      <div className="bg-blue-500/10 border border-blue-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15">
                        <p className="text-base leading-relaxed">{line.trim()}</p>
                        <button
                          onClick={() => copyToClipboard(line.trim(), `caption-${idx}`)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-500/20 hover:bg-blue-500/40 p-2 rounded-lg hover:scale-110"
                          title="Copy to clipboard"
                        >
                          {copiedIndex === `caption-${idx}` ? (
                            <span className="text-blue-400 text-sm animate-fade-in">✓</span>
                          ) : (
                            <span className="text-blue-400 text-sm">📋</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Hooks */}
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <span className="animate-pulse-glow">🎣</span>
                Hooks
              </h3>
              <div className="space-y-3">
                {result
                  .split('Hooks:')[1]
                  ?.split('\n')
                  .filter(line => line.trim() && !/^\d+\.$/.test(line.trim()))
                  .map((line, idx) => (
                    <div key={`hook-${idx}`} className="group relative hover-lift">
                      <div className="bg-purple-500/10 border border-purple-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/15">
                        <p className="text-base leading-relaxed">{line.trim()}</p>
                        <button
                          onClick={() => copyToClipboard(line.trim(), `hook-${idx}`)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-purple-500/20 hover:bg-purple-500/40 p-2 rounded-lg hover:scale-110"
                          title="Copy to clipboard"
                        >
                          {copiedIndex === `hook-${idx}` ? (
                            <span className="text-purple-400 text-sm animate-fade-in">✓</span>
                          ) : (
                            <span className="text-purple-400 text-sm">📋</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
