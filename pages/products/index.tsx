'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

const products = [
  {
    title: 'Free AI Tool',
    description: 'Try Tempely with 5 free generations per day. Perfect for testing and getting a taste of our AI magic.',
    href: '/ai-tool',
    cta: 'Try Free Tool',
  },
  {
    title: 'Pro AI Tool',
    description: 'Unlock unlimited generations and advanced AI modes (Scripts, Ideas, Templates, Hooks, and more) in one premium interface.',
    href: '/ai-pro',
    cta: 'Unlock Pro Tool',
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="w-full bg-gradient-to-br from-primary/40 via-background-alt/80 to-primary-dark/80 py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto z-10 relative">
          <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-6 gradient-text animate-fade-in">Our Products</h1>
          <p className="text-white/80 text-xl mb-8 animate-fade-in">Explore Tempely's premium AI tools and templates for creators.</p>
        </div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0 animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-2/20 rounded-full blur-3xl z-0 animate-pulse-glow" />
      </section>
      <section className="max-w-4xl mx-auto w-full px-4 py-16 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product) => (
            <div key={product.title} className="card-premium flex flex-col items-center gap-8 p-8 md:p-12 min-h-[220px] shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <div className="flex-1 flex flex-col items-center gap-2">
                <h2 className="text-2xl font-extrabold text-accent mb-1 gradient-text drop-shadow-lg">{product.title}</h2>
                <p className="text-white/90 text-lg mb-2">{product.description}</p>
              </div>
              <div className="flex flex-col items-center w-full mt-6 md:mt-0">
                <Link href={product.href} className="btn-premium text-lg px-8 py-3 w-full text-center">{product.cta} →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
