import { useState } from 'react';
import { FileText, Sparkles, Download, Copy, RefreshCw, Check } from 'lucide-react';
import { useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function AIWriterPage() {
  const [contentType, setContentType] = useState('blog');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // TODO: Insert your Content Generation API key below
  const WRITER_API_KEY = process.env.NEXT_PUBLIC_WRITER_API_KEY || '';

  const contentTypes = [
    { id: 'blog', name: 'Blog Post', description: 'SEO-optimized blog articles' },
    { id: 'ad-copy', name: 'Ad Copy', description: 'High-converting ad copy' },
    { id: 'social', name: 'Social Media', description: 'Engaging social posts' },
    { id: 'email', name: 'Email', description: 'Professional email content' },
    { id: 'script', name: 'Video Script', description: 'Video and podcast scripts' },
    { id: 'product', name: 'Product Description', description: 'Compelling product copy' }
  ];

  const handleGenerate = async () => {
    setError('');
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedContent('');
    try {
      // Example: Replace with your real Content Generation API call
      // This is a placeholder for OpenAI, Claude, Gemini, etc.
      /*
      const response = await fetch('https://api.example.com/v1/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WRITER_API_KEY}`,
        },
        body: JSON.stringify({
          type: contentType,
          prompt,
        }),
      });
      if (!response.ok) throw new Error('Failed to generate content');
      const data = await response.json();
      setGeneratedContent(data.content);
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 2000));
      setGeneratedContent(`Here's your ${contentType} content based on "${prompt}":\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. ...`);
      toast.success('Content generated!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate content.');
      toast.error('Failed to generate content.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.success('Copied to clipboard!');
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
    toast.success('Downloaded!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-indigo-400 flex items-center justify-center bg-white shadow-lg">
            <FileText className="w-7 h-7 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Writer</h1>
            <p className="text-lg text-gray-500">Generate professional content in seconds</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-indigo-600">Content Settings</h2>
              {/* Content Type Selection */}
              <div>
                <label className="block text-indigo-700 font-semibold mb-2">Content Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={`rounded-lg border px-4 py-3 text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${contentType === type.id ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-indigo-50'}`}
                    >
                      <div className="font-semibold">{type.name}</div>
                      <div className="text-sm opacity-75">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Prompt Input */}
              <div>
                <label className="block text-indigo-700 font-semibold mb-2">
                  Describe what you want to create
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Write a blog post about the benefits of AI in content creation for small businesses..."
                  className="w-full h-32 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors resize-none shadow-sm"
                />
              </div>
              {/* Error Message */}
              {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl py-4 shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow border border-indigo-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-indigo-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>SEO-optimized content</li>
                <li>Tone and style control</li>
                <li>Plagiarism-free writing</li>
                <li>Multiple content formats</li>
              </ul>
            </div>
          </div>
          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-indigo-600">Generated Content</h2>
                {generatedContent && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 border border-indigo-400 text-indigo-600 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-indigo-50 transition-all"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 border border-indigo-400 text-indigo-600 font-semibold rounded-xl py-2 px-4 bg-white hover:bg-indigo-50 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                )}
              </div>
              {generatedContent ? (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                  <pre className="text-gray-900 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-12 text-center">
                  <FileText className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Your generated content will appear here. Start by describing what you want to create.
                  </p>
                </div>
              )}
            </div>
            {/* Use Cases */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow border border-indigo-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-indigo-600">Perfect For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Content Creators</h4>
                  <p className="text-sm text-gray-500">Generate blog posts, social media content, and scripts</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Marketers</h4>
                  <p className="text-sm text-gray-500">Create compelling ad copy and email campaigns</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Businesses</h4>
                  <p className="text-sm text-gray-500">Write product descriptions and marketing materials</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-600 mb-2">Agencies</h4>
                  <p className="text-sm text-gray-500">Scale content creation for multiple clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 