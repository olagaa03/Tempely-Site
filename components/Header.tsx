'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/branding/tempely-logo-transparent.png"
              alt="Tempely Logo"
              width={320}
              height={90}
              className="w-auto h-20 sm:h-24"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <Link href="/products" className="hover:text-black transition">Products</Link>
            <Link href="/about" className="hover:text-black transition">About</Link>
            <Link href="/ai-tool" className="hover:text-black transition">🤖 Free AI</Link>
            <Link href="/ai-pro" className="hover:text-black transition flex items-center gap-1">
              🚀 AI Pro <span className="bg-yellow-300 text-xs px-2 py-0.5 rounded-full font-semibold">GPT-4</span>
            </Link>

            {/* Premium Button Styling */}
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="px-4 py-1.5 bg-black text-white rounded-full hover:bg-gray-900 transition text-sm font-semibold"
              >
                Shop Templates
              </Link>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm font-semibold">
                    Log In / Sign Up
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-700"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 pt-2 space-y-3 shadow-md text-sm font-medium text-gray-700">
          <Link href="/" className="block">Home</Link>
          <Link href="/products" className="block">Products</Link>
          <Link href="/about" className="block">About</Link>
          <Link href="/ai-tool" className="block">🤖 Free AI</Link>
          <Link href="/ai-pro" className="block">
            🚀 AI Pro <span className="bg-yellow-300 text-xs px-2 py-0.5 rounded-full font-semibold">GPT-4</span>
          </Link>

          <Link
            href="/products"
            className="block bg-black text-white text-center py-2 rounded-full font-semibold"
          >
            Shop Templates
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-semibold">
                Log In / Sign Up
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="pt-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      )}
    </header>
  );
}
