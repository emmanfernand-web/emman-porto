export type Project = {
  slug: string;
  track: string; // track number on the setlist
  title: string;
  kind: string;
  role: string;
  year: string;
  accent: "magenta" | "cyan" | "amber" | "lime";
  summary: string;
  problem: string;
  whatIDid: string[];
  stack: string[];
  result: string;
  liveUrl?: string;
  image: string;
  imageAlt: string;
};

export type TourStop = {
  org: string;
  city: string; // fun "city" label for the tour poster
  accent: "magenta" | "cyan" | "amber" | "lime";
  roles: { title: string; period: string }[];
};
