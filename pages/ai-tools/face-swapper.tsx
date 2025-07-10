import { useState } from 'react';
import { Smile, Download, Sparkles } from 'lucide-react';

export default function AIFaceSwapperPage() {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (file: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!sourceImage || !targetImage) return;
    setIsGenerating(true);
    setTimeout(() => {
      setResultUrl('https://via.placeholder.com/400x400/6366f1/ffffff?text=Swapped+Face');
      setIsGenerating(false);
    }, 2500);
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'ai-face-swap.png';
    a.click();
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <Smile className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Face Swapper</h1>
            <p className="text-lg text-[var(--text-muted)]">Swap faces in photos with a click</p>
          </div>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Face Swap Settings</h2>
              {/* Source Image Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Source Face Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, setSourceImage)}
                  className="w-full bg-[var(--glass)] border border-[var(--border)] rounded-xl p-3 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              {/* Target Image Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Target Face Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, setTargetImage)}
                  className="w-full bg-[var(--glass)] border border-[var(--border)] rounded-xl p-3 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!sourceImage || !targetImage || isGenerating}
                className="btn-premium w-full flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Swapping Faces...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Swap Faces
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>Instant face swapping</li>
                <li>High-res export</li>
                <li>Works with any photo</li>
                <li>Fun and easy to use</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Result</h2>
              {resultUrl ? (
                <div className="space-y-4">
                  <img
                    src={resultUrl}
                    alt="Swapped face result"
                    className="w-64 h-64 object-cover rounded-xl border border-[var(--border)] mx-auto"
                  />
                  <button
                    onClick={handleDownload}
                    className="btn-outline flex items-center gap-2 mx-auto"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ) : (
                <div className="bg-[var(--glass)] border border-[var(--border)] rounded-xl p-12 text-center">
                  <Smile className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">
                    Your swapped face result will appear here. Upload two images to get started.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Perfect For</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Social Media</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create fun face swaps for posts</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Entertainment</h4>
                  <p className="text-sm text-[var(--text-muted)]">Make memes and viral content</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Events</h4>
                  <p className="text-sm text-[var(--text-muted)]">Swap faces for party fun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 