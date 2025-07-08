import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BundleProductPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 w-full max-w-2xl mx-auto animate-fade-in">
        <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-6 gradient-text drop-shadow-xl">AI Pro Bundle</h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
          Unlock all premium AI tools, unlimited generations, and exclusive templates for creators who want it all.
        </p>
        <div className="card-premium flex flex-col gap-6 items-center text-center animate-fade-in delay-200">
          <ul className="text-white/80 text-lg flex flex-col gap-2 list-disc list-inside mb-6">
            <li>Unlimited access to all AI tools</li>
            <li>Exclusive script and content templates</li>
            <li>Priority support and updates</li>
            <li>Early access to new features</li>
          </ul>
          <a href="/sign-up" className="btn-premium text-xl px-10 py-4 mt-2">Get Pro Access →</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
