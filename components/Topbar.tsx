import Link from 'next/link';
import { Sun, Moon, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { useTheme } from './ThemeContext';

export default function Topbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed left-0 top-0 w-full md:pl-64 z-30 bg-[var(--surface)] border-b border-[var(--border)] border-l border-[var(--border)] shadow-sm h-20 flex items-center px-6 md:px-12 gap-6" style={{minHeight: '5rem'}}>
      {/* Logo for mobile */}
      <div className="flex items-center gap-2 md:hidden">
        <Image src="/branding/tempely-logo-transparent.png" alt="Tempely Logo" width={36} height={36} />
        <span className="font-extrabold text-xl text-[var(--text-main)] tracking-tight">Tempely</span>
      </div>
      {/* Navigation links */}
      <nav className="hidden md:flex gap-10 text-lg font-semibold text-[var(--text-main)] ml-8">
        <Link href="/" className="hover:text-purple-600 transition">Home</Link>
        <Link href="/ai-tools" className="hover:text-purple-600 transition">AI Tools</Link>
        <Link href="/about" className="hover:text-purple-600 transition">About</Link>
        <Link href="/pricing" className="hover:text-purple-700 text-purple-700 bg-purple-50 px-4 py-1 rounded-full font-bold transition ml-2">Pricing</Link>
      </nav>
      <div className="flex items-center gap-4 ml-auto">
        {/* Theme toggle */}
        <button
          className="p-2 rounded-full bg-[var(--background-alt)] hover:bg-[var(--background)] transition-colors text-[var(--text-main)]"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {/* Account menu for signed-in users */}
        <SignedIn>
          <Link href="/account" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--background-alt)] hover:bg-[var(--background)] text-[var(--text-main)] font-bold transition">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Account</span>
          </Link>
          <Link href="/sign-out" className="ml-2 px-5 py-2 rounded-full bg-[var(--background)] text-[var(--text-main)] font-bold shadow hover:bg-[var(--background-alt)] transition text-base">
            Sign Out
          </Link>
        </SignedIn>
        {/* Sign in/up for guests */}
        <SignedOut>
          <Link href="/sign-in" className="ml-2 px-5 py-2 rounded-full bg-purple-600 text-white font-bold shadow hover:bg-purple-700 transition text-base">
            Sign In
          </Link>
          <Link href="/sign-up" className="ml-2 px-5 py-2 rounded-full bg-[var(--background-alt)] text-purple-700 font-bold shadow hover:bg-[var(--background)] transition text-base border border-purple-600">
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </header>
  );
} 