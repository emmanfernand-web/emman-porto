import type { Project } from "@/types/content";

/** The problem / what I did / stack / result block, shared by the card and project page. */
export function CaseStudy({ project: p }: { project: Project }) {
  return (
    <div className="grid gap-5 text-base sm:grid-cols-2">
      <div>
        <h4 className="font-marker text-lg text-magenta">The problem</h4>
        <p className="mt-1 text-ink/90">{p.problem}</p>
      </div>
      <div>
        <h4 className="font-marker text-lg text-cyan">What I did</h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-ink/90">
          {p.whatIDid.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-marker text-lg text-amber">Stack</h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border-2 border-line px-3 py-0.5 text-sm font-bold">
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-marker text-lg text-lime">The result</h4>
        <p className="mt-1 text-ink/90">{p.result}</p>
      </div>
    </div>
  );
}
