import Header from '../components/Header';
import Footer from '../components/Footer';
import { Lightbulb, FileText, PenTool, Sparkles, BadgeCheck, Lock } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    title: 'Script Generator',
    description: 'Generate high-converting, creative video scripts tailored to your niche, audience, and platform.',
    href: '/ai-tool',
    icon: <PenTool className="w-8 h-8 text-accent" />,
    badges: ['Free', 'Pro'],
  },
  {
    title: 'Ideas Generator',
    description: 'Get bold, viral content ideas and angles based on real trends and audience psychology.',
    href: '/ai-ideas',
    icon: <Lightbulb className="w-8 h-8 text-accent-2" />,
    badges: ['Free', 'Pro'],
  },
  {
    title: 'Templates Generator',
    description: 'Access reusable, proven script templates for any platform or content goal.',
    href: '/ai-templates',
    icon: <FileText className="w-8 h-8 text-success" />,
    badges: ['Pro'],
  },
  {
    title: 'Hooks Generator',
    description: 'Craft scroll-stopping hooks and openers that grab attention instantly.',
    href: '/ai-hooks',
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    badges: ['Pro'],
  },
];

export default function AiToolsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 flex-1">
        <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-10 text-white drop-shadow-lg text-center animate-fade-in">
          Tempely AI Tools
        </h1>
        <p className="text-center text-white/70 text-lg mb-16 max-w-2xl mx-auto animate-fade-in">
          Instantly generate viral scripts, ideas, hooks, and templates—crafted for real results. All tools require login.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

function ToolCard({ icon, title, description, href, badges }: { icon: React.ReactNode; title: string; description: string; href: string; badges: string[] }) {
  return (
    <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-4 relative hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-black/20 rounded-full p-3 shadow-lg transition-all duration-300">{icon}</div>
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">{title}</h2>
      </div>
      <div className="flex gap-2 mb-2">
        {badges.includes('Free') && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-accent-2/80 to-accent/80 text-white shadow"><BadgeCheck className="w-4 h-4" />Free</span>
        )}
        {badges.includes('Pro') && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/80 to-pink-500/80 text-white shadow"><Lock className="w-4 h-4" />Pro</span>
        )}
      </div>
      <p className="text-white/80 mb-6 text-lg flex-1">{description}</p>
      <Link href={`/sign-in?redirect=${href}`} className="btn-premium w-fit mt-auto self-end text-base px-8 py-3">
        Try Now →
      </Link>
    </div>
  );
} 