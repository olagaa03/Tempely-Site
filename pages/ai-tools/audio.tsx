import { useState } from 'react';
import { Mic, Play, Pause, Download, Volume2, Settings } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function AIAudioPage() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const voices = [
    { id: 'sarah', name: 'Sarah', description: 'Professional female', language: 'English', gender: 'Female' },
    { id: 'mike', name: 'Mike', description: 'Professional male', language: 'English', gender: 'Male' },
    { id: 'emma', name: 'Emma', description: 'Friendly female', language: 'English', gender: 'Female' },
    { id: 'david', name: 'David', description: 'Casual male', language: 'English', gender: 'Male' },
    { id: 'sophie', name: 'Sophie', description: 'British accent', language: 'English', gender: 'Female' },
    { id: 'carlos', name: 'Carlos', description: 'Spanish accent', language: 'Spanish', gender: 'Male' }
  ];

  // TODO: Insert your Text-to-Speech API key below
  const TTS_API_KEY = process.env.NEXT_PUBLIC_TTS_API_KEY || '';

  const handleGenerate = async () => {
    setError('');
    if (!text.trim()) return;
    setIsGenerating(true);
    setAudioUrl('');
    try {
      // Example: Replace with your real TTS API call
      // This is a placeholder for ElevenLabs, Google, or Azure TTS
      // Example for ElevenLabs:
      /*
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': TTS_API_KEY,
        },
        body: JSON.stringify({
          text,
          voice: selectedVoice,
          speed,
        }),
      });
      if (!response.ok) throw new Error('Failed to generate audio');
      const data = await response.json();
      setAudioUrl(data.audio_url);
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 2000));
      setAudioUrl('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
      toast.success('Audio generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate audio.');
      toast.error('Failed to generate audio.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlay = () => {
    if (!audioUrl) return;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `ai-audio-${selectedVoice}.mp3`;
      a.click();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-purple-400 flex items-center justify-center bg-white shadow-lg">
            <Mic className="w-7 h-7 text-purple-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Audio</h1>
            <p className="text-lg text-gray-500">Text-to-speech with natural-sounding voices</p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-purple-600">Audio Settings</h2>
              {/* Text Input */}
              <div>
                <label className="block text-purple-700 font-semibold mb-2">Text to Convert</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter the text you want to convert to speech..."
                  className="w-full h-32 bg-purple-50 border border-purple-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none shadow-sm"
                />
              </div>
              {/* Voice Selection */}
              <div>
                <label className="block text-purple-700 font-semibold mb-2">Voice</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {voices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 ${selectedVoice === voice.id ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-purple-50'}`}
                    >
                      <div className="font-semibold">{voice.name}</div>
                      <div className="text-sm opacity-75">{voice.description}</div>
                      <div className="text-xs opacity-50 mt-1">{voice.language} • {voice.gender}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Speed Control */}
              <div>
                <label className="block text-purple-700 font-semibold mb-2">Speed: {speed}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0.5x</span>
                  <span>1x</span>
                  <span>2x</span>
                </div>
              </div>
              {/* Error Message */}
              {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!text.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Mic className="w-5 h-5 animate-spin" />
                    Generating Audio...
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Generate Audio
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow border border-purple-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-purple-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Natural-sounding voices</li>
                <li>Multiple languages</li>
                <li>Custom speed control</li>
                <li>High-quality export</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold mb-6 text-purple-600">Generated Audio</h2>
              {audioUrl ? (
                <div className="space-y-6">
                  {/* Audio Player */}
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-purple-400 flex items-center justify-center bg-white">
                          <Volume2 className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="text-purple-700 font-semibold">
                            {voices.find(v => v.id === selectedVoice)?.name} Voice
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {voices.find(v => v.id === selectedVoice)?.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {speed}x speed
                      </div>
                    </div>
                    {/* Audio Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={handlePlay}
                        className="w-16 h-16 rounded-full border-2 border-purple-400 flex items-center justify-center bg-white hover:bg-purple-500 hover:text-white transition-all duration-300 shadow"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </button>
                      <audio
                        ref={audioRef}
                        src={audioUrl}
                        onEnded={handleAudioEnded}
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 border border-purple-400 text-purple-600 font-semibold rounded-xl py-3 hover:bg-purple-50 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download Audio
                  </button>
                </div>
              ) : (
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-12 text-center">
                  <Mic className="w-16 h-16 text-purple-200 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Your generated audio will appear here. Start by entering text and selecting a voice.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow border border-purple-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-purple-600">Use Cases</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Voiceovers for videos</li>
                <li>Accessibility for written content</li>
                <li>Language learning</li>
                <li>Podcasting and narration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 