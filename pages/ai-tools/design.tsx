import { useState } from 'react';
import { Palette, Download, Sparkles } from 'lucide-react';

export default function AIDesignPage() {
  const [designType, setDesignType] = useState('social');
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);

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
    if (!description.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const mockDesigns = [
        'https://via.placeholder.com/800x600/6366f1/ffffff?text=Design+1',
        'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Design+2',
        'https://via.placeholder.com/800x600/a855f7/ffffff?text=Design+3',
        'https://via.placeholder.com/800x600/ec4899/ffffff?text=Design+4'
      ];
      setGeneratedDesigns(mockDesigns);
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownload = (designUrl: string, index: number) => {
    const a = document.createElement('a');
    a.href = designUrl;
    a.download = `ai-design-${designType}-${index + 1}.png`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <Palette className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Design</h1>
            <p className="text-lg text-[var(--text-muted)]">Generate stunning layouts and designs instantly</p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Design Settings</h2>
              {/* Design Type Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Design Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {designTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setDesignType(type.id)}
                      className={`btn-outline text-left ${designType === type.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="font-semibold">{type.name}</div>
                      <div className="text-sm opacity-75">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Description Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Describe your design</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., A modern social media post for a coffee shop with warm colors, featuring a latte art and cozy atmosphere..."
                  className="w-full h-32 bg-[var(--glass)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
              </div>
              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`btn-outline text-left ${selectedStyle === style.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="font-semibold">{style.name}</div>
                      <div className="text-sm opacity-75">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!description.trim() || isGenerating}
                className="btn-premium w-full flex items-center justify-center gap-3"
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
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>Smart layout generation</li>
                <li>Multiple style presets</li>
                <li>Brand consistency</li>
                <li>Export ready formats</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Generated Designs</h2>
              {generatedDesigns.length > 0 ? (
                <div className="space-y-4">
                  {generatedDesigns.map((designUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={designUrl}
                        alt={`Generated design ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl border border-[var(--border)]"
                      />
                      <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(designUrl, index)}
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
                  <Palette className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">
                    Your generated designs will appear here. Start by describing what you want to create.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Marketing</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create campaign visuals and ads</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Social Media</h4>
                  <p className="text-sm text-[var(--text-muted)]">Generate engaging post designs</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Branding</h4>
                  <p className="text-sm text-[var(--text-muted)]">Design logos and brand elements</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Events</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create posters and invitations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 