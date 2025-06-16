// components/Header.tsx
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Templa
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link
            href="/products"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Shop Templates
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-md">
          <Link href="/" className="block text-sm">Home</Link>
          <Link href="/products" className="block text-sm">Products</Link>
          <Link href="/about" className="block text-sm">About</Link>
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
