'use client';

import { useState } from 'react';
import { useUser, SignInButton } from "@clerk/nextjs";
import Link from 'next/link';

export default function AiToolPage() {
  const { isSignedIn, user } = useUser();

  const [formData, setFormData] = useState({
    niche: '',
    platform: '',
    audience: '',
    tone: '',
    goal: ''
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
    } catch (err) {
      setError('Failed to reach server.');
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Sign in to access the AI Tool</h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base max-w-md">
          This tool is for signed-in users only. Please log in or create an account to continue.
        </p>
        <SignInButton mode="modal" redirectUrl="/ai-tool">
  <button className="...">Try the Free AI Tool</button>
</SignInButton>

      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        🔓 Start creating with AI — for free
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Generate <strong>audience-ready content</strong> ideas, <strong>hooks</strong> & <strong>captions</strong> — instantly.<br />
        Upgrade to <strong>Temply Pro</strong> to unlock <strong>GPT-4</strong> & <strong>strategic enhancements</strong>.
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
        {[
          { label: '📌 Enter your niche*', name: 'niche' },
          { label: '📱 Enter your platform*', name: 'platform' },
          { label: '🎯 Enter your audience*', name: 'audience' },
          { label: '🎭 Enter your tone*', name: 'tone' },
          { label: '🏁 Enter your goal*', name: 'goal' },
        ].map(({ label, name }) => (
          <input
            key={name}
            type="text"
            name={name}
            placeholder={label}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-blue-50"
            required
          />
        ))}

        {/* Upsell block for Temply Pro */}
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-900 text-sm rounded-xl p-5 space-y-3 shadow-sm mt-8">
          <h3 className="text-lg font-bold flex items-center gap-2">
            🚀 Upgrade to <span className="text-yellow-800">Temply Pro</span>
            <span className="text-[10px] bg-yellow-400 text-white px-2 py-0.5 rounded-full font-bold">GPT-4</span>
          </h3>

          <p className="text-sm">
            Supercharge your content creation with <strong>Temply Pro</strong> and get access to our most powerful AI tools built on <strong>GPT-4</strong> — the same model used by top marketers and creators.
          </p>

          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Hyper-relevant content</strong> tailored to your offer or product</li>
            <li><strong>Emotionally driven copy</strong> that speaks directly to your audience’s pain points</li>
            <li><strong>Insider marketing insights</strong> and conversion-boosting content strategies</li>
          </ul>

          <Link href="/ai-pro">
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
              🔓 Unlock Full Power with GPT-4
            </button>
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
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

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {result && (
        <div className="mt-8 bg-white border border-gray-200 shadow-md p-6 rounded-xl space-y-6 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">🚀 Your AI-Powered Captions & Hooks</h2>

          {/* Captions Block */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">📢 Captions</h3>
            <ul className="space-y-2">
              {result
                .split('Hooks:')[0]
                .split('\n')
                .filter(line =>
                  line.trim() &&
                  !/^\d+\.$/.test(line.trim()) && 
                  !/^Captions[:：]?$/i.test(line.trim())
                )
                .map((line, idx) => (
                  <li
                    key={`caption-${idx}`}
                    className="bg-blue-50 border border-blue-200 p-3 rounded-md text-sm"
                  >
                    {line.trim()}
                  </li>
                ))}
            </ul>
          </div>

          {/* Hooks Block */}
          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-2">💡 Hooks</h3>
            <ul className="space-y-2">
              {result
                .split('Hooks:')[1]
                ?.split('\n')
                .filter(line => line.trim() && !/^\d+\.$/.test(line.trim()))
                .map((line, idx) => (
                  <li
                    key={`hook-${idx}`}
                    className="bg-purple-50 border border-purple-200 p-3 rounded-md text-sm"
                  >
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
