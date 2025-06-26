export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181B] to-[#0F0F0F] font-sans px-4 py-20 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-10 text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">Privacy Policy</h1>
        <p className="text-gray-300 mb-6">Tempely respects your privacy. Here's how we handle your data:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-8">
          <li>We collect only necessary information (e.g., name, email, payment).</li>
          <li>Your data is used only to deliver our services. We never sell it.</li>
          <li>We may use cookies to improve your experience.</li>
          <li>You can request to access or delete your data by contacting us.</li>
          <li>Payments are securely processed by our payment provider, Lemon Squeezy.</li>
          <li>Contact: <span className="text-blue-400">hello@tempely.com</span></li>
        </ul>
        <div className="text-gray-500 text-sm">&copy; 2025 Tempely. All rights reserved.</div>
      </div>
    </main>
  );
}
  