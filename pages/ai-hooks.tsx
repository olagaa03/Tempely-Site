import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Sparkles, Megaphone, AlertCircle } from 'lucide-react';

export default function AiHooksPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/sign-in?redirect=/ai-hooks');
    }
  }, [isLoaded, isSignedIn, router]);

  const [formData, setFormData] = useState({
    niche: '',
    platform: '',
    audience: '',
    tone: '',
    goal: '',
  });
  const [hooks, setHooks] = useState<string[]>([]);
  const [critique, setCritique] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setHooks([]);
    setCritique(null);
    setError('');
    try {
      const res = await fetch('/api/generate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, section: 'hooks' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Server error.');
        return;
      }
      if (!data.result || typeof data.result !== 'string') {
        setError('No valid hooks returned.');
        return;
      }
      setHooks(data.result.split('\n').filter(Boolean));
      // Optionally, fetch critique/why this works (future)
    } catch (err) {
      setError('Failed to connect: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-20 px-6 w-full max-w-2xl mx-auto animate-fade-in">
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-xl flex items-center gap-3">
          <Megaphone className="w-10 h-10 text-accent animate-bounce-slow" />
          Hooks Generator
        </h1>
        <p className="text-lg text-white/80 mb-10 text-center max-w-xl mx-auto animate-fade-in">
          Craft scroll-stopping hooks and openers that grab attention instantly. Perfect for creators who want to break the scroll and boost engagement.
        </p>
        <form onSubmit={handleSubmit} className="glass-strong border border-white/10 rounded-2xl shadow-xl p-8 mb-10 space-y-6 animate-fade-in w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Niche" name="niche" value={formData.niche} onChange={handleChange} placeholder="e.g. Fitness, Cooking, Marketing" />
            <InputField label="Platform" name="platform" value={formData.platform} onChange={handleChange} placeholder="e.g. TikTok, Instagram, YouTube" />
            <InputField label="Audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="e.g. Young Professionals, Moms 30–45" />
            <InputField label="Tone" name="tone" value={formData.tone} onChange={handleChange} placeholder="e.g. Bold, Fun, Educational" />
            <InputField label="Goal" name="goal" value={formData.goal} onChange={handleChange} placeholder="e.g. Drive engagement, Educate" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`btn-premium w-full py-5 text-xl ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-3 text-white">
                <Sparkles className="animate-spin" />
                Generating Hooks...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <Megaphone className="w-6 h-6 text-accent animate-bounce-slow" />
                Generate Hooks
                <span className="text-lg">→</span>
              </span>
            )}
          </button>
        </form>
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-300 rounded-2xl p-6 mb-8 backdrop-blur-xl animate-fade-in w-full">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-200 mb-1">Generation Failed</h3>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}
        {hooks.length > 0 && (
          <div className="space-y-6 animate-fade-in w-full">
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-accent animate-bounce-slow" />
              Your Viral Hooks
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {hooks.map((hook, idx) => (
                <div key={idx} className="glass-strong border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-2 animate-fade-in">
                  <span className="font-bold text-accent text-lg flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-accent animate-bounce-slow" />
                    Hook {idx + 1}
                  </span>
                  <span className="text-white text-lg">{hook}</span>
                  {/* Future: Why this works breakdown for each hook */}
                </div>
              ))}
            </div>
            {/* Future: Critique/Why this works for all hooks */}
            {critique && (
              <div className="mt-8 animate-fade-in delay-200">
                <h3 className="text-lg font-bold text-green-300 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-300 animate-bounce-slow" />
                  Why These Hooks Work (Expert Breakdown)
                </h3>
                <div className="bg-neutral-900 border border-green-400/30 p-4 rounded-xl text-white shadow-lg animate-fade-in">
                  <pre className="whitespace-pre-wrap text-green-100 text-sm">{critique}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}

function InputField({ label, name, value, onChange, placeholder }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block font-bold text-base mb-1 text-white drop-shadow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 border border-white/20 rounded-xl bg-neutral-900 text-white placeholder-white/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300"
      />
    </div>
  );
} 