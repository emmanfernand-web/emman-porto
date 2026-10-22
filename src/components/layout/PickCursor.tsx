"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const INTERACTIVE = "a,button,[role='button'],input,textarea,select,summary,label";

/** A guitar pick that replaces the cursor. Mouse devices only. */
export function PickCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.2 });
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);
  const enabled = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    enabled.current = mq.matches;
    if (!mq.matches) return;
    const root = document.documentElement;
    root.classList.add("pick-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHot(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const leave = () => setVisible(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("pick-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: reduce ? x : sx, y: reduce ? y : sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.svg
        width="34"
        height="38"
        viewBox="0 0 34 38"
        className="-ml-[17px] -mt-[4px] drop-shadow-[0_0_8px_var(--magenta)]"
        animate={{
          opacity: visible ? 1 : 0,
          scale: down ? 0.8 : hot ? 1.35 : 1,
          rotate: hot ? -18 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <path
          d="M17 36C8 28 2 18 2 11 2 5 8 2 17 2s15 3 15 9c0 7-6 17-15 25Z"
          fill="var(--magenta)"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M10 10c3-2 11-2 14 0" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" fill="none" />
      </motion.svg>
    </motion.div>
  );
}
