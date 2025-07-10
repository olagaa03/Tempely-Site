import { useState } from 'react';
import { Image, Sparkles, Download, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

// --- Option Data ---
const AI_MODELS = [
  { id: 'sdxl3', name: 'SDXL 3', img: '/ai-models/sdxl3.jpg' },
  { id: 'flux-schnell', name: 'Flux Schnell', img: '/ai-models/flux-schnell.jpg' },
  { id: 'flux-pro', name: 'Flux Pro', img: '/ai-models/flux-pro.jpg' },
];
const STYLES = [
  { id: 'none', name: 'None', img: '/styles/none.png' },
  { id: '3d', name: '3D model', img: '/styles/3d.jpg' },
  { id: 'analog', name: 'Analog film', img: '/styles/analog.jpg' },
  { id: 'anime', name: 'Anime', img: '/styles/anime.jpg' },
  { id: 'cinematic', name: 'Cinematic', img: '/styles/cinematic.jpg' },
  { id: 'comic', name: 'Comic book', img: '/styles/comic.jpg' },
  { id: 'digital', name: 'Digital art', img: '/styles/digital.jpg' },
  { id: 'enhance', name: 'Enhance', img: '/styles/enhance.jpg' },
  { id: 'fantasy', name: 'Fantasy art', img: '/styles/fantasy.jpg' },
];
const COLORS = [
  { id: 'none', name: 'None', img: '/colors/none.png' },
  { id: 'bw', name: 'Black and white', img: '/colors/bw.jpg' },
  { id: 'muted', name: 'Muted colors', img: '/colors/muted.jpg' },
  { id: 'warm', name: 'Warm tone', img: '/colors/warm.jpg' },
  { id: 'cool', name: 'Cool tone', img: '/colors/cool.jpg' },
  { id: 'vibrant', name: 'Vibrant colors', img: '/colors/vibrant.jpg' },
  { id: 'pastel', name: 'Pastel colors', img: '/colors/pastel.jpg' },
];
const LIGHTING = [
  { id: 'none', name: 'None', img: '/lighting/none.png' },
  { id: 'backlight', name: 'Backlight', img: '/lighting/backlight.jpg' },
  { id: 'crepuscular', name: 'Crepuscular rays', img: '/lighting/crepuscular.jpg' },
  { id: 'dim', name: 'Dimly lit', img: '/lighting/dim.jpg' },
  { id: 'dramatic', name: 'Dramatic', img: '/lighting/dramatic.jpg' },
  { id: 'golden', name: 'Golden hour', img: '/lighting/golden.jpg' },
  { id: 'low', name: 'Low light', img: '/lighting/low.jpg' },
  { id: 'rim', name: 'Rim lighting', img: '/lighting/rim.jpg' },
  { id: 'studio', name: 'Studio', img: '/lighting/studio.jpg' },
];
const COMPOSITION = [
  { id: 'none', name: 'None', img: '/composition/none.png' },
  { id: 'blurry', name: 'Blurry background', img: '/composition/blurry.jpg' },
  { id: 'closeup', name: 'Close up', img: '/composition/closeup.jpg' },
  { id: 'macro', name: 'Macro photography', img: '/composition/macro.jpg' },
  { id: 'narrow', name: 'Narrow depth', img: '/composition/narrow.jpg' },
  { id: 'above', name: 'Shot from above', img: '/composition/above.jpg' },
  { id: 'bottom', name: 'Shot from bottom', img: '/composition/bottom.jpg' },
  { id: 'wide', name: 'Wide angle', img: '/composition/wide.jpg' },
];
const TABS = [
  { id: 'models', label: 'AI Models', options: AI_MODELS },
  { id: 'style', label: 'Style', options: STYLES },
  { id: 'color', label: 'Color', options: COLORS },
  { id: 'lighting', label: 'Lighting', options: LIGHTING },
  { id: 'composition', label: 'Composition', options: COMPOSITION },
];
const RATIOS = [
  { id: '1:1', label: '1:1' },
  { id: '2:3', label: '2:3' },
  { id: '3:2', label: '3:2' },
  { id: '16:9', label: '16:9' },
];

type TabId = 'models' | 'style' | 'color' | 'lighting' | 'composition';
interface SelectedOptions {
  models: string;
  style: string;
  color: string;
  lighting: string;
  composition: string;
}

export default function AIImageMakerPage() {
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState('1:1');
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState<SelectedOptions>({
    models: 'sdxl3',
    style: 'none',
    color: 'none',
    lighting: 'none',
    composition: 'none',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState('');

  // TODO: Insert your Image Generation API key below
  const IMAGE_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API_KEY || '';

  const handleSelect = (tabId: TabId, optionId: string) => {
    setSelected((prev) => ({ ...prev, [tabId]: optionId }));
  };

  const handleGenerate = async () => {
    setError('');
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setImages([]);
    try {
      // Example: Replace with your real Image Generation API call
      /*
      const response = await fetch('https://api.example.com/v1/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${IMAGE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          ratio,
          model: selected.models,
          style: selected.style,
          color: selected.color,
          lighting: selected.lighting,
          composition: selected.composition,
        }),
      });
      if (!response.ok) throw new Error('Failed to generate images');
      const data = await response.json();
      setImages(data.images);
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 2500));
      setImages([
        'https://via.placeholder.com/512x512/ef4444/ffffff?text=Image+1',
        'https://via.placeholder.com/512x512/f59e42/ffffff?text=Image+2',
      ]);
      toast.success('Images generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate images.');
      toast.error('Failed to generate images.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (url: string, idx: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-image-${idx + 1}.png`;
    a.click();
    toast.success('Downloaded!');
  };

  return (
    <div className="flex min-h-screen bg-[#fffbe9]">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-20 bg-[#ffe066] flex flex-col items-center py-8 gap-6 border-r border-yellow-200 min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-yellow-400 rounded-lg p-2 mb-2">
            <Image className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs font-bold text-yellow-900 text-center">AI Image Generator</span>
        </div>
        <nav className="flex flex-col gap-6 mt-8">
          <button className="flex flex-col items-center gap-1 text-yellow-700 hover:text-yellow-900">
            <span className="material-icons">layers</span>
            <span className="text-[10px]">Change Background</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-yellow-700 hover:text-yellow-900">
            <span className="material-icons">brush</span>
            <span className="text-[10px]">AI Draw</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-yellow-700 hover:text-yellow-900">
            <span className="material-icons">history</span>
            <span className="text-[10px]">History</span>
          </button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-8 py-10">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">Start Create Stunning Images With Our All-In-One AI Image Maker</h1>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Botanical flowers background"
            className="w-full h-20 border border-yellow-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none bg-white mb-4"
          />
          {/* Ratio Selection */}
          <div className="flex gap-3 mb-6">
            {RATIOS.map(r => (
              <button
                key={r.id}
                onClick={() => setRatio(r.id)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${ratio === r.id ? 'bg-yellow-400 text-yellow-900 border-yellow-400' : 'bg-white text-yellow-700 border-yellow-200 hover:bg-yellow-50'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
          {/* Tabbed Options */}
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
              className="p-1 rounded-full hover:bg-yellow-100 disabled:opacity-40"
              disabled={activeTab === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 flex gap-2 overflow-x-auto">
              {TABS.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${activeTab === idx ? 'bg-yellow-100 text-yellow-900 border-b-4 border-yellow-400' : 'bg-white text-yellow-700 hover:bg-yellow-50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setActiveTab(Math.min(TABS.length - 1, activeTab + 1))}
              className="p-1 rounded-full hover:bg-yellow-100 disabled:opacity-40"
              disabled={activeTab === TABS.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          {/* Option Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-8">
            {TABS[activeTab].options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect(TABS[activeTab].id as TabId, opt.id)}
                className={`flex flex-col items-center rounded-xl border-2 p-2 transition-all shadow-sm ${selected[TABS[activeTab].id as TabId] === opt.id ? 'border-yellow-400 bg-yellow-50' : 'border-yellow-100 bg-white hover:bg-yellow-50'}`}
              >
                <img
                  src={opt.img}
                  alt={opt.name}
                  className="w-16 h-16 object-cover rounded-lg mb-2 border border-yellow-100"
                  style={{ background: '#fffbe9' }}
                />
                <span className={`text-xs font-semibold ${selected[TABS[activeTab].id as TabId] === opt.id ? 'text-yellow-900' : 'text-gray-700'}`}>{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Generated Images */}
        <div className="w-full max-w-2xl mt-6">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mb-24">
              {images.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt={`Generated image ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-xl border border-yellow-200"
                  />
                  <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <button
                      onClick={() => handleDownload(url, idx)}
                      className="flex items-center gap-2 border border-yellow-400 text-yellow-900 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-yellow-50 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-12 text-center mb-24">
              <Image className="w-16 h-16 text-yellow-200 mx-auto mb-4" />
              <p className="text-yellow-700">
                Your generated images will appear here. Start by describing what you want to create.
              </p>
            </div>
          )}
        </div>
        {/* Sticky Generate Button */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center bg-gradient-to-t from-yellow-50 via-white/80 to-transparent py-6 z-20">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-[340px] max-w-[90vw] flex items-center justify-center gap-3 bg-yellow-400 text-yellow-900 font-bold rounded-xl py-4 shadow-lg text-lg hover:bg-yellow-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate (1 Credit)
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
} 