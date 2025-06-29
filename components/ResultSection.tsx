import { ClipboardCopy } from 'lucide-react';
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

  const splitLines = (text: string) =>
    text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line !== ':' && !/^\d+\.$/.test(line));

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
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

  return (
    <div className="space-y-10 transition-all duration-300">
      {captions && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap hover:shadow-md transition-shadow">
          <SectionBlock
            title="📢 Captions"
            lines={splitLines(captions)}
            color="blue"
            onRegenerate={() => handleRegenerate('captions')}
            copyToClipboard={copyToClipboard}
            isLoading={loadingSection === 'captions'}
          />
        </div>
      )}

      {hooks && (
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap hover:shadow-md transition-shadow">
          <SectionBlock
            title="💡 Hook Ideas"
            lines={splitLines(hooks)}
            color="purple"
            onRegenerate={() => handleRegenerate('hooks')}
            copyToClipboard={copyToClipboard}
            isLoading={loadingSection === 'hooks'}
          />
        </div>
      )}

      {tip && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap hover:shadow-md transition-shadow">
          <SectionBlock
            title="📈 Content Strategy Tip"
            text={tip.trim().replace(/^:\s*/gm, '')}
            color="green"
            onRegenerate={() => handleRegenerate('tip')}
            isLoading={loadingSection === 'tip'}
          />
        </div>
      )}

      {breakdown && (
        <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap hover:shadow-md transition-shadow">
          <SectionBlock
            title="🧠 Why This Works"
            text={breakdown.trim().replace(/^:\s*/gm, '')}
            color="pink"
            onRegenerate={() => handleRegenerate('why')}
            isLoading={loadingSection === 'why'}
          />
        </div>
      )}
    </div>
  );
}

function SectionBlock({
  title,
  lines,
  text,
  color,
  onRegenerate,
  copyToClipboard,
  isLoading,
}: {
  title: string;
  lines?: string[];
  text?: string;
  color: string;
  onRegenerate: () => void;
  copyToClipboard?: (text: string) => void;
  isLoading: boolean;
}) {
  return (
    <div>
      <Header title={title} color={color} onRegenerate={onRegenerate} isLoading={isLoading} />

      {lines && (
        <ul className="space-y-3">
          {lines
            .filter(line => line.trim() && !/^\d+\.$/.test(line.trim()))
            .map((line, idx) => (
              <li
                key={idx}
                className={`bg-${color}-50 border border-${color}-200 p-4 rounded-lg text-sm leading-relaxed hover:shadow-md transition-shadow group flex items-start gap-2`}
              >
                <span className="font-bold text-lg text-white/80 min-w-[1.5em]">{String.fromCharCode(65 + idx)}.</span>
                <div className="flex-1 flex justify-between items-start gap-3">
                  <span>{line.trim()}</span>
                  {copyToClipboard && (
                    <button
                      onClick={() => copyToClipboard(line)}
                      className="text-gray-400 hover:text-current text-xs mt-1 transition"
                      title="Copy"
                    >
                      <ClipboardCopy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}

      {text && (
        <div
          className={`bg-${color}-50 border border-${color}-200 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap hover:shadow-md transition-shadow`}
        >
          {text}
        </div>
      )}
    </div>
  );
}

function Header({
  title,
  color,
  onRegenerate,
  isLoading,
}: {
  title: string;
  color: string;
  onRegenerate: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className={`text-xl font-semibold text-${color}-600`}>{title}</h3>
      <button
        onClick={onRegenerate}
        className={`text-xs text-${color}-500 hover:underline flex items-center gap-1 disabled:opacity-60`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin text-current"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>🔁 Regenerate</>
        )}
      </button>
    </div>
  );
}
