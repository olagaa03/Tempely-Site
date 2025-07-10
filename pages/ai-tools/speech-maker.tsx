import { useState } from 'react';
import { Mic, Download, Sparkles } from 'lucide-react';

export default function AISpeechMakerPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('inspiring');
  const [isGenerating, setIsGenerating] = useState(false);
  const [speech, setSpeech] = useState('');

  const tones = [
    { id: 'inspiring', name: 'Inspiring' },
    { id: 'funny', name: 'Funny' },
    { id: 'serious', name: 'Serious' },
    { id: 'persuasive', name: 'Persuasive' },
    { id: 'emotional', name: 'Emotional' }
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setSpeech(
        `Ladies and gentlemen,\n\nToday, we gather to celebrate the power of AI and creativity. Together, we can achieve greatness. Thank you!`
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([speech], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ai-speech.txt';
    a.click();
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <Mic className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Speech Maker</h1>
            <p className="text-lg text-[var(--text-muted)]">Craft powerful speeches in seconds</p>
          </div>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Speech Settings</h2>
              {/* Topic Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Speech Topic</label>
                <input
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g., The future of AI, Overcoming adversity..."
                  className="w-full bg-[var(--glass)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              {/* Tone Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Tone</label>
                <div className="grid grid-cols-2 gap-3">
                  {tones.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`btn-outline text-left ${tone === t.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="font-semibold">{t.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!topic.trim() || isGenerating}
                className="btn-premium w-full flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Generating Speech...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Speech
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>Multiple speech tones</li>
                <li>Instant speech generation</li>
                <li>Download as text</li>
                <li>Perfect for events</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Generated Speech</h2>
              {speech ? (
                <div className="space-y-4">
                  <pre className="bg-[var(--glass)] border border-[var(--border)] rounded-xl p-6 whitespace-pre-wrap text-[var(--text-main)] text-base font-medium min-h-[180px]">{speech}</pre>
                  <button
                    onClick={handleDownload}
                    className="btn-outline flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ) : (
                <div className="bg-[var(--glass)] border border-[var(--border)] rounded-xl p-12 text-center">
                  <Mic className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">
                    Your generated speech will appear here. Start by entering a topic.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Perfect For</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Events</h4>
                  <p className="text-sm text-[var(--text-muted)]">Craft memorable event speeches</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Business</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create persuasive business talks</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Education</h4>
                  <p className="text-sm text-[var(--text-muted)]">Write inspiring lectures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 