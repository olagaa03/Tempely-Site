import { useState } from 'react';
import { Film, Download, Sparkles, Loader } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function AIVideoMakerPage() {
  const [script, setScript] = useState('');
  const [style, setStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  // TODO: Insert your Video Generation API key below
  const VIDEO_API_KEY = process.env.NEXT_PUBLIC_VIDEO_API_KEY || '';

  const styles = [
    { id: 'modern', name: 'Modern' },
    { id: 'cinematic', name: 'Cinematic' },
    { id: 'animated', name: 'Animated' },
    { id: 'minimal', name: 'Minimal' }
  ];

  const handleGenerate = async () => {
    setError('');
    if (!script.trim()) return;
    setIsGenerating(true);
    setVideoUrl(null);
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script, style }),
      });
      if (!response.ok) throw new Error('Failed to generate video');
      const data = await response.json();
      setVideoUrl(data.videoUrl);
      toast.success('Video generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate video.');
      toast.error('Failed to generate video.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'ai-video.mp4';
    a.click();
    toast.success('Downloaded!');
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
            <Film className="w-7 h-7 text-pink-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Video Maker</h1>
            <p className="text-lg text-gray-500">Turn scripts into videos in minutes</p>
          </div>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-pink-600">Video Settings</h2>
              {/* Script Input */}
              <div>
                <label className="block text-pink-700 font-semibold mb-2">Script</label>
                <textarea
                  value={script}
                  onChange={e => setScript(e.target.value)}
                  placeholder="e.g., Introducing our new product..."
                  className="w-full h-28 bg-pink-50 border border-pink-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors resize-none"
                />
              </div>
              {/* Style Selection */}
              <div>
                <label className="block text-pink-700 font-semibold mb-2">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 ${style === s.id ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-pink-50'}`}
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
                disabled={!script.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Video
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow border border-pink-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-pink-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Multiple video styles</li>
                <li>Instant video generation</li>
                <li>Download as MP4</li>
                <li>Perfect for marketing</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-pink-600">Generated Video</h2>
              {videoUrl ? (
                <div className="space-y-4">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-64 object-cover rounded-xl border border-pink-200"
                  />
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 border border-pink-400 text-pink-900 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-pink-50 transition-all mx-auto"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ) : (
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-12 text-center">
                  <Film className="w-16 h-16 text-pink-200 mx-auto mb-4" />
                  <p className="text-pink-700">
                    Your generated video will appear here. Start by entering a script.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow border border-pink-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-pink-600">Perfect For</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-600 mb-2">Marketing</h4>
                  <p className="text-sm text-gray-500">Create product promo videos</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-600 mb-2">Social Media</h4>
                  <p className="text-sm text-gray-500">Generate engaging video content</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-600 mb-2">Education</h4>
                  <p className="text-sm text-gray-500">Produce explainer videos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 