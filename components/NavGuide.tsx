'use client';

import { useEffect, useState, RefObject } from 'react';
import { motion } from 'framer-motion';
import { Pointer } from 'lucide-react';

interface NavGuideProps {
  /** Ref to the actual hamburger button in your Navbar — the guide measures
   *  its on-screen position so the spotlight/hand line up exactly, however
   *  your header is laid out. */
  targetRef: RefObject<HTMLElement>;
  show: boolean;
  onDismiss: () => void;
}

type Measurements = {
  ringLeft: number;
  ringTop: number;
  ringWidth: number;
  ringHeight: number;
  tooltipTop: number;
  tooltipRight: number;
};

export default function NavGuide({ targetRef, show, onDismiss }: NavGuideProps) {
  const [m, setM] = useState<Measurements | null>(null);

  useEffect(() => {
    if (!show) return;

    function measure() {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) return; // button hidden (e.g. desktop layout) — nothing to point at

      const padding = 14;
      setM({
        ringLeft: rect.left - padding,
        ringTop: rect.top - padding,
        ringWidth: rect.width + padding * 2,
        ringHeight: rect.height + padding * 2,
        tooltipTop: rect.bottom + 14,
        tooltipRight: Math.max(12, window.innerWidth - rect.right),
      });
    }

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [show, targetRef]);

  if (!show || !m) return null;

  return (
    <>
      {/* Dimmed overlay — tap anywhere to dismiss */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Pulsing spotlight ring around the hamburger button */}
      <motion.div
        className="pointer-events-none fixed z-40 rounded-full border-2 border-sky"
        style={{
          left: m.ringLeft,
          top: m.ringTop,
          width: m.ringWidth,
          height: m.ringHeight,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.9, 0.4, 0.9] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Pointing hand + tooltip, anchored below-right, near the button */}
      <div
        className="fixed z-50 flex flex-col items-end"
        style={{ top: m.tooltipTop, right: m.tooltipRight, maxWidth: 240 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          className="mr-3 text-sun"
        >
          <Pointer size={34} strokeWidth={2} className="-rotate-90 drop-shadow-lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          role="dialog"
          aria-label="Navigation help"
          className="rounded-2xl bg-white p-4 shadow-xl"
        >
          <p className="font-body text-sm text-navy">
            Tap here to explore our other pages! 😊
          </p>
          <button
            onClick={onDismiss}
            className="mt-3 w-full rounded-full bg-coral px-4 py-2 font-body text-sm font-medium text-white transition-transform active:scale-95"
          >
            Got it
          </button>
        </motion.div>
      </div>
    </>
  );
}
