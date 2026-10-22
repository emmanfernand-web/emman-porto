"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = { lines: readonly string[]; full: string; className?: string };

/** Types each line, pauses, deletes, moves on. Static text if motion is reduced. */
export function Typewriter({ lines, full, className = "" }: Props) {
  const reduce = useReducedMotion();
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduce) return;
    let line = 0;
    let n = 0;
    let deleting = false;
    let timer: number;
    const tick = () => {
      const target = lines[line];
      if (!deleting) {
        n++;
        setText(target.slice(0, n));
        if (n === target.length) {
          deleting = true;
          timer = window.setTimeout(tick, line === lines.length - 1 ? 3200 : 1100);
          return;
        }
        timer = window.setTimeout(tick, 65);
      } else {
        n--;
        setText(target.slice(0, n));
        if (n === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          timer = window.setTimeout(tick, 250);
          return;
        }
        timer = window.setTimeout(tick, 30);
      }
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, [lines, reduce]);

  return (
    <p className={className}>
      <span className="sr-only">{full}</span>
      <span aria-hidden>
        {reduce ? full : text}
        {!reduce && (
          <span className="ml-1 inline-block h-[0.9em] w-[0.12em] translate-y-[0.1em] bg-magenta [animation:blink_1s_steps(1)_infinite]" />
        )}
        {/* reserve the height so layout doesn't jump while empty */}
        <span className="invisible">&#8203;</span>
      </span>
    </p>
  );
}
