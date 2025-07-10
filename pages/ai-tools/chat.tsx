import { useState } from 'react';
import { MessageSquare, Send, Bot, User, Settings, RefreshCw } from 'lucide-react';

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

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model', credits: 10 },
    { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and efficient', credits: 1 },
    { id: 'claude', name: 'Claude', description: 'Creative and analytical', credits: 8 },
    { id: 'gemini', name: 'Gemini', description: "Google's latest model", credits: 5 }
  ];

  const handleSend = async () => {
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
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response from ${selectedModel}. In a real implementation, this would be an actual AI response based on your message: "${input}"`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
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
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="hero-bg" />
        <div className="relative max-w-3xl mx-auto flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
            <MessageSquare className="w-7 h-7 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-1">AI Chat</h1>
            <p className="text-lg text-[var(--text-muted)]">Conversational AI with multiple model options</p>
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-premium">
              <h2 className="text-lg font-bold mb-4 text-[var(--accent-3)] flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </h2>
              {/* Model Selection */}
              <div className="mb-6">
                <label className="block text-[var(--accent-3)] font-semibold mb-3">AI Model</label>
                <div className="space-y-2">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`btn-outline w-full text-left ${selectedModel === model.id ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{model.name}</div>
                          <div className="text-sm opacity-75">{model.description}</div>
                        </div>
                        <div className="text-xs bg-[var(--glass)] px-2 py-1 rounded">
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
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear Chat
                </button>
              </div>
            </div>
            {/* Features */}
            <div className="card-premium">
              <h3 className="text-lg font-bold mb-4 text-[var(--accent-3)]">Features</h3>
              <ul className="space-y-2 text-[var(--text-muted)]">
                <li>Multiple AI models</li>
                <li>Context memory</li>
                <li>Code generation</li>
                <li>Real-time responses</li>
              </ul>
            </div>
          </div>
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="card-premium h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="pb-4 border-b border-[var(--border)] mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
                      <Bot className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <div>
                      <h3 className="text-[var(--accent-3)] font-semibold">
                        {models.find(m => m.id === selectedModel)?.name}
                      </h3>
                      <p className="text-[var(--text-muted)] text-sm">
                        {models.find(m => m.id === selectedModel)?.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {messages.length} messages
                  </div>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 px-2">
                {messages.length === 0 ? (
                  <div className="text-center text-[var(--text-muted)] mt-20">
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
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] flex items-center justify-center flex-shrink-0 bg-[var(--surface)]">
                          <Bot className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl border border-[var(--border)] ${
                          message.role === 'user'
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-[var(--glass)] text-[var(--text-main)]'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-50 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] flex items-center justify-center flex-shrink-0 bg-[var(--surface)]">
                          <User className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] flex items-center justify-center bg-[var(--surface)]">
                      <Bot className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div className="bg-[var(--glass)] text-[var(--text-main)] p-4 rounded-2xl border border-[var(--border)]">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Input */}
              <div className="pt-4 border-t border-[var(--border)] mt-4">
                <div className="flex gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-[var(--glass)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="btn-premium flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 