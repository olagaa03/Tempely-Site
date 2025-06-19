import { Lightbulb, Clock, DollarSign, Zap } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-16 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-700 tracking-tight">About Tempely</h1>
        <p className="text-lg mb-6 text-gray-700">
        Helping creators grow smarter with digital templates that actually work.
        </p>
        <p className="text-md mb-4">
          Our goal is to help creators grow, stay organized, and build online without burning out. Whether you're scripting videos, tracking your growth, or planning a new launch — Tempely has something for you.
        </p>
        <div className="text-left space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
            <p>
              We’re here to help <span className="font-semibold text-blue-700">new creators</span>, <span className="font-semibold text-blue-700">business owners</span>, and even <span className="font-semibold text-blue-700">established brands</span> <span className="font-semibold">save time and money</span> — instead of spending thousands on complicated programs or endless courses.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 mt-1 flex-shrink-0" />
            <p>
              Our templates give you the <span className="font-semibold">key elements</span> and <span className="font-semibold">strategies</span> to create <span className="font-semibold">engaging</span>, <span className="font-semibold">high-performing content</span>...
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 mt-1 flex-shrink-0" />
            <p>
              ...and <span className="font-semibold">go viral faster</span> than ever before.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 mt-1 flex-shrink-0" />
            <p>
              Our mission at <span className="font-semibold text-blue-700">Tempely</span> is to help <span className="font-semibold">creators</span> and <span className="font-semibold">businesses</span> — new or established — skip expensive courses and get straight to what works. With our <span className="font-semibold">strategic templates</span>, you’ll create <span className="font-semibold">engaging, viral content</span> faster than ever.
            </p>
          </div>
        </div>
        <p className="text-md mb-6">
          Every product is clean, minimal, and built to solve real problems. No fluff. Just useful templates.
        </p>
        <div className="mt-10">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-blue-700 transition"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
