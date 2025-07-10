import { useState } from 'react';
import { Mic, Download, Sparkles, Loader } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function AISpeechMakerPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('inspiring');
  const [isGenerating, setIsGenerating] = useState(false);
  const [speech, setSpeech] = useState('');
  const [error, setError] = useState('');

  // TODO: Insert your Speech Generation API key below
  const SPEECH_API_KEY = process.env.NEXT_PUBLIC_SPEECH_API_KEY || '';

  const tones = [
    { id: 'inspiring', name: 'Inspiring' },
    { id: 'funny', name: 'Funny' },
    { id: 'serious', name: 'Serious' },
    { id: 'persuasive', name: 'Persuasive' },
    { id: 'emotional', name: 'Emotional' }
  ];

  const handleGenerate = async () => {
    setError('');
    if (!topic.trim()) return;
    setIsGenerating(true);
    setSpeech('');
    try {
      const response = await fetch('/api/generate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone }),
      });
      if (!response.ok) throw new Error('Failed to generate speech');
      const data = await response.json();
      setSpeech(data.speech);
      toast.success('Speech generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate speech.');
      toast.error('Failed to generate speech.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([speech], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ai-speech.txt';
    a.click();
    toast.success('Downloaded!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-green-400 flex items-center justify-center bg-white shadow-lg">
            <Mic className="w-7 h-7 text-green-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Speech Maker</h1>
            <p className="text-lg text-gray-500">Craft powerful speeches in seconds</p>
          </div>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-green-600">Speech Settings</h2>
              {/* Topic Input */}
              <div>
                <label className="block text-green-700 font-semibold mb-2">Speech Topic</label>
                <input
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g., The future of AI, Overcoming adversity..."
                  className="w-full bg-green-50 border border-green-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                />
              </div>
              {/* Tone Selection */}
              <div>
                <label className="block text-green-700 font-semibold mb-2">Tone</label>
                <div className="grid grid-cols-2 gap-3">
                  {tones.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 ${tone === t.id ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-green-50'}`}
                    >
                      <div className="font-semibold">{t.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Error Message */}
              {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!topic.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-purple-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-green-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating Speech...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Speech
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow border border-green-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-green-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Multiple speech tones</li>
                <li>Instant speech generation</li>
                <li>Download as text</li>
                <li>Perfect for events</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-green-600">Generated Speech</h2>
              {speech ? (
                <div className="space-y-4">
                  <pre className="bg-green-50 border border-green-200 rounded-xl p-6 whitespace-pre-wrap text-gray-900 text-base font-medium min-h-[180px]">{speech}</pre>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 border border-green-400 text-green-900 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-green-50 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-12 text-center">
                  <Mic className="w-16 h-16 text-green-200 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Your generated speech will appear here. Start by entering a topic.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl shadow border border-green-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-green-600">Perfect For</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Events</h4>
                  <p className="text-sm text-gray-500">Craft memorable event speeches</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Business</h4>
                  <p className="text-sm text-gray-500">Create persuasive business talks</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">Education</h4>
                  <p className="text-sm text-gray-500">Write inspiring lectures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 