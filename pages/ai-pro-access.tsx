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
    format: "Short (10–30 sec)",
    audience: "Young Professionals",
    platform: "TikTok",
    extra: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sections, setSections] = useState<{ hook: string; script: string; caption: string; cta: string }>({
    hook: "",
    script: "",
    caption: "",
    cta: "",
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
    setResult("");
    setError("");
    setSections({ hook: "", script: "", caption: "", cta: "" });

    try {
      const res = await fetch("/api/generate-pro-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.result || typeof data.result !== "string" || data.result.trim() === "") {
        setError(data.error || "No valid result returned from OpenAI.");
        return;
      }

      setResult(data.result);
      parseSections(data.result);
    } catch {
      setError("Failed to connect to OpenAI");
    } finally {
      setLoading(false);
    }
  };

  const parseSections = (text: string) => {
    const extract = (label: string) => {
      const patterns = [
        new RegExp(`\*\*${label}\*\*:?\s*([\s\S]*?)(?=\*\*|$)`, "i"),
        new RegExp(`${label}:\s*([\s\S]*?)(\n\n|$)`, "i"),
        new RegExp(`^${label}\s*\n([\s\S]*?)(\n\n|$)`, "im"),
      ];
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[1].trim();
      }
      return "";
    };
    setSections({
      hook: extract("Hook"),
      script: extract("Script"),
      caption: extract("Caption"),
      cta: extract("CTA"),
    });
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
    <main className="min-h-screen bg-gradient-to-br from-[#0F0F1C] via-[#18122B] to-[#4B2067] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 pt-32">
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
                example="Short (10–30 sec), Long (2–3 min)"
                value={formData.format}
                onChange={(val: string) => setFormData({ ...formData, format: val })}
                options={["Short (10–30 sec)", "Long (2–3 min)"]}
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
        {(sections.hook || sections.script || sections.caption || sections.cta) && (
          <div className="glass-strong rounded-3xl p-8 shadow-2xl space-y-8 animate-slide-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-yellow-300 mb-2 gradient-text">
                Your Video Script
              </h2>
              <p className="text-gray-400">Copy any piece with one click</p>
            </div>
            {sections.hook && (
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">🎣</span>
                  Hook
                </h3>
                <div className="group relative hover-lift">
                  <div className="bg-purple-500/10 border border-purple-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/15">
                    <p className="text-base leading-relaxed">{sections.hook}</p>
                    <button
                      onClick={() => copyToClipboard(sections.hook, `hook`)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-purple-500/20 hover:bg-purple-500/40 p-2 rounded-lg hover:scale-110"
                      title="Copy to clipboard"
                    >
                      {copiedKey === `hook` ? (
                        <span className="text-purple-400 text-sm animate-fade-in">✓</span>
                      ) : (
                        <span className="text-purple-400 text-sm">📋</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {sections.script && (
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">🎬</span>
                  Script
                </h3>
                <div className="group relative hover-lift">
                  <div className="bg-blue-500/10 border border-blue-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15">
                    <p className="text-base leading-relaxed whitespace-pre-line">{sections.script}</p>
                    <button
                      onClick={() => copyToClipboard(sections.script, `script`)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-500/20 hover:bg-blue-500/40 p-2 rounded-lg hover:scale-110"
                      title="Copy to clipboard"
                    >
                      {copiedKey === `script` ? (
                        <span className="text-blue-400 text-sm animate-fade-in">✓</span>
                      ) : (
                        <span className="text-blue-400 text-sm">📋</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {sections.caption && (
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">💬</span>
                  Caption
                </h3>
                <div className="group relative hover-lift">
                  <div className="bg-green-500/10 border border-green-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-green-400/40 hover:bg-green-500/15">
                    <p className="text-base leading-relaxed">{sections.caption}</p>
                    <button
                      onClick={() => copyToClipboard(sections.caption, `caption`)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-green-500/20 hover:bg-green-500/40 p-2 rounded-lg hover:scale-110"
                      title="Copy to clipboard"
                    >
                      {copiedKey === `caption` ? (
                        <span className="text-green-400 text-sm animate-fade-in">✓</span>
                      ) : (
                        <span className="text-green-400 text-sm">📋</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {sections.cta && (
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">👉</span>
                  Call To Action (CTA)
                </h3>
                <div className="group relative hover-lift">
                  <div className="bg-yellow-500/10 border border-yellow-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-500/15">
                    <p className="text-base leading-relaxed">{sections.cta}</p>
                    <button
                      onClick={() => copyToClipboard(sections.cta, `cta`)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-yellow-500/20 hover:bg-yellow-500/40 p-2 rounded-lg hover:scale-110"
                      title="Copy to clipboard"
                    >
                      {copiedKey === `cta` ? (
                        <span className="text-yellow-400 text-sm animate-fade-in">✓</span>
                      ) : (
                        <span className="text-yellow-400 text-sm">📋</span>
                      )}
                    </button>
                  </div>
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
      { group: "Social Media", items: ["Instagram Caption", "Instagram Reel Script", "Instagram Carousel", "TikTok Script", "TikTok Caption", "LinkedIn Post", "Facebook Ad", "Facebook Post", "Tweet Thread", "Pinterest Pin", "Reddit Post"] },
      { group: "Long-form & Email", items: ["YouTube Script", "YouTube Title & Description", "Blog Intro", "Newsletter", "Podcast Outline"] },
      { group: "Web & Ads", items: ["Website Hero Copy", "Google Ad Headline & Description", "Product Landing Page Copy", "Call to Action (CTA) Ideas"] },
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
        ["niche", "platform", "audience"].includes(name) ? (
          <div className="relative">
            <Listbox value={value} onChange={onChange}>
              <Listbox.Button className={fieldClass + " flex items-center justify-between cursor-pointer pr-10"}>
                <span>{value === "" ? "None" : value || `Select ${label}`}</span>
                <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 text-xl">▼</span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-20 mt-2 w-full bg-black/90 border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-auto focus:outline-none">
                {selectOptions[name].map((groupOrItem, idx) =>
                  typeof groupOrItem === 'string' ? null : (
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
              <Listbox.Options className="absolute z-20 mt-2 w-full bg-black/90 border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-auto focus:outline-none">
                {(selectOptions[name] as string[]).map(option => (
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
        <>
          {name === "format" ? (
            <textarea
              name={name}
              id={name}
              value={value}
              onChange={e => onChange((e.target as HTMLTextAreaElement).value)}
              rows={2}
              className={fieldClass + " resize-none"}
              style={{ minHeight: 80 }}
              placeholder={`Enter your custom ${label.toLowerCase()}...`}
            />
          ) : (
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
        </>
      )}
    </div>
  );
}
