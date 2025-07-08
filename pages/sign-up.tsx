import Link from 'next/link';

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067]">
      <section className="card-premium flex flex-col items-center gap-6 w-full max-w-md p-10 animate-fade-in">
        <h1 className="h1 text-4xl font-extrabold gradient-text mb-2">Join Tempely</h1>
        <p className="text-white/80 text-lg mb-4">Create your free account and start creating</p>
        <form className="w-full flex flex-col gap-4">
          <input type="email" placeholder="Email" className="rounded-xl px-4 py-3 bg-black/30 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-2/40 transition-all duration-200" />
          <input type="password" placeholder="Password" className="rounded-xl px-4 py-3 bg-black/30 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-2/40 transition-all duration-200" />
          <button type="submit" className="btn-premium w-full mt-2">Sign Up</button>
        </form>
        <p className="text-white/60 text-base mt-4">Already have an account? <Link href="/sign-in" className="text-accent-2 font-bold hover:underline">Sign in</Link></p>
      </section>
    </main>
  );
}
