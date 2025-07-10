import { useState } from 'react';
import { Gem, Download, Sparkles } from 'lucide-react';

export default function AILogoMakerPage() {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('tech');
  const [style, setStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logos, setLogos] = useState<string[]>([]);

  const industries = [
    { id: 'tech', name: 'Tech' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'food', name: 'Food' },
    { id: 'finance', name: 'Finance' },
    { id: 'health', name: 'Health' },
    { id: 'creative', name: 'Creative' }
  ];

  const styles = [
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'classic', name: 'Classic' },
    { id: 'playful', name: 'Playful' },
    { id: 'luxury', name: 'Luxury' }
  ];

  const handleGenerate = async () => {
    if (!brandName.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setLogos([
        'https://via.placeholder.com/400x400/6366f1/ffffff?text=Logo+1',
        'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Logo+2',
        'https://via.placeholder.com/400x400/a855f7/ffffff?text=Logo+3',
      ]);
      setIsGenerating(false);
    }, 2500);
  };

  const handleDownload = (url: string, idx: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-logo-${industry}-${idx + 1}.png`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <Gem className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Logo Maker</h1>
            <p className="text-lg text-[var(--text-muted)]">Create unique, professional logos for your brand</p>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Logo Settings</h2>
              {/* Brand Name Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Brand Name</label>
                <input
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  placeholder="e.g., Tempely, Nova, PixelFox..."
                  className="w-full bg-[var(--glass)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              {/* Industry Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Industry</label>
                <div className="grid grid-cols-2 gap-3">
                  {industries.map(i => (
                    <button
                      key={i.id}
                      onClick={() => setIndustry(i.id)}
                      className={`btn-outline text-left ${industry === i.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="font-semibold">{i.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`btn-outline text-left ${style === s.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="font-semibold">{s.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!brandName.trim() || isGenerating}
                className="btn-premium w-full flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Generating Logos...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Logos
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>Multiple logo styles</li>
                <li>Industry-specific icons</li>
                <li>High-res export</li>
                <li>Instant results</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Generated Logos</h2>
              {logos.length > 0 ? (
                <div className="space-y-4">
                  {logos.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Generated logo ${idx + 1}`}
                        className="w-40 h-40 object-contain rounded-xl border border-[var(--border)] mx-auto"
                      />
                      <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(url, idx)}
                          className="btn-outline flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--glass)] border border-[var(--border)] rounded-xl p-12 text-center">
                  <Gem className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">
                    Your generated logos will appear here. Start by entering your brand name.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Startups</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create a brand identity in minutes</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Agencies</h4>
                  <p className="text-sm text-[var(--text-muted)]">Deliver logo options to clients</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Freelancers</h4>
                  <p className="text-sm text-[var(--text-muted)]">Quickly generate logo ideas</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Events</h4>
                  <p className="text-sm text-[var(--text-muted)]">Design event or campaign logos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 