import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Settings, RefreshCw } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // TODO: Insert your AI API key below
  const AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY || '';

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model', credits: 10 },
    { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and efficient', credits: 1 },
    { id: 'claude', name: 'Claude', description: 'Creative and analytical', credits: 8 },
    { id: 'gemini', name: 'Gemini', description: "Google's latest model", credits: 5 }
  ];

  const handleSend = async () => {
    setError('');
    if (!input.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      // Example: Replace with your real AI API call
      // This is a placeholder for OpenAI, Anthropic, or Gemini
      // Example for OpenAI:
      /*
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: input },
          ],
        }),
      });
      if (!response.ok) throw new Error('Failed to get AI response');
      const data = await response.json();
      const aiContent = data.choices[0].message.content;
      */
      // MOCK: Remove this when real API is set up
      await new Promise((res) => setTimeout(res, 1500));
      const aiContent = `This is a simulated response from ${selectedModel}. In a real implementation, this would be an actual AI response based on your message: "${input}"`;
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiContent,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      toast.success('AI responded!');
    } catch (err: any) {
      setError(err.message || 'Failed to get AI response.');
      toast.error('Failed to get AI response.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      <Toaster position="top-right" />
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl z-0" />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-blue-400 flex items-center justify-center bg-white shadow-lg">
            <MessageSquare className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-gray-900 drop-shadow">AI Chat</h1>
            <p className="text-lg text-gray-500">Conversational AI with multiple model options</p>
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-600 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </h2>
              {/* Model Selection */}
              <div className="mb-6">
                <label className="block text-blue-700 font-semibold mb-2">AI Model</label>
                <div className="space-y-2">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`rounded-lg border px-4 py-3 w-full text-left transition-all font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${selectedModel === model.id ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-blue-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{model.name}</div>
                          <div className="text-sm opacity-75">{model.description}</div>
                        </div>
                        <div className="text-xs bg-blue-50 px-2 py-1 rounded text-blue-600 font-semibold">
                          {model.credits} credits
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Chat Actions */}
              <div className="space-y-3">
                <button
                  onClick={clearChat}
                  className="w-full flex items-center justify-center gap-2 border border-blue-400 text-blue-600 font-semibold rounded-xl py-3 hover:bg-blue-50 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear Chat
                </button>
              </div>
            </div>
            {/* Features */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow border border-blue-100 p-6">
              <h3 className="text-lg font-bold mb-2 text-blue-600">Features</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Multiple AI models</li>
                <li>Context memory</li>
                <li>Code generation</li>
                <li>Real-time responses</li>
              </ul>
            </div>
          </div>
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-[600px] flex flex-col p-6">
              {/* Chat Header */}
              <div className="pb-4 border-b border-gray-200 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center bg-white">
                      <Bot className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-blue-700 font-semibold">
                        {models.find(m => m.id === selectedModel)?.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {models.find(m => m.id === selectedModel)?.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {messages.length} messages
                  </div>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 px-2">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 mt-20">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Start a conversation with AI</p>
                    <p className="text-sm mt-2">Ask questions, get creative, or explore ideas</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0 bg-white">
                          <Bot className="w-4 h-4 text-blue-500" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl border ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-blue-50 text-gray-900 border-blue-100'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-50 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0 bg-white">
                          <User className="w-4 h-4 text-blue-500" />
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full border-2 border-blue-400 flex items-center justify-center bg-white">
                      <Bot className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="bg-blue-50 text-gray-900 p-4 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              {/* Error Message */}
              {error && <div className="text-red-500 text-sm font-semibold mt-2">{error}</div>}
              {/* Input */}
              <form
                className="mt-4 flex gap-3"
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border border-blue-200 bg-blue-50 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none shadow-sm min-h-[48px] max-h-32"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl px-6 py-3 shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 