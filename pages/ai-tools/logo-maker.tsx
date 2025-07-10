import { useState } from 'react';
import { Gem, Download, Sparkles, Loader } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function AILogoMakerPage() {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('tech');
  const [style, setStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logos, setLogos] = useState<string[]>([]);
  const [error, setError] = useState('');

  // TODO: Insert your Logo Generation API key below
  const LOGO_API_KEY = process.env.NEXT_PUBLIC_LOGO_API_KEY || '';

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
    setError('');
    if (!brandName.trim()) return;
    setIsGenerating(true);
    setLogos([]);
    try {
      // Example: Replace with your real Logo Generation API call
      /*
      const response = await fetch('https://api.example.com/v1/generate-logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LOGO_API_KEY}`,
        },
        body: JSON.stringify({
          brand: brandName,
          industry,
          style,
        }),
      });
      if (!response.ok) throw new Error('Failed to generate logos');
      const data = await response.json();
      setLogos(data.logos);
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 2500));
      setLogos([
        'https://via.placeholder.com/400x400/6366f1/ffffff?text=Logo+1',
        'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Logo+2',
        'https://via.placeholder.com/400x400/a855f7/ffffff?text=Logo+3',
      ]);
      toast.success('Logos generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate logos.');
      toast.error('Failed to generate logos.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (url: string, idx: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-logo-${industry}-${idx + 1}.png`;
    a.click();
    toast.success('Downloaded!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-indigo-400 flex items-center justify-center bg-white shadow-lg">
            <Gem className="w-7 h-7 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Logo Maker</h1>
            <p className="text-lg text-gray-500">Create unique, professional logos for your brand</p>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-indigo-600">Logo Settings</h2>
              {/* Brand Name Input */}
              <div>
                <label className="block text-indigo-700 font-semibold mb-2">Brand Name</label>
                <input
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  placeholder="e.g., Tempely, Nova, PixelFox..."
                  className="w-full bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
                />
              </div>
              {/* Industry Selection */}
              <div>
                <label className="block text-indigo-700 font-semibold mb-2">Industry</label>
                <div className="grid grid-cols-2 gap-3">
                  {industries.map(i => (
                    <button
                      key={i.id}
                      onClick={() => setIndustry(i.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${industry === i.id ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-indigo-50'}`}
                    >
                      <div className="font-semibold">{i.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Style Selection */}
              <div>
                <label className="block text-indigo-700 font-semibold mb-2">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${style === s.id ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-indigo-50'}`}
                    >
                      <div className="font-semibold">{s.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Error Message */}
              {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!brandName.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
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
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow border border-indigo-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-indigo-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Multiple logo styles</li>
                <li>Industry-specific icons</li>
                <li>High-res export</li>
                <li>Instant results</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-indigo-600">Generated Logos</h2>
              {logos.length > 0 ? (
                <div className="space-y-4">
                  {logos.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Generated logo ${idx + 1}`}
                        className="w-40 h-40 object-contain rounded-xl border border-indigo-200 mx-auto"
                      />
                      <div className="absolute inset-0 bg-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(url, idx)}
                          className="flex items-center gap-2 border border-indigo-400 text-indigo-900 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-indigo-50 transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-12 text-center">
                  <Gem className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Your generated logos will appear here. Start by entering your brand name.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow border border-indigo-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-indigo-600">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Startups</h4>
                  <p className="text-sm text-gray-500">Create a brand identity in minutes</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Agencies</h4>
                  <p className="text-sm text-gray-500">Deliver logo options to clients</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Freelancers</h4>
                  <p className="text-sm text-gray-500">Quickly generate logo ideas</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Events</h4>
                  <p className="text-sm text-gray-500">Design event or campaign logos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 