"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { strum, unlockAudio } from "@/lib/audio";
import { useStage } from "@/lib/use-stage";
import { ButtonEl } from "@/components/ui/Button";

const OPEN_MS = 1800;

const velvet =
  "repeating-linear-gradient(90deg, #5b0f3a 0 26px, #7a1550 26px 40px, #45092c 40px 62px)";

/** Stage curtains. Opens on click; remembered so returning visitors skip it. */
export function CurtainIntro() {
  const { introSeen, store } = useStage();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"closed" | "opening">("closed");

  // Lock page scroll while the curtains are shut.
  useEffect(() => {
    if (introSeen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introSeen]);

  useEffect(() => {
    if (phase !== "opening") return;
    const t = window.setTimeout(() => store.markIntroSeen(), reduce ? 50 : OPEN_MS + 200);
    return () => window.clearTimeout(t);
  }, [phase, reduce, store]);

  const start = () => {
    if (!reduce) {
      unlockAudio();
      store.setSound(true);
      strum();
    }
    setPhase("opening");
  };

  const skip = () => store.markIntroSeen();
  const opening = phase === "opening";
  const dur = reduce ? 0.01 : OPEN_MS / 1000;

  return (
    <AnimatePresence>
      {!introSeen && (
        <motion.div
          key="curtain"
          role="dialog"
          aria-modal="true"
          aria-label="Show intro"
          className="curtain-root fixed inset-0 z-[90] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/2 border-r-4 border-amber/60 shadow-[inset_-30px_0_60px_rgba(0,0,0,.55)]"
            style={{ backgroundImage: velvet }}
            animate={{ x: opening ? "-102%" : 0 }}
            transition={{ duration: dur, ease: [0.7, 0, 0.2, 1] }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-y-0 right-0 w-1/2 border-l-4 border-amber/60 shadow-[inset_30px_0_60px_rgba(0,0,0,.55)]"
            style={{ backgroundImage: velvet }}
            animate={{ x: opening ? "102%" : 0 }}
            transition={{ duration: dur, ease: [0.7, 0, 0.2, 1] }}
          />
          {/* valance */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-10 bg-[#2b051b] shadow-[0_8px_24px_rgba(0,0,0,.6)] sm:h-14"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 100%, #7a1550 0 18px, transparent 19px)",
              backgroundSize: "56px 100%",
            }}
          />

          <motion.div
            className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center"
            animate={{ opacity: opening ? 0 : 1, y: opening ? -20 : 0 }}
            transition={{ duration: reduce ? 0.01 : 0.4 }}
          >
            <p className="font-marker text-lg text-amber sm:text-2xl">Live tonight, one night only</p>
            <h2 className="font-display text-5xl uppercase leading-[0.9] text-white drop-shadow-[0_4px_0_#000] sm:text-8xl">
              {profile.firstName}
              <br />
              <span className="text-amber">live</span> on stage
            </h2>
            <ButtonEl onClick={start} className="mt-2 px-8 py-3 text-lg" autoFocus>
              <span aria-hidden>🎸</span> Start the show
              <span className="sr-only"> (plays a guitar strum)</span>
            </ButtonEl>
            <p className="-mt-2 text-sm text-white/80">With a short guitar strum. Mute anytime.</p>
            <button
              type="button"
              onClick={skip}
              className="rounded-full px-4 py-2 text-sm font-bold text-white underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              Skip intro
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
