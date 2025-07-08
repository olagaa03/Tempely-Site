import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] flex flex-col justify-between">
      <Header />
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 w-full max-w-3xl mx-auto animate-fade-in">
        <h1 className="h1 text-5xl md:text-6xl font-extrabold mb-6 gradient-text drop-shadow-xl">About Tempely</h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
          Tempely is on a mission to empower creators with the world’s most advanced, creative, and premium AI content tools.
        </p>
        <div className="card-premium flex flex-col gap-6 items-center text-center animate-fade-in delay-200">
          <h2 className="h2 text-2xl font-bold gradient-text mb-2">Our Story</h2>
          <p className="text-white/90 text-lg max-w-xl">
            Founded by creators, for creators—Tempely was born out of frustration with generic, uninspired AI tools. We set out to build something different: a platform that feels like a creative partner, not just a robot.
          </p>
          <h2 className="h2 text-2xl font-bold gradient-text mb-2 mt-6">Our Mission</h2>
          <p className="text-white/90 text-lg max-w-xl">
            To help every creator, brand, and visionary unlock their full potential with AI that’s bold, original, and truly useful.
          </p>
          <h2 className="h2 text-2xl font-bold gradient-text mb-2 mt-6">Our Values</h2>
          <ul className="text-white/80 text-lg flex flex-col gap-2 list-disc list-inside">
            <li><span className="font-bold text-accent">Creativity First:</span> Every tool is designed to inspire, not replace, human creativity.</li>
            <li><span className="font-bold text-accent-2">Quality Over Quantity:</span> We focus on outputs that are truly valuable, not just fast.</li>
            <li><span className="font-bold text-primary">For Everyone:</span> Tempely is built to empower all creators, no matter their background or audience size.</li>
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
