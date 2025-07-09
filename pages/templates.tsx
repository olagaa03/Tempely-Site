import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FileText } from 'lucide-react';

const templates = [
  {
    title: 'Hooked',
    description: 'A proven template for viral, high-retention hooks that grab attention instantly.',
    href: '/templates/hooked',
  },
  {
    title: 'Posted',
    description: 'A template for structuring posts that drive engagement and sharing.',
    href: '/templates/posted',
  },
  {
    title: 'Tracked',
    description: 'A template for tracking content performance and iterating for growth.',
    href: '/templates/tracked',
  },
];

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-20 px-6 w-full max-w-4xl mx-auto animate-fade-in">
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-xl flex items-center gap-3">
          <FileText className="w-10 h-10 text-accent animate-bounce-slow" />
          Templates
        </h1>
        <p className="text-lg text-white/80 mb-10 text-center max-w-2xl mx-auto animate-fade-in">
          Browse our premium, battle-tested templates for creators. No login required—click any template to view details and start using it!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {templates.map((tpl) => (
            <div key={tpl.title} className="card-premium flex flex-col items-center gap-6 p-8 min-h-[220px] shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-extrabold text-accent mb-2 gradient-text drop-shadow-lg">{tpl.title}</h2>
              <p className="text-white/90 text-base mb-4 text-center">{tpl.description}</p>
              <Link href={tpl.href} className="btn-premium text-lg px-8 py-3 w-full text-center">View Template →</Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
} 