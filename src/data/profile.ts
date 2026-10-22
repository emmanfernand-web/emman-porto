/** Who you are: name, tagline, bio, photo, SEO text. Edit freely; anything marked TODO is a placeholder. */
export const profile = {
  name: "Emmanuel Wilson Fernando",
  firstName: "Emmanuel",
  handle: "Emman",
  // Swap this for your favourite line.
  tagline: "I build websites, run teams, and play guitar. Loudly.",
  typedLines: [
    "I build websites.",
    "I run teams.",
    "I play guitar.",
    "Loudly.",
  ],
  role: "Web developer · Project manager · Guitarist",
  school: "Information Systems @ Universitas Multimedia Nusantara (UMN)",
  location: "Tangerang, Indonesia", // TODO: confirm location
  bio: [
    "TODO: Write a short bio here. Two or three sentences about who you are.",
    "I'm an Information Systems student at UMN who ships real websites, organises people, and then goes on stage with a guitar.",
  ],
  photo: "/me.svg", // TODO: put your photo in public/ (e.g. me.jpg) and change this to "/me.jpg"
  photoAlt: "Portrait of Emmanuel Wilson Fernando",
  siteTitle: "Emmanuel Wilson Fernando | Web developer, project manager & guitarist",
  siteDescription:
    "Portfolio of Emmanuel Wilson Fernando: Information Systems student at UMN, web developer (Next.js, React, TypeScript), project manager and guitarist.",
} as const;
