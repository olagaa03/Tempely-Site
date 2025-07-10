import { useState } from 'react';
import { PencilRuler, Download, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function AIDrawPage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('sketch');
  const [isGenerating, setIsGenerating] = useState(false);
  const [drawings, setDrawings] = useState<string[]>([]);
  const [error, setError] = useState('');

  // TODO: Insert your Drawing Generation API key below
  const DRAW_API_KEY = process.env.NEXT_PUBLIC_DRAW_API_KEY || '';

  const styles = [
    { id: 'sketch', name: 'Sketch', description: 'Hand-drawn, pencil style' },
    { id: 'ink', name: 'Ink', description: 'Bold, black ink lines' },
    { id: 'color', name: 'Color', description: 'Vivid, colored drawing' },
    { id: 'cartoon', name: 'Cartoon', description: 'Playful, cartoonish' },
    { id: 'realistic', name: 'Realistic', description: 'Detailed, lifelike' }
  ];

  const handleGenerate = async () => {
    setError('');
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setDrawings([]);
    try {
      // Example: Replace with your real Drawing Generation API call
      // This is a placeholder for Stable Diffusion, DALL·E, etc.
      /*
      const response = await fetch('https://api.example.com/v1/generate-drawing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DRAW_API_KEY}`,
        },
        body: JSON.stringify({
          style,
          prompt,
        }),
      });
      if (!response.ok) throw new Error('Failed to generate drawings');
      const data = await response.json();
      setDrawings(data.images);
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 2500));
      setDrawings([
        'https://via.placeholder.com/600x400/6366f1/ffffff?text=Drawing+1',
        'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Drawing+2',
      ]);
      toast.success('Drawings generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate drawings.');
      toast.error('Failed to generate drawings.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (url: string, idx: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-draw-${style}-${idx + 1}.png`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-orange-400 flex items-center justify-center bg-white shadow-lg">
            <PencilRuler className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Draw</h1>
            <p className="text-lg text-gray-500">Turn your ideas into unique drawings instantly</p>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-orange-600">Drawing Settings</h2>
              {/* Prompt Input */}
              <div>
                <label className="block text-orange-700 font-semibold mb-2">Describe your drawing</label>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="e.g., A cat riding a skateboard in a city park, cartoon style..."
                  className="w-full h-28 bg-orange-50 border border-orange-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors resize-none shadow-sm"
                />
              </div>
              {/* Style Selection */}
              <div>
                <label className="block text-orange-700 font-semibold mb-2">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 ${style === s.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-orange-50'}`}
                    >
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-sm opacity-75">{s.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Error Message */}
              {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-orange-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl shadow border border-orange-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-orange-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Hand-drawn and digital styles</li>
                <li>Multiple drawing presets</li>
                <li>High-res export</li>
                <li>Instant results</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-orange-600">Generated Drawings</h2>
              {drawings.length > 0 ? (
                <div className="space-y-4">
                  {drawings.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Generated drawing ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-xl border border-orange-200"
                      />
                      <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(url, idx)}
                          className="flex items-center gap-2 border border-orange-400 text-orange-600 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-orange-50 transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-12 text-center">
                  <PencilRuler className="w-16 h-16 text-orange-200 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Your generated drawings will appear here. Start by describing what you want to create.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl shadow border border-orange-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-orange-600">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-600 mb-2">Concept Art</h4>
                  <p className="text-sm text-gray-500">Visualize ideas and characters</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-600 mb-2">Storyboards</h4>
                  <p className="text-sm text-gray-500">Create quick story panels</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-600 mb-2">Children's Books</h4>
                  <p className="text-sm text-gray-500">Illustrate playful scenes</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-600 mb-2">Marketing</h4>
                  <p className="text-sm text-gray-500">Create unique campaign visuals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 