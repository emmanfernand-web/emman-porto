import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "./Typewriter";
import { AnimatedName } from "./AnimatedName";

const beams = [
  { left: "12%", color: "var(--magenta)", anim: "sway-a 7s ease-in-out infinite" },
  { left: "46%", color: "var(--cyan)", anim: "sway-b 9s ease-in-out infinite" },
  { left: "80%", color: "var(--amber)", anim: "sway-a 8s ease-in-out -3s infinite" },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-8"
    >
      {/* stage light beams */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {beams.map((b) => (
          <div
            key={b.left}
            className="absolute -top-10 h-[85%] w-[38vw] max-w-[420px] origin-top opacity-30 blur-[2px]"
            style={{
              left: b.left,
              marginLeft: "-19vw",
              background: `linear-gradient(to bottom, ${b.color}, transparent 85%)`,
              clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
              animation: b.anim,
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-stage-3 to-transparent" />
      </div>

      <div className="relative z-0 mx-auto w-full max-w-6xl">
        <p className="mb-3 inline-block -rotate-2 rounded-sm bg-amber px-3 py-1 font-marker text-base text-on-accent sm:text-xl">
          Tonight&apos;s headliner
        </p>
        <AnimatedName name={profile.name} />
        <Typewriter
          lines={profile.typedLines}
          full={profile.tagline}
          className="mt-6 min-h-[1.6em] font-marker text-2xl text-cyan sm:text-4xl"
        />
        <p className="mt-3 max-w-xl text-base text-muted sm:text-lg">
          {profile.role}. {profile.school}.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#setlist">See the setlist →</Button>
          <Button href="#contact" variant="ghost">
            Book the band
          </Button>
        </div>
      </div>

      <p aria-hidden className="absolute bottom-5 left-1/2 -translate-x-1/2 font-marker text-sm text-muted">
        ↓ scroll to play the set
      </p>

    </section>
  );
}
