import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/branding/tempely-logo-transparent.png"
              alt="Tempely Logo"
              width={140}
              height={40}
              className="w-auto h-10 sm:h-12"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <Link href="/products" className="hover:text-black transition">Products</Link>
            <Link href="/about" className="hover:text-black transition">About</Link>
            <Link
              href="/products"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Shop Templates
            </Link>
          </nav>

          {/* Mobile Nav Button */}
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
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow-md text-sm font-medium text-gray-700">
          <Link href="/" className="block">Home</Link>
          <Link href="/products" className="block">Products</Link>
          <Link href="/about" className="block">About</Link>
          <Link
            href="/products"
            className="block bg-black text-white text-center py-2 rounded-md"
          >
            Shop Templates
          </Link>
        </div>
      )}
    </header>
  );
}
