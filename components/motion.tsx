'use client';

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  Variants,
} from 'framer-motion';
import { ReactNode, useRef, useState, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';

/**
 * Fades + slides an element up into view as it scrolls into the viewport.
 * Respects prefers-reduced-motion by skipping the motion entirely.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Wraps a list of children (e.g. cards in a grid) so they fade/slide in
 * one after another as the group scrolls into view.
 */
export function StaggerGroup({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/**
 * Wraps an element with a subtle mouse-tracked 3D tilt — the element rotates
 * slightly in perspective toward the cursor, like a physical card catching
 * the light. Disabled on touch devices (no mouse to track) and when
 * prefers-reduced-motion is set.
 */
export function Tilt3D({
  children,
  className = '',
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 200,
    damping: 20,
  });

  if (reduce) return <div className={className}>{children}</div>;

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/**
 * A tap-ripple effect for buttons and links — a soft circle expands from
 * exactly where the finger/cursor lands and fades out. This is the kind of
 * tactile feedback touchscreens benefit from most, since there's no hover
 * state on mobile to signal "this responded to you."
 * Wrap a button/link's contents with this; the parent needs `relative` and
 * `overflow-hidden` (already true of the site's rounded-full/rounded-2xl
 * buttons).
 */
export function Ripple() {
  const reduce = useReducedMotion();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  if (reduce) return null;

  function handlePointerDown(e: ReactPointerEvent<HTMLSpanElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((ripple) => ripple.id !== id)), 650);
  }

  return (
    <span
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      style={{ pointerEvents: 'none' }}
    >
      <span className="pointer-events-auto absolute inset-0" onPointerDown={handlePointerDown} />
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.35, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
            className="absolute h-32 w-32 rounded-full bg-white/60"
          />
        ))}
      </AnimatePresence>
    </span>
  );
}

/**
 * A card/button wrapper that lifts slightly on hover and settles on tap.
 * Purely a hover/press affordance — no scroll behavior.
 */
export function HoverLift({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      whileTap={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}
