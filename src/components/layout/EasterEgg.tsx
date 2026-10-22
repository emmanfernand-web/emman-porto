"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { E_MAJOR, strum } from "@/lib/audio";
import { fireConfetti } from "@/lib/confetti";
import { useStage } from "@/lib/use-stage";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const WORD = "rock";
const BEAMS = ["var(--magenta)", "var(--cyan)", "var(--amber)", "var(--lime)", "var(--magenta)", "var(--cyan)"];

/** Hidden: type "rock" or enter the Konami code for a light show. */
export function EasterEgg() {
  const reduce = useReducedMotion();
  const { sound } = useStage();
  const [show, setShow] = useState(false);
  const konami = useRef(0);
  const typed = useRef("");
  const soundRef = useRef(sound);

  useEffect(() => {
    soundRef.current = sound;
  }, [sound]);

  useEffect(() => {
    const trigger = () => {
      setShow(true);
      fireConfetti(undefined, window.innerHeight * 0.4, 220);
      if (soundRef.current && !reduce) {
        strum(E_MAJOR.map((f) => f * 1), 0.03);
        window.setTimeout(() => strum([110, 164.81, 220, 277.18, 329.63], 0.03), 500);
      }
      window.setTimeout(() => setShow(false), 4200);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /^(input|textarea|select)$/i.test(t.tagName)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konami.current = k === KONAMI[konami.current] ? konami.current + 1 : k === KONAMI[0] ? 1 : 0;
      typed.current = (typed.current + k).slice(-WORD.length);
      if (konami.current === KONAMI.length) {
        konami.current = 0;
        trigger();
      } else if (typed.current === WORD) {
        typed.current = "";
        trigger();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {BEAMS.map((c, i) => (
            <motion.div
              key={i}
              className="absolute -top-10 h-[120%] w-[30vw] origin-top opacity-50 mix-blend-screen"
              style={{
                left: `${i * 18 - 6}%`,
                background: `linear-gradient(to bottom, ${c}, transparent 90%)`,
                clipPath: "polygon(45% 0, 55% 0, 100% 100%, 0 100%)",
              }}
              animate={{ rotate: reduce ? 0 : [-35, 35, -35] }}
              transition={{ duration: 1.6 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <motion.p
            className="absolute inset-x-0 top-1/3 text-center font-display text-7xl uppercase text-white drop-shadow-[0_0_30px_var(--magenta)] sm:text-9xl"
            initial={{ scale: 0.4, rotate: -8 }}
            animate={{ scale: 1, rotate: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            Rock on! 🤘
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
