export default function Refund() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans px-4 py-20 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-10 text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">Refund Policy</h1>
        <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
          <li>We offer refunds within 14 days of purchase if you are not satisfied.</li>
          <li>To request a refund, contact <span className="text-blue-400">hello@tempely.com</span> with your order details.</li>
          <li>Refunds are processed to the original payment method.</li>
          <li>After 14 days, all sales are final.</li>
        </ul>
        <div className="text-gray-500 text-sm">&copy; 2025 Tempely. All rights reserved.</div>
      </div>
    </main>
  );
}
  