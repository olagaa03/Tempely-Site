import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 relative overflow-hidden">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-950 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-full blur-2xl opacity-20"></div>
      </div>
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-6 w-full max-w-3xl animate-fade-in">
        <h1 className="h1 text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-xl animate-slide-in">
          Unleash AI Creativity <br /> with <span className="text-accent">Tempely</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
          The world’s most advanced AI content studio for creators, brands, and visionaries. Instantly generate viral scripts, ideas, hooks, and templates—crafted for real results.
        </p>
        <Link href="/ai-tools" className="btn-premium text-xl px-10 py-4 mt-2 animate-fade-in delay-200">
          Try Tempely AI Tools →
        </Link>
      </section>
      {/* AI Tools Preview */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-16 animate-fade-in delay-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <DemoCard
            title="Script Generator"
            desc="Generate high-converting, creative video scripts tailored to your niche, audience, and platform."
            href="/ai-pro-access"
          />
          <DemoCard
            title="Ideas Generator"
            desc="Get bold, viral content ideas and angles based on real trends and audience psychology."
            href="/ai-ideas"
          />
          <DemoCard
            title="Templates Generator"
            desc="Access reusable, proven script templates for any platform or content goal."
            href="/ai-templates"
          />
          <DemoCard
            title="Hooks Generator"
            desc="Craft scroll-stopping hooks and openers that grab attention instantly."
            href="/ai-hooks"
          />
        </div>
      </section>
      {/* Why Tempely Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-24 animate-fade-in delay-400">
        <h2 className="h2 text-center mb-8 text-white">Why Tempely?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <WhyCard
            title="Truly Original Content"
            desc="No more generic, AI-sounding scripts. Every output is bold, creative, and tailored to your brand."
          />
          <WhyCard
            title="Built for Creators"
            desc="Tempely is designed by and for creators—every tool is optimized for real-world results and engagement."
          />
          <WhyCard
            title="Premium Experience"
            desc="From UI to output, everything feels world-class. Fast, beautiful, and a joy to use on any device."
          />
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-24 animate-fade-in delay-500">
        <h2 className="h2 text-center mb-8 text-white">What Creators Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Alex Rivera"
            handle="@alexcreates"
            text="Tempely is a game-changer. My content is sharper, more original, and my audience is growing faster than ever."
            avatarUrl="/public/branding/Profile_Avatar.png"
          />
          <TestimonialCard
            name="Jules Kim"
            handle="@julesmakes"
            text="I’ve tried every AI tool out there—Tempely is the only one that actually feels like a creative partner."
            avatarUrl="/public/branding/Profile_Avatar.png"
          />
          <TestimonialCard
            name="Samir Patel"
            handle="@samirwrites"
            text="The UI is stunning, the scripts are next-level, and the support is incredible. Highly recommend!"
            avatarUrl="/public/branding/Profile_Avatar.png"
          />
        </div>
      </section>
    </main>
  );
}

function DemoCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col gap-3 animate-fade-in">
      <h3 className="h3 text-2xl font-bold mb-1 text-white drop-shadow-lg">{title}</h3>
      <p className="text-white/80 text-lg mb-2">{desc}</p>
      <span className="btn-premium w-fit mt-auto self-end text-base px-6 py-2">Try Now →</span>
    </Link>
  );
}

function WhyCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col items-center text-center gap-3 animate-fade-in">
      <h3 className="h3 text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-white/80 text-base">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, handle, text, avatarUrl }: { name: string; handle: string; text: string; avatarUrl: string }) {
  return (
    <div className="glass-strong border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col items-center text-center gap-3 animate-fade-in">
      <img src={avatarUrl} alt={name} className="w-14 h-14 rounded-full border-2 border-accent-2 shadow mb-2" />
      <p className="text-white/90 text-base mb-2">“{text}”</p>
      <span className="font-bold text-accent-2">{name}</span>
      <span className="text-white/60 text-sm">{handle}</span>
    </div>
  );
}
