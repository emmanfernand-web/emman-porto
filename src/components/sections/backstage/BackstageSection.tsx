"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { funFacts } from "@/data/funFacts";

function FlipCard({ front, back, i }: { front: string; back: string; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const colors = ["var(--magenta)", "var(--cyan)", "var(--amber)", "var(--lime)"];
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${front} ${flipped ? back : "(tap to reveal)"}`}
      className="group h-40 [perspective:900px] text-left"
    >
      <span className={`relative block size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <span aria-hidden className="absolute inset-0 flex flex-col justify-between rounded-xl border-2 border-line bg-stage-2 p-4 [backface-visibility:hidden]" style={{ boxShadow: `4px 4px 0 ${colors[i % 4]}` }}>
          <span className="font-display text-3xl" style={{ color: colors[i % 4] }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-bold">{front}</span>
        </span>
        <span aria-hidden className="absolute inset-0 flex items-center rounded-xl p-4 font-bold text-on-accent [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ background: colors[i % 4] }}>
          {back}
        </span>
      </span>
    </button>
  );
}

export function BackstageSection() {
  const reduce = useReducedMotion();
  return (
    <section id="backstage" className="px-4 py-24 sm:px-8">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[320px_1fr]">
        <motion.div
          className="group relative mx-auto w-full max-w-xs"
          whileHover={reduce ? undefined : { rotate: -3, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 250, damping: 14 }}
        >
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-magenta transition-transform group-hover:translate-x-5 group-hover:translate-y-5" />
          <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-stage-3">
            <Image src={profile.photo} alt={profile.photoAlt} width={600} height={750} unoptimized={profile.photo.endsWith(".svg")} className="h-auto w-full grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
          </div>
          <p className="absolute -bottom-4 -right-2 rotate-3 rounded-sm bg-amber px-3 py-1 font-marker text-on-accent shadow-md">ALL ACCESS</p>
        </motion.div>

        <div>
          <p className="font-marker text-xl text-amber">Behind the amps</p>
          <h2 className="font-display text-5xl uppercase leading-none sm:text-7xl">Backstage</h2>
          <div className="mt-5 max-w-xl space-y-3 text-lg text-ink/90">
            {profile.bio.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </div>
          <p className="mt-8 font-marker text-lg text-cyan">Fun facts (flip them)</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {funFacts.map((f, i) => (
              <FlipCard key={f.front} front={f.front} back={f.back} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
