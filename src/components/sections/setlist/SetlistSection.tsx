"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { CaseStudy } from "@/components/ui/CaseStudy";
import type { Project } from "@/types/content";

const accent = { magenta: "var(--magenta)", cyan: "var(--cyan)", amber: "var(--amber)", lime: "var(--lime)" } as const;

function Vinyl({ color }: { color: string }) {
  return (
    <div
      aria-hidden
      className="absolute -right-6 top-1/2 size-36 -translate-y-1/2 rounded-full border-4 border-black bg-[repeating-radial-gradient(circle,#111_0_3px,#1d1d1d_3px_6px)] shadow-xl transition-all duration-500 group-hover:-right-16 group-focus-within:-right-16 group-hover:[animation:vinyl_2.5s_linear_infinite] motion-reduce:group-hover:[animation:none] sm:size-44"
    >
      <div className="absolute inset-[34%] rounded-full" style={{ background: color }}>
        <div className="absolute inset-[40%] rounded-full bg-stage" />
      </div>
    </div>
  );
}

function Track({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const c = accent[p.accent];
  const id = `case-${p.slug}`;
  return (
    <li className="group relative">
      <div className="relative overflow-visible rounded-2xl border-2 border-line bg-stage-2 transition-transform hover:-translate-y-1" style={{ boxShadow: `6px 6px 0 ${c}` }}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="relative grid w-full grid-cols-1 gap-4 overflow-hidden rounded-2xl p-4 text-left sm:grid-cols-[minmax(0,260px)_1fr] sm:p-5"
        >
          <span className="relative block overflow-hidden rounded-lg border-2 border-line">
            <ProjectImage src={p.image} alt={p.imageAlt} sizes="(min-width: 640px) 260px, 100vw" className="h-auto w-full transition-transform duration-500 group-hover:scale-105" />
          </span>
          <span className="flex flex-col justify-center pr-10 sm:pr-24">
            <span className="font-display text-6xl leading-none opacity-80" style={{ color: c }}>
              {p.track}
            </span>
            <span className="mt-1 font-display text-3xl uppercase leading-tight sm:text-4xl">{p.title}</span>
            <span className="mt-1 text-sm font-bold text-muted">
              {p.kind} · {p.year}
            </span>
            <span className="mt-2 text-ink/90">{p.summary}</span>
            <span className="mt-3 inline-flex items-center gap-2 font-marker text-lg" style={{ color: c }}>
              {open ? "Close the case study" : "Drop the needle"} <span aria-hidden>{open ? "▲" : "▶"}</span>
            </span>
          </span>
        </button>
        <Vinyl color={c} />

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              role="region"
              aria-label={`${p.title} case study`}
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t-2 border-dashed border-line p-5">
                <p className="mb-4 text-sm font-bold text-muted">Role: {p.role}</p>
                <CaseStudy project={p} />
                <div className="mt-5 flex flex-wrap gap-3">
                  {p.liveUrl ? (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-ink px-4 py-2 font-bold hover:bg-ink hover:text-stage">
                      Visit live site ↗
                    </a>
                  ) : (
                    <span className="rounded-full border-2 border-dashed border-line px-4 py-2 text-sm text-muted">TODO: add live link</span>
                  )}
                  <Link href={`/projects/${p.slug}`} className="rounded-full border-2 border-line px-4 py-2 font-bold hover:border-magenta">
                    Full page →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export function SetlistSection() {
  return (
    <section id="setlist" className="px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-marker text-xl text-amber">Tonight&apos;s set</p>
        <h2 className="font-display text-5xl uppercase leading-none sm:text-7xl">The Setlist</h2>
        <p className="mt-3 max-w-xl text-muted">Three tracks. Hover a record to spin it, click to read the liner notes.</p>
        <ol className="mt-10 space-y-8 pr-4 sm:pr-16">
          {projects.map((p) => (
            <Track key={p.slug} p={p} />
          ))}
        </ol>
      </div>
    </section>
  );
}
