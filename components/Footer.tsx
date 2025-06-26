import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-10 text-center text-gray-400 border-t border-white/10 bg-black/40 font-sans">
      <div className="space-x-6 mb-2">
        <a href="/legal/terms" className="hover:text-white transition">Terms of Service</a>
        <a href="/legal/privacy" className="hover:text-white transition">Privacy Policy</a>
        <a href="/legal/refund" className="hover:text-white transition">Refund Policy</a>
      </div>
      <div className="mt-2 text-xs">Operated by Tempely, registered in Norway.<br/>All rights reserved &copy; Tempely 2025</div>
    </footer>
  );
}
