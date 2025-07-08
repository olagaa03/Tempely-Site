import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-24 px-6 w-full max-w-md mx-auto animate-fade-in">
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-xl">Sign In</h1>
        <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-6 w-full animate-fade-in delay-100">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/80 font-medium">Email</label>
              <input type="email" className="input-premium" placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/80 font-medium">Password</label>
              <input type="password" className="input-premium" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-premium mt-4">Sign In</button>
          </form>
          <div className="text-center">
            <span className="text-white/60">Don't have an account? </span>
            <a href="/sign-up" className="text-accent-2 hover:text-accent transition-colors">Sign up</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
