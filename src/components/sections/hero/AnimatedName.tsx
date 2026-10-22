"use client";

import { motion, useReducedMotion } from "framer-motion";

const hues = ["text-ink", "text-ink", "text-magenta"];

/** Name in giant type, letters drop in one by one. */
export function AnimatedName({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const words = name.split(" ");
  let i = 0;
  return (
    <h1
      aria-label={name}
      className="font-display text-[clamp(3.6rem,17vw,14rem)] uppercase leading-[0.84] tracking-tight"
    >
      {words.map((w, wi) => (
        <span key={w} aria-hidden className={`block ${hues[wi % hues.length]}`}>
          {[...w].map((ch) => {
            const idx = i++;
            return (
              <motion.span
                key={idx}
                className="inline-block hover:text-amber"
                initial={reduce ? false : { y: "-120%", rotate: -12, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.5 + idx * 0.045 }}
                whileHover={reduce ? undefined : { y: -12, rotate: idx % 2 ? 6 : -6 }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
