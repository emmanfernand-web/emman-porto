import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { CaseStudy } from "@/components/ui/CaseStudy";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <Shell>
      <article className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-8">
        <Link href="/#setlist" className="font-bold text-muted hover:text-magenta">
          ← Back to the setlist
        </Link>
        <p className="mt-6 font-marker text-xl text-amber">
          Track {p.track} · {p.year}
        </p>
        <h1 className="font-display text-5xl uppercase leading-none sm:text-7xl">{p.title}</h1>
        <p className="mt-2 text-lg text-muted">
          {p.kind} · {p.role}
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-line">
          <ProjectImage src={p.image} alt={p.imageAlt} priority sizes="(min-width: 896px) 896px, 100vw" className="h-auto w-full" />
        </div>
        <div className="mt-10">
          <CaseStudy project={p} />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
        {p.liveUrl ? (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border-2 border-ink bg-magenta px-6 py-3 font-bold text-on-accent shadow-[4px_4px_0_var(--ink)]">
            Visit live site ↗
          </a>
        ) : (
          <p className="text-muted">TODO: add a live link in src/data/projects.ts</p>
        )}
          {p.repoUrl && (
            <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border-2 border-ink px-6 py-3 font-bold hover:bg-ink hover:text-stage">
              View repo ↗
            </a>
          )}
        </div>
      </article>
    </Shell>
  );
}
