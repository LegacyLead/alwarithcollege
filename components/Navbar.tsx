'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Ripple } from '@/components/motion';
import NavGuide from '@/components/NavGuide';

const links = [
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/news', label: 'News & Gallery' },
  { href: '/contact', label: 'Contact' },
];

const NAV_GUIDE_KEY = 'has_seen_nav_guide';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Only ever show once, ever, per browser — and only on mobile widths,
    // since that's the only layout where the hamburger exists at all.
    let alreadySeen = true;
    try {
      alreadySeen = window.localStorage.getItem(NAV_GUIDE_KEY) === 'true';
    } catch {
      // localStorage unavailable — just skip the guide rather than risk showing it repeatedly.
    }
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (!alreadySeen && isMobile) {
      // Small delay so it appears after the page (and the preloader) has settled in.
      const timer = window.setTimeout(() => setShowGuide(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function dismissGuide() {
    setShowGuide(false);
    try {
      window.localStorage.setItem(NAV_GUIDE_KEY, 'true');
    } catch {
      // ignore — worst case it shows again next visit
    }
  }

  function handleHamburgerClick() {
    setOpen(!open);
    if (showGuide) dismissGuide();
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b-4 border-sky bg-paper/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? 'shadow-md shadow-navy/5' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 transition-transform duration-200 hover:scale-[1.03]">
          <Image src="/logo.jpeg" alt="Al-Warith College crest" width={48} height={48} className="rounded-full" />
          <span className="font-display text-lg font-700 text-navy sm:text-xl">
            Al-Warith College
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative py-1 font-body text-sm font-medium text-navy hover:text-sky"
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-coral"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/portal"
            className="relative overflow-hidden rounded-full bg-navy px-4 py-2 font-body text-sm font-medium text-white transition-colors duration-200 hover:bg-sky"
          >
            Staff & Student Portal
            <Ripple />
          </Link>
        </nav>

        <button
          ref={hamburgerRef}
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={handleHamburgerClick}
        >
          <motion.span
            className="block h-0.5 w-6 bg-navy mb-1.5"
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-navy mb-1.5"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-navy"
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-sky/30 bg-paper md:hidden"
          >
            <motion.div
              className="px-4 pb-4"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-body text-sm font-medium text-navy active:text-sky"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/portal"
                  onClick={() => setOpen(false)}
                  className="relative mt-2 block overflow-hidden rounded-full bg-navy px-4 py-2 text-center font-body text-sm font-medium text-white"
                >
                  Staff & Student Portal
                  <Ripple />
                </Link>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      <NavGuide targetRef={hamburgerRef} show={showGuide} onDismiss={dismissGuide} />
    </header>
  );
}
