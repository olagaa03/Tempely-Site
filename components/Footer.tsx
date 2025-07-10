import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 border-t border-gray-100 bg-white text-center text-gray-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} Tempely. All rights reserved.
        </div>
        <div className="flex gap-4 justify-center">
          <a href="/about" className="hover:text-purple-600 transition">About</a>
          <a href="/pricing" className="hover:text-purple-700 transition font-semibold">Pricing</a>
          <a href="/legal/privacy" className="hover:text-purple-600 transition">Privacy</a>
          <a href="/legal/terms" className="hover:text-purple-600 transition">Terms</a>
          <a href="/legal/refund" className="hover:text-purple-600 transition">Refund</a>
        </div>
      </div>
    </footer>
  );
}
