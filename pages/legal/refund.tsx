export default function Refund() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans px-4 py-20 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-10 text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
          <span role="img" aria-label="lock">🔒</span> Refund Policy
        </h1>
        <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
          <li>All purchases are final and non-refundable.</li>
          <li>Refunds are only considered in exceptional cases (e.g. duplicate payments or proven technical failures).</li>
          <li>To request a review, contact <span className="text-blue-400">hello@tempely.com</span> within 14 days of purchase. Please include detailed information.</li>
          <li>Submitting a request does not guarantee approval.</li>
        </ul>
        <div className="text-gray-500 text-sm">&copy; 2025 Tempely. All rights reserved.</div>
      </div>
    </main>
  );
}
  