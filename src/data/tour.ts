import type { TourStop } from "@/types/content";

/** The Tour: one stop per organisation. Edit freely; anything marked TODO is a placeholder. */
export const tour: TourStop[] = [
  {
    org: "MUFOMIC",
    city: "Main Stage",
    accent: "magenta",
    roles: [
      { title: "Lead Guitarist, band INDIGOS", period: "TODO: period" },
      { title: "Project Manager, Open Recruitment Gen 13", period: "Sep 2026" },
      { title: "Head of Guitar Selection, Open Recruitment Gen 13", period: "Sep – Oct 2026" },
      { title: "Web Developer", period: "Sep 2026" },
    ],
  },
  {
    org: "Teater Katak",
    city: "Theatre Pit",
    accent: "lime",
    roles: [
      { title: 'Guitarist, Inaugural Performance 2025 "SANGKALA"', period: "2025" },
      { title: 'Music Crew, Pentas Besar 2026 "The Legend of the White Snake"', period: "2026" },
    ],
  },
  {
    org: "Mentoring UMN 2026",
    city: "Code Room",
    accent: "cyan",
    roles: [{ title: "Website Division", period: "Jul – Sep 2026" }],
  },
  {
    org: "OMB UMN 2026 NEXT",
    city: "Campus Arena",
    accent: "amber",
    roles: [{ title: "Website Division", period: "Jun – Sep 2026" }],
  },
];
