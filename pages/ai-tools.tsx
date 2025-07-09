import { useUser } from '@clerk/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BadgeCheck, Lock } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    title: 'Free Tool',
    description: 'Try Tempely with 5 free generations per day. Perfect for testing and getting a taste of our AI magic.',
    href: '/ai-tool',
    icon: <BadgeCheck className="w-10 h-10 text-accent" />,
    badge: 'Free',
    cta: 'Try Free',
  },
  {
    title: 'Pro Tool',
    description: 'Unlock unlimited generations and advanced AI modes (Scripts, Ideas, Templates, Hooks, and more) in one premium interface.',
    href: '/ai-pro',
    icon: <Lock className="w-10 h-10 text-primary" />,
    badge: 'Pro',
    cta: 'Unlock Pro',
  },
];

export default function AiToolsPage() {
  const { isSignedIn } = useUser();
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="w-full bg-gradient-to-br from-primary/40 via-background-alt/80 to-primary-dark/80 py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto z-10 relative">
          <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-6 gradient-text animate-fade-in">Tempely AI Tools</h1>
          <p className="text-white/80 text-xl mb-8 animate-fade-in">Choose your experience: try Tempely for free, or unlock the full power of AI with Pro.</p>
        </div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0 animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-2/20 rounded-full blur-3xl z-0 animate-pulse-glow" />
      </section>
      <section className="max-w-2xl mx-auto w-full px-4 py-16 flex flex-col gap-12 animate-fade-in">
        {tools.map((tool) => (
          <div key={tool.title} className="card-premium flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 min-h-[180px] shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col items-center md:items-start gap-3 min-w-[120px]">
              <div className="bg-black/30 rounded-full p-4 shadow-lg mb-2">{tool.icon}</div>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${tool.badge === 'Free' ? 'bg-gradient-to-r from-yellow-400/80 to-accent/80 text-black border border-yellow-200' : 'bg-gradient-to-r from-primary/80 to-pink-500/80 text-white border border-primary'} shadow`}>{tool.badge}</span>
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start gap-2">
              <h2 className="text-2xl font-extrabold text-accent mb-1 gradient-text drop-shadow-lg">{tool.title}</h2>
              <p className="text-white/90 text-lg mb-2">{tool.description}</p>
            </div>
            <div className="flex flex-col items-center md:items-end w-full md:w-auto mt-6 md:mt-0">
              <Link href={isSignedIn ? tool.href : `/sign-in?redirect=${tool.href}`} className="btn-premium text-lg px-8 py-3 w-full md:w-auto text-center">{tool.cta} →</Link>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
} 