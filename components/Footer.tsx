import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t-4 border-sky bg-navy text-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Image src="/logo.jpeg" alt="Al-Warith College crest" width={44} height={44} className="rounded-full" />
            <div>
              <p className="font-display text-lg font-700">Al-Warith College</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-sun">Reaching for the Stars</p>
            </div>
          </div>

          <div>
            <p className="mb-2 font-display text-sm font-600 text-sun">Quick links</p>
            <ul className="space-y-1 text-sm">
              <li><Link href="/admissions" className="hover:text-sky">Admissions</Link></li>
              <li><Link href="/academics" className="hover:text-sky">Academics</Link></li>
              <li><Link href="/news" className="hover:text-sky">News & Gallery</Link></li>
              <li><Link href="/portal" className="hover:text-sky">Staff & Student Portal</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-2 font-display text-sm font-600 text-sun">Reach us</p>
            <ul className="space-y-1 text-sm">
              <li>19 Fatayi Jeru Street, Agbele, Oke Ota-Ona, Ikorodu, Lagos</li>
              <li>
                <a href="mailto:alwarithschools@yahoo.com" className="hover:text-sky">alwarithschools@yahoo.com</a>
              </li>
              <li>
                <a href="tel:+2348028358372" className="hover:text-sky">+234 802 835 8372</a>
              </li>
              <li>
                <a href="https://wa.me/2348028358372" target="_blank" rel="noopener noreferrer" className="hover:text-sky">
                  WhatsApp: +234 802 835 8372
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-4 text-center font-mono text-xs text-white/60">
          &copy; {new Date().getFullYear()} Al-Warith College. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
