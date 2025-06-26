'use client';

import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function AiToolPage() {
  const { isSignedIn } = useUser();

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

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#18181B] to-[#0F0F0F] text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Sign in to access the AI Tool</h1>
        <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
          This tool is for signed-in users only. Please log in or create an account to continue.
        </p>
        <SignInButton mode="modal" fallbackRedirectUrl="/ai-tool">
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-xl transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Try the Free AI Tool
          </button>
        </SignInButton>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 pt-32 min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F]">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
        🔓 Start creating with AI — for free
      </h1>
      <p className="text-center text-gray-400 mb-10 text-lg">
        Generate <strong>audience-ready content</strong> ideas, <strong>hooks</strong> & <strong>captions</strong> — instantly.<br />
        <span className="text-blue-400 font-semibold">Upgrade to Temply Pro to unlock GPT-4 & strategic enhancements.</span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8 space-y-6">
        {["niche", "platform", "audience", "tone", "goal"].map((name) => (
          <input
            key={name}
            type="text"
            name={name}
            placeholder={`Enter your ${name}`}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-4 bg-black/40 border border-white/20 text-white placeholder-gray-400 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}

        <div className="bg-yellow-100/10 border border-yellow-300/20 text-yellow-200 text-sm rounded-xl p-6 space-y-3 shadow-sm mt-8">
          <h3 className="text-lg font-bold flex items-center gap-2 text-yellow-300">
            🚀 Upgrade to <span className="text-yellow-200">Temply Pro</span>
            <span className="text-[10px] bg-yellow-400 text-white px-2 py-0.5 rounded-full font-bold">GPT-4</span>
          </h3>
          <p className="text-sm text-yellow-100">
            Supercharge your content creation with <strong>Temply Pro</strong> and get access to our most powerful AI tools built on <strong>GPT-4</strong>.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-yellow-100">
            <li><strong>Hyper-relevant content</strong> tailored to your offer or product</li>
            <li><strong>Emotionally driven copy</strong> that speaks directly to your audience's pain points</li>
            <li><strong>Insider marketing insights</strong> and conversion-boosting content strategies</li>
          </ul>
          <Link href="/ai-pro">
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full w-full font-semibold hover:bg-blue-500 shadow transition-transform duration-200 hover:scale-105">
              🔓 Unlock Full Power with GPT-4
            </button>
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-full font-semibold transition text-lg shadow-lg ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2 text-white">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16z"
                />
              </svg>
              Generating...
            </span>
          ) : (
            'Generate AI Content'
          )}
        </button>
      </form>

      {error && <p className="text-red-400 text-center mt-6 text-lg font-semibold bg-red-900/30 rounded-xl py-3 px-4 shadow">{error}</p>}

      {result && (
        <div className="mt-12 bg-white/10 border border-white/10 shadow-2xl p-8 rounded-2xl space-y-8 transition-all duration-300 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-blue-400 mb-2">
            🚀 Your AI-Powered Captions & Hooks
          </h2>

          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              📢 Captions
            </h3>
            <ul className="space-y-2">
              {result
                .split('Hooks:')[0]
                .split('\n')
                .filter(line => line.trim() && !/^\d+\.$/.test(line.trim()) && !/^Captions[:：]?$/i.test(line.trim()))
                .map((line, idx) => (
                  <li key={`caption-${idx}`} className="bg-blue-900/30 border border-blue-400/20 p-3 rounded-md text-base text-white">
                    {line.trim()}
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">
              💡 Hooks
            </h3>
            <ul className="space-y-2">
              {result
                .split('Hooks:')[1]?.split('\n')
                .filter(line => line.trim() && !/^\d+\.$/.test(line.trim()))
                .map((line, idx) => (
                  <li key={`hook-${idx}`} className="bg-purple-900/30 border border-purple-400/20 p-3 rounded-md text-base text-white">
                    {line.trim()}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
