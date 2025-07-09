'use client';

import Link from 'next/link';
import { useState } from 'react';
import { User, ChevronDown, Sun, Moon } from 'lucide-react';
import Image from 'next/image';

function LightningBoltIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="12,2 6,16 14,16 10,26 22,10 14,10 18,2" stroke="#111" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-strong shadow-lg backdrop-blur-lg border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="block w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center shadow-lg border border-white/10 overflow-hidden">
            <Image src="/branding/tempely-logo-transparent.png" alt="Tempely Logo" width={28} height={28} priority />
          </span>
          <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-accent transition-colors duration-200">Tempely</span>
        </Link>
        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-6 text-lg font-semibold">
          {[
            { href: '/home', label: 'Home' },
            { href: '/products', label: 'Products' },
            { href: '/about', label: 'About' },
            { href: '/ai-tools', label: 'AI Tools' },
            { href: '/templates', label: 'Templates' },
          ].map(({ href, label }) => (
            <li key={href} className="relative group">
              <Link href={href} className="px-3 py-1 rounded-xl transition-colors duration-200 text-white/80 hover:text-accent focus:text-accent">
                {label}
                <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-accent rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Right Side: Theme Toggle & Profile */}
        <div className="flex items-center gap-2 relative">
          {/* Theme Toggle */}
          <button
            className="p-2 rounded-full bg-black/10 hover:bg-black/30 transition-colors duration-200 text-white mr-2"
            aria-label="Toggle theme"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 text-white font-bold shadow hover:scale-105 transition-all duration-200 border border-white/10"
              onClick={() => setProfileOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={profileOpen}
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Account</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-neutral-900 glass-strong rounded-2xl shadow-2xl py-3 z-50 animate-fade-in border border-white/10">
                <Link href="/account" className="block px-5 py-2 text-white/90 hover:bg-accent/10 transition rounded-xl">Profile</Link>
                <Link href="/account" className="block px-5 py-2 text-white/90 hover:bg-accent/10 transition rounded-xl">Settings</Link>
                <Link href="/sign-out" className="block px-5 py-2 text-danger hover:bg-danger/10 transition rounded-xl">Sign Out</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
