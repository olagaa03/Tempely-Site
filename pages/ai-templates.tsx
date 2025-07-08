import { useState } from 'react';
import { FileText, Sparkles, AlertCircle } from 'lucide-react';

export default function AiTemplatesPage() {
  const [formData, setFormData] = useState({
    niche: '',
    platform: '',
    audience: '',
    tone: '',
    goal: '',
  });
  const [template, setTemplate] = useState('');
  const [critique, setCritique] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTemplate('');
    setCritique(null);
    setError('');
    try {
      const res = await fetch('/api/generate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, section: 'template' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Server error.');
        return;
      }
      if (!data.result || typeof data.result !== 'string') {
        setError('No valid template returned.');
        return;
      }
      setTemplate(data.result);
      // Optionally, fetch critique/why this works (future)
    } catch (err) {
      setError('Failed to connect: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg gradient-text text-center animate-fade-in flex items-center justify-center gap-3">
          <FileText className="w-10 h-10 text-green-300 animate-bounce-slow" />
          Templates Generator
        </h1>
        <p className="text-lg text-gray-200 mb-10 text-center max-w-xl mx-auto animate-fade-in">
          Access reusable, proven script templates for any platform or content goal. Perfect for creators who want to save time and boost results.
        </p>
        <form onSubmit={handleSubmit} className="glass-strong rounded-3xl shadow-2xl p-8 mb-10 space-y-6 animate-fade-in">
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
            className={`w-full py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 hover-lift ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 hover:from-green-300 hover:to-purple-400 text-white hover:scale-[1.02] hover:shadow-green-400/25'}`}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-3 text-white">
                <Sparkles className="animate-spin" />
                Generating Template...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <FileText className="w-6 h-6 text-green-300 animate-bounce-slow" />
                Generate Template
                <span className="text-lg">→</span>
              </span>
            )}
          </button>
        </form>
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-300 rounded-2xl p-6 mb-8 backdrop-blur-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-200 mb-1">Generation Failed</h3>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}
        {template && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-green-300 animate-bounce-slow" />
              Your Script Template
            </h2>
            <div className="bg-gradient-to-br from-green-700/40 to-blue-700/30 border border-green-400/30 rounded-2xl p-6 shadow-xl flex flex-col gap-2 animate-fade-in">
              <pre className="text-white text-lg whitespace-pre-wrap font-mono">{template}</pre>
              {/* Future: Why this works breakdown for the template */}
            </div>
            {/* Future: Critique/Why this works for the template */}
            {critique && (
              <div className="mt-8 animate-fade-in delay-200">
                <h3 className="text-lg font-bold text-green-300 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-300 animate-bounce-slow" />
                  Why This Template Works (Expert Breakdown)
                </h3>
                <div className="bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-400/30 p-4 rounded-xl text-white shadow-lg animate-fade-in">
                  <pre className="whitespace-pre-wrap text-green-100 text-sm">{critique}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
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
        className="w-full p-4 border border-white/20 rounded-xl bg-black/40 text-white placeholder-white/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-green-400/40 transition-all duration-300"
      />
    </div>
  );
} 