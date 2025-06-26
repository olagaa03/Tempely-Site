export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans px-4 py-20 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-10 text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">Terms of Service</h1>
        <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
          <li>By using Tempely, you agree to our terms and conditions.</li>
          <li>All content and templates are for personal or business use only.</li>
          <li>Do not redistribute or resell our products without permission.</li>
          <li>We reserve the right to update these terms at any time.</li>
        </ul>
        <div className="text-gray-500 text-sm">&copy; 2025 Tempely. All rights reserved.</div>
      </div>
    </main>
  );
}
  