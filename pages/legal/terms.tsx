export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans px-4 py-20 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-10 text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">Terms of Service</h1>
        <div className="prose prose-invert text-gray-300 mb-8">
          <h2>Welcome to Tempely. By accessing or using our services, you agree to be bound by the following terms:</h2>
          <ul>
            <li><b>Usage</b>: All templates, tools, and resources provided by Tempely are licensed for individual or business use only.</li>
            <li><b>Restrictions</b>: Redistribution, resale, or sublicensing of any product or content without explicit written permission is strictly prohibited.</li>
            <li><b>No Guarantees</b>: Tempely is provided "as-is". We do not guarantee uninterrupted access, nor do we make any warranties regarding performance.</li>
            <li><b>Modifications</b>: We may update or modify these terms at any time without prior notice. Continued use constitutes acceptance of the updated terms.</li>
            <li><b>Accountability</b>: Users are responsible for any activity conducted under their account and must ensure compliance with these terms.</li>
          </ul>
          <p>If you do not agree with these terms, you should discontinue using our service.</p>
        </div>
        <div className="text-gray-500 text-sm">&copy; 2025 Tempely. All rights reserved.</div>
      </div>
    </main>
  );
}
  