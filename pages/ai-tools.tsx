import { Lightbulb, FileText, PenTool, Sparkles } from 'lucide-react';

export default function AiToolsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-10 text-white drop-shadow-lg text-center animate-fade-in">
          Tempely AI Tools
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in">
          {/* Script Generator */}
          <ToolCard
            icon={<PenTool className="w-10 h-10 text-accent" />}
            title="Script Generator"
            description="Generate high-converting, creative video scripts tailored to your niche, audience, and platform."
            href="/ai-pro-access"
          />
          {/* Ideas Generator */}
          <ToolCard
            icon={<Lightbulb className="w-10 h-10 text-accent-2" />}
            title="Ideas Generator"
            description="Get bold, viral content ideas and angles based on real trends and audience psychology."
            href="/ai-ideas"
          />
          {/* Templates Generator */}
          <ToolCard
            icon={<FileText className="w-10 h-10 text-success" />}
            title="Templates Generator"
            description="Access reusable, proven script templates for any platform or content goal."
            href="/ai-templates"
          />
          {/* Hooks Generator */}
          <ToolCard
            icon={<Sparkles className="w-10 h-10 text-primary" />}
            title="Hooks Generator"
            description="Craft scroll-stopping hooks and openers that grab attention instantly."
            href="/ai-hooks"
          />
        </div>
      </div>
    </main>
  );
}

function ToolCard({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <a href={href} className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col gap-3 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-black/20 rounded-full p-3 shadow-lg transition-all duration-300">{icon}</div>
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">{title}</h2>
      </div>
      <p className="text-white/80 mb-6 text-lg">{description}</p>
      <button className="btn-premium w-fit mt-auto self-end text-base px-6 py-2">Launch →</button>
    </a>
  );
} 