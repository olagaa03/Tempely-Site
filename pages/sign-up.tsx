import { SignUp } from '@clerk/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-24 px-6 w-full max-w-md mx-auto animate-fade-in">
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-xl">Join Tempely</h1>
        <div className="glass-strong border border-white/10 rounded-2xl p-0 shadow-xl w-full animate-fade-in delay-100 flex items-center justify-center">
          <SignUp
            redirectUrl="/ai-tools"
            appearance={{
              elements: {
                card: 'bg-transparent shadow-none border-none',
                formButtonPrimary: 'btn-premium w-full',
                headerTitle: 'text-accent font-extrabold text-2xl',
                headerSubtitle: 'text-white/70',
                socialButtonsBlockButton: 'btn-premium w-full mb-2',
                footerAction: 'text-white/60',
                footerActionLink: 'text-accent-2 hover:text-accent transition-colors',
              },
              variables: {
                colorPrimary: '#7f5af0',
                colorText: '#fff',
                colorBackground: 'rgba(31, 38, 135, 0.37)',
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
