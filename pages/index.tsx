import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Mic, MessageSquare, Palette, PenTool, FileText, Sparkles, User, Image, Type, Volume2, Video } from 'lucide-react';

export default function HomePage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    // Public landing page for guests
    return (
      <div className="max-w-4xl mx-auto pt-24 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">Tempely: AI Tools for Creators</h1>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">Design, write, and create faster with premium AI tools. Sign up to unlock your creative power.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/sign-up" className="btn-premium text-lg px-10 py-4">Sign Up Free</Link>
          <Link href="/sign-in" className="btn-outline text-lg px-10 py-4">Log In</Link>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All-in-one AI Toolkit</h2>
            <p className="text-gray-700 text-base mb-2">Access 11+ powerful tools for content, design, and media.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium, Modern Design</h2>
            <p className="text-gray-700 text-base mb-2">A beautiful, fast, and intuitive platform for creators and teams.</p>
          </div>
        </div>
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
