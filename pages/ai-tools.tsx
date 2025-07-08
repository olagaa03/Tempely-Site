import Link from 'next/link';
import { Sparkles, Rocket, Crown, Lightbulb, FileText, PenTool } from 'lucide-react';

export default function AiToolsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg gradient-text text-center animate-fade-in">
          Tempely AI Tools
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
          {/* Script Generator */}
          <ToolCard
            icon={<PenTool className="w-10 h-10 text-blue-400 animate-bounce-slow" />}
            title="Script Generator"
            description="Generate high-converting, creative video scripts tailored to your niche, audience, and platform."
            href="/ai-pro-access"
            color="from-blue-500 to-purple-500"
          />
          {/* Ideas Generator */}
          <ToolCard
            icon={<Lightbulb className="w-10 h-10 text-yellow-400 animate-pulse-glow" />}
            title="Ideas Generator"
            description="Get bold, viral content ideas and angles based on real trends and audience psychology."
            href="/ai-ideas"
            color="from-yellow-400 to-pink-400"
          />
          {/* Templates Generator */}
          <ToolCard
            icon={<FileText className="w-10 h-10 text-green-400 animate-bounce-slow" />}
            title="Templates Generator"
            description="Access reusable, proven script templates for any platform or content goal."
            href="/ai-templates"
            color="from-green-400 to-blue-400"
          />
          {/* Hooks Generator */}
          <ToolCard
            icon={<Sparkles className="w-10 h-10 text-purple-400 animate-pulse-glow" />}
            title="Hooks Generator"
            description="Craft scroll-stopping hooks and openers that grab attention instantly."
            href="/ai-hooks"
            color="from-purple-400 to-yellow-400"
          />
        </div>
      </div>
    </main>
  );
}

function ToolCard({ icon, title, description, href, color }: { icon: React.ReactNode; title: string; description: string; href: string; color: string }) {
  return (
    <a href={href} className={`block bg-gradient-to-br ${color} rounded-3xl p-8 shadow-xl hover:scale-105 hover:shadow-yellow-400/20 transition-all duration-300 group animate-fade-in`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-black/30 rounded-full p-3 shadow-lg group-hover:bg-black/50 transition-all duration-300">{icon}</div>
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">{title}</h2>
      </div>
      <p className="text-white/80 mb-6 text-lg">{description}</p>
      <button className="bg-white/10 border border-white/20 rounded-xl px-6 py-2 text-white font-semibold text-base shadow hover:bg-white/20 transition-all duration-300">
        Launch →
      </button>
    </a>
  );
} 