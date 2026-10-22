import Link from "next/link";
import { Shell } from "@/components/layout/Shell";

export default function NotFound() {
  return (
    <Shell>
      <section className="grid min-h-dvh place-items-center px-4 text-center">
        <div>
          <div aria-hidden className="mx-auto mb-6 size-40 animate-[vinyl_3s_linear_infinite] rounded-full border-4 border-black bg-[repeating-radial-gradient(circle,#111_0_3px,#1d1d1d_3px_6px)] motion-reduce:animate-none">
            <div className="mx-auto mt-[34%] size-[32%] rounded-full bg-magenta" />
          </div>
          <p className="font-display text-8xl text-magenta sm:text-9xl">404</p>
          <h1 className="font-display text-4xl uppercase sm:text-6xl">This track doesn&apos;t exist</h1>
          <p className="mt-3 font-marker text-xl text-cyan">*record scratch* The band skipped it.</p>
          <Link href="/" className="mt-8 inline-block rounded-full border-2 border-ink bg-magenta px-6 py-3 font-bold text-on-accent shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-0.5">
            Back to the main stage
          </Link>
        </div>
      </section>
    </Shell>
  );
}
