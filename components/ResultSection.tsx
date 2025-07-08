import { ClipboardCopy, RefreshCw } from 'lucide-react';
import { useState } from 'react';

type ResultSectionProps = {
  rawText: string;
  captions: string;
  hooks: string;
  tip: string;
  breakdown: string;
  userInput: {
    niche: string;
    platform: string;
    audience: string;
    tone: string;
    goal: string;
    product?: string;
    pain?: string;
  };
  onUpdateSection: (section: 'captions' | 'hooks' | 'tip' | 'why', newContent: string) => void;
};

export default function ResultSection({
  captions,
  hooks,
  tip,
  breakdown,
  userInput,
  onUpdateSection,
}: ResultSectionProps) {
  const [loadingSection, setLoadingSection] = useState<null | 'captions' | 'hooks' | 'tip' | 'why'>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const splitLines = (text: string) =>
    text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line !== ':' && !/^\d+\.$/.test(line));

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 1200);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const handleRegenerate = async (sectionName: 'captions' | 'hooks' | 'tip' | 'why') => {
    try {
      setLoadingSection(sectionName);
      const res = await fetch('/api/generate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userInput, section: sectionName }),
      });
      const data = await res.json();
      if (data.result) {
        onUpdateSection(sectionName, data.result);
      }
    } catch (err) {
      console.error('Failed to regenerate', sectionName, err);
    } finally {
      setLoadingSection(null);
    }
  };

  // Highlight [HOOK], [CTA], etc. in script
  const highlightScript = (text: string) => {
    return text.replace(/\[(HOOK|CTA|TRUTH REVEAL|VALUE|REALITY CHECK|SETUP|PROBLEM|SOLUTION|CLOSE|INTRO|OUTRO)[^\]]*\]/gi, match => `<span class='text-accent font-bold'>${match}</span>`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div className="glass-strong border border-accent/30 rounded-3xl shadow-2xl p-8 flex flex-col gap-10 animate-fade-in">
        {/* Script Section */}
        {userInput && (
          <SectionHeader icon={<ClipboardCopy className="w-6 h-6 text-accent" />} label="Script" onRegenerate={() => handleRegenerate('why')} loading={loadingSection === 'why'} />
        )}
        {userInput && (
          <div className="mb-6">
            <pre className="whitespace-pre-wrap text-lg text-white font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightScript(userInput.rawText || '') }} />
            <button
              onClick={() => copyToClipboard(userInput.rawText || '', 'script')}
              className={`btn-premium mt-3 px-4 py-2 text-sm ${copied === 'script' ? 'bg-accent/80' : ''}`}
            >
              {copied === 'script' ? 'Copied!' : 'Copy Script'}
            </button>
          </div>
        )}
        {/* Why This Works Section */}
        {breakdown && (
          <div className="flex flex-col gap-3">
            <SectionHeader icon={<span className="text-green-400">🧠</span>} label="Why This Works (Expert Breakdown)" onRegenerate={() => handleRegenerate('why')} loading={loadingSection === 'why'} />
            <div className="bg-neutral-900 border border-green-400/30 p-5 rounded-2xl text-white text-base shadow-lg animate-fade-in">
              <pre className="whitespace-pre-wrap text-green-100 text-sm font-mono">{breakdown}</pre>
              <button
                onClick={() => copyToClipboard(breakdown, 'breakdown')}
                className={`btn-premium mt-3 px-4 py-2 text-sm ${copied === 'breakdown' ? 'bg-accent/80' : ''}`}
              >
                {copied === 'breakdown' ? 'Copied!' : 'Copy Breakdown'}
              </button>
            </div>
          </div>
        )}
        {/* Captions Section */}
        {captions && (
          <div className="flex flex-col gap-3">
            <SectionHeader icon={<span className="text-blue-400">📢</span>} label="Caption" onRegenerate={() => handleRegenerate('captions')} loading={loadingSection === 'captions'} />
            <div className="bg-neutral-900 border border-blue-400/30 p-5 rounded-2xl text-white text-base shadow-lg animate-fade-in">
              <pre className="whitespace-pre-wrap text-blue-100 text-sm font-mono">{captions}</pre>
              <button
                onClick={() => copyToClipboard(captions, 'captions')}
                className={`btn-premium mt-3 px-4 py-2 text-sm ${copied === 'captions' ? 'bg-accent/80' : ''}`}
              >
                {copied === 'captions' ? 'Copied!' : 'Copy Caption'}
              </button>
            </div>
          </div>
        )}
        {/* Hooks Section */}
        {hooks && (
          <div className="flex flex-col gap-3">
            <SectionHeader icon={<span className="text-accent">💡</span>} label="Hooks" onRegenerate={() => handleRegenerate('hooks')} loading={loadingSection === 'hooks'} />
            <div className="bg-neutral-900 border border-accent/30 p-5 rounded-2xl text-white text-base shadow-lg animate-fade-in">
              <pre className="whitespace-pre-wrap text-accent text-sm font-mono">{hooks}</pre>
              <button
                onClick={() => copyToClipboard(hooks, 'hooks')}
                className={`btn-premium mt-3 px-4 py-2 text-sm ${copied === 'hooks' ? 'bg-accent/80' : ''}`}
              >
                {copied === 'hooks' ? 'Copied!' : 'Copy Hooks'}
              </button>
            </div>
          </div>
        )}
        {/* Tip Section */}
        {tip && (
          <div className="flex flex-col gap-3">
            <SectionHeader icon={<span className="text-green-400">📈</span>} label="Content Strategy Tip" onRegenerate={() => handleRegenerate('tip')} loading={loadingSection === 'tip'} />
            <div className="bg-neutral-900 border border-green-400/30 p-5 rounded-2xl text-white text-base shadow-lg animate-fade-in">
              <pre className="whitespace-pre-wrap text-green-100 text-sm font-mono">{tip}</pre>
              <button
                onClick={() => copyToClipboard(tip, 'tip')}
                className={`btn-premium mt-3 px-4 py-2 text-sm ${copied === 'tip' ? 'bg-accent/80' : ''}`}
              >
                {copied === 'tip' ? 'Copied!' : 'Copy Tip'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ icon, label, onRegenerate, loading }: { icon: React.ReactNode; label: string; onRegenerate: () => void; loading: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span>{icon}</span>
      <h3 className="text-xl font-bold text-white tracking-tight flex-1">{label}</h3>
      <button
        onClick={onRegenerate}
        className="text-accent hover:text-accent-2 transition-colors text-sm flex items-center gap-1 disabled:opacity-60"
        disabled={loading}
        title="Regenerate"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Regenerating...' : 'Regenerate'}
      </button>
    </div>
  );
}
