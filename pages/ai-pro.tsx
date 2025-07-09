'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, FileText, Megaphone } from 'lucide-react';
import Link from 'next/link';

const TABS = [
  { key: 'script', label: 'Script', icon: <Sparkles className="w-5 h-5 text-accent" /> },
  { key: 'ideas', label: 'Ideas', icon: <Lightbulb className="w-5 h-5 text-accent-2" /> },
  { key: 'templates', label: 'Templates', icon: <FileText className="w-5 h-5 text-success" /> },
  { key: 'hooks', label: 'Hooks', icon: <Megaphone className="w-5 h-5 text-primary" /> },
];

const FORMATS = [
  'Short Video',
  'Reel',
  'Ad',
  'YouTube Video',
  'TikTok',
  'Instagram Post',
  'Podcast',
  'Blog',
  'Custom...'
];

export default function AiProPage() {
  const { isSignedIn } = useUser();
  const [tab, setTab] = useState('script');

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] text-center px-4 relative overflow-hidden">
        <div className="relative z-10 glass-strong rounded-3xl p-12 shadow-2xl animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text drop-shadow-lg">
            Sign in to access <span className="text-blue-400">Tempely Pro</span>
          </h1>
          <p className="text-gray-300 mb-8 text-xl max-w-lg mx-auto leading-relaxed">
            Tempely Pro is exclusive to members. Please log in or sign up to unlock all advanced AI tools.
          </p>
          <Link href="/sign-in?redirect=/ai-pro">
            <button className="group bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:from-yellow-300 hover:to-purple-400 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 hover-lift">
              <span className="flex items-center gap-3">
                <span className="text-2xl animate-float">🛡</span>
                Access Pro Tools
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 pt-24">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-10 gradient-text drop-shadow-lg text-center animate-fade-in">
          Tempely Pro Tools
        </h1>
        {/* Tab Bar */}
        <div className="flex justify-center gap-2 mb-10 animate-fade-in">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 text-lg transition-all duration-200 ${tab === t.key ? 'bg-gradient-to-r from-primary to-accent-2 text-white shadow-lg scale-105' : 'bg-black/30 text-white/60 hover:bg-black/50'}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="glass-strong rounded-3xl shadow-2xl p-8 animate-fade-in">
          {tab === 'script' && <ProScriptTab />}
          {tab === 'ideas' && <ProIdeasTab />}
          {tab === 'templates' && <ProTemplatesTab />}
          {tab === 'hooks' && <ProHooksTab />}
        </div>
      </div>
    </main>
  );
}

function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="glass-strong rounded-full p-8 mb-6 flex items-center justify-center shadow-xl animate-pulse-glow">
        <svg width="56" height="56" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
          <path d="M13.5 2L4 16H13L11 26L24 10H15L13.5 2Z" fill="#fff" stroke="#7f5af0" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="text-xl font-bold text-white flex items-center gap-2">
        {label}
        <span className="inline-block w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
        <span className="inline-block w-2 h-2 bg-accent-2 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
        <span className="inline-block w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
      </div>
      <div className="text-white/60 mt-2 text-base">Generating your content...</div>
    </div>
  );
}

function FormatField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [custom, setCustom] = useState(value && !FORMATS.includes(value));
  return (
    <div>
      <label className="block font-bold text-base mb-1 text-white drop-shadow">Format</label>
      <select
        className="w-full p-4 border border-white/20 rounded-xl bg-neutral-900 text-white mb-2"
        value={custom ? 'Custom...' : value}
        onChange={e => {
          if (e.target.value === 'Custom...') setCustom(true);
          else { setCustom(false); onChange(e.target.value); }
        }}
      >
        <option value="">Select format...</option>
        {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      {custom && (
        <input
          className="w-full p-4 border border-white/20 rounded-xl bg-neutral-900 text-white placeholder-white/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300"
          placeholder="Enter custom format..."
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block font-bold text-base mb-1 text-white drop-shadow">{label}</label>
      <input id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-4 border border-white/20 rounded-xl bg-neutral-900 text-white placeholder-white/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300" />
    </div>
  );
}

function ProScriptTab() {
  const [formData, setFormData] = useState({ niche: '', platform: '', audience: '', tone: '', goal: '', format: '' });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormat = (v: string) => setFormData({ ...formData, format: v });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setResult(''); setError('');
    try {
      const res = await fetch('/api/generate-pro-content', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, mode: 'script' }),
      });
      const data = await res.json();
      if (res.ok) setResult(data.result); else setError(data.error || 'Something went wrong.');
    } catch { setError('Failed to reach server.'); } finally { setLoading(false); }
  };
  if (loading) return <LoadingSpinner label="Generating your Script" />;
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Niche" name="niche" value={formData.niche} onChange={handleChange} placeholder="e.g. Fitness, Cooking, Marketing" />
        <InputField label="Platform" name="platform" value={formData.platform} onChange={handleChange} placeholder="e.g. TikTok, Instagram, YouTube" />
        <InputField label="Audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g. Young Professionals, Moms 30–45" />
        <InputField label="Tone" name="tone" value={formData.tone} onChange={handleChange} placeholder="e.g. Bold, Fun, Educational" />
        <InputField label="Goal" name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g. Drive engagement, Educate" />
        <FormatField value={formData.format} onChange={handleFormat} />
      </div>
      <button type="submit" disabled={loading} className={`btn-premium w-full py-5 text-xl ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>{loading ? 'Generating...' : 'Generate Script →'}</button>
      {error && <div className="text-red-400 font-bold mt-2">{error}</div>}
      {result && <div className="mt-6 bg-black/30 border border-white/10 rounded-xl p-6 text-white whitespace-pre-wrap font-mono">{result}</div>}
    </form>
  );
}

function ProIdeasTab() {
  const [formData, setFormData] = useState({ niche: '', platform: '', audience: '', tone: '', goal: '', format: '' });
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormat = (v: string) => setFormData({ ...formData, format: v });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setIdeas([]); setError('');
    try {
      const res = await fetch('/api/generate-section', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, section: 'ideas' }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Server error.');
      else if (!data.result || typeof data.result !== 'string') setError('No valid ideas returned.');
      else setIdeas(data.result.split('\n').filter(Boolean));
    } catch (err) { setError('Failed to connect: ' + err); } finally { setLoading(false); }
  };
  if (loading) return <LoadingSpinner label="Generating your Ideas" />;
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Niche" name="niche" value={formData.niche} onChange={handleChange} placeholder="e.g. Fitness, Cooking, Marketing" />
        <InputField label="Platform" name="platform" value={formData.platform} onChange={handleChange} placeholder="e.g. TikTok, Instagram, YouTube" />
        <InputField label="Audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g. Young Professionals, Moms 30–45" />
        <InputField label="Tone" name="tone" value={formData.tone} onChange={handleChange} placeholder="e.g. Bold, Fun, Educational" />
        <InputField label="Goal" name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g. Drive engagement, Educate" />
        <FormatField value={formData.format} onChange={handleFormat} />
      </div>
      <button type="submit" disabled={loading} className={`btn-premium w-full py-5 text-xl ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>{loading ? 'Generating...' : 'Generate Ideas →'}</button>
      {error && <div className="text-red-400 font-bold mt-2">{error}</div>}
      {ideas.length > 0 && <div className="mt-6 space-y-4">{ideas.map((idea, idx) => <div key={idx} className="bg-black/30 border border-white/10 rounded-xl p-4 text-white">{idea}</div>)}</div>}
    </form>
  );
}

