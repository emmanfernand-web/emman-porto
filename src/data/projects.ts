import type { Project } from "@/types/content";

/** The Setlist: one entry per project. Edit freely; anything marked TODO is a placeholder. */
export const projects: Project[] = [
  {
    slug: "mufomic",
    track: "01",
    title: "mufomic.my.id",
    kind: "Official website of MUFOMIC",
    role: "Web Developer (built, launched & deployed)",
    year: "2026",
    accent: "magenta",
    summary:
      "The official home of MUFOMIC (Multimedia Face of Music), built and launched end to end.",
    problem:
      "TODO: MUFOMIC had no official web presence for showing the community, events and open recruitment. Describe the real problem here.",
    whatIDid: [
      "Designed and built the whole site with Next.js, React, TypeScript and Tailwind CSS.",
      "Set up the custom domain (mufomic.my.id) and DNS.",
      "Deployed on Vercel with a production pipeline.",
      "TODO: add more specifics (pages, features, collaborators).",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    result: "TODO: add a result (e.g. visitors, recruitment signups, feedback).",
    liveUrl: "https://mufomic.my.id",
    image: "/projects/mufomic.svg",
    imageAlt: "Screenshot placeholder of the MUFOMIC website",
  },
  {
    slug: "mentoring-umn-2026",
    track: "02",
    title: "Mentoring UMN 2026",
    kind: "Official event website",
    role: "Website Division",
    year: "2026",
    accent: "cyan",
    summary: "Official website for the UMN Mentoring 2026 programme.",
    problem: "TODO: Describe what the website needed to solve for participants and the committee.",
    whatIDid: [
      "Worked as part of the Website Division building the official site.",
      "TODO: list what you personally built (pages, components, integrations).",
    ],
    stack: ["TODO: stack"],
    result: "TODO: add a result.",
    liveUrl: undefined, // TODO: add the live URL
    image: "/projects/mentoring.svg",
    imageAlt: "Screenshot placeholder of the Mentoring UMN 2026 website",
  },
  {
    slug: "omb-umn-2026-next",
    track: "03",
    title: "OMB UMN 2026 NEXT",
    kind: "Official event website",
    role: "Website Division",
    year: "2026",
    accent: "amber",
    summary: "Official website for OMB UMN 2026 NEXT.",
    problem: "TODO: Describe what the website needed to solve for new students and the committee.",
    whatIDid: [
      "Worked as part of the Website Division building the official site.",
      "TODO: list what you personally built (pages, components, integrations).",
    ],
    stack: ["TODO: stack"],
    result: "TODO: add a result.",
    liveUrl: undefined, // TODO: add the live URL
    image: "/projects/omb.svg",
    imageAlt: "Screenshot placeholder of the OMB UMN 2026 NEXT website",
  },
];
