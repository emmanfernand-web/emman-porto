"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

const SONG_SECONDS = 3 * 60 + 33;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** Page scroll shown as a song's progress bar, with a running timecode. */
export function SongProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });
  const [elapsed, setElapsed] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(Math.min(1, Math.max(0, v)) * SONG_SECONDS);
    setElapsed((prev) => (prev === next ? prev : next));
  });

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round((elapsed / SONG_SECONDS) * 100)}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1.5 bg-line/40"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left bg-linear-to-r from-magenta via-amber to-cyan"
      />
      <span
        aria-hidden
        className="absolute right-3 top-2 hidden rounded-sm bg-stage/80 px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-muted sm:block"
      >
        ▶ {fmt(elapsed)} / {fmt(SONG_SECONDS)}
      </span>
    </div>
  );
}
