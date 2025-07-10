import { useState } from 'react';
import { Palette, Download, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function AIDesignPage() {
  const [designType, setDesignType] = useState('social');
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);
  const [error, setError] = useState('');

  // TODO: Insert your Design Generation API key below
  const DESIGN_API_KEY = process.env.NEXT_PUBLIC_DESIGN_API_KEY || '';

  const designTypes = [
    { id: 'social', name: 'Social Media', description: 'Instagram, Facebook, Twitter posts' },
    { id: 'banner', name: 'Banner', description: 'Website headers and banners' },
    { id: 'card', name: 'Card', description: 'Business cards and flyers' },
    { id: 'poster', name: 'Poster', description: 'Event posters and announcements' },
    { id: 'logo', name: 'Logo', description: 'Brand logos and icons' },
    { id: 'presentation', name: 'Presentation', description: 'Slide backgrounds and layouts' }
  ];

  const styles = [
    { id: 'modern', name: 'Modern', description: 'Clean and minimalist' },
    { id: 'vintage', name: 'Vintage', description: 'Retro and classic' },
    { id: 'bold', name: 'Bold', description: 'High contrast and dramatic' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined' },
    { id: 'playful', name: 'Playful', description: 'Fun and colorful' },
    { id: 'corporate', name: 'Corporate', description: 'Professional and business-like' }
  ];

  const handleGenerate = async () => {
    setError('');
    if (!description.trim()) return;
    setIsGenerating(true);
    setGeneratedDesigns([]);
    try {
      // Example: Replace with your real Design Generation API call
      // This is a placeholder for Stable Diffusion, DALL·E, etc.
      /*
      const response = await fetch('https://api.example.com/v1/generate-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DESIGN_API_KEY}`,
        },
        body: JSON.stringify({
          type: designType,
          style: selectedStyle,
          prompt: description,
        }),
      });
      if (!response.ok) throw new Error('Failed to generate designs');
      const data = await response.json();
      setGeneratedDesigns(data.images);
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 3000));
      const mockDesigns = [
        'https://via.placeholder.com/800x600/6366f1/ffffff?text=Design+1',
        'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Design+2',
        'https://via.placeholder.com/800x600/a855f7/ffffff?text=Design+3',
        'https://via.placeholder.com/800x600/ec4899/ffffff?text=Design+4'
      ];
      setGeneratedDesigns(mockDesigns);
      toast.success('Designs generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate designs.');
      toast.error('Failed to generate designs.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (designUrl: string, index: number) => {
    const a = document.createElement('a');
    a.href = designUrl;
    a.download = `ai-design-${designType}-${index + 1}.png`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-pink-400 flex items-center justify-center bg-white shadow-lg">
            <Palette className="w-7 h-7 text-pink-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Design</h1>
            <p className="text-lg text-gray-500">Generate stunning layouts and designs instantly</p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-pink-600">Design Settings</h2>
              {/* Design Type Selection */}
              <div>
                <label className="block text-pink-700 font-semibold mb-2">Design Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {designTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setDesignType(type.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 ${designType === type.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-pink-50'}`}
                    >
                      <div className="font-semibold">{type.name}</div>
                      <div className="text-sm opacity-75">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Description Input */}
              <div>
                <label className="block text-pink-700 font-semibold mb-2">Describe your design</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., A modern social media post for a coffee shop with warm colors, featuring a latte art and cozy atmosphere..."
                  className="w-full h-32 bg-pink-50 border border-pink-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors resize-none shadow-sm"
                />
              </div>
              {/* Style Selection */}
              <div>
                <label className="block text-pink-700 font-semibold mb-2">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 ${selectedStyle === style.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-pink-50'}`}
                    >
                      <div className="font-semibold">{style.name}</div>
                      <div className="text-sm opacity-75">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Error Message */}
              {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!description.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow border border-pink-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-pink-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Smart layout generation</li>
                <li>Multiple style presets</li>
                <li>Brand consistency</li>
                <li>Export ready formats</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-pink-600">Generated Designs</h2>
              {generatedDesigns.length > 0 ? (
                <div className="space-y-4">
                  {generatedDesigns.map((designUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={designUrl}
                        alt={`Generated design ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl border border-pink-200"
                      />
                      <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(designUrl, index)}
                          className="flex items-center gap-2 border border-pink-400 text-pink-600 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-pink-50 transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-12 text-center">
                  <Palette className="w-16 h-16 text-pink-200 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Your generated designs will appear here. Start by describing what you want to create.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow border border-pink-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-pink-600">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-600 mb-2">Marketing</h4>
                  <p className="text-sm text-gray-500">Create campaign visuals and ads</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-600 mb-2">Social Media</h4>
                  <p className="text-sm text-gray-500">Generate engaging post designs</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-600 mb-2">Branding</h4>
                  <p className="text-sm text-gray-500">Design logos and brand elements</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-600 mb-2">Events</h4>
                  <p className="text-sm text-gray-500">Create posters and invitations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 