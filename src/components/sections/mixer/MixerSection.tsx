"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { skills } from "@/data/skills";

const LEDS = 12;
const groupColor = { Code: "var(--cyan)", People: "var(--amber)", Music: "var(--magenta)" } as const;

type Skill = (typeof skills)[number];

function Channel({ skill }: { skill: Skill }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState<number>(skill.level);
  const shown = useMotionValue(reduce ? skill.level : 0);
  const top = useTransform(shown, (v) => `${100 - v}%`);
  const fill = useTransform(shown, (v) => `${v}%`);
  const [lit, setLit] = useState(reduce ? Math.round((skill.level / 100) * LEDS) : 0);
  const color = groupColor[skill.group];

  useMotionValueEvent(shown, "change", (v) => {
    const n = Math.round((v / 100) * LEDS);
    setLit((p) => (p === n ? p : n));
  });

  // Rise to the level once on screen.
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(shown, skill.level, { type: "spring", stiffness: 60, damping: 12 });
    return () => c.stop();
  }, [inView, reduce, shown, skill.level]);

  const set = (v: number) => {
    const c = Math.max(0, Math.min(100, Math.round(v)));
    setValue(c);
    animate(shown, c, { duration: reduce ? 0 : 0.12 });
  };

  const onPointer = (e: React.PointerEvent) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    set(100 - ((e.clientY - r.top) / r.height) * 100);
  };

  const wiggle = () => {
    if (reduce) return;
    animate(shown, [value, Math.min(100, value + 14), Math.max(0, value - 10), value], { duration: 0.7, ease: "easeInOut" });
  };

  return (
    <div ref={ref} className="flex flex-col items-center gap-3" onPointerEnter={wiggle}>
      <div className="flex h-64 gap-3 rounded-xl border-2 border-line bg-stage-2 px-3 py-4">
        <div aria-hidden className="flex flex-col-reverse justify-between gap-1">
          {Array.from({ length: LEDS }, (_, i) => (
            <span key={i} className="block h-2 w-3 rounded-[2px] transition-opacity" style={{ background: i > 8 ? "var(--magenta)" : i > 5 ? "var(--amber)" : "var(--lime)", opacity: i < lit ? 1 : 0.15 }} />
          ))}
        </div>
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label={skill.name}
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            onPointer(e);
          }}
          onPointerMove={(e) => e.buttons && onPointer(e)}
          onKeyDown={(e) => {
            const step = { ArrowUp: 5, ArrowRight: 5, ArrowDown: -5, ArrowLeft: -5 }[e.key];
            if (step) {
              e.preventDefault();
              set(value + step);
            } else if (e.key === "Home") set(0);
            else if (e.key === "End") set(100);
          }}
          className="relative w-10 cursor-ns-resize touch-none"
        >
          <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 rounded-full bg-black/50" />
          <motion.div className="absolute bottom-0 left-1/2 w-2 -translate-x-1/2 rounded-full" style={{ height: fill, background: color, opacity: 0.8 }} />
          <motion.div className="absolute left-1/2 z-10 h-7 w-10 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-ink bg-stage-3 shadow-md" style={{ top }}>
            <span className="absolute inset-x-1 top-1/2 h-0.5 -translate-y-1/2" style={{ background: color }} />
          </motion.div>
        </div>
      </div>
      <p className="max-w-[6rem] text-center text-sm font-bold leading-tight">{skill.name}</p>
    </div>
  );
}

export function MixerSection() {
  return (
    <section id="mixer" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-marker text-xl text-amber">Levels check</p>
        <h2 className="font-display text-5xl uppercase leading-none sm:text-7xl">The Mixing Board</h2>
        <p className="mt-3 max-w-xl text-muted">Hover a fader to watch it work. Drag it, or focus and use the arrow keys. Go on, push it to eleven.</p>
        <div className="mt-10 grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 rounded-3xl border-2 border-line bg-stage-3 p-5 shadow-[8px_8px_0_var(--cyan)] sm:grid-cols-4 lg:grid-cols-8">
          {skills.map((s) => (
            <Channel key={s.name} skill={s} />
          ))}
        </div>
        <p className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
          {Object.entries(groupColor).map(([g, c]) => (
            <span key={g} className="inline-flex items-center gap-2">
              <span aria-hidden className="size-3 rounded-full" style={{ background: c }} />
              {g}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
