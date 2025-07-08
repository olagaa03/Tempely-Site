import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HookedPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-24 px-6 w-full max-w-4xl mx-auto animate-fade-in">
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-xl">Hooked Bundle</h1>
        <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-6 w-full animate-fade-in delay-100">
          <p className="text-white/80 text-lg mb-6">Get the ultimate hooks, captions, and viral content formulas to stop the scroll.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <h2 className="h2 text-xl font-bold text-white mb-2">What's Included</h2>
              <ul className="text-white/80 text-base space-y-2">
                <li>• Hook generator tool</li>
                <li>• Caption templates</li>
                <li>• Viral content formulas</li>
                <li>• Engagement strategies</li>
                <li>• Trend analysis</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="h2 text-xl font-bold text-white mb-2">Perfect For</h2>
              <ul className="text-white/80 text-base space-y-2">
                <li>• Social media creators</li>
                <li>• Influencers</li>
                <li>• Brand managers</li>
                <li>• Content marketers</li>
                <li>• Growth hackers</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <button className="btn-premium text-xl px-8 py-4">Get Hooked Bundle</button>
            <p className="text-white/60 text-sm mt-4">$49/month • Cancel anytime</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
