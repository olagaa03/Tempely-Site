import Link from 'next/link';
import { Sparkles, Grid, User, Folder, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: Grid },
  { href: '/ai-tools', label: 'AI Tools', icon: Sparkles },
  { href: '/projects', label: 'Projects', icon: Folder },
  { href: '/account', label: 'Account', icon: User },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Responsive: show hamburger on mobile, minimize on desktop
  return (
    <>
      {/* Hamburger for mobile and desktop minimize */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white border border-gray-200 rounded-full p-2 shadow-md focus:outline-none"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
      <button
        className={`hidden md:block fixed top-4 left-4 z-40 bg-white border border-gray-200 rounded-full p-2 shadow-md focus:outline-none transition-transform ${open ? '' : 'translate-x-0'}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Minimize sidebar' : 'Expand sidebar'}
      >
        {open ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm z-40
          flex flex-col py-6 px-4 transition-all duration-300
          ${open ? 'w-64' : 'w-20'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        style={{ minWidth: open ? 256 : 80 }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 bg-gray-100 border border-gray-200 rounded-full p-2 shadow focus:outline-none"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
        <div className={`flex items-center gap-2 mb-10 px-2 transition-all ${open ? '' : 'justify-center'}`}>
          <Image src="/branding/tempely-logo-transparent.png" alt="Tempely Logo" width={open ? 40 : 32} height={open ? 40 : 32} />
          {open && <span className="font-extrabold text-2xl text-gray-900 tracking-tight">Tempely</span>}
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:bg-[#f5f6fa] transition group ${open ? '' : 'justify-center px-2'}`}
            >
              <Icon className="w-5 h-5 text-purple-500 group-hover:text-purple-700" />
              {open && <span>{label}</span>}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <div className={`text-xs text-gray-400 px-2 pt-8 ${open ? '' : 'text-center'}`}>© {new Date().getFullYear()} Tempely</div>
      </aside>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      {/* Padding for content so it doesn't go under sidebar */}
      <div className={`hidden md:block transition-all duration-300 ${open ? 'w-64' : 'w-20'}`} />
    </>
  );
} 