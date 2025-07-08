import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-r from-primary via-accent-2 to-accent rounded-full blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-br from-accent-2 to-primary-dark rounded-full blur-2xl opacity-30 animate-float delay-1000"></div>
      </div>
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-6 w-full max-w-3xl animate-fade-in">
        <h1 className="h1 text-5xl md:text-7xl font-extrabold mb-6 gradient-text drop-shadow-xl animate-slide-in">
          Unleash <span className="text-accent">AI Creativity</span> <br /> with Tempely
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
          The world’s most advanced AI content studio for creators, brands, and visionaries. Instantly generate viral scripts, ideas, hooks, and templates—crafted for real results.
        </p>
        <Link href="/ai-tools" className="btn-premium text-xl px-10 py-4 mt-2 animate-fade-in delay-200">
          Try Tempely AI Tools →
        </Link>
      </section>
      {/* Animated AI Tools Preview */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-12 animate-fade-in delay-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DemoCard
            title="Script Generator"
            desc="Generate high-converting, creative video scripts tailored to your niche, audience, and platform."
            color="from-blue-500 to-purple-500"
            href="/ai-pro-access"
          />
          <DemoCard
            title="Ideas Generator"
            desc="Get bold, viral content ideas and angles based on real trends and audience psychology."
            color="from-yellow-400 to-pink-400"
            href="/ai-ideas"
          />
          <DemoCard
            title="Templates Generator"
            desc="Access reusable, proven script templates for any platform or content goal."
            color="from-green-400 to-blue-400"
            href="/ai-templates"
          />
          <DemoCard
            title="Hooks Generator"
            desc="Craft scroll-stopping hooks and openers that grab attention instantly."
            color="from-purple-400 to-yellow-400"
            href="/ai-hooks"
          />
        </div>
      </section>
      {/* Why Tempely Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-24 animate-fade-in delay-400">
        <h2 className="h2 text-center mb-8 gradient-text">Why Tempely?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <WhyCard
            title="Truly Original Content"
            desc="No more generic, AI-sounding scripts. Every output is bold, creative, and tailored to your brand."
            icon={<svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#7f5af0"/><path d="M10 16l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          />
          <WhyCard
            title="Built for Creators"
            desc="Tempely is designed by and for creators—every tool is optimized for real-world results and engagement."
            icon={<svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fbbf24"/><path d="M16 10v12M10 16h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>}
          />
          <WhyCard
            title="Premium Experience"
            desc="From UI to output, everything feels world-class. Fast, beautiful, and a joy to use on any device."
            icon={<svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ff6bcb"/><path d="M12 20l8-8M12 12h8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>}
          />
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-24 animate-fade-in delay-500">
        <h2 className="h2 text-center mb-8 gradient-text">What Creators Say</h2>
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

function DemoCard({ title, desc, color, href }: { title: string; desc: string; color: string; href: string }) {
  return (
    <Link href={href} className={`card-premium bg-gradient-to-br ${color} hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col gap-3 animate-fade-in`}>
      <h3 className="h3 text-2xl font-bold mb-1 gradient-text drop-shadow-lg">{title}</h3>
      <p className="text-white/80 text-lg mb-2">{desc}</p>
      <span className="btn-premium w-fit mt-auto self-end text-base px-6 py-2">Try Now →</span>
    </Link>
  );
}

function WhyCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="card-premium flex flex-col items-center text-center gap-3 animate-fade-in">
      <div className="mb-2">{icon}</div>
      <h3 className="h3 text-xl font-bold gradient-text mb-1">{title}</h3>
      <p className="text-white/80 text-base">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, handle, text, avatarUrl }: { name: string; handle: string; text: string; avatarUrl: string }) {
  return (
    <div className="card-premium flex flex-col items-center text-center gap-3 animate-fade-in">
      <img src={avatarUrl} alt={name} className="w-14 h-14 rounded-full border-2 border-accent-2 shadow mb-2" />
      <p className="text-white/90 text-base mb-2">“{text}”</p>
      <span className="font-bold text-accent-2">{name}</span>
      <span className="text-white/60 text-sm">{handle}</span>
    </div>
  );
}
