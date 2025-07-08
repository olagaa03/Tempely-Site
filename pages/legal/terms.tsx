import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-20 px-6 w-full max-w-3xl mx-auto animate-fade-in">
        <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-6 items-center w-full animate-fade-in delay-100">
          <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-4 text-white">Terms of Service</h1>
          <p className="text-white/80 text-lg mb-4">By using Tempely, you agree to these terms. Please read them carefully.</p>
          <h2 className="h2 text-xl font-bold text-white mb-2 mt-4">Use of Service</h2>
          <p className="text-white/80 text-base mb-2">You may use Tempely only as permitted by law and these terms. Don’t misuse our services.</p>
          <h2 className="h2 text-xl font-bold text-white mb-2 mt-4">User Content</h2>
          <p className="text-white/80 text-base mb-2">You retain ownership of your content, but you give us a license to use it to provide and improve our services.</p>
          <h2 className="h2 text-xl font-bold text-white mb-2 mt-4">Termination</h2>
          <p className="text-white/80 text-base mb-2">We may suspend or terminate your access if you violate these terms or misuse the service.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
  