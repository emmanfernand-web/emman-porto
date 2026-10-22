"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { tour } from "@/data/tour";

const accent = { magenta: "var(--magenta)", cyan: "var(--cyan)", amber: "var(--amber)", lime: "var(--lime)" } as const;

/** Vertical scroll drives a horizontal tour of stops. */
export function TourSection() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const van = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="tour" ref={wrap} style={{ height: dist + vh }} className="relative">
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
        <div className="px-4 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="font-marker text-xl text-amber">World tour (campus edition)</p>
            <h2 className="font-display text-5xl uppercase leading-none sm:text-7xl">The Tour</h2>
          </div>
        </div>

        <motion.div ref={track} style={{ x }} className="mt-6 flex w-max items-stretch gap-6 px-4 sm:mt-10 sm:gap-10 sm:px-[max(2rem,calc((100vw-72rem)/2))]">
          {tour.map((s, i) => {
            const c = accent[s.accent];
            return (
              <article
                key={s.org}
                className="relative flex w-[82vw] max-w-[520px] shrink-0 flex-col rounded-2xl border-2 border-line bg-stage-2 p-5 sm:w-[480px] sm:p-6"
                style={{ boxShadow: `8px 8px 0 ${c}`, rotate: i % 2 ? "1deg" : "-1deg" }}
              >
                <p className="font-marker text-lg" style={{ color: c }}>
                  Stop {String(i + 1).padStart(2, "0")} · {s.city}
                </p>
                <h3 className="font-display text-4xl uppercase leading-none sm:text-5xl">{s.org}</h3>
                <ul className="mt-4 space-y-3 border-t-2 border-dashed border-line pt-4">
                  {s.roles.map((r) => (
                    <li key={r.title} className="flex flex-col gap-0.5">
                      <span className="font-bold leading-snug">{r.title}</span>
                      <span className="font-mono text-sm text-muted">{r.period}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
          <div aria-hidden className="grid w-[40vw] shrink-0 place-items-center font-display text-4xl uppercase text-muted sm:w-[300px]">
            More dates soon →
          </div>
        </motion.div>

        <div aria-hidden className="mx-4 mt-8 sm:mx-8">
          <div className="relative mx-auto h-2 max-w-6xl rounded-full bg-line/50">
            <div className="absolute inset-y-0 left-0 w-full border-b-2 border-dashed border-ink/40" />
            <motion.span style={{ left: van }} className="absolute -top-6 -translate-x-1/2 text-3xl">
              🚐
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