function ProTemplatesTab() {
  const [formData, setFormData] = useState({ niche: '', platform: '', audience: '', tone: '', goal: '', format: '' });
  const [template, setTemplate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormat = (v: string) => setFormData({ ...formData, format: v });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setTemplate(''); setError('');
    try {
      const res = await fetch('/api/generate-section', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, section: 'template' }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Server error.');
      else if (!data.result || typeof data.result !== 'string') setError('No valid template returned.');
      else setTemplate(data.result);
    } catch (err) { setError('Failed to connect: ' + err); } finally { setLoading(false); }
  };
  if (loading) return <LoadingSpinner label="Generating your Template" />;
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Niche" name="niche" value={formData.niche} onChange={handleChange} placeholder="e.g. Fitness, Cooking, Marketing" />
        <InputField label="Platform" name="platform" value={formData.platform} onChange={handleChange} placeholder="e.g. TikTok, Instagram, YouTube" />
        <InputField label="Audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g. Young Professionals, Moms 30–45" />
        <InputField label="Tone" name="tone" value={formData.tone} onChange={handleChange} placeholder="e.g. Bold, Fun, Educational" />
        <InputField label="Goal" name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g. Drive engagement, Educate" />
        <FormatField value={formData.format} onChange={handleFormat} />
      </div>
      <button type="submit" disabled={loading} className={`btn-premium w-full py-5 text-xl ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>{loading ? 'Generating...' : 'Generate Template →'}</button>
      {error && <div className="text-red-400 font-bold mt-2">{error}</div>}
      {template && <div className="mt-6 bg-black/30 border border-white/10 rounded-xl p-6 text-white whitespace-pre-wrap font-mono">{template}</div>}
    </form>
  );
}

function ProHooksTab() {
  const [formData, setFormData] = useState({ niche: '', platform: '', audience: '', tone: '', goal: '', format: '' });
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormat = (v: string) => setFormData({ ...formData, format: v });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setHooks([]); setError('');
    try {
      const res = await fetch('/api/generate-section', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, section: 'hooks' }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Server error.');
      else if (!data.result || typeof data.result !== 'string') setError('No valid hooks returned.');
      else setHooks(data.result.split('\n').filter(Boolean));
    } catch (err) { setError('Failed to connect: ' + err); } finally { setLoading(false); }
  };
  if (loading) return <LoadingSpinner label="Generating your Hooks" />;
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Niche" name="niche" value={formData.niche} onChange={handleChange} placeholder="e.g. Fitness, Cooking, Marketing" />
        <InputField label="Platform" name="platform" value={formData.platform} onChange={handleChange} placeholder="e.g. TikTok, Instagram, YouTube" />
        <InputField label="Audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g. Young Professionals, Moms 30–45" />
        <InputField label="Tone" name="tone" value={formData.tone} onChange={handleChange} placeholder="e.g. Bold, Fun, Educational" />
        <InputField label="Goal" name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g. Drive engagement, Educate" />
        <FormatField value={formData.format} onChange={handleFormat} />
      </div>
      <button type="submit" disabled={loading} className={`btn-premium w-full py-5 text-xl ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>{loading ? 'Generating...' : 'Generate Hooks →'}</button>
      {error && <div className="text-red-400 font-bold mt-2">{error}</div>}
      {hooks.length > 0 && <div className="mt-6 space-y-4">{hooks.map((hook, idx) => <div key={idx} className="bg-black/30 border border-white/10 rounded-xl p-4 text-white">{hook}</div>)}</div>}
    </form>
  );
}
