import Link from 'next/link';
import { 
  Mic, 
  MessageSquare, 
  Palette, 
  PenTool, 
  FileText, 
  Sparkles, 
  User, 
  Image, 
  Type, 
  Volume2, 
  Video
} from 'lucide-react';

export default function AIToolsPage() {
  const aiTools = [
    {
      id: 'audio',
      title: 'AI Audio',
      description: 'Text-to-speech voice generation with natural-sounding voices',
      icon: Mic,
      href: '/ai-tools/audio',
      color: 'from-purple-500 to-pink-500',
      features: ['Natural voices', 'Multiple languages', 'Custom speed', 'Export options']
    },
    {
      id: 'chat',
      title: 'AI Chat',
      description: 'LLM chat with different model options for various use cases',
      icon: MessageSquare,
      href: '/ai-tools/chat',
      color: 'from-blue-500 to-cyan-500',
      features: ['Multiple models', 'Context memory', 'Code generation', 'Real-time responses']
    },
    {
      id: 'design',
      title: 'AI Design',
      description: 'Layouts, styles, and design templates for any project',
      icon: Palette,
      href: '/ai-tools/design',
      color: 'from-green-500 to-emerald-500',
      features: ['Smart layouts', 'Style presets', 'Brand consistency', 'Export ready']
    },
    {
      id: 'draw',
      title: 'AI Draw',
      description: 'Sketch-to-image generator for creative visual content',
      icon: PenTool,
      href: '/ai-tools/draw',
      color: 'from-orange-500 to-red-500',
      features: ['Sketch input', 'Style transfer', 'High resolution', 'Batch generation']
    },
    {
      id: 'writer',
      title: 'AI Writer',
      description: 'SEO writing, ad copy, scripts, and content generation',
      icon: FileText,
      href: '/ai-tools/writer',
      color: 'from-indigo-500 to-purple-500',
      features: ['SEO optimized', 'Tone control', 'Plagiarism free', 'Multiple formats']
    },
    {
      id: 'design-maker',
      title: 'Design Maker',
      description: 'Dynamic visual content generator for marketing materials',
      icon: Sparkles,
      href: '/ai-tools/design-maker',
      color: 'from-pink-500 to-rose-500',
      features: ['Template library', 'Auto-sizing', 'Brand integration', 'Social media ready']
    },
    {
      id: 'face-swapper',
      title: 'Face Swapper',
      description: 'Images/videos face-swapping with advanced AI technology',
      icon: User,
      href: '/ai-tools/face-swapper',
      color: 'from-yellow-500 to-orange-500',
      features: ['High accuracy', 'Video support', 'Batch processing', 'Privacy focused']
    },
    {
      id: 'image-maker',
      title: 'Image Maker',
      description: 'AI-generated visuals with custom prompts and styles',
      icon: Image,
      href: '/ai-tools/image-maker',
      color: 'from-teal-500 to-cyan-500',
      features: ['Custom prompts', 'Style presets', 'High resolution', 'Commercial use']
    },
    {
      id: 'logo-maker',
      title: 'Logo Maker',
      description: 'Auto-branding tool with logo packs and customization',
      icon: Type,
      href: '/ai-tools/logo-maker',
      color: 'from-violet-500 to-purple-500',
      features: ['Brand analysis', 'Logo variations', 'Vector formats', 'Style matching']
    },
    {
      id: 'speech-maker',
      title: 'Speech Maker',
      description: 'Voiceovers, accents, and multilingual audio content',
      icon: Volume2,
      href: '/ai-tools/speech-maker',
      color: 'from-emerald-500 to-green-500',
      features: ['Multiple accents', 'Emotion control', 'Background music', 'Audio editing']
    },
    {
      id: 'video-maker',
      title: 'Video Maker',
      description: 'Instant video ads and social media clips generation',
      icon: Video,
      href: '/ai-tools/video-maker',
      color: 'from-red-500 to-pink-500',
      features: ['Auto-editing', 'Music sync', 'Text overlays', 'Social formats']
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="hero-bg" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in" style={{lineHeight:1.1}}>
            Explore Tempely’s AI Tools
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] mb-8 max-w-2xl mx-auto animate-fade-in delay-100 font-medium">
            All the creative power you need, in one place. Instantly access every AI tool for content, design, and media.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="h2 text-4xl md:text-5xl font-bold mb-6">
            Ready to try Tempely?
          </h2>
          <p className="text-lg text-[var(--text-muted)] mb-8 font-medium">
            Sign up now and start designing for free with Tempely’s AI toolkit.
          </p>
          <Link 
            href="/sign-up"
            className="btn-premium text-lg px-10 py-4"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </main>
  );
}

function ToolCard({ tool }: { tool: any }) {
  const IconComponent = tool.icon;
  return (
    <Link href={tool.href} className="group">
      <div className="card-premium flex flex-col h-full items-center text-center hover:shadow-lg transition-all duration-300">
        <div className={`w-12 h-12 rounded-full border-2 border-[var(--accent)] flex items-center justify-center mb-4 bg-[var(--surface)]`}>
          <IconComponent className="w-6 h-6 text-[var(--accent)]" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-[var(--accent-3)]">{tool.title}</h3>
        <p className="text-[var(--text-muted)] mb-4 font-medium">{tool.description}</p>
        <div className="flex items-center justify-center text-[var(--accent)] font-semibold group-hover:text-[var(--accent-2)] transition-colors mt-auto">
          Try Tool
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
} 