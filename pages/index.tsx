import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Mic, MessageSquare, Palette, PenTool, FileText, Sparkles, User, Image, Type, Volume2, Video } from 'lucide-react';

export default function HomePage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    // Public landing page for guests
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col justify-between">
        {/* Hero Section with background logo watermark */}
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between pt-24 pb-16 px-4 md:px-0 overflow-visible">
          {/* Watermark Logo - always in margin, never behind text */}
          <img
            src="/branding/tempely-logo%20(SVG).svg"
            alt="Tempely Logo Watermark"
            aria-hidden="true"
            className="pointer-events-none select-none absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 md:-translate-x-1/2 md:-translate-y-1/2 w-[100px] md:w-[180px] max-w-[30vw] opacity-7 blur-sm z-0"
            style={{ filter: 'grayscale(1)', objectFit: 'contain' }}
          />
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left z-10 relative">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight animate-fade-in">
              Unleash Your Creativity<br className="hidden md:block" /> with <span className="text-purple-600">AI Superpowers</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-xl animate-fade-in delay-100">
              Design, write, and create faster with 11+ premium AI tools. Join thousands of creators using Tempely to unlock their creative power—free forever, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 animate-fade-in delay-200">
              <Link href="/sign-up" className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full px-10 py-4 text-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">Sign Up Free</Link>
              <Link href="/sign-in" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold rounded-full px-10 py-4 text-lg transition-all">Log In</Link>
            </div>
            {/* Trusted by logos */}
            <div className="mt-6 flex flex-col items-center md:items-start animate-fade-in delay-300">
              <span className="text-gray-500 text-sm mb-2">Trusted by creators at</span>
              <div className="flex gap-6 opacity-80">
                {/* Placeholder logos, replace with real ones if available */}
                <span className="font-bold text-gray-400 text-lg">CreatorHub</span>
                <span className="font-bold text-gray-400 text-lg">Designly</span>
                <span className="font-bold text-gray-400 text-lg">MediaPro</span>
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0 mt-4 mb-20 animate-fade-in delay-300">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all">
            <Sparkles className="w-10 h-10 text-purple-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">All-in-one AI Toolkit</h2>
            <p className="text-gray-600 text-base">Access 11+ powerful tools for content, design, and media—all in one place.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all">
            <Palette className="w-10 h-10 text-pink-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Premium, Modern Design</h2>
            <p className="text-gray-600 text-base">A beautiful, fast, and intuitive platform for creators and teams.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all">
            <User className="w-10 h-10 text-blue-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Free Forever Plan</h2>
            <p className="text-gray-600 text-base">Get started for free—no credit card required. Upgrade anytime for more power.</p>
          </div>
        </div>
        {/* Subtle fade-in animation keyframes */}
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: none; }
          }
          .animate-fade-in {
            animation: fade-in 1s cubic-bezier(0.4,0,0.2,1) both;
          }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
        `}</style>
      </div>
    );
  }

  // Dashboard for signed-in users
  const userName = user?.firstName || user?.username || 'User';
  const aiTools = [
    {
      id: 'audio',
      title: 'AI Audio',
      description: 'Text-to-speech voice generation with natural-sounding voices',
      icon: Mic,
      href: '/ai-tools/audio',
      color: 'bg-gradient-to-tr from-purple-400 to-pink-400',
      new: true
    },
    {
      id: 'chat',
      title: 'AI Chat',
      description: 'LLM chat with different model options for various use cases',
      icon: MessageSquare,
      href: '/ai-tools/chat',
      color: 'bg-gradient-to-tr from-blue-400 to-cyan-400',
      new: true
    },
    {
      id: 'design',
      title: 'AI Design',
      description: 'Layouts, styles, and design templates for any project',
      icon: Palette,
      href: '/ai-tools/design',
      color: 'bg-gradient-to-tr from-green-400 to-emerald-400'
    },
    {
      id: 'draw',
      title: 'AI Draw',
      description: 'Sketch-to-image generator for creative visual content',
      icon: PenTool,
      href: '/ai-tools/draw',
      color: 'bg-gradient-to-tr from-orange-400 to-red-400'
    },
    {
      id: 'writer',
      title: 'AI Writer',
      description: 'SEO writing, ad copy, scripts, and content generation',
      icon: FileText,
      href: '/ai-tools/writer',
      color: 'bg-gradient-to-tr from-indigo-400 to-purple-400'
    },
    {
      id: 'design-maker',
      title: 'Design Maker',
      description: 'Dynamic visual content generator for marketing materials',
      icon: Sparkles,
      href: '/ai-tools/design-maker',
      color: 'bg-gradient-to-tr from-pink-400 to-rose-400'
    },
    {
      id: 'face-swapper',
      title: 'Face Swapper',
      description: 'Images/videos face-swapping with advanced AI technology',
      icon: User,
      href: '/ai-tools/face-swapper',
      color: 'bg-gradient-to-tr from-yellow-400 to-orange-400'
    },
    {
      id: 'image-maker',
      title: 'Image Maker',
      description: 'AI-generated visuals with custom prompts and styles',
      icon: Image,
      href: '/ai-tools/image-maker',
      color: 'bg-gradient-to-tr from-teal-400 to-cyan-400'
    },
    {
      id: 'logo-maker',
      title: 'Logo Maker',
      description: 'Auto-branding tool with logo packs and customization',
      icon: Type,
      href: '/ai-tools/logo-maker',
      color: 'bg-gradient-to-tr from-violet-400 to-purple-400'
    },
    {
      id: 'speech-maker',
      title: 'Speech Maker',
      description: 'Voiceovers, accents, and multilingual audio content',
      icon: Volume2,
      href: '/ai-tools/speech-maker',
      color: 'bg-gradient-to-tr from-emerald-400 to-green-400'
    },
    {
      id: 'video-maker',
      title: 'Video Maker',
      description: 'Instant video ads and social media clips generation',
      icon: Video,
      href: '/ai-tools/video-maker',
      color: 'bg-gradient-to-tr from-red-400 to-pink-400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto pt-10 pb-20">
      {/* Greeting */}
      <div className="mb-10 mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Welcome, {userName}. What would you like to do today?</h1>
        <p className="text-lg text-gray-700 font-medium">Choose a tool below to get started.</p>
      </div>
      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiTools.map((tool) => (
          <Link key={tool.id} href={tool.href} className="group block rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-xl transition-all p-6 relative">
            {/* New badge */}
            {tool.new && (
              <span className="absolute top-4 right-4 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">NEW</span>
            )}
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${tool.color} text-white shadow-lg`}>
              <tool.icon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight" style={{opacity: 1, color: '#111827'}}>{tool.title}</h2>
            <p className="text-gray-700 text-base mb-4 min-h-[48px]">{tool.description}</p>
            <span className="inline-block mt-2 text-purple-600 font-semibold group-hover:underline">Open {tool.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
