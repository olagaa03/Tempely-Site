import { Lightbulb, Clock, DollarSign, Zap } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans px-4 py-20 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">About Tempely</h1>
        <p className="text-lg text-gray-300 mb-6">
          Tempely is a premium content creation platform built for creators who want to grow smarter, faster, and with less stress. Our tools are designed to help you plan, generate, and track content that actually works.
        </p>
        <div className="text-base text-gray-400 mb-8">
          <p className="mb-2">• AI-powered content generation</p>
          <p className="mb-2">• Viral hook and caption formulas</p>
          <p className="mb-2">• Data-driven content tracking</p>
          <p className="mb-2">• Templates and bundles for every creator</p>
        </div>
        <div className="text-gray-500 text-sm">
          &copy; 2025 Tempely. All rights reserved.
        </div>
      </div>
    </main>
  );
}
