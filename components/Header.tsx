'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk } from '@clerk/nextjs';

const TEMPELY_PURPLE = '#7c3aed';

function LightningBolt() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
      <path d="M13 2L3 14H12L11 22L21 10H13L13 2Z" fill={TEMPELY_PURPLE} stroke="white" strokeWidth="1.5" filter="drop-shadow(0 0 6px #7c3aed99)"/>
    </svg>
  );
}

function SignOutButton() {
  const { signOut } = useClerk();
  return (
    <button
      onClick={() => signOut(() => { window.location.href = '/'; })}
      className="ml-2 px-4 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition text-sm font-semibold shadow"
    >
      Sign Out
    </button>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-white/10 shadow-sm font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/branding/tempely-logo-transparent.png"
            alt="Tempely Logo"
            width={160}
            height={45}
            className="w-auto h-14 md:h-20 max-w-[180px] md:max-w-[320px] transition-all duration-300"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-7 text-base font-medium">
          <Link href="/" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition">Home</Link>
          <Link href="/products" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition">Products</Link>
          <Link href="/about" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition">About</Link>
          <Link href="/ai-tool" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition">AI Hook Generator</Link>
          <Link href="/ai-pro" className="nav-link flex items-center gap-1 hover:text-yellow-200 transition">
            Content Engine Pro
            <span className="ml-1 px-2 py-[3px] rounded-full font-bold text-xs shadow-sm leading-none glass" style={{ background: 'rgba(255, 221, 51, 0.18)', color: '#FFD600', border: '1px solid #FFD600', verticalAlign: 'middle', fontWeight: 700 }}>
              GPT-4
            </span>
          </Link>
          <Link href="/bundle" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition">Templates</Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full px-5 py-2 shadow transition-transform duration-200 hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </nav>
        <button className="md:hidden text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--tempely-purple)]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-gradient-to-br from-[#18122B]/80 to-[#4B2067]/80 backdrop-blur-lg border-t border-white/10 border-b border-white/10 px-6 py-4 space-y-3 text-base shadow-2xl rounded-b-2xl">
          <Link href="/" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition block" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/products" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition block" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/about" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition block" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/ai-tool" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition block" onClick={() => setIsOpen(false)}>AI Hook Generator</Link>
          <Link href="/ai-pro" className="nav-link flex items-center gap-1 hover:text-yellow-200 transition block" onClick={() => setIsOpen(false)}>
            Content Engine Pro
            <span className="ml-1 px-2 py-[2px] rounded-full font-bold text-xs shadow-sm leading-none glass" style={{ background: 'rgba(255, 221, 51, 0.18)', color: '#FFD600', border: '1px solid #FFD600', fontWeight: 700 }}>
              GPT-4
            </span>
          </Link>
          <Link href="/bundle" className="nav-link hover:text-[var(--tempely-purple)] text-gray-100 transition block" onClick={() => setIsOpen(false)}>Templates</Link>
          <hr className="my-2 border-white/10" />
          <SignedIn>
            <div className="flex items-center gap-2 mt-2">
              <UserButton afterSignOutUrl="/" />
              <button
                onClick={() => { setIsOpen(false); useClerk().signOut(() => { window.location.href = '/'; }); }}
                className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition text-xs font-semibold shadow"
              >
                Sign Out
              </button>
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full px-5 py-2 shadow transition-transform duration-200 hover:scale-105 w-full text-base mt-2">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </nav>
      )}
    </header>
  );
}
