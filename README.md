# Emmanuel Wilson Fernando: "The Gig Night" portfolio

A portfolio that behaves like a live show: curtain intro, spotlight hero, playable guitar strings, a setlist of projects, a scroll-driven tour, a mixing board of skills, and a ticket-style contact card.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion. Sound is generated with the Web Audio API, so there are no audio files.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Where to edit things

| I want to change… | Edit |
| --- | --- |
| Name, tagline, bio, photo, SEO text | `src/data/profile.ts` |
| Email, LinkedIn, GitHub, Instagram, CV path | `src/data/links.ts` |
| Projects (setlist and `/projects/[slug]` pages) | `src/data/projects.ts` |
| Experience (tour stops) | `src/data/tour.ts` |
| Skills (mixing board levels 0 to 100) | `src/data/skills.ts` |
| Fun-fact flip cards | `src/data/funFacts.ts` |
| Header menu | `src/data/navigation.ts` |
| Order of sections on the page | `src/app/(pages)/page.tsx` |
| Colours (dark and light) | top of `src/app/globals.css` |

Search the project for `TODO` to find every placeholder.

## Add your own files

- **Photo:** drop it in `public/` (e.g. `public/me.jpg`), then set `photo: "/me.jpg"` in `profile.ts`.
- **CV:** put it at `public/cv.pdf` (the Download CV button already points there).
- **Project screenshots:** add images to `public/projects/` and update `image` in `projects.ts` (800×500 works well).
- **Open Graph image:** generated automatically from `src/app/opengraph-image.tsx` (name and tagline). Edit that file to restyle.

## Project layout

```
src/
├── app/            layout, global styles, (pages)/ routes, 404, OG image, robots, sitemap
├── components/
│   ├── layout/     Header, Shell, progress bar, pick cursor, easter egg
│   ├── sections/   intro, hero, strings, setlist, tour, backstage, mixer, contact
│   └── ui/         Button, toggles, shared card pieces
├── data/           all editable content
├── lib/            audio synth, confetti, stage store
└── types/          TypeScript types for the content
```

## Fun details

- **Stage lights toggle** is also dark/light mode (saved in the browser).
- **Sound** is muted by default. "Start the show" and "Turn sound on" opt in.
- **Easter egg:** type `rock` or enter the Konami code (↑ ↑ ↓ ↓ ← → ← → B A).
- **Replay intro** link is in the footer.
- `prefers-reduced-motion` turns off heavy animation and disables sound.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. In Vercel choose **Add New → Project**, import the repo, and click **Deploy**. No settings needed.
3. Optional: add your custom domain under Project → Settings → Domains.

Social preview URLs use `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel sets for you.
