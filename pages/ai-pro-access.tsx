import { auth } from "@clerk/nextjs/server";
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
  // Cast req as IncomingMessage here to fix TS error
  const req = context.req as IncomingMessage;

  const { userId } = auth();

  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  if (!MOCK_PRO_USER_IDS.has(userId)) {
    return {
      redirect: {
        destination: "/ai-pro",
        permanent: false,
      },
    };
  }

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
  const [sections, setSections] = useState<Record<SectionKey, string>>({
    captions: "",
    hooks: "",
    tip: "",
    why: "",
  });

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
    setSections({ captions: "", hooks: "", tip: "", why: "" });

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
        new RegExp(
          `\\*\\*\\d+\\.\\s*${label}\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*\\d+\\.|$)`,
          "i"
        ),
        new RegExp(`\\*\\*${label}\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*|$)`, "i"),
        new RegExp(`${label}:\\s*([\\s\\S]*?)(\\n\\n|$)`, "i"),
      ];
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[1].trim();
      }
      return "";
    };

    setSections({
      captions: extract("Captions"),
      hooks: extract("Hook Ideas"),
      tip: extract("Content Strategy Tip"),
      why: extract("Why This Works"),
    });
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 bg-white">
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm mb-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-3">
          Temply Pro Assistant
        </h1>
        <p className="text-center text-gray-500 text-base max-w-2xl mx-auto">
          Unlock premium content creation powered by <strong>GPT-4</strong>.
          Tailored hooks, captions, and marketing content crafted specifically
          for your brand.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 space-y-10 border border-gray-100"
      >
        <section>
          <h2 className="text-gray-600 text-xs font-bold uppercase mb-4 tracking-wider">
            Required Details
          </h2>
          <div className="grid gap-6">
            <InputField
              icon={<Tag />}
              name="niche"
              label="Niche"
              example="e.g. Fitness Coaching, Fashion Retailer"
              value={formData.niche}
              onChange={handleChange}
            />
            <InputField
              icon={<Megaphone />}
              name="platform"
              label="Platform"
              example="e.g. Instagram, TikTok, LinkedIn"
              value={formData.platform}
              onChange={handleChange}
            />
            <InputField
              icon={<User />}
              name="audience"
              label="Audience"
              example="e.g. Moms 30-45, Entrepreneurs, Students"
              value={formData.audience}
              onChange={handleChange}
            />
            <InputField
              icon={<Mic />}
              name="tone"
              label="Tone"
              example="e.g. Funny, Educational, Bold"
              value={formData.tone}
              onChange={handleChange}
            />
            <InputField
              icon={<TrendingUp />}
              name="goal"
              label="Goal"
              example="e.g. Increase engagement, grow to 10k followers"
              value={formData.goal}
              onChange={handleChange}
            />
            <div>
              <label
                htmlFor="format"
                className="block font-medium text-gray-700 mb-1 flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4 text-gray-500" /> Content Format
              </label>
              <select
                name="format"
                id="format"
                value={formData.format}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-blue-500 bg-gray-50 shadow-sm"
              >
                <optgroup label="📱 Social Media">
                  <option>Instagram Caption</option>
                  <option>Instagram Carousel</option>
                  <option>Instagram Reel Script</option>
                  <option>Facebook Post</option>
                  <option>Threads Post</option>
                  <option>Tweet Thread</option>
                  <option>LinkedIn Post</option>
                  <option>Pinterest Pin Description</option>
                  <option>Reddit Post</option>
                </optgroup>
                <optgroup label="🎬 Video & Audio">
                  <option>YouTube Title & Description</option>
                  <option>YouTube Script</option>
                  <option>TikTok Script</option>
                  <option>Podcast Episode Outline</option>
                  <option>Instagram Story Sequence</option>
                </optgroup>
                <optgroup label="📧 Email & Blog">
                  <option>Email Subject Line + Preview Text</option>
                  <option>Newsletter Blurb</option>
                  <option>Blog Post Intro</option>
                  <option>Website Hero Copy</option>
                </optgroup>
                <optgroup label="💰 Ads & Sales Copy">
                  <option>Google Ad Headline + Description</option>
                  <option>Facebook Ad Copy</option>
                  <option>Product Landing Page Copy</option>
                  <option>Elevator Pitch</option>
                </optgroup>
                <optgroup label="🧠 Strategy & CTA">
                  <option>Call to Action (CTA) Ideas</option>
                  <option>FAQ Snippets</option>
                  <option>Lead Magnet Outline</option>
                  <option>Content Upgrade CTA</option>
                </optgroup>
              </select>
            </div>
          </div>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-gray-600 text-xs font-bold uppercase mb-4 tracking-wider">
            Optional Enhancers
          </h2>
          <div className="grid gap-6">
            <InputField
              icon={<Target />}
              name="product"
              label="Product or Offer"
              example="e.g. Digital course, Apparel drop"
              value={formData.product}
              onChange={handleChange}
            />
            <InputField
              icon={<AlertCircle />}
              name="pain"
              label="Customer Pain Point"
              example="e.g. Struggling with consistency, fear of failure"
              value={formData.pain}
              onChange={handleChange}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <TempelySpinner />
              Generating...
            </>
          ) : (
            <>✨ Generate AI Content</>
          )}
        </button>

        {loading && (
          <p className="mt-3 text-sm text-gray-500 text-center italic">
            This may take up to <strong>30–60 seconds</strong> depending on the
            request.
          </p>
        )}
      </form>

      {error && (
        <p className="text-red-600 text-center mt-8 flex justify-center items-center gap-1">
          <Info className="w-4 h-4" /> {error}
        </p>
      )}

      {(sections.captions ||
        sections.hooks ||
        sections.tip ||
        sections.why) && (
        <div className="mt-12">
          <ResultSection
            rawText={result}
            userInput={formData}
            onUpdateSection={(key, content) => {
              setSections((prev) => ({ ...prev, [key]: content }));
            }}
            captions={sections.captions}
            hooks={sections.hooks}
            tip={sections.tip}
            breakdown={sections.why}
          />
        </div>
      )}
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
}: {
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  example?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-medium text-gray-700 mb-1 flex items-center gap-2"
      >
        {icon && <span className="text-gray-500 w-4 h-4">{icon}</span>}
        {label}
      </label>
      {example && (
        <span className="block text-xs text-gray-400 font-normal mb-1">
          {example}
        </span>
      )}
      {name === "product" || name === "pain" ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          rows={3}
          className="w-full p-3 border rounded-lg focus:outline-blue-500 bg-gray-50 shadow-sm"
        />
      ) : (
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="w-full p-3 border rounded-lg focus:outline-blue-500 bg-gray-50 shadow-sm"
          required
        />
      )}
    </div>
  );
}
