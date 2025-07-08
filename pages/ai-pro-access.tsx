import { getAuth } from "@clerk/nextjs/server";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import type { IncomingMessage } from "http";
import { useState } from "react";
import {
  Sparkles,
  Info,
  Target,
  User,
  Mic,
  Megaphone,
  TrendingUp,
  Tag,
  AlertCircle,
  LayoutGrid,
  Clock,
  MessageCircle,
  RefreshCw,
  PenTool,
  Crown,
} from "lucide-react";
import ResultSection from "@/components/ResultSection";
import TempelySpinner from "@/components/TempelySpinner";
import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';

type SectionKey = "captions" | "hooks" | "tip" | "why";

// --- Mocked Pro User IDs ---
const MOCK_PRO_USER_IDS = new Set([
  "user_123abc",
  "user_456def",
  "user_789ghi",
]);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.req as IncomingMessage;
  const { userId } = getAuth(context.req as any);

  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  // TEMP: Allow all signed-in users to access for testing
  return { props: {} };
};

export default function AiProAccessPage() {
  const [formData, setFormData] = useState({
    niche: "Content Creation",
    format: "Short (5–12 sec)",
    audience: "Young Professionals",
    platform: "TikTok",
    extra: "",
    tone: "Bold",
    goal: "Drive engagement",
    framework: "AIDA (Attention, Interest, Desire, Action)",
    vibe: "Bold",
  });

  const [result, setResult] = useState<any>(null); // Now stores the parsed JSON result
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [critique, setCritique] = useState<string[] | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    setCritique(null);

    try {
      const res = await fetch("/api/generate-pro-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Debug: log the raw response
      const text = await res.text();
      console.log("[DEBUG] Raw response from backend:", text);
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        setError("Invalid response from server.");
        setLoading(false);
        return;
      }
      console.log("[DEBUG] Parsed response:", data);
      if (!res.ok) {
        setError(data.error || "Server error.");
        return;
      }
      setResult(data);
      if (data.critique) setCritique(data.critique);
    } catch (err) {
      setError("Failed to connect to OpenAI: " + err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 pt-32">
        {/* Inspiration & Viral Examples Section */}
        <div className="mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4 flex items-center gap-2 animate-slide-in">
            <Sparkles className="w-7 h-7 text-yellow-300 animate-bounce-slow" />
            Inspiration & Viral Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-700/40 to-blue-700/30 border border-purple-400/30 rounded-2xl p-5 shadow-xl flex flex-col gap-2 transform hover:scale-105 hover:shadow-pink-400/30 transition-all duration-300 animate-fade-in">
              <span className="font-bold text-pink-300 text-lg">Viral Hook Example</span>
              <span className="text-white">"Stop scrolling—this 3 seconds could change your content game!"</span>
              <span className="text-xs text-gray-400 mt-2">Why this works: <span className="text-white">Direct, urgent, and scroll-stopping. Uses a challenge to the viewer.</span></span>
            </div>
            <div className="bg-gradient-to-br from-blue-700/40 to-green-700/30 border border-blue-400/30 rounded-2xl p-5 shadow-xl flex flex-col gap-2 transform hover:scale-105 hover:shadow-blue-400/30 transition-all duration-300 animate-fade-in delay-100">
              <span className="font-bold text-blue-300 text-lg">Script Snippet</span>
              <span className="text-white">"Remember, it’s not about pumping out the most content, but about delivering value that resonates with your audience."</span>
              <span className="text-xs text-gray-400 mt-2">Why this works: <span className="text-white">Educational, actionable, and audience-focused.</span></span>
            </div>
            <div className="bg-gradient-to-br from-green-700/40 to-yellow-700/30 border border-green-400/30 rounded-2xl p-5 shadow-xl flex flex-col gap-2 transform hover:scale-105 hover:shadow-green-400/30 transition-all duration-300 animate-fade-in delay-200">
              <span className="font-bold text-green-300 text-lg">CTA Example</span>
              <span className="text-white">"Swipe up now to join the content revolution!"</span>
              <span className="text-xs text-gray-400 mt-2">Why this works: <span className="text-white">Clear, motivating, and action-oriented.</span></span>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg gradient-text">
            Tempely Pro Content Engine
          </h1>
          <span className="inline-block bg-yellow-400/10 text-yellow-300 font-semibold px-4 py-1 rounded-full text-xs mb-4">Custom-Tuned for Creators</span>
          <p className="text-2xl text-gray-100 mb-3 max-w-2xl mx-auto leading-snug animate-fade-in">
            Unlock <span className="font-bold text-blue-400">GPT-4</span> content creation: viral hooks, strategic captions, and <span className="font-bold text-green-300">marketing copy</span> for your brand.
          </p>
          <p className="text-sm text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Powered by a <span className="font-semibold">specially trained AI</span>—engineered for content marketing, not just another chatbot.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 border border-yellow-400/30 rounded-full px-6 py-2 text-yellow-200 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Powered by GPT-4 • Pro Tier
          </div>
        </div>

        {/* Main Form */}
        <div className="glass-strong rounded-3xl shadow-2xl p-8 mb-8 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={<Tag className="text-pink-400" />}
                name="niche"
                label="Niche"
                example="e.g. Fitness, Cooking, Marketing"
                value={formData.niche}
                onChange={(val: string) => setFormData({ ...formData, niche: val })}
              />
              <InputField
                icon={<LayoutGrid className="text-cyan-400" />}
                name="format"
                label="Format"
                example="Short (5–12 sec), Medium (15–30 sec), Long (1–2 min)"
                value={formData.format}
                onChange={(val: string) => setFormData({ ...formData, format: val })}
                options={["Short (5–12 sec)", "Medium (15–30 sec)", "Long (1–2 min)"]}
              />
              <InputField
                icon={<User className="text-blue-400" />}
                name="audience"
                label="Target Audience"
                example="e.g. Young Professionals, Moms 30–45"
                value={formData.audience}
                onChange={(val: string) => setFormData({ ...formData, audience: val })}
              />
              <InputField
                icon={<Megaphone className="text-yellow-400" />}
                name="platform"
                label="Platform"
                example="e.g. TikTok, Instagram, YouTube"
                value={formData.platform}
                onChange={(val: string) => setFormData({ ...formData, platform: val })}
                options={["TikTok", "Instagram", "YouTube"]}
              />
              <InputField
                icon={<Sparkles className="text-purple-400" />}
                name="framework"
                label="Framework"
                example="e.g. AIDA, PAS, Storytelling"
                value={formData.framework}
                onChange={(val: string) => setFormData({ ...formData, framework: val })}
                options={["AIDA (Attention, Interest, Desire, Action)", "PAS (Problem, Agitation, Solution)", "Storytelling", "Listicle", "Bold/Controversial", "Educational", "Conversational"]}
              />
              <InputField
                icon={<Sparkles className="text-yellow-400" />}
                name="vibe"
                label="Vibe"
                example="e.g. Bold, Funny, Disruptive, Educational"
                value={formData.vibe}
                onChange={(val: string) => setFormData({ ...formData, vibe: val })}
                options={["Bold", "Funny", "Controversial", "Educational", "Inspiring", "Disruptive", "Relatable", "High-Energy"]}
              />
              <InputField
                icon={<Sparkles className="text-purple-400" />}
                name="tone"
                label="Tone"
                example="e.g. Bold, Enthusiastic, Educational, Fun"
                value={formData.tone}
                onChange={(val: string) => setFormData({ ...formData, tone: val })}
                options={["Bold", "Enthusiastic", "Educational", "Fun", "Motivational", "Inspiring", "Conversational", "Professional"]}
              />
              <InputField
                icon={<Target className="text-green-400" />}
                name="goal"
                label="Goal"
                example="e.g. Drive engagement, Educate, Inspire action"
                value={formData.goal}
                onChange={(val: string) => setFormData({ ...formData, goal: val })}
                options={["Drive engagement", "Educate", "Inspire action", "Promote product", "Build community", "Increase followers"]}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="extra" className="block font-bold text-base mb-1 flex items-center gap-2 text-white drop-shadow">
                <Info className="text-green-400" />
                Extra Instructions (optional)
              </label>
              <textarea
                id="extra"
                name="extra"
                value={formData.extra}
                onChange={e => setFormData({ ...formData, extra: e.target.value })}
                rows={3}
                className="w-full min-h-[52px] p-4 border border-white/20 rounded-xl bg-black/40 text-white placeholder-white/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400/40 transition-all duration-300 resize-none"
                placeholder="Add any special requests, context, or details for your script..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 hover-lift ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:from-yellow-300 hover:to-purple-400 text-white hover:scale-[1.02] hover:shadow-yellow-400/25"
              }`}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-3 text-white">
                  <TempelySpinner />
                  <span>Generating Script...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <span className="text-2xl animate-pulse-glow">🚀</span>
                  Generate Pro Script
                  <span className="text-lg">→</span>
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-300 rounded-2xl p-6 mb-8 backdrop-blur-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-200 mb-1">Generation Failed</h3>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="glass-strong rounded-3xl p-8 shadow-2xl space-y-8 animate-slide-in mt-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-yellow-300 mb-2 gradient-text">
                Your Video Script
              </h2>
              <p className="text-gray-400">Copy any piece with one click</p>
            </div>
            {/* Title, Length, Vibe, Goal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {result.title && (
                <div className="bg-neutral-900 border border-pink-400/30 p-4 rounded-xl text-white flex items-center gap-2 shadow">
                  <Crown className="w-5 h-5 text-pink-300" />
                  <span className="font-bold text-pink-200">{result.title}</span>
                </div>
              )}
              {result.length && (
                <div className="bg-neutral-900 border border-blue-400/30 p-4 rounded-xl text-white flex items-center gap-2 shadow">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <span className="font-bold text-blue-200">{result.length}</span>
                </div>
              )}
              {result.vibe && (
                <div className="bg-neutral-900 border border-purple-400/30 p-4 rounded-xl text-white flex items-center gap-2 shadow">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  <span className="font-bold text-purple-200">{result.vibe}</span>
                </div>
              )}
              {result.goal && (
                <div className="bg-neutral-900 border border-green-400/30 p-4 rounded-xl text-white flex items-center gap-2 shadow">
                  <Target className="w-5 h-5 text-green-300" />
                  <span className="font-bold text-green-200">{result.goal}</span>
                </div>
              )}
            </div>
            {/* Script Blocks */}
            {result.script_blocks && Array.isArray(result.script_blocks) && (
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <PenTool className="w-6 h-6 text-blue-400" />
                  Script Flow
                </h3>
                <div className="flex flex-col gap-4">
                  {result.script_blocks.map((block: any, idx: number) => (
                    <div key={idx} className="bg-neutral-900 border border-accent/30 p-5 rounded-2xl text-white shadow-lg flex flex-col md:flex-row md:items-center gap-4 animate-fade-in">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <span className="font-bold text-accent text-base">{block.label}</span>
                        <span className="text-xs text-white/60">{block.time}</span>
                      </div>
                      <span className="flex-1 text-lg">{block.content}</span>
                      <button
                        className={`btn-premium px-3 py-1 text-xs ml-auto mt-2 md:mt-0 ${copiedKey === `block-${idx}` ? 'bg-accent/80' : ''}`}
                        onClick={() => copyToClipboard(block.content, `block-${idx}`)}
                      >
                        {copiedKey === `block-${idx}` ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Critique/Why This Works Section */}
            {critique && Array.isArray(critique) && (
              <div className="mt-8 animate-fade-in delay-200">
                <h3 className="text-lg font-bold text-green-300 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-300 animate-bounce-slow" />
                  Why This Works (Expert Breakdown)
                </h3>
                <div className="bg-neutral-900 border border-green-400/30 p-4 rounded-xl text-white shadow-lg animate-fade-in">
                  <ul className="list-disc pl-6 text-green-100 text-sm space-y-1">
                    {critique.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* Caption */}
            {result.caption && (
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  Caption
                </h3>
                <div className="bg-neutral-900 border border-green-400/30 p-4 rounded-xl text-white shadow-lg">
                  <p className="text-base leading-relaxed">{result.caption}</p>
                  <button
                    className={`btn-premium px-3 py-1 text-xs ml-auto mt-2 ${copiedKey === 'caption' ? 'bg-accent/80' : ''}`}
                    onClick={() => copyToClipboard(result.caption, 'caption')}
                  >
                    {copiedKey === 'caption' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
            {/* CTA */}
            {result.cta && (
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
                  <Megaphone className="w-6 h-6 text-yellow-400" />
                  Call To Action (CTA)
                </h3>
                <div className="bg-neutral-900 border border-yellow-400/30 p-4 rounded-xl text-white shadow-lg">
                  <p className="text-base leading-relaxed">{result.cta}</p>
                  <button
                    className={`btn-premium px-3 py-1 text-xs ml-auto mt-2 ${copiedKey === 'cta' ? 'bg-accent/80' : ''}`}
                    onClick={() => copyToClipboard(result.cta, 'cta')}
                  >
                    {copiedKey === 'cta' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function InputField({
  name,
  label,
  value,
  onChange,
  example,
  icon,
  options,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  example?: string;
  icon?: React.ReactNode;
  options?: string[];
}) {
  const [useCustomInput, setUseCustomInput] = useState(false);
  
  const fieldClass =
    "w-full min-h-[52px] p-4 border border-white/20 rounded-xl bg-black/40 text-white placeholder-white/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400/40 transition-all duration-300";

  // Listbox options for select fields
  const selectOptions: Record<string, (string | { group: string; items: string[] })[]> = {
    niche: [
      { group: "Health & Wellness", items: ["Fitness Coaching", "Nutrition", "Mental Health", "Health & Wellness", "Personal Development"] },
      { group: "Business & Marketing", items: ["Business Coach", "Marketing", "Finance", "Real Estate", "Tech Startup"] },
      { group: "Creative & Lifestyle", items: ["Fashion Retailer", "Fashion", "Beauty", "Beauty & Skincare", "Art & Design", "Photography", "Lifestyle", "Travel Blogger", "Food & Cooking"] },
      { group: "Education & Careers", items: ["Education", "Career Development"] },
      { group: "Entertainment & Hobbies", items: ["Entertainment", "Gaming", "Music", "Sports", "Home & Garden", "Pets", "Automotive"] },
      { group: "Parenting & Relationships", items: ["Parenting", "Relationships"] },
    ],
    platform: [
      { group: "Social Media", items: ["Instagram", "TikTok", "LinkedIn", "Facebook", "YouTube", "Twitter", "Pinterest", "Threads", "Reddit"] },
    ],
    audience: [
      { group: "Demographics", items: ["Moms 30-45", "Young Professionals", "Students", "Parents"] },
      { group: "Professionals", items: ["Entrepreneurs", "Tech Professionals", "Small Business Owners", "Creative Professionals", "Fitness Coaches", "Nutritionists", "Mental Health Professionals", "Career Coaches", "Relationship Coaches", "Marketers", "Real Estate Agents"] },
      { group: "Interest Groups", items: ["Fitness Enthusiasts", "Health & Wellness Seekers", "Travelers", "Food Lovers", "Fashion Enthusiasts", "Gamers", "Music Lovers", "Artists", "Photographers", "Personal Development Seekers", "Homeowners", "Pet Owners", "Car Enthusiasts", "Beauty Enthusiasts", "Skincare Lovers"] },
    ],
    format: [
      "Short (5–12 sec)",
      "Medium (15–30 sec)",
      "Long (1–2 min)"
    ],
    tone: [
      "Bold",
      "Enthusiastic",
      "Educational",
      "Fun",
      "Motivational",
      "Inspiring",
      "Conversational",
      "Professional",
      "Empowering",
      "Friendly",
      "Playful",
      "Serious",
      "Casual",
      "Persuasive",
      "Uplifting",
      "Witty",
      "Direct",
      "Relatable",
      "Storytelling",
      "Analytical",
      "Encouraging"
    ],
    goal: [
      "Drive engagement",
      "Educate",
      "Inspire action",
      "Promote product",
      "Build community",
      "Increase followers",
      "Generate leads",
      "Boost sales",
      "Raise awareness",
      "Entertain",
      "Establish authority",
      "Encourage sharing",
      "Start a conversation",
      "Showcase expertise",
      "Motivate audience",
      "Highlight benefits",
      "Solve a problem",
      "Share a story",
      "Announce news",
      "Demonstrate value"
    ],
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block font-bold text-base mb-1 flex items-center gap-2 text-white drop-shadow"
      >
        {icon && <span className="w-5 h-5">{icon}</span>}
        {label}
      </label>
      {example && (
        <span className="block text-xs text-white/70 font-normal mb-1">
          {example}
        </span>
      )}
      
      {/* Toggle between dropdown and custom input */}
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setUseCustomInput(false)}
          className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
            !useCustomInput 
              ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50' 
              : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
          }`}
        >
          Choose from options
        </button>
        <button
          type="button"
          onClick={() => setUseCustomInput(true)}
          className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
            useCustomInput 
              ? 'bg-green-500/30 text-green-300 border border-green-400/50' 
              : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
          }`}
        >
          Write custom
        </button>
      </div>

      {!useCustomInput ? (
        // Dropdown/Listbox option
        ["niche", "platform", "audience", "format", "tone", "goal"].includes(name) ? (
          <div className="relative">
            <Listbox value={value} onChange={onChange}>
              <Listbox.Button className={fieldClass + " flex items-center justify-between cursor-pointer pr-10"}>
                <span>{value === "" ? "None" : value || `Select ${label}`}</span>
                <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 text-xl">▼</span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-20 mt-2 w-full min-w-[250px] bg-black/90 border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-auto focus:outline-none">
                {(selectOptions[name] || []).map((groupOrItem, idx) =>
                  typeof groupOrItem === 'string' ? (
                    <Listbox.Option key={groupOrItem} value={groupOrItem} as={Fragment}>
                      {({ active, selected }) => (
                        <li className={`px-5 py-3 cursor-pointer select-none text-base transition-all ${active ? 'bg-blue-500/30 text-white' : 'text-white/90'}`}>
                          {groupOrItem === "" ? "None" : groupOrItem}
                          {selected && <span className="ml-2 text-blue-400">✓</span>}
                        </li>
                      )}
                    </Listbox.Option>
                  ) : (
                    <div key={groupOrItem.group}>
                      <div className="px-5 py-2 text-xs font-bold text-yellow-300 uppercase tracking-wider opacity-80 bg-white/5 sticky top-0 z-10 cursor-default select-none">{groupOrItem.group}</div>
                      {groupOrItem.items.map(item => (
                        <Listbox.Option key={item} value={item} as={Fragment}>
                          {({ active, selected }) => (
                            <li className={`px-5 py-3 cursor-pointer select-none text-base transition-all ${active ? 'bg-blue-500/30 text-white' : 'text-white/90'}`}>
                              {item === "" ? "None" : item}
                              {selected && <span className="ml-2 text-blue-400">✓</span>}
                            </li>
                          )}
                        </Listbox.Option>
                      ))}
                    </div>
                  )
                )}
              </Listbox.Options>
            </Listbox>
          </div>
        ) : (
          <Listbox value={value} onChange={onChange}>
            <div className="relative">
              <Listbox.Button className={fieldClass + " flex items-center justify-between cursor-pointer pr-10"}>
                <span>{value === "" ? "None" : value || `Select ${label}`}</span>
                <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 text-xl">▼</span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-20 mt-2 w-full min-w-[250px] bg-black/90 border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-auto focus:outline-none">
                {(options || []).map(option => (
                  <Listbox.Option
                    key={option}
                    value={option}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li
                        className={`px-5 py-3 cursor-pointer select-none text-base transition-all ${
                          active ? 'bg-blue-500/30 text-white' : 'text-white/90'
                        }`}
                      >
                        {option === "" ? "None" : option}
                        {selected && <span className="ml-2 text-blue-400">✓</span>}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        )
      ) : (
        // Custom text input
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={e => onChange((e.target as HTMLInputElement).value)}
          className={fieldClass}
          placeholder={`Enter your custom ${label.toLowerCase()}...`}
          required
        />
      )}
    </div>
  );
}
