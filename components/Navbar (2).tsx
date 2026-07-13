'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const links = [
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/news', label: 'News & Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-sky bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.jpeg" alt="Al-Warith College crest" width={48} height={48} className="rounded-full" />
          <span className="font-display text-lg font-700 text-navy sm:text-xl">
            Al-Warith College
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-body text-sm font-medium text-navy hover:text-sky">
              {l.label}
            </Link>
          ))}
          <Link
            href="/portal"
            className="rounded-full bg-navy px-4 py-2 font-body text-sm font-medium text-white hover:bg-sky"
          >
            Staff & Student Portal
          </Link>
        </nav>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="block h-0.5 w-6 bg-navy mb-1.5" />
          <span className="block h-0.5 w-6 bg-navy mb-1.5" />
          <span className="block h-0.5 w-6 bg-navy" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-sky/30 bg-paper px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-body text-sm font-medium text-navy"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/portal"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-navy px-4 py-2 text-center font-body text-sm font-medium text-white"
          >
            Staff & Student Portal
          </Link>
        </nav>
      )}
    </header>
  );
}
