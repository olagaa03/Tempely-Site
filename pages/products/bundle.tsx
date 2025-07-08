import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BundlePage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-24 px-6 w-full max-w-4xl mx-auto animate-fade-in">
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-xl">AI Pro Bundle</h1>
        <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-6 w-full animate-fade-in delay-100">
          <p className="text-white/80 text-lg mb-6">Unlock all premium AI tools, unlimited generations, and exclusive templates.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <h2 className="h2 text-xl font-bold text-white mb-2">What's Included</h2>
              <ul className="text-white/80 text-base space-y-2">
                <li>• Unlimited script generations</li>
                <li>• Advanced AI frameworks</li>
                <li>• Expert critique system</li>
                <li>• Premium templates</li>
                <li>• Priority support</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="h2 text-xl font-bold text-white mb-2">Perfect For</h2>
              <ul className="text-white/80 text-base space-y-2">
                <li>• Content creators</li>
                <li>• Social media managers</li>
                <li>• Marketing teams</li>
                <li>• Agencies</li>
                <li>• Entrepreneurs</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <button className="btn-premium text-xl px-8 py-4">Get AI Pro Bundle</button>
            <p className="text-white/60 text-sm mt-4">$99/month • Cancel anytime</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
