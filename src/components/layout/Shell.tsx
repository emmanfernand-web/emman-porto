import { EasterEgg } from "./EasterEgg";
import { Header } from "./Header";
import { PickCursor } from "./PickCursor";
import { SongProgressBar } from "./SongProgressBar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-3 top-3 z-[110] rounded-md bg-magenta px-4 py-2 font-bold text-on-accent"
      >
        Skip to content
      </a>
      <SongProgressBar />
      <Header />
      <main id="main">{children}</main>
      <PickCursor />
      <EasterEgg />
    </>
  );
}
