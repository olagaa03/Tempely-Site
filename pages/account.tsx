import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center py-24 px-6 w-full max-w-2xl mx-auto animate-fade-in">
        <h1 className="h1 text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-xl">Your Account</h1>
        <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col gap-6 items-center w-full animate-fade-in delay-100">
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center shadow-lg mb-2 border border-white/10">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z" fill="#7f5af0"/></svg>
            </div>
            <span className="font-bold text-xl text-white">Your Name</span>
            <span className="text-white/60 text-base">your@email.com</span>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="glass-strong border border-white/10 rounded-xl p-6 flex flex-col gap-2">
              <span className="font-bold text-accent text-lg mb-1">Profile Settings</span>
              <button className="btn-premium w-full">Edit Profile</button>
            </div>
            <div className="glass-strong border border-white/10 rounded-xl p-6 flex flex-col gap-2">
              <span className="font-bold text-accent-2 text-lg mb-1">Subscription</span>
              <button className="btn-premium w-full">Manage Subscription</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 