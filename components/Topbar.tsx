import Link from 'next/link';
import { Sun, Moon, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'dark') setDarkMode(true);
    else setDarkMode(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="fixed left-0 top-0 w-full md:pl-64 z-30 bg-white border-b border-gray-200 shadow-sm h-20 flex items-center">
      {/* Logo for mobile */}
      <div className="flex items-center gap-2 md:hidden">
        <Image src="/branding/tempely-logo-transparent.png" alt="Tempely Logo" width={36} height={36} />
        <span className="font-extrabold text-xl text-gray-900 tracking-tight">Tempely</span>
      </div>
      {/* Navigation links */}
      <nav className="hidden md:flex gap-8 text-lg font-semibold text-gray-700 ml-8">
        <Link href="/" className="hover:text-purple-600 transition">Home</Link>
        <Link href="/ai-tools" className="hover:text-purple-600 transition">AI Tools</Link>
        <Link href="/about" className="hover:text-purple-600 transition">About</Link>
        <Link href="/pricing" className="hover:text-purple-700 text-purple-700 bg-purple-50 px-4 py-1 rounded-full font-bold transition ml-2">Pricing</Link>
      </nav>
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
          aria-label="Toggle theme"
          onClick={() => setDarkMode((v) => !v)}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {/* Account menu for signed-in users */}
        <SignedIn>
          <Link href="/account" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Account</span>
          </Link>
          <Link href="/sign-out" className="ml-2 px-5 py-2 rounded-full bg-gray-200 text-gray-700 font-bold shadow hover:bg-gray-300 transition text-base">
            Sign Out
          </Link>
        </SignedIn>
        {/* Sign in/up for guests */}
        <SignedOut>
          <Link href="/sign-in" className="ml-2 px-5 py-2 rounded-full bg-purple-600 text-white font-bold shadow hover:bg-purple-700 transition text-base">
            Sign In
          </Link>
          <Link href="/sign-up" className="ml-2 px-5 py-2 rounded-full bg-gray-100 text-purple-700 font-bold shadow hover:bg-gray-200 transition text-base border border-purple-600">
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </header>
  );
} 