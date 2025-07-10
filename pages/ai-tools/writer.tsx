import { useState } from 'react';
import { FileText, Sparkles, Download, Copy, RefreshCw, Check } from 'lucide-react';

export default function AIWriterPage() {
  const [contentType, setContentType] = useState('blog');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { id: 'blog', name: 'Blog Post', description: 'SEO-optimized blog articles' },
    { id: 'ad-copy', name: 'Ad Copy', description: 'High-converting ad copy' },
    { id: 'social', name: 'Social Media', description: 'Engaging social posts' },
    { id: 'email', name: 'Email', description: 'Professional email content' },
    { id: 'script', name: 'Video Script', description: 'Video and podcast scripts' },
    { id: 'product', name: 'Product Description', description: 'Compelling product copy' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(`Here's your ${contentType} content based on "${prompt}":\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. ...`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contentType}-content.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <FileText className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Writer</h1>
            <p className="text-lg text-[var(--text-muted)]">Generate professional content in seconds</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <h2 className="text-xl font-bold mb-6 text-[var(--accent-3)]">Content Settings</h2>
              {/* Content Type Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">Content Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={`btn-outline text-left ${contentType === type.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="font-semibold">{type.name}</div>
                      <div className="text-sm opacity-75">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">
                  Describe what you want to create
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Write a blog post about the benefits of AI in content creation for small businesses..."
                  className="w-full h-32 bg-[var(--glass)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
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
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}
              </button>
            </div>
            {/* Features */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>SEO-optimized content</li>
                <li>Tone and style control</li>
                <li>Plagiarism-free writing</li>
                <li>Multiple content formats</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="card-premium">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[var(--accent-3)]">Generated Content</h2>
                {generatedContent && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="btn-outline flex items-center gap-2 px-4 py-2"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="btn-outline flex items-center gap-2 px-4 py-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                )}
              </div>
              {generatedContent ? (
                <div className="bg-[var(--glass)] border border-[var(--border)] rounded-xl p-6">
                  <pre className="text-[var(--text-main)] whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="bg-[var(--glass)] border border-[var(--border)] rounded-xl p-12 text-center">
                  <FileText className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">
                    Your generated content will appear here. Start by describing what you want to create.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Content Creators</h4>
                  <p className="text-sm text-[var(--text-muted)]">Generate blog posts, social media content, and scripts</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Marketers</h4>
                  <p className="text-sm text-[var(--text-muted)]">Create compelling ad copy and email campaigns</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Businesses</h4>
                  <p className="text-sm text-[var(--text-muted)]">Write product descriptions and marketing materials</p>
                </div>
                <div className="p-4 bg-[var(--glass)] rounded-lg">
                  <h4 className="font-semibold text-[var(--accent-3)] mb-2">Agencies</h4>
                  <p className="text-sm text-[var(--text-muted)]">Scale content creation for multiple clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 