import { useState } from 'react';
import { Mic, Play, Pause, Download, Volume2, Settings } from 'lucide-react';

export default function AIAudioPage() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [speed, setSpeed] = useState(1);

  const voices = [
    { id: 'sarah', name: 'Sarah', description: 'Professional female', language: 'English', gender: 'Female' },
    { id: 'mike', name: 'Mike', description: 'Professional male', language: 'English', gender: 'Male' },
    { id: 'emma', name: 'Emma', description: 'Friendly female', language: 'English', gender: 'Female' },
    { id: 'david', name: 'David', description: 'Casual male', language: 'English', gender: 'Male' },
    { id: 'sophie', name: 'Sophie', description: 'British accent', language: 'English', gender: 'Female' },
    { id: 'carlos', name: 'Carlos', description: 'Spanish accent', language: 'Spanish', gender: 'Male' }
  ];

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAudioUrl('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
      setIsGenerating(false);
    }, 2000);
  };

  const handlePlay = () => {
    if (audioUrl) {
      setIsPlaying(!isPlaying);
    }
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
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <Mic className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Audio</h1>
            <p className="text-lg text-[var(--text-muted)]">Text-to-speech with natural-sounding voices</p>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Audio Settings</h2>
              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Text to Convert</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter the text you want to convert to speech..."
                  className="w-full h-32 bg-[var(--glass)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
              </div>
              {/* Voice Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Voice</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {voices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`btn-outline text-left ${selectedVoice === voice.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="font-semibold">{voice.name}</div>
                      <div className="text-sm opacity-75">{voice.description}</div>
                      <div className="text-xs opacity-50 mt-1">{voice.language} • {voice.gender}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Speed Control */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Speed: {speed}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[var(--glass)] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                  <span>0.5x</span>
                  <span>1x</span>
                  <span>2x</span>
                </div>
              </div>
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!text.trim() || isGenerating}
                className="btn-premium w-full flex items-center justify-center gap-3"
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
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>Natural-sounding voices</li>
                <li>Multiple languages</li>
                <li>Custom speed control</li>
                <li>High-quality export</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Generated Audio</h2>
              {audioUrl ? (
                <div className="space-y-6">
                  {/* Audio Player */}
                  <div className="bg-[var(--glass)] border border-[var(--border)] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
                          <Volume2 className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                        <div>
                          <h3 className="text-[var(--accent-3)] font-semibold">
                            {voices.find(v => v.id === selectedVoice)?.name} Voice
                          </h3>
                          <p className="text-[var(--text-muted)] text-sm">
                            {voices.find(v => v.id === selectedVoice)?.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        {speed}x speed
                      </div>
                    </div>
                    {/* Audio Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={handlePlay}
                        className="w-16 h-16 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="btn-outline w-full flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Audio
                  </button>
                </div>
              ) : (
                <div className="bg-[var(--glass)] border border-[var(--border)] rounded-xl p-12 text-center">
                  <Mic className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">
                    Your generated audio will appear here. Start by entering text and selecting a voice.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Podcasts</h4>
                  <p className="text-sm text-[var(--text-muted)]">Generate voiceovers and intros</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Videos</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create professional narrations</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Accessibility</h4>
                  <p className="text-sm text-[var(--text-muted)]">Convert text to speech for accessibility</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">E-learning</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create educational audio content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 