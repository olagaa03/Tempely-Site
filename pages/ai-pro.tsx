import { getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function AiProPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 font-sans">
      <section className="text-center px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Unlock GPT-4 Power with <span className="text-blue-600">Tempely Pro</span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">
          Get longer, smarter content ideas. Access exclusive viral templates, tools, and strategy packs.
        </p>
        <p className="mt-2 text-sm text-gray-400">Built for creators serious about growing fast.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Free Plan</h2>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>✅ ChatGPT 3.5</li>
            <li>✅ Basic content ideas</li>
            <li>✅ 2 viral hook suggestions</li>
            <li>✅ 2 caption example</li>
            <li>✅ Limited form access</li>
          </ul>
          <p className="mt-6 text-lg font-bold">Free Forever</p>
        </div>

        {/* Pro Plan */}
        <div className="bg-blue-50 shadow-xl rounded-2xl p-6 border-2 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Pro Plan</h2>
          <ul className="text-sm space-y-2 text-gray-800">
            <li>🚀 GPT-4 content generation</li>
            <li>✨ 2x more viral hook ideas</li>
            <li>📊 Niche-specific strategy breakdowns</li>
            <li>💬 Captions optimized for conversion</li>
            <li>🔓 Unlimited submissions</li>
            <li>📥 Monthly premium templates drop</li>
          </ul>
          <p className="mt-6 text-lg font-bold text-blue-700">$19.99/month</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
            Upgrade to Tempely Pro
          </button>
          <Link
            href="/ai-pro-access"
            className="mt-2 inline-block text-center text-blue-600 font-medium hover:underline w-full"
          >
            Already upgraded? Access AI Pro Assistant →
          </Link>
        </div>
      </section>
    </main>
  );
}
