"use client";

import { useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { OPEN_STRINGS, pluck, unlockAudio } from "@/lib/audio";
import { useStage } from "@/lib/use-stage";
import { ButtonEl } from "@/components/ui/Button";

const W = 1000;
const H = 330;
const TOP = 45;
const GAP = 48;
const COLORS = ["var(--magenta)", "var(--amber)", "var(--lime)", "var(--cyan)", "var(--magenta)", "var(--amber)"];
const stringY = (i: number) => TOP + i * GAP;

function GString({
  index,
  wobble,
  onPluck,
}: {
  index: number;
  wobble: MotionValue<number>;
  onPluck: (i: number) => void;
}) {
  const y = stringY(index);
  const d = useTransform(wobble, (v) => `M 30 ${y} Q ${W / 2} ${y + v * (26 - index * 2)} ${W - 30} ${y}`);
  const label = `${OPEN_STRINGS[index].name}${OPEN_STRINGS[index].octave}`;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Pluck ${label} string`}
      onPointerDown={() => onPluck(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPluck(index);
        }
      }}
      className="cursor-pointer outline-none [&:focus-visible_.fx]:stroke-cyan"
    >
      <motion.path d={d} fill="none" stroke="transparent" strokeWidth={34} />
      <motion.path d={d} fill="none" stroke={COLORS[index]} strokeWidth={1.5 + (5 - index) * 0.7} strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px currentColor)", color: COLORS[index] }} className="fx" />
      <text x={8} y={y + 5} fontSize="15" fontWeight="700" fill="var(--ink)" aria-hidden>
        {OPEN_STRINGS[index].name}
      </text>
    </g>
  );
}

export function GuitarStrings() {
  const reduce = useReducedMotion();
  const { sound, store } = useStage();
  const [last, setLast] = useState<string | null>(null);
  const wobbles = [useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0)];
  const prevY = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lastHit = useRef(0);

  const doPluck = (i: number) => {
    const now = performance.now();
    if (now - lastHit.current < 25) return;
    lastHit.current = now;
    const w = wobbles[i];
    if (!reduce) {
      w.set(Math.random() > 0.5 ? 1 : -1);
      animate(w, 0, { type: "spring", stiffness: 140, damping: 3.2, mass: 0.6 });
    }
    setLast(`${OPEN_STRINGS[i].name}${OPEN_STRINGS[i].octave}`);
    if (sound && !reduce) pluck(OPEN_STRINGS[i].freq, 0.7);
  };

  // Mouse strumming: crossing a string with the pointer plucks it.
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const y = ((e.clientY - r.top) / r.height) * H;
    const p = prevY.current;
    prevY.current = y;
    if (p === null) return;
    for (let i = 0; i < 6; i++) {
      const s = stringY(i);
      if ((p < s && y >= s) || (p > s && y <= s)) doPluck(i);
    }
  };

  const enableSound = () => {
    unlockAudio();
    store.setSound(true);
  };

  return (
    <section id="strings" className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-marker text-xl text-amber">Sound check</p>
        <h2 className="font-display text-5xl uppercase leading-none sm:text-7xl">Pluck a string</h2>
        <p className="mt-3 max-w-xl text-muted">
          Tap or click a string. On desktop, swipe the pointer across for a strum. Keyboard: Tab to a string, Enter to pluck.
        </p>

        <div className="mt-8 rounded-3xl border-2 border-line bg-stage-2 p-3 shadow-[8px_8px_0_var(--magenta)] sm:p-5">
          <div
            className="relative overflow-hidden rounded-2xl bg-[#1d0d12] [touch-action:pan-y]"
            style={{ backgroundImage: "linear-gradient(90deg, #2a1218, #190a0f)" }}
            onPointerMove={onMove}
            onPointerLeave={() => (prevY.current = null)}
          >
            <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="block w-full select-none" role="group" aria-label="Six guitar strings, low E to high E">
              {[160, 300, 440, 580, 720, 860].map((x, i) => (
                <line key={x} x1={x} x2={x} y1={0} y2={H} stroke="#bba" strokeOpacity={0.35 - i * 0.03} strokeWidth={3} />
              ))}
              <line x1={20} x2={20} y1={0} y2={H} stroke="#e8dcc0" strokeWidth={8} />
              {[370, 650].map((x) => (
                <circle key={x} cx={x} cy={H / 2} r={9} fill="#e8dcc0" fillOpacity={0.35} />
              ))}
              {OPEN_STRINGS.map((_, i) => (
                <GString key={i} index={i} wobble={wobbles[i]} onPluck={doPluck} />
              ))}
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-marker text-3xl text-cyan" aria-live="polite">
              {last ? `♪ ${last}` : "♪ …"}
            </p>
            {reduce ? (
              <p className="text-sm text-muted">Sound is disabled because reduced motion is on.</p>
            ) : sound ? (
              <ButtonEl variant="ghost" onClick={() => store.setSound(false)}>
                🔇 Mute
              </ButtonEl>
            ) : (
              <ButtonEl variant="cyan" onClick={enableSound}>
                🔊 Turn sound on
              </ButtonEl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
