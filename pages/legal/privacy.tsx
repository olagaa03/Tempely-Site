import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-20 px-6 w-full max-w-3xl mx-auto animate-fade-in">
        <div className="card-premium flex flex-col gap-6 items-center w-full animate-fade-in delay-100">
          <h1 className="h1 text-3xl md:text-4xl font-extrabold gradient-text mb-4">Privacy Policy</h1>
          <p className="text-white/80 text-lg mb-4">Your privacy is important to us. This policy explains how Tempely collects, uses, and protects your information.</p>
          {/* Insert actual privacy policy content here, using <h2> and <p> for sections */}
          <h2 className="h2 text-xl font-bold gradient-text mb-2 mt-4">Information We Collect</h2>
          <p className="text-white/80 text-base mb-2">We collect information you provide directly, such as when you create an account, use our tools, or contact support.</p>
          <h2 className="h2 text-xl font-bold gradient-text mb-2 mt-4">How We Use Information</h2>
          <p className="text-white/80 text-base mb-2">We use your information to provide, improve, and personalize Tempely’s services, and to communicate with you.</p>
          <h2 className="h2 text-xl font-bold gradient-text mb-2 mt-4">Your Rights</h2>
          <p className="text-white/80 text-base mb-2">You can access, update, or delete your information at any time by contacting us or using your account settings.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
  