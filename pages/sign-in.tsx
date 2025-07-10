import { SignIn } from '@clerk/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col justify-between relative overflow-hidden">
      {/* Watermark Logo */}
      <img
        src="/branding/tempely-logo%20(SVG).svg"
        alt="Tempely Logo Watermark"
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 md:translate-y-0 md:top-0 md:bottom-0 md:my-auto w-[340px] max-w-[60vw] opacity-10 blur-sm z-0"
        style={{ filter: 'grayscale(1)', objectFit: 'contain' }}
      />
      <Header />
      <section className="flex flex-col items-center justify-center py-24 px-6 w-full max-w-md mx-auto animate-fade-in z-10 relative">
        {/* Logo above form */}
        <img
          src="/branding/tempely-logo%20(SVG).svg"
          alt="Tempely Logo"
          className="w-20 h-20 mb-6 drop-shadow-xl bg-white/80 rounded-xl p-2"
        />
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-2 text-gray-900">Sign In</h1>
        <p className="text-lg text-gray-700 mb-8">Welcome back! Log in to access your AI toolkit.</p>
        <div className="glass-strong border border-white/10 rounded-2xl p-0 shadow-xl w-full animate-fade-in delay-100 flex items-center justify-center">
          <SignIn
            redirectUrl="/ai-tools"
            appearance={{
              elements: {
                card: 'bg-transparent shadow-none border-none',
                formButtonPrimary: 'btn-premium w-full',
                headerTitle: 'text-accent font-extrabold text-2xl',
                headerSubtitle: 'text-gray-700',
                socialButtonsBlockButton: 'btn-premium w-full mb-2',
                footerAction: 'text-gray-500',
                footerActionLink: 'text-purple-600 hover:text-purple-700 transition-colors',
              },
              variables: {
                colorPrimary: '#7f5af0',
                colorText: '#111827',
                colorBackground: 'rgba(255,255,255,0.7)',
                borderRadius: '1.5rem',
                fontFamily: 'Montserrat, Inter, sans-serif',
              }
            }}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
