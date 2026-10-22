"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

/**
 * Darkens the stage except for a circle that follows the mouse.
 * On touch devices (or when no mouse is around) the light drifts by itself.
 */
export function Spotlight({ targetId }: { targetId: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const host = document.getElementById(targetId);
    if (!host) return;
    const size = () => host.getBoundingClientRect();
    const r0 = size();
    x.set(r0.width / 2);
    y.set(r0.height * 0.45);
    if (reduce) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      const move = (e: PointerEvent) => {
        const r = size();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    }

    let raf = 0;
    const loop = (t: number) => {
      const r = size();
      const s = t / 1000;
      x.set(r.width * (0.5 + 0.34 * Math.sin(s * 0.7)));
      y.set(r.height * (0.45 + 0.22 * Math.sin(s * 1.1 + 1)));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [targetId, reduce, x, y]);

  const dark = useMotionTemplate`radial-gradient(circle clamp(130px, 26vw, 300px) at ${x}px ${y}px, transparent 0%, transparent 35%, color-mix(in srgb, var(--stage) 78%, transparent) 100%)`;
  const glow = useMotionTemplate`radial-gradient(circle clamp(120px, 24vw, 280px) at ${x}px ${y}px, color-mix(in srgb, var(--amber) 38%, transparent) 0%, transparent 70%)`;

  return (
    <>
      <motion.div aria-hidden style={{ backgroundImage: glow }} className="pointer-events-none absolute inset-0 z-10 mix-blend-screen" />
      <motion.div aria-hidden style={{ backgroundImage: dark }} className="pointer-events-none absolute inset-0 z-10" />
    </>
  );
}
