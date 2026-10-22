"use client";

import { useReducedMotion } from "framer-motion";
import { useStage } from "@/lib/use-stage";

const btn =
  "group inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border-2 border-line bg-stage-2 px-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-magenta active:translate-y-0 active:scale-95";

export function LightsToggle() {
  const { theme, store } = useStage();
  const on = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => store.toggleTheme()}
      aria-pressed={on}
      aria-label="Stage lights"
      title={on ? "Stage lights on (click for house lights)" : "House lights on (click for stage lights)"}
      className={btn}
    >
      <span aria-hidden className="text-lg transition group-hover:rotate-12">{on ? "🔦" : "💡"}</span>
      <span className="hidden sm:inline">{on ? "Stage" : "House"}</span>
    </button>
  );
}

export function SoundToggle() {
  const { sound, store } = useStage();
  const reduce = useReducedMotion();
  const disabled = !!reduce;
  return (
    <button
      type="button"
      onClick={() => store.setSound(!sound)}
      aria-pressed={sound && !disabled}
      disabled={disabled}
      aria-label="Sound"
      title={disabled ? "Sound is off because reduced motion is on" : sound ? "Mute" : "Turn sound on"}
      className={`${btn} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <span aria-hidden className="text-lg">{sound && !disabled ? "🔊" : "🔇"}</span>
      <span className="hidden sm:inline">{sound && !disabled ? "Sound on" : "Muted"}</span>
    </button>
  );
}
