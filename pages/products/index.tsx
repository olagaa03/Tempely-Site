'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-24 px-6 w-full max-w-6xl mx-auto animate-fade-in">
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-xl">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-4 animate-fade-in delay-100">
            <h2 className="h2 text-2xl font-bold text-white mb-2">Script Generator</h2>
            <p className="text-white/80 text-base mb-4">Generate high-converting scripts for your content with AI-powered frameworks and expert critique.</p>
            <a href="/ai-tool" className="btn-premium">Try Script Generator</a>
          </div>
          <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-4 animate-fade-in delay-200">
            <h2 className="h2 text-2xl font-bold text-white mb-2">Ideas Generator</h2>
            <p className="text-white/80 text-base mb-4">Discover viral content ideas and trending topics to keep your audience engaged.</p>
            <a href="/ai-ideas" className="btn-premium">Try Ideas Generator</a>
          </div>
          <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-4 animate-fade-in delay-300">
            <h2 className="h2 text-2xl font-bold text-white mb-2">Hooks Generator</h2>
            <p className="text-white/80 text-base mb-4">Create attention-grabbing hooks that stop the scroll and pull viewers in.</p>
            <a href="/ai-hooks" className="btn-premium">Try Hooks Generator</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
