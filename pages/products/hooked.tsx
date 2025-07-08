import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HookedProductPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 w-full max-w-2xl mx-auto animate-fade-in">
        <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-6 gradient-text drop-shadow-xl">Hooked Bundle</h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
          Get the ultimate hooks, captions, and viral content formulas for creators who want to break the scroll.
        </p>
        <div className="card-premium flex flex-col gap-6 items-center text-center animate-fade-in delay-200">
          <ul className="text-white/80 text-lg flex flex-col gap-2 list-disc list-inside mb-6">
            <li>Proven viral hook and caption templates</li>
            <li>Step-by-step content formulas</li>
            <li>Instant inspiration for every post</li>
          </ul>
          <a href="/sign-up" className="btn-premium text-xl px-10 py-4 mt-2">Get Hooked →</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
