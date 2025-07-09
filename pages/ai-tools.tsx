import { useUser } from '@clerk/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Lightbulb, FileText, PenTool, Sparkles, BadgeCheck, Lock } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    title: 'Script Generator',
    description: 'Generate high-converting, creative video scripts tailored to your niche, audience, and platform.',
    href: '/ai-tool',
    icon: <PenTool className="w-10 h-10 text-accent" />,
    badges: ['Free', 'Pro'],
    features: [
      '5 free generations/day',
      'Unlimited with Pro',
      'Framework-driven scripts',
    ],
  },
  {
    title: 'Ideas Generator',
    description: 'Get bold, viral content ideas and angles based on real trends and audience psychology.',
    href: '/ai-ideas',
    icon: <Lightbulb className="w-10 h-10 text-accent-2" />,
    badges: ['Free', 'Pro'],
    features: [
      '5 free generations/day',
      'Unlimited with Pro',
      'Trend & psychology powered',
    ],
  },
  {
    title: 'Templates Generator',
    description: 'Access reusable, proven script templates for any platform or content goal.',
    href: '/ai-templates',
    icon: <FileText className="w-10 h-10 text-success" />,
    badges: ['Pro'],
    features: [
      'Proven, reusable templates',
      'All platforms supported',
      'Premium only',
    ],
  },
  {
    title: 'Hooks Generator',
    description: 'Craft scroll-stopping hooks and openers that grab attention instantly.',
    href: '/ai-hooks',
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    badges: ['Pro'],
    features: [
      'Unlimited with Pro',
      'Psychology-based hooks',
      'Premium only',
    ],
  },
];

export default function AiToolsPage() {
  const { isSignedIn, isLoaded } = useUser();
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-primary/40 via-background-alt/80 to-primary-dark/80 py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto z-10 relative">
          <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-6 gradient-text animate-fade-in">Unlock Your Creative Power with Tempely AI</h1>
          <p className="text-white/80 text-xl mb-8 animate-fade-in">The world’s most advanced AI content studio for creators. Instantly generate viral scripts, ideas, hooks, and templates—crafted for real results. All tools require login.</p>
          <Link href="/sign-in?redirect=/ai-tools" className="btn-premium text-lg px-10 py-4 animate-fade-in">Get Started →</Link>
        </div>
        {/* Subtle background effect */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0 animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-2/20 rounded-full blur-3xl z-0 animate-pulse-glow" />
      </section>
      {/* Tools List */}
      <section className="max-w-3xl mx-auto w-full px-4 py-16 flex flex-col gap-12 animate-fade-in">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} isSignedIn={!!isSignedIn} />
        ))}
      </section>
      <Footer />
    </main>
  );
}

function ToolCard({ icon, title, description, href, badges, features, isSignedIn }: { icon: React.ReactNode; title: string; description: string; href: string; badges: string[]; features: string[]; isSignedIn: boolean }) {
  const buttonHref = isSignedIn ? href : `/sign-in?redirect=${href}`;
  return (
    <div className="card-premium flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 min-h-[200px] shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col items-center md:items-start gap-3 min-w-[120px]">
        <div className="bg-black/30 rounded-full p-4 shadow-lg mb-2">{icon}</div>
        <div className="flex gap-2 mb-1">
          {badges.includes('Free') && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400/80 to-accent/80 text-black shadow border border-yellow-200"><BadgeCheck className="w-4 h-4 text-yellow-600" />Free</span>
          )}
          {badges.includes('Pro') && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/80 to-pink-500/80 text-white shadow border border-primary"><Lock className="w-4 h-4 text-white" />Pro</span>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center md:items-start gap-2">
        <h2 className="text-2xl font-extrabold text-accent mb-1 gradient-text drop-shadow-lg">{title}</h2>
        <p className="text-white/90 text-lg mb-2">{description}</p>
        <ul className="text-white/70 text-base list-disc pl-5 mb-2">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
      <div className="flex flex-col items-center md:items-end w-full md:w-auto mt-6 md:mt-0">
        <Link href={buttonHref} className="btn-premium text-lg px-8 py-3 w-full md:w-auto text-center">Try Now →</Link>
      </div>
    </div>
  );
} 