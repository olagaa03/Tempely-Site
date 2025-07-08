import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 border-t border-white/10 py-10 px-6 mt-16 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Logo & Signature */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="block w-8 h-8 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 4L12.5 16H17L10.5 24L13 14H8L15.5 4H22.5Z" fill="#fff"/>
              </svg>
            </span>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:scale-105 transition-transform duration-200">Tempely</span>
          </Link>
          <span className="text-white/60 text-sm mt-1">Made for creators, by creators.</span>
        </div>
        {/* Center: Quick Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <FooterLink href="/about" label="About" />
          <FooterLink href="/ai-tools" label="AI Tools" />
          <FooterLink href="/templates" label="Templates" />
          <FooterLink href="/products" label="Products" />
          <FooterLink href="/legal/privacy" label="Privacy" />
          <FooterLink href="/legal/terms" label="Terms" />
        </div>
        {/* Right: Social & Newsletter */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-3 mb-1">
            <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter" className="text-white/70 hover:text-accent transition text-xl"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/></svg></a>
            <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram" className="text-white/70 hover:text-accent-2 transition text-xl"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.634 2.2 15.25 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.77.312 4.02.54c-.77.24-1.42.56-2.07 1.21-.65.65-.97 1.3-1.21 2.07-.23.75-.412 1.75-.47 3.03C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.24 2.28.47 3.03.24.77.56 1.42 1.21 2.07.65.65 1.3.97 2.07 1.21.75.23 1.75.412 3.03.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.28-.24 3.03-.47.77-.24 1.42-.56 2.07-1.21.65-.65.97-1.3 1.21-2.07.23-.75.412-1.75.47-3.03.058-1.28.07-1.684.07-4.948 0-3.264-.012-3.668-.07-4.948-.058-1.28-.24-2.28-.47-3.03-.24-.77-.56-1.42-1.21-2.07-.65-.65-1.3-.97-2.07-1.21-.75-.23-1.75-.412-3.03-.47C15.668.012 15.264 0 12 0z"/><circle cx="12" cy="12" r="3.6"/><circle cx="18.406" cy="5.594" r="1.44"/></svg></a>
            <a href="https://youtube.com/" target="_blank" rel="noopener" aria-label="YouTube" className="text-white/70 hover:text-danger transition text-xl"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 7.88 0 12 0 12s0 4.12.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.308 20.5 12 20.5 12 20.5s7.692 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.12 24 12 24 12s0-4.12-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>
          <form className="flex gap-2 mt-1">
            <input type="email" placeholder="Your email" className="rounded-xl px-4 py-2 bg-neutral-900 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-2/40 transition-all duration-200" />
            <button type="submit" className="btn-premium px-6 py-2 text-base">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="text-center text-white/40 text-xs mt-8">
        &copy; {new Date().getFullYear()} Tempely. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-white/70 hover:text-accent transition text-base font-medium">
      {label}
    </Link>
  );
}
