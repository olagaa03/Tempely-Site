import { useState } from 'react';
import { PencilRuler, Download, Sparkles } from 'lucide-react';

export default function AIDrawPage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('sketch');
  const [isGenerating, setIsGenerating] = useState(false);
  const [drawings, setDrawings] = useState<string[]>([]);

  const styles = [
    { id: 'sketch', name: 'Sketch', description: 'Hand-drawn, pencil style' },
    { id: 'ink', name: 'Ink', description: 'Bold, black ink lines' },
    { id: 'color', name: 'Color', description: 'Vivid, colored drawing' },
    { id: 'cartoon', name: 'Cartoon', description: 'Playful, cartoonish' },
    { id: 'realistic', name: 'Realistic', description: 'Detailed, lifelike' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setDrawings([
        'https://via.placeholder.com/600x400/6366f1/ffffff?text=Drawing+1',
        'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Drawing+2',
      ]);
      setIsGenerating(false);
    }, 2500);
  };

  const handleDownload = (url: string, idx: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-draw-${style}-${idx + 1}.png`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <PencilRuler className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Draw</h1>
            <p className="text-lg text-[var(--text-muted)]">Turn your ideas into unique drawings instantly</p>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Drawing Settings</h2>
              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Describe your drawing</label>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="e.g., A cat riding a skateboard in a city park, cartoon style..."
                  className="w-full h-28 bg-[var(--glass)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
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
                      <div className="text-sm opacity-75">{s.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="btn-premium w-full flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Generating Drawing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Drawing
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>Hand-drawn and digital styles</li>
                <li>Multiple drawing presets</li>
                <li>High-res export</li>
                <li>Instant results</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Generated Drawings</h2>
              {drawings.length > 0 ? (
                <div className="space-y-4">
                  {drawings.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Generated drawing ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-xl border border-[var(--border)]"
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
                  <PencilRuler className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">
                    Your generated drawings will appear here. Start by describing what you want to create.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Concept Art</h4>
                  <p className="text-sm text-[var(--text-muted)]">Visualize ideas and characters</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Storyboards</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create quick story panels</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Children's Books</h4>
                  <p className="text-sm text-[var(--text-muted)]">Illustrate playful scenes</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Marketing</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create unique campaign visuals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 