'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk } from '@clerk/nextjs';

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
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/branding/tempely-logo-transparent.png"
            alt="Tempely Logo"
            width={320}
            height={90}
            className="w-auto h-24"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-7 text-base font-medium">
          <Link href="/" className="hover:text-blue-400 text-gray-100 transition">Home</Link>
          <Link href="/products" className="hover:text-blue-400 text-gray-100 transition">Products</Link>
          <Link href="/about" className="hover:text-blue-400 text-gray-100 transition">About</Link>
          <Link href="/ai-tool" className="hover:text-blue-400 text-gray-100 transition">Free AI</Link>
          <Link href="/ai-pro" className="hover:text-yellow-400 text-gray-100 transition flex items-center gap-1">
            AI Pro <span className="bg-yellow-300 text-xs px-2 py-0.5 rounded-full font-semibold ml-1">GPT-4</span>
          </Link>
          <Link href="/bundle" className="hover:text-purple-400 text-gray-100 transition">Templates</Link>
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
        <button className="md:hidden text-gray-100" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-black/80 backdrop-blur-lg border-t border-white/10 px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-blue-400 text-gray-100 transition">Home</Link>
          <Link href="/products" className="block hover:text-blue-400 text-gray-100 transition">Products</Link>
          <Link href="/about" className="block hover:text-blue-400 text-gray-100 transition">About</Link>
          <Link href="/ai-tool" className="block hover:text-blue-400 text-gray-100 transition">Free AI</Link>
          <Link href="/ai-pro" className="block hover:text-yellow-400 text-gray-100 transition">AI Pro <span className="bg-yellow-300 text-xs px-2 py-0.5 rounded-full font-semibold ml-1">GPT-4</span></Link>
          <Link href="/bundle" className="block hover:text-purple-400 text-gray-100 transition">Templates</Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full px-5 py-2 shadow transition-transform duration-200 hover:scale-105 w-full">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </nav>
      )}
    </header>
  );
}
