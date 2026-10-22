import Link from "next/link";
import { nav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { LightsToggle, SoundToggle } from "@/components/ui/Toggles";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-1.5 z-40 px-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border-2 border-line bg-stage/80 px-3 py-2 backdrop-blur">
        <Link href="/#top" className="font-display text-xl tracking-wide text-ink hover:text-magenta">
          {profile.handle.toUpperCase()}
          <span className="text-magenta">.</span>
        </Link>
        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              className="rounded-full px-3 py-1.5 text-sm font-bold text-muted transition hover:bg-stage-3 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SoundToggle />
          <LightsToggle />
        </div>
      </div>
    </header>
  );
}
