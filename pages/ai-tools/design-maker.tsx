import { useState } from 'react';
import { Sparkles, Download, Image } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function DesignMakerPage() {
  const [prompt, setPrompt] = useState('');
  const [template, setTemplate] = useState('banner');
  const [style, setStyle] = useState('vibrant');
  const [isGenerating, setIsGenerating] = useState(false);
  const [designs, setDesigns] = useState<string[]>([]);
  const [error, setError] = useState('');

  // TODO: Insert your Design Maker API key below
  const DESIGN_MAKER_API_KEY = process.env.NEXT_PUBLIC_DESIGN_MAKER_API_KEY || '';

  const templates = [
    { id: 'banner', name: 'Banner', description: 'Web banners, hero images' },
    { id: 'flyer', name: 'Flyer', description: 'Event or promo flyers' },
    { id: 'social', name: 'Social Post', description: 'Instagram, Facebook, Twitter' },
    { id: 'ad', name: 'Ad', description: 'Ad creatives for campaigns' },
    { id: 'card', name: 'Card', description: 'Business or promo cards' },
  ];

  const styles = [
    { id: 'vibrant', name: 'Vibrant', description: 'Bold, colorful, eye-catching' },
    { id: 'minimal', name: 'Minimal', description: 'Clean, simple, modern' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated, premium' },
    { id: 'retro', name: 'Retro', description: 'Vintage, nostalgic' },
    { id: 'corporate', name: 'Corporate', description: 'Professional, business' },
  ];

  const handleGenerate = async () => {
    setError('');
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setDesigns([]);
    try {
      // Example: Replace with your real Design Maker API call
      /*
      const response = await fetch('https://api.example.com/v1/design-maker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DESIGN_MAKER_API_KEY}`,
        },
        body: JSON.stringify({
          template,
          style,
          prompt,
        }),
      });
      if (!response.ok) throw new Error('Failed to generate designs');
      const data = await response.json();
      setDesigns(data.images);
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 2500));
      setDesigns([
        'https://via.placeholder.com/800x400/ef4444/ffffff?text=Design+1',
        'https://via.placeholder.com/800x400/f59e42/ffffff?text=Design+2',
      ]);
      toast.success('Designs generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate designs.');
      toast.error('Failed to generate designs.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (url: string, idx: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-maker-${template}-${idx + 1}.png`;
    a.click();
    toast.success('Downloaded!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-yellow-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-rose-400 flex items-center justify-center bg-white shadow-lg">
            <Image className="w-7 h-7 text-rose-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">Design Maker</h1>
            <p className="text-lg text-gray-500">Dynamic visual content generator for marketing materials</p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-rose-600">Design Maker Settings</h2>
              {/* Template Selection */}
              <div>
                <label className="block text-rose-700 font-semibold mb-2">Template</label>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${template === t.id ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-rose-50'}`}
                    >
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm opacity-75">{t.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Prompt Input */}
              <div>
                <label className="block text-rose-700 font-semibold mb-2">Describe your design</label>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="e.g., A vibrant summer sale banner with bold text and tropical elements..."
                  className="w-full h-28 bg-rose-50 border border-rose-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-400 transition-colors resize-none shadow-sm"
                />
              </div>
              {/* Style Selection */}
              <div>
                <label className="block text-rose-700 font-semibold mb-2">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${style === s.id ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-rose-50'}`}
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
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-rose-500 to-yellow-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-rose-600 hover:to-yellow-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Generating Designs...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Designs
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="bg-gradient-to-r from-rose-50 to-yellow-50 rounded-2xl shadow border border-rose-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-rose-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Dynamic marketing visuals</li>
                <li>Multiple templates & styles</li>
                <li>High-res export</li>
                <li>Instant results</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-rose-600">Generated Designs</h2>
              {designs.length > 0 ? (
                <div className="space-y-4">
                  {designs.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Generated design ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-xl border border-rose-200"
                      />
                      <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(url, idx)}
                          className="flex items-center gap-2 border border-rose-400 text-rose-600 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-rose-50 transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-12 text-center">
                  <Image className="w-16 h-16 text-rose-200 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Your generated designs will appear here. Start by describing what you want to create.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-rose-50 to-yellow-50 rounded-2xl shadow border border-rose-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-rose-600">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-50 rounded-lg">
                  <h4 className="font-semibold text-rose-600 mb-2">Campaigns</h4>
                  <p className="text-sm text-gray-500">Create visuals for marketing campaigns</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg">
                  <h4 className="font-semibold text-rose-600 mb-2">Social Media</h4>
                  <p className="text-sm text-gray-500">Generate engaging post designs</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg">
                  <h4 className="font-semibold text-rose-600 mb-2">Events</h4>
                  <p className="text-sm text-gray-500">Design flyers and banners for events</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg">
                  <h4 className="font-semibold text-rose-600 mb-2">Ads</h4>
                  <p className="text-sm text-gray-500">Create ad creatives for promotions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 