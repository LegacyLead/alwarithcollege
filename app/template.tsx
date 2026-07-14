'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <>
      {/* A quick top-of-page progress bar on every navigation — since Next.js
          swaps content almost instantly, this is mostly a perceived-speed
          cue, but it reassures on slower connections that something moved. */}
      <motion.div
        key="progress"
        className="fixed left-0 top-0 z-50 h-0.5 bg-sky"
        initial={{ width: '0%', opacity: 1 }}
        animate={{ width: '100%', opacity: [1, 1, 0] }}
        transition={{ duration: 0.5, times: [0, 0.7, 1], ease: 'easeOut' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
