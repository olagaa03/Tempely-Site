'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 w-full max-w-4xl mx-auto animate-fade-in">
        <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-6 gradient-text drop-shadow-xl">Our Products</h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
          Explore our premium bundles and tools for creators.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
          <ProductCard
            title="AI Pro Bundle"
            desc="Unlock all premium AI tools, unlimited generations, and exclusive templates."
            color="from-blue-500 to-purple-500"
            href="/products/bundle"
          />
          <ProductCard
            title="Hooked Bundle"
            desc="Get the ultimate hooks, captions, and viral content formulas."
            color="from-yellow-400 to-pink-400"
            href="/products/hooked"
          />
          <ProductCard
            title="Posted Bundle"
            desc="Everything you need to plan, create, and post high-performing content."
            color="from-green-400 to-blue-400"
            href="/products/posted"
          />
          <ProductCard
            title="Tracked Bundle"
            desc="Track your content’s performance and optimize for growth."
            color="from-purple-400 to-yellow-400"
            href="/products/tracked"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}

function ProductCard({ title, desc, color, href }: { title: string; desc: string; color: string; href: string }) {
  return (
    <a href={href} className={`card-premium bg-gradient-to-br ${color} hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col gap-3 animate-fade-in`}>
      <h3 className="h3 text-2xl font-bold mb-1 gradient-text drop-shadow-lg">{title}</h3>
      <p className="text-white/80 text-lg mb-2">{desc}</p>
      <span className="btn-premium w-fit mt-auto self-end text-base px-6 py-2">Learn More →</span>
    </a>
  );
}
