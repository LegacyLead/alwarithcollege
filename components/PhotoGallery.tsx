'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function PhotoGallery({ photos }: { photos: { src: string; caption: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const slotWidth = el.scrollWidth / photos.length;
    const index = Math.round(el.scrollLeft / slotWidth);
    setActive(Math.min(photos.length - 1, Math.max(0, index)));
  }

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="-mx-4 mt-8 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p) => (
          <figure
            key={p.src}
            className="group w-[78%] flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-150 hover:shadow-xl active:scale-[0.97] sm:w-auto sm:active:scale-100"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={p.src}
                alt={p.caption}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 78vw, 33vw"
              />
            </div>
            <figcaption className="p-3 font-body text-xs text-navy/70">{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* Swipe progress dots — mobile only, since sm+ shows the full grid at once */}
      <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
        {photos.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-4 bg-sky' : 'w-1.5 bg-sky/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
