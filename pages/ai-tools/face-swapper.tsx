import { useState, useRef } from 'react';
import { Smile, Download, Sparkles, Loader } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function AIFaceSwapperPage() {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const targetInputRef = useRef<HTMLInputElement>(null);

  // TODO: Insert your Face Swap API key below
  const FACE_API_KEY = process.env.NEXT_PUBLIC_FACE_API_KEY || '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (file: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    setError('');
    if (!sourceImage || !targetImage) return;
    setIsGenerating(true);
    setResultUrl(null);
    try {
      // Example: Replace with your real Face Swap API call
      /*
      const formData = new FormData();
      formData.append('source', sourceImage);
      formData.append('target', targetImage);
      const response = await fetch('https://api.example.com/v1/face-swap', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FACE_API_KEY}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to swap faces');
      const data = await response.json();
      setResultUrl(data.result_url);
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 2500));
      setResultUrl('https://via.placeholder.com/400x400/6366f1/ffffff?text=Swapped+Face');
      toast.success('Face swapped!');
    } catch (err: any) {
      setError(err.message || 'Failed to swap faces.');
      toast.error('Failed to swap faces.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'ai-face-swap.png';
    a.click();
    toast.success('Downloaded!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-purple-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-white shadow-lg">
            <Smile className="w-7 h-7 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Face Swapper</h1>
            <p className="text-lg text-gray-500">Swap faces in photos with a click</p>
          </div>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-yellow-600">Face Swap Settings</h2>
              {/* Source Image Input */}
              <div>
                <label className="block text-yellow-700 font-semibold mb-2">Source Face Image</label>
                <input
                  ref={sourceInputRef}
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, setSourceImage)}
                  className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                {sourceImage && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={URL.createObjectURL(sourceImage)}
                      alt="Source preview"
                      className="w-16 h-16 object-cover rounded-lg border border-yellow-200"
                    />
                    <button
                      className="text-xs text-red-500 underline"
                      onClick={() => {
                        setSourceImage(null);
                        if (sourceInputRef.current) sourceInputRef.current.value = '';
                      }}
                    >Remove</button>
                  </div>
                )}
              </div>
              {/* Target Image Input */}
              <div>
                <label className="block text-yellow-700 font-semibold mb-2">Target Face Image</label>
                <input
                  ref={targetInputRef}
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileChange(e, setTargetImage)}
                  className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-gray-900 focus:outline-none focus:border-yellow-400 transition-colors"
                />
                {targetImage && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={URL.createObjectURL(targetImage)}
                      alt="Target preview"
                      className="w-16 h-16 object-cover rounded-lg border border-yellow-200"
                    />
                    <button
                      className="text-xs text-red-500 underline"
                      onClick={() => {
                        setTargetImage(null);
                        if (targetInputRef.current) targetInputRef.current.value = '';
                      }}
                    >Remove</button>
                  </div>
                )}
              </div>
              {/* Error Message */}
              {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!sourceImage || !targetImage || isGenerating}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-purple-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-yellow-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
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
            <div className="bg-gradient-to-r from-yellow-50 to-purple-50 rounded-2xl shadow border border-yellow-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-yellow-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Instant face swapping</li>
                <li>High-res export</li>
                <li>Works with any photo</li>
                <li>Fun and easy to use</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-yellow-600">Result</h2>
              {resultUrl ? (
                <div className="space-y-4">
                  <img
                    src={resultUrl}
                    alt="Swapped face result"
                    className="w-64 h-64 object-cover rounded-xl border border-yellow-200 mx-auto"
                  />
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 border border-yellow-400 text-yellow-900 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-yellow-50 transition-all mx-auto"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-12 text-center">
                  <Smile className="w-16 h-16 text-yellow-200 mx-auto mb-4" />
                  <p className="text-yellow-700">
                    Your swapped face result will appear here. Upload two images to get started.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-yellow-50 to-purple-50 rounded-2xl shadow border border-yellow-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-yellow-600">Perfect For</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-600 mb-2">Social Media</h4>
                  <p className="text-sm text-gray-500">Create fun face swaps for posts</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-600 mb-2">Entertainment</h4>
                  <p className="text-sm text-gray-500">Make memes and viral content</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-600 mb-2">Events</h4>
                  <p className="text-sm text-gray-500">Swap faces for party fun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 