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
    niche: "Fitness Coaching",
    platform: "Instagram",
    audience: "Moms 30-45",
    tone: "Educational",
    goal: "Grow to 10k followers",
    product: "Digital course on meal planning",
    pain: "Struggling with consistency and self-doubt",
    format: "Instagram Caption",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sections, setSections] = useState<Record<SectionKey | 'idea', string>>({
    captions: "",
    hooks: "",
    tip: "",
    why: "",
    idea: "",
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
    setSections({ captions: "", hooks: "", tip: "", why: "", idea: "" });

    try {
      const res = await fetch("/api/generate-pro-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (
        !res.ok ||
        !data.result ||
        typeof data.result !== "string" ||
        data.result.trim() === ""
      ) {
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
        // Match "**1. Captions**" or "**Captions**" or "Captions:"
        new RegExp(`\\*\\*\\d*\\.?\\s*${label}\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*\\d*\\.?\\s*\\w|$)`, "i"),
        new RegExp(`\\*\\*${label}\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*|$)`, "i"),
        new RegExp(`${label}:\\s*([\\s\\S]*?)(\\n\\n|$)`, "i"),
        // Fallback: match label at start of line
        new RegExp(`^${label}\\s*\\n([\\s\\S]*?)(\\n\\n|$)`, "im"),
      ];
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[1].trim();
      }
      return "";
    };

    setSections({
      idea: extract("Content Idea"),
      captions: extract("Captions"),
      hooks: extract("Hook Ideas"),
      tip: extract("Content Strategy Tip"),
      why: extract("Why This Works"),
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
                example="e.g. Fitness Coaching, Fashion Retailer"
                value={formData.niche}
                onChange={(val: string) => setFormData({ ...formData, niche: val })}
              />
              <InputField
                icon={<Megaphone className="text-yellow-400" />}
                name="platform"
                label="Platform"
                example="e.g. Instagram, TikTok, LinkedIn"
                value={formData.platform}
                onChange={(val: string) => setFormData({ ...formData, platform: val })}
              />
              <InputField
                icon={<User className="text-blue-400" />}
                name="audience"
                label="Audience"
                example="e.g. Moms 30-45, Entrepreneurs, Students"
                value={formData.audience}
                onChange={(val: string) => setFormData({ ...formData, audience: val })}
              />
              <InputField
                icon={<Mic className="text-purple-400" />}
                name="tone"
                label="Tone"
                example="e.g. Funny, Educational, Bold"
                value={formData.tone}
                onChange={(val: string) => setFormData({ ...formData, tone: val })}
              />
              <InputField
                icon={<Target className="text-green-400" />}
                name="goal"
                label="Goal"
                example="e.g. Grow to 10k followers, Launch a product"
                value={formData.goal}
                onChange={(val: string) => setFormData({ ...formData, goal: val })}
              />
              <InputField
                icon={<LayoutGrid className="text-cyan-400" />}
                name="format"
                label="Content Format"
                example="e.g. Instagram Caption, LinkedIn Post"
                value={formData.format}
                onChange={(val: string) => setFormData({ ...formData, format: val })}
              />
              <InputField
                icon={<TrendingUp className="text-orange-400" />}
                name="product"
                label="Product/Offer"
                example="e.g. Digital course, Coaching program"
                value={formData.product}
                onChange={(val: string) => setFormData({ ...formData, product: val })}
              />
              <InputField
                icon={<AlertCircle className="text-red-400" />}
                name="pain"
                label="Audience Pain Point"
                example="e.g. Struggling with consistency"
                value={formData.pain}
                onChange={(val: string) => setFormData({ ...formData, pain: val })}
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
                  <span>Generating Pro Content...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <span className="text-2xl animate-pulse-glow">🚀</span>
                  Generate Pro Content
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
        {(sections.captions || sections.hooks || sections.tip || sections.why) && (
          <div className="glass-strong rounded-3xl p-8 shadow-2xl space-y-8 animate-slide-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-yellow-300 mb-2 gradient-text">
                🚀 Your Exclusive Pro Content
              </h2>
              <p className="text-gray-400">Copy any piece with one click</p>
            </div>
            {/* Content Idea Section - move to top */}
            {sections.idea && (
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">💡</span>
                  Content Idea
                </h3>
                <div className="group relative hover-lift">
                  <div className="bg-green-500/10 border border-green-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-green-400/40 hover:bg-green-500/15">
                    <p className="text-base leading-relaxed">{sections.idea}</p>
                    <button
                      onClick={() => copyToClipboard(sections.idea, `idea`)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-green-500/20 hover:bg-green-500/40 p-2 rounded-lg hover:scale-110"
                      title="Copy to clipboard"
                    >
                      {copiedKey === `idea` ? (
                        <span className="text-green-400 text-sm animate-fade-in">✓</span>
                      ) : (
                        <span className="text-green-400 text-sm">📋</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Captions Section - filter out empty and number-only lines */}
            {sections.captions && (
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">📢</span>
                  Captions
                </h3>
                <div className="space-y-3">
                  {sections.captions
                    .split(/\n|\r/)
                    .map(line => line.trim())
                    .filter(line => line && !/^\d+\.?$/.test(line))
                    .map((line, idx) => (
                      <div key={`caption-${idx}`} className="group relative hover-lift">
                        <div className="bg-blue-500/10 border border-blue-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15">
                          <p className="text-base leading-relaxed">{line}</p>
                          <button
                            onClick={() => copyToClipboard(line, `caption-${idx}`)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-500/20 hover:bg-blue-500/40 p-2 rounded-lg hover:scale-110"
                            title="Copy to clipboard"
                          >
                            {copiedKey === `caption-${idx}` ? (
                              <span className="text-blue-400 text-sm animate-fade-in">✓</span>
                            ) : (
                              <span className="text-blue-400 text-sm">📋</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {/* Hooks Section - filter out empty and number-only lines */}
            {sections.hooks && (
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">🎣</span>
                  Hooks
                </h3>
                <div className="space-y-3">
                  {sections.hooks
                    .split(/\n|\r/)
                    .map(line => line.trim())
                    .filter(line => line && !/^\d+\.?$/.test(line))
                    .map((line, idx) => (
                      <div key={`hook-${idx}`} className="group relative hover-lift">
                        <div className="bg-purple-500/10 border border-purple-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/15">
                          <p className="text-base leading-relaxed">{line}</p>
                          <button
                            onClick={() => copyToClipboard(line, `hook-${idx}`)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-purple-500/20 hover:bg-purple-500/40 p-2 rounded-lg hover:scale-110"
                            title="Copy to clipboard"
                          >
                            {copiedKey === `hook-${idx}` ? (
                              <span className="text-purple-400 text-sm animate-fade-in">✓</span>
                            ) : (
                              <span className="text-purple-400 text-sm">📋</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {/* Content Strategy Tip */}
            {sections.tip && (
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">💡</span>
                  Content Strategy Tip
                </h3>
                <div className="group relative hover-lift">
                  <div className="bg-green-500/10 border border-green-400/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-green-400/40 hover:bg-green-500/15">
                    <p className="text-base leading-relaxed">{sections.tip}</p>
                    <button
                      onClick={() => copyToClipboard(sections.tip, `tip`)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-green-500/20 hover:bg-green-500/40 p-2 rounded-lg hover:scale-110"
                      title="Copy to clipboard"
                    >
                      {copiedKey === `tip` ? (
                        <span className="text-green-400 text-sm animate-fade-in">✓</span>
                      ) : (
                        <span className="text-green-400 text-sm">📋</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Why This Works */}
            {sections.why && (
              <div>
                <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                  <span className="animate-pulse-glow">🧠</span>
                  Why This Works
                </h3>
                <div className="group relative hover-lift">
                  <div className="bg-yellow-400/10 border border-yellow-300/20 p-4 rounded-xl text-white backdrop-blur-sm transition-all duration-300 hover:border-yellow-300/40 hover:bg-yellow-400/15">
                    <p className="text-base leading-relaxed">{sections.why}</p>
                    <button
                      onClick={() => copyToClipboard(sections.why, `why`)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-yellow-400/20 hover:bg-yellow-400/40 p-2 rounded-lg hover:scale-110"
                      title="Copy to clipboard"
                    >
                      {copiedKey === `why` ? (
                        <span className="text-yellow-300 text-sm animate-fade-in">✓</span>
                      ) : (
                        <span className="text-yellow-300 text-sm">📋</span>
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
    tone: [
      { group: "Professional", items: ["Educational", "Professional", "Motivational", "Inspiring"] },
      { group: "Casual & Fun", items: ["Friendly", "Bold", "Funny", "Witty", "Conversational", "Casual"] },
    ],
    goal: [
      { group: "Growth & Engagement", items: ["Grow to 10k followers", "Increase engagement", "Build brand awareness", "Drive website traffic", "Expand reach", "Increase brand loyalty", "Build community", "Create viral content"] },
      { group: "Sales & Leads", items: ["Launch a product", "Generate leads", "Sell products/services", "Improve conversion rates", "Boost sales", "Monetize content"] },
      { group: "Authority & Education", items: ["Establish authority", "Educate audience", "Inspire action", "Build relationships", "Create partnerships"] },
    ],
    format: [
      { group: "Social Media", items: ["Instagram Caption", "Instagram Reel Script", "Instagram Carousel", "TikTok Script", "TikTok Caption", "LinkedIn Post", "Facebook Ad", "Facebook Post", "Tweet Thread", "Pinterest Pin", "Reddit Post"] },
      { group: "Long-form & Email", items: ["YouTube Script", "YouTube Title & Description", "Blog Intro", "Newsletter", "Podcast Outline"] },
      { group: "Web & Ads", items: ["Website Hero Copy", "Google Ad Headline & Description", "Product Landing Page Copy", "Call to Action (CTA) Ideas"] },
    ],
    product: [
      { group: "None", items: [""] },
      { group: "Digital Products", items: ["Digital course", "E-book", "Template bundle", "Digital download", "Online tool", "Certification program", "Masterclass", "Webinar"] },
      { group: "Services", items: ["Coaching program", "Consulting service", "1:1 service", "Group program"] },
      { group: "Memberships & Subscriptions", items: ["Membership site", "Subscription box"] },
      { group: "Events", items: ["Event", "Retreat", "Challenge"] },
      { group: "Physical Products", items: ["Physical product"] },
      { group: "Software & Apps", items: ["Software/app"] },
    ],
    pain: [
      { group: "None", items: [""] },
      { group: "Mindset & Motivation", items: ["Struggling with consistency and self-doubt", "Lack of confidence", "Imposter syndrome", "Fear of failure", "Perfectionism", "Procrastination", "Finding motivation", "Building discipline", "Overcoming obstacles"] },
      { group: "Productivity & Time", items: ["Lack of time management", "Overwhelm and burnout", "Lack of direction", "Unclear goals", "Poor habits", "Work-life balance"] },
      { group: "External Challenges", items: ["Financial stress", "Relationship issues", "Health concerns", "Career stagnation", "Creative block", "Social media pressure", "Comparison to others", "Stress and anxiety"] },
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
        ["niche", "platform", "audience", "tone", "goal", "format", "pain", "product"].includes(name) ? (
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
          {name === "product" || name === "pain" ? (
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
