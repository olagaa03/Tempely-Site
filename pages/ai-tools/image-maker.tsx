import { useState } from 'react';
import { Image, Sparkles, Download, RefreshCw, Settings, Palette } from 'lucide-react';

export default function AIImageMakerPage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState('1:1');

  const styles = [
    { id: 'realistic', name: 'Realistic', description: 'Photorealistic images' },
    { id: 'artistic', name: 'Artistic', description: 'Creative and stylized' },
    { id: 'cartoon', name: 'Cartoon', description: 'Animated and fun' },
    { id: 'abstract', name: 'Abstract', description: 'Modern and conceptual' },
    { id: 'vintage', name: 'Vintage', description: 'Retro and classic' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean and simple' }
  ];

  const aspectRatios = [
    { id: '1:1', name: 'Square', value: '1:1' },
    { id: '16:9', name: 'Landscape', value: '16:9' },
    { id: '9:16', name: 'Portrait', value: '9:16' },
    { id: '4:3', name: 'Standard', value: '4:3' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const mockImages = [
        'https://via.placeholder.com/512x512/6366f1/ffffff?text=Generated+Image+1',
        'https://via.placeholder.com/512x512/8b5cf6/ffffff?text=Generated+Image+2',
        'https://via.placeholder.com/512x512/a855f7/ffffff?text=Generated+Image+3',
        'https://via.placeholder.com/512x512/ec4899/ffffff?text=Generated+Image+4'
      ];
      setGeneratedImages(mockImages);
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownload = (imageUrl: string, index: number) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `ai-generated-image-${index + 1}.png`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <Image className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Image Maker</h1>
            <p className="text-lg text-[var(--text-muted)]">Create stunning visuals from text descriptions</p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Image Settings</h2>
              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">
                  Describe the image you want to create
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A futuristic cityscape with flying cars and neon lights, cinematic lighting..."
                  className="w-full h-32 bg-[var(--glass)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
              </div>
              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((styleOption) => (
                    <button
                      key={styleOption.id}
                      onClick={() => setStyle(styleOption.id)}
                      className={`btn-outline text-left ${style === styleOption.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="font-semibold">{styleOption.name}</div>
                      <div className="text-sm opacity-75">{styleOption.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Aspect Ratio */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Aspect Ratio</label>
                <div className="flex gap-3">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`btn-outline ${aspectRatio === ratio.value ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      {ratio.name}
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
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating Images...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Images
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>Multiple artistic styles</li>
                <li>Custom aspect ratios</li>
                <li>High-resolution output</li>
                <li>Commercial usage rights</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Generated Images</h2>
              {generatedImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl border border-[var(--border)]"
                      />
                      <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(imageUrl, index)}
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
                  <Image className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">
                    Your generated images will appear here. Start by describing what you want to create.
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
                  <p className="text-sm text-[var(--text-muted)]">Create eye-catching visuals for campaigns</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Social Media</h4>
                  <p className="text-sm text-[var(--text-muted)]">Generate unique content for platforms</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Design</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create concept art and mockups</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Content</h4>
                  <p className="text-sm text-[var(--text-muted)]">Illustrate articles and presentations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 