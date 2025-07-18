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
        className="fixed top-4 left-4 z-50 md:hidden bg-[var(--surface)] border border-[var(--border)] rounded-full p-2 shadow-md focus:outline-none"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-[var(--text-main)]" />
      </button>
      <button
        className={`hidden md:block fixed top-4 left-4 z-40 bg-[var(--surface)] border border-[var(--border)] rounded-full p-2 shadow-md focus:outline-none transition-transform ${open ? '' : 'translate-x-0'}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Minimize sidebar' : 'Expand sidebar'}
      >
        {open ? <X className="w-6 h-6 text-[var(--text-main)]" /> : <Menu className="w-6 h-6 text-[var(--text-main)]" />}
      </button>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[var(--surface)] border-r border-[var(--border)] shadow-sm z-40
          flex flex-col py-8 px-5 transition-all duration-300
          ${open ? 'w-64' : 'w-20'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        style={{ minWidth: open ? 256 : 80 }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 bg-[var(--surface)] border border-[var(--border)] rounded-full p-2 shadow focus:outline-none"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6 text-[var(--text-main)]" />
        </button>
        <div className={`flex items-center gap-3 mb-12 px-2 transition-all ${open ? '' : 'justify-center'}`}>
          <Image src="/branding/tempely-logo-transparent.png" alt="Tempely Logo" width={open ? 48 : 36} height={open ? 48 : 36} />
          {open && <span className="font-extrabold text-2xl text-[var(--text-main)] tracking-tight">Tempely</span>}
        </div>
        <nav className="flex flex-col gap-3 mb-6">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium text-[var(--text-main)] hover:bg-[var(--background-alt)] transition group ${open ? '' : 'justify-center px-2'}`}
            >
              <Icon className="w-5 h-5 text-purple-500 group-hover:text-purple-700" />
              {open && <span>{label}</span>}
            </Link>
          ))}
        </nav>
        {/* Pricing link at the bottom */}
        <Link
          href="/pricing"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition ${open ? '' : 'justify-center px-2'}`}
          style={{ background: 'var(--glass)', color: 'var(--accent)' }}
        >
          <span className="material-symbols-outlined text-purple-500">local_offer</span>
          {open && <span>Pricing</span>}
        </Link>
        <div className={`text-xs text-[var(--text-muted)] px-2 pt-4 pb-2 ${open ? '' : 'text-center'}`}>© {new Date().getFullYear()} Tempely</div>
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