import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-20 px-6 w-full max-w-3xl mx-auto animate-fade-in">
        <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-6 items-center w-full animate-fade-in delay-100">
          <h1 className="h1 text-3xl md:text-4xl font-extrabold mb-4 text-white">Refund Policy</h1>
          <p className="text-white/80 text-lg mb-4">We want you to love Tempely. If you’re not satisfied, here’s how refunds work.</p>
          <h2 className="h2 text-xl font-bold text-white mb-2 mt-4">Eligibility</h2>
          <p className="text-white/80 text-base mb-2">Refunds are available within 14 days of purchase if you haven’t used the premium features extensively.</p>
          <h2 className="h2 text-xl font-bold text-white mb-2 mt-4">How to Request</h2>
          <p className="text-white/80 text-base mb-2">Contact our support team at <span className="text-accent-2">support@tempely.com</span> with your order details.</p>
          <h2 className="h2 text-xl font-bold text-white mb-2 mt-4">Processing</h2>
          <p className="text-white/80 text-base mb-2">Approved refunds will be processed to your original payment method within 5-10 business days.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
  