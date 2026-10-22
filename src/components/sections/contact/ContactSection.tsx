"use client";

import { useRef, useState } from "react";
import { fireConfetti } from "@/lib/confetti";
import { links } from "@/data/links";
import { profile } from "@/data/profile";
import { stageStore } from "@/lib/stage-store";
import { ButtonEl, Button } from "@/components/ui/Button";

const socials = [
  { label: "LinkedIn", href: links.linkedin },
  { label: "GitHub", href: links.github },
  { label: "Instagram", href: links.instagram },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    try {
      await navigator.clipboard.writeText(links.email);
    } catch {
      /* clipboard may be blocked; still celebrate and show the address */
    }
    fireConfetti(r.left + r.width / 2, r.top, 90);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="px-4 pb-10 pt-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-marker text-xl text-amber">Last song</p>
        <h2 className="font-display text-5xl uppercase leading-none sm:text-7xl">Book the Band</h2>

        <div className="mt-10 grid overflow-hidden rounded-3xl border-2 border-ink bg-amber text-on-accent shadow-[10px_10px_0_var(--magenta)] md:grid-cols-[1fr_auto_200px]">
          <div className="p-6 sm:p-8">
            <p className="font-marker text-lg">Admit one · all ages · any night</p>
            <p className="mt-1 font-display text-4xl uppercase leading-none sm:text-6xl">{profile.name}</p>
            <p className="mt-2 font-bold">{profile.role}</p>
            <p className="mt-4 max-w-md">Have a website, a team to run, or a gig that needs a guitarist? Let&apos;s talk.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonEl onClick={copy} className="!bg-stage !text-ink">
                {copied ? "Copied! 🎉" : "✉ Copy email"}
              </ButtonEl>
              <Button href={links.cv} download variant="ghost" className="!text-on-accent !border-on-accent">
                ⬇ Download CV
              </Button>
            </div>
            <p className="sr-only" aria-live="polite">
              {copied ? "Email copied to clipboard" : ""}
            </p>
            <p className="mt-3 font-mono text-sm">{links.email}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border-2 border-on-accent px-4 py-1.5 font-bold transition hover:-translate-y-0.5 hover:bg-on-accent hover:text-amber">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* perforation */}
          <div aria-hidden className="relative hidden w-0 border-l-4 border-dashed border-on-accent/60 md:block">
            <span className="absolute -left-4 -top-4 size-8 rounded-full bg-stage" />
            <span className="absolute -bottom-4 -left-4 size-8 rounded-full bg-stage" />
          </div>

          <div aria-hidden className="flex flex-row items-center justify-between gap-4 border-t-4 border-dashed border-on-accent/60 p-6 md:flex-col md:border-t-0">
            <p className="font-display text-5xl leading-none md:[writing-mode:vertical-rl] md:rotate-180">NO. 0001</p>
            <div className="h-14 w-32 bg-[repeating-linear-gradient(90deg,#000_0_2px,transparent_2px_5px,#000_5px_6px,transparent_6px_10px)]" />
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-between gap-3 border-t-2 border-line pt-6 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Framer Motion and too much coffee.
        </p>
        <button type="button" onClick={() => { stageStore.resetIntro(); window.scrollTo({ top: 0 }); }} className="font-bold underline underline-offset-4 hover:text-magenta">
          Replay intro
        </button>
        <p className="w-full font-marker text-base text-cyan">psst… try typing &quot;rock&quot;.</p>
      </footer>
    </section>
  );
}
