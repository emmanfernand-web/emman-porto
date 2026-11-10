# 🎸 Emmanuel Wilson Fernando — "The Gig Night" Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.5.0-ff0055?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-Synthesizer-orange?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

An immersive personal portfolio website designed as an interactive rock concert and gig night. Featuring velvet curtain intros, spotlight hero effects, a synthetic guitar sound check powered by the Web Audio API (with zero audio asset dependencies), an interactive setlist of projects, scroll-driven tour stops, a studio mixing board for technical skills, and a concert admission ticket contact section.

---

## 📑 Table of Contents

- [A. Project Overview](#a-project-overview)
  - [Concept & Philosophy](#concept--philosophy)
  - [Architecture Overview](#architecture-overview)
- [B. Website Features](#b-website-features)
  - [1. Stage Curtains Intro](#1-stage-curtains-intro)
  - [2. Spotlight Hero Section](#2-spotlight-hero-section)
  - [3. Sound Check (Playable Guitar Strings)](#3-sound-check-playable-guitar-strings)
  - [4. The Setlist (Project Showcase)](#4-the-setlist-project-showcase)
  - [5. The Tour (Work & Organizational Experience)](#5-the-tour-work--organizational-experience)
  - [6. Backstage (About & Fun Facts)](#6-backstage-about--fun-facts)
  - [7. The Mixing Board (Skills Console)](#7-the-mixing-board-skills-console)
  - [8. Book the Band (Ticket-Style Contact Section)](#8-book-the-band-ticket-style-contact-section)
  - [9. Global Interactive Shell & Easter Eggs](#9-global-interactive-shell--easter-eggs)
  - [10. Dedicated Project Pages & SEO](#10-dedicated-project-pages--seo)
- [C. Technology Stack](#c-technology-stack)
- [D. Project Structure](#d-project-structure)
  - [Directory Tree](#directory-tree)
  - [File Responsibility Guide](#file-responsibility-guide)
- [E. Local Development Setup](#e-local-development-setup)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Installation](#step-by-step-installation)
  - [Available Scripts](#available-scripts)
- [F. Website Maintenance Guide](#f-website-maintenance-guide)
  - [1. Updating Personal Information](#1-updating-personal-information)
  - [2. Adding a New Portfolio Project](#2-adding-a-new-portfolio-project)
  - [3. Editing or Removing Existing Projects](#3-editing-or-removing-existing-projects)
  - [4. Updating Skills & Mixer Levels](#4-updating-skills--mixer-levels)
  - [5. Updating Tour Stops (Experience)](#5-updating-tour-stops-experience)
  - [6. Updating Backstage Fun Facts](#6-updating-backstage-fun-facts)
  - [7. Managing Website Images & Media](#7-managing-website-images--media)
  - [8. Reordering Page Sections](#8-reordering-page-sections)
- [G. Customization Guide](#g-customization-guide)
  - [Colors and Theming (Tailwind v4)](#colors-and-theming-tailwind-v4)
  - [Typography & Google Fonts](#typography--google-fonts)
  - [Guitar Synth Tuning & Chords](#guitar-synth-tuning--chords)
  - [Song Duration & Timecode](#song-duration--timecode)
  - [Easter Egg Configurations](#easter-egg-configurations)
- [H. Git and GitHub Workflow](#h-git-and-github-workflow)
  - [Standard Content Update Workflow](#standard-content-update-workflow)
  - [Branch-Based Feature Workflow](#branch-based-feature-workflow)
- [I. Deployment Guide](#i-deployment-guide)
  - [Deploying to Vercel](#deploying-to-vercel)
  - [Environment Variables](#environment-variables)
  - [Custom Domain Setup](#custom-domain-setup)
- [J. Troubleshooting](#j-troubleshooting)
- [K. Maintenance Checklist](#k-maintenance-checklist)
- [L. License and Credits](#l-license-and-credits)

---

## A. Project Overview

### Concept & Philosophy

**The Gig Night** is a themed portfolio created for **Emmanuel Wilson Fernando**—an Information Systems student at Universitas Multimedia Nusantara (UMN), web developer, project manager, and guitarist. 

Rather than presenting standard resume grids, this portfolio reimagines personal presentation through the lens of live music performance:

- The site opens with **velvet curtains** parting to reveal the show.
- The hero is framed under **oscillating stage lights**.
- Visitors can **pluck realistic guitar strings** that synthesize actual notes in real-time.
- Portfolio projects are styled as **tracks on a vinyl setlist** with expanding case studies.
- Work history is told as a **concert tour route** with a tour van tracking scroll progress.
- Technical skills are tuned on a **studio mixing console** with 12-segment LED volume meters and tactile faders.
- Contacting the developer takes the form of tearing off a **VIP concert admission ticket**.

### Architecture Overview

The site is built with modern web standards:

1. **Next.js App Router**: Server-side page generation for dynamic project routes (`/projects/[slug]`), static generation with `generateStaticParams`, and dynamic metadata generation for SEO.
2. **Centralized Data Layer (`src/data/`)**: All editable content (profile, links, projects, experience, skills, navigation, and fun facts) is decoupled from UI components into strongly-typed TypeScript modules. Content updates require **no UI or JSX modification**.
3. **In-Browser Audio Synthesis**: Built on the **Web Audio API** using a physical Karplus-Strong string algorithm (`src/lib/audio.ts`). Audio buffers are computed procedurally on demand with zero audio files, keeping network bundles minimal.
4. **Tailwind CSS v4 & CSS Variables**: Theme tokens defined via `@theme inline` in `src/app/globals.css`. Seamless switching between dark ("Stage lights") and light ("House lights") modes with zero flash of unstyled content via an inline `<head>` script.
5. **Fluid Motion & Accessibility**: Handled via **Framer Motion**, fully honoring system `prefers-reduced-motion` settings (instant transitions, muted audio, and non-blocking interactions).

---

## B. Website Features

### 1. Stage Curtains Intro
- **Component**: `src/components/sections/intro/CurtainIntro.tsx`
- **Behavior**: Two velvet red panels with gold borders part sideways upon clicking **"Start the show"** (which unlocks browser audio and plays a resonant E major strum) or **"Skip intro"**.
- **State Persistence**: Once seen, the status is stored in `localStorage` under `gig-intro-seen`. An inline script in `src/app/layout.tsx` hides the curtain on subsequent page loads to avoid repeat interruptions.
- **Replay**: Can be triggered anytime from the footer via the **"Replay intro"** button.

### 2. Spotlight Hero Section
- **Component**: `src/components/sections/hero/HeroSection.tsx`
- **Visuals**: Three animated spotlight cones (magenta, cyan, amber) swaying continuously across the stage background.
- **Interactive Heading**: Big display typography (`AnimatedName.tsx`) displaying the developer's full name.
- **Typewriter Subtitle**: Rotating tagline phrases (`Typewriter.tsx`) cycling through roles: *"I build websites."*, *"I run teams."*, *"I play guitar."*, *"Loudly."*
- **Call-to-Action**: Direct shortcut buttons to `#setlist` ("See the setlist →") and `#contact` ("Book the band").

### 3. Sound Check (Playable Guitar Strings)
- **Component**: `src/components/sections/strings/GuitarStrings.tsx`
- **Audio Engine**: `src/lib/audio.ts` (Karplus-Strong physical modeling synthesis).
- **Strings**: 6 strings mapped to standard guitar tuning (E2: 82.41Hz, A2: 110Hz, D3: 146.83Hz, G3: 196Hz, B3: 246.94Hz, E4: 329.63Hz).
- **Interaction**:
  - Click or tap any string to pluck.
  - Hover / swipe your mouse across multiple strings on desktop for a strumming effect.
  - Keyboard accessible: `Tab` through strings and press `Enter` or `Space` to pluck.
  - Visual spring vibration on plucking using Framer Motion.
  - Desktop-only section (`hidden md:block` in `src/app/(pages)/page.tsx`) to optimize mobile performance.

### 4. The Setlist (Project Showcase)
- **Component**: `src/components/sections/setlist/SetlistSection.tsx`
- **Display**: Projects displayed as numbered music tracks (e.g., Track 01, Track 02) with retro vinyl discs sliding out from behind the cards on hover.
- **Accordion Case Study**: Clicking a card ("Drop the needle") unfolds an in-page case study detailing:
  - **The Problem**: Background and challenge.
  - **What I Did**: Action items and contributions.
  - **Stack**: Technology badges.
  - **The Result**: Outcome and metric achievements.
- **Action Links**: Direct external links to live sites (`Visit live site ↗`), GitHub repositories (`Repo ↗`), and dedicated subpages (`Full page →`).

### 5. The Tour (Work & Organizational Experience)
- **Component**: `src/components/sections/tour/TourSection.tsx`
- **Interaction**: Vertical scroll position is converted into a **horizontal stage progression**.
- **Visuals**: Tour stops presented as vintage gig posters with custom accent glow borders and tilt angles.
- **Animated Tour Van**: An animated van icon (`🚐`) drives horizontally along a dotted roadmap reflecting the visitor's scroll progress.
- **Details**: Lists the organization name, tour "city/stage" moniker (e.g., *Main Stage*, *Theatre Pit*, *Code Room*), roles held, and service periods.

### 6. Backstage (About & Fun Facts)
- **Component**: `src/components/sections/backstage/BackstageSection.tsx`
- **Profile Presentation**: Monochromatic portrait photo in an "ALL ACCESS" VIP laminate badge frame that turns full color and tilts dynamically on hover.
- **Biography**: Multi-paragraph narrative introducing background, university studies, and passions.
- **3D Fun Fact Flip Cards**: 4 interactive flashcards that rotate 180 degrees on hover or tap to reveal personal trivia (favourite stack, secret skills, musical instruments, currently playing music).

### 7. The Mixing Board (Skills Console)
- **Component**: `src/components/sections/mixer/MixerSection.tsx`
- **Theme**: Styled as a high-end audio mixing console.
- **Channels**: Individual vertical channel strips categorized into **Code** (cyan), **People** (amber), and **Music** (magenta).
- **12-Segment LED Meters**: Dynamic level meters with green, yellow, and red peak indicators that light up dynamically based on slider values.
- **Tactile Faders**: Interactive vertical faders with pointer capture; users can drag sliders up and down or use keyboard arrows (`↑`, `↓`, `Home`, `End`).
- **Playful Animation**: Hovering over a channel trigger a spring "bounce/wiggle" effect.
- Desktop-only view (`hidden md:block`) tailored for wide screens.

### 8. Book the Band (Ticket-Style Contact Section)
- **Component**: `src/components/sections/contact/ContactSection.tsx`
- **Theme**: Authentic admission ticket stub design featuring perforated circular tear notches, vertical ticket numbers (e.g., *NO. 0001*), and simulated barcode strips.
- **Copy Email with Confetti**: Clicking **"✉ Copy email"** copies the email address to clipboard and shoots a colorful canvas confetti burst (`src/lib/confetti.ts`).
- **Download CV**: Direct link triggering download of the resume stored at `public/cv.pdf`.
- **Social Badges**: Pill buttons linking to LinkedIn, GitHub, and Instagram profiles.

### 9. Global Interactive Shell & Easter Eggs
- **Layout Shell**: `src/components/layout/Shell.tsx`
- **Song Progress Bar** (`SongProgressBar.tsx`): Fixed top bar styled as a music player progress scrubber showing running timecode (e.g., `▶ 1:45 / 3:33`).
- **Guitar Pick Cursor** (`PickCursor.tsx`): Replaces standard mouse arrow on desktop with a magenta plectrum that scales and tilts when hovering over clickable elements.
- **Stage / House Lights Toggle** (`Toggles.tsx`): Toggles between Stage Lights (dark mode) and House Lights (light mode), saved in `localStorage`.
- **Sound Toggle** (`Toggles.tsx`): Mutes or activates guitar audio synthesis globally.
- **Secret Rock Easter Egg** (`EasterEgg.tsx`):
  - Typing the word **`rock`** anywhere on the page, OR
  - Entering the classic **Konami Code** (`↑` `↑` `↓` `↓` `←` `→` `←` `→` `B` `A`)
  - Triggers a laser beam light show, full-screen confetti eruption, an E-major guitar riff, and an animated **"Rock on! 🤘"** badge.

### 10. Dedicated Project Pages & SEO
- **Dynamic Routes**: `src/app/(pages)/projects/[slug]/page.tsx` pre-renders full standalone case study pages for every item in `projects.ts`.
- **Dynamic Open Graph Image**: `src/app/opengraph-image.tsx` automatically creates 1200×630px social media preview cards featuring the headliner stage typography.
- **Automated Metadata**: Auto-generated `sitemap.xml` (`sitemap.ts`) and `robots.txt` (`robots.ts`).
- **404 Record Scratch**: `src/app/not-found.tsx` displays an animated spinning vinyl record and rock-themed recovery link.

---

## C. Technology Stack

| Technology / Library | Version | Category | Purpose & Repository Usage |
| :--- | :--- | :--- | :--- |
| **Next.js** | `16.4.2` | Core Framework | App Router framework powering SSR, SSG via `generateStaticParams`, dynamic routing (`/projects/[slug]`), and image optimization. |
| **React** & **React DOM** | `19.3.0` | UI Library | Component model, concurrent rendering, and hooks (`useSyncExternalStore`, `useRef`, `useState`). |
| **TypeScript** | `^5.x` | Language | Strict type definitions (`src/types/content.ts`) ensuring data integrity across content and components. |
| **Tailwind CSS** | `^4.x` | Styling Engine | Modern zero-config utility engine using `@theme inline` with CSS custom variables for dynamic stage/house theming. |
| **@tailwindcss/turbopack** | `^4.x` | Build Tool | Turbopack CSS loader integration configured in `next.config.ts`. |
| **Framer Motion** | `^14.5.0` | Animation | Orchestrates curtain opening, spring faders, flip cards, vinyl disc animations, and scroll-linked transforms. |
| **Web Audio API** | Native Browser | Audio Engine | Procedural Karplus-Strong string algorithm (`src/lib/audio.ts`) generating synthetic plucked notes on the fly. |
| **HTML5 Canvas** | Native Browser | Visual Effects | Custom confetti physics engine (`src/lib/confetti.ts`) without third-party bundle bloat. |
| **next/font/google** | Built-in | Typography | Self-hosted Google fonts: **Anton** (display), **Space Grotesk** (body), and **Permanent Marker** (accents). |
| **ESLint** & `eslint-config-next` | `^9.x` / `16.4.2` | Code Quality | Enforces Next.js Core Web Vitals and TypeScript best practices (`eslint.config.mjs`). |

---

## D. Project Structure

### Directory Tree

```
porto/
├── .git/                         # Git version control metadata
├── .gitignore                    # Ignored files (node_modules, .next, etc.)
├── AGENTS.md                     # Next.js agent instruction block
├── README.md                     # Complete project documentation
├── eslint.config.mjs             # Flat ESLint configuration
├── next-env.d.ts                 # Next.js TypeScript declarations
├── next.config.ts                # Next.js & Turbopack loader configuration
├── package-lock.json             # NPM lockfile
├── package.json                  # Dependencies, scripts, and package metadata
├── tsconfig.json                 # TypeScript compiler configuration & path aliases
│
├── public/                       # Static public assets served from root (/)
│   ├── cv.pdf                    # Downloadable CV file (referenced by contact section)
│   ├── me.svg                    # Default avatar placeholder (replace with me.jpg/.png)
│   └── projects/                 # Project screenshots and preview graphics
│       ├── iknitit.svg           # Preview for "i knit it!" project
│       ├── mentoring.svg         # Preview for Mentoring UMN project
│       ├── mufomic.svg           # Preview for MUFOMIC website
│       └── omb.svg               # Preview for OMB UMN NEXT project
│
└── src/
    ├── app/                      # Next.js App Router root
    │   ├── (pages)/              # Main route group
    │   │   ├── page.tsx          # Homepage (landing page orchestrating all sections)
    │   │   └── projects/
    │   │       └── [slug]/
    │   │           └── page.tsx  # Dynamic case study page for individual projects
    │   ├── favicon.ico           # Website favicon
    │   ├── globals.css           # Tailwind v4 import, theme variables, custom keyframes
    │   ├── layout.tsx            # Root HTML layout, font loaders, anti-flash theme script
    │   ├── not-found.tsx         # Themed 404 page ("This track doesn't exist")
    │   ├── opengraph-image.tsx   # Dynamic Open Graph preview image generator
    │   ├── robots.ts             # Generates /robots.txt
    │   ├── sitemap.ts            # Generates dynamic /sitemap.xml
    │   └── template.tsx          # Animated route transition wrapper
    │
    ├── components/               # React UI components
    │   ├── layout/               # Shell, navigation, and persistent overlays
    │   │   ├── EasterEgg.tsx     # Keyboard listeners for 'rock' & Konami code light show
    │   │   ├── Header.tsx        # Floating pill navigation bar with theme/sound toggles
    │   │   ├── PickCursor.tsx    # Custom guitar plectrum mouse cursor
    │   │   ├── Shell.tsx         # Root wrapper with skip-to-content accessibility link
    │   │   └── SongProgressBar.tsx # Top scroll progress bar with live timecode
    │   │
    │   ├── sections/             # Page sections
    │   │   ├── backstage/
    │   │   │   └── BackstageSection.tsx # About me, profile portrait, fun-fact flip cards
    │   │   ├── contact/
    │   │   │   └── ContactSection.tsx   # Ticket-style contact card & footer
    │   │   ├── hero/
    │   │   │   ├── AnimatedName.tsx     # Large headline title
    │   │   │   ├── HeroSection.tsx      # Spotlight beams, headliner badge, hero CTAs
    │   │   │   └── Typewriter.tsx       # Cycling typewriter role descriptions
    │   │   ├── intro/
    │   │   │   └── CurtainIntro.tsx     # Velvet curtain opening animation
    │   │   ├── mixer/
    │   │   │   └── MixerSection.tsx     # Studio audio mixing board for skills
    │   │   ├── setlist/
    │   │   │   └── SetlistSection.tsx   # Project list with vinyl reveal & accordions
    │   │   ├── strings/
    │   │   │   └── GuitarStrings.tsx    # Interactive 6-string playable guitar neck
    │   │   └── tour/
    │   │       └── TourSection.tsx      # Horizontal scroll experience tour stops
    │   │
    │   └── ui/                   # Reusable UI primitives
    │       ├── Button.tsx        # Styled button and anchor components
    │       ├── CaseStudy.tsx     # Reusable Problem/What I Did/Stack/Result block
    │       ├── ProjectImage.tsx  # Next.js Image wrapper with SVG bypass logic
    │       └── Toggles.tsx       # Stage lights (dark/light) & sound (mute/unmute) buttons
    │
    ├── data/                     # 🌟 PRIMARY CONTENT FILES (Edit these for updates)
    │   ├── funFacts.ts           # Trivia flip cards content
    │   ├── links.ts              # Email, social links (LinkedIn, GitHub, etc.), CV path
    │   ├── navigation.ts         # Header menu navigation items
    │   ├── profile.ts            # Name, roles, bio, tagline, location, portrait path
    │   ├── projects.ts           # All portfolio projects and case study details
    │   ├── skills.ts             # Skills list with mastery levels (0-100) and groups
    │   └── tour.ts               # Experience entries and tour stops
    │
    ├── lib/                      # Core utility libraries & engines
    │   ├── audio.ts              # Karplus-Strong Web Audio API guitar synth
    │   ├── confetti.ts           # Dependency-free HTML5 canvas confetti generator
    │   ├── stage-store.ts        # Client state store (theme, sound, intro) + localStorage
    │   └── use-stage.ts          # React hook wrapping stage-store with useSyncExternalStore
    │
    └── types/
        └── content.ts            # TypeScript interfaces for Project and TourStop
```

### File Responsibility Guide

| If you want to change... | Edit this file |
| :--- | :--- |
| Your name, title, bio, location, tagline, or portrait path | `src/data/profile.ts` |
| Email, LinkedIn, GitHub, Instagram, or CV path | `src/data/links.ts` |
| Adding, editing, or deleting portfolio projects | `src/data/projects.ts` |
| Work experience, committee positions, or internships | `src/data/tour.ts` |
| Technical and personal skills (mixer faders) | `src/data/skills.ts` |
| Trivia flip cards in the Backstage section | `src/data/funFacts.ts` |
| Navbar links in the header | `src/data/navigation.ts` |
| Order or presence of sections on the homepage | `src/app/(pages)/page.tsx` |
| Website colors (neon magenta, cyan, amber, lime) | `src/app/globals.css` |
| Guitar tuning or intro chord notes | `src/lib/audio.ts` |

---

## E. Local Development Setup

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: Version `20.x` or higher (Node 22 LTS recommended).
- **npm**: Version `10.x` or higher (bundled with Node.js).
- **Git**: For version control.

Check your versions:
```bash
node -v
npm -v
git --version
```

### Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/emmanfernand-web/emman-porto.git
   cd emman-porto
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the website**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
   The site supports hot reloading; edits in `src/data/` or component files will instantly reflect in the browser.

5. **Lint the code**:
   ```bash
   npm run lint
   ```

6. **Create a production build**:
   ```bash
   npm run build
   ```
   *(Note: An active internet connection is required during build so Next.js can download Google Fonts).*

7. **Preview the production build**:
   ```bash
   npm run start
   ```

### Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev` | Launches Next.js development server with Turbopack on port 3000 |
| `build` | `next build` | Compiles optimized production bundle and generates static routes |
| `start` | `next start` | Runs the compiled production server locally |
| `lint` | `eslint` | Executes ESLint to check for code syntax and formatting errors |

---

## F. Website Maintenance Guide

This section is your step-by-step handbook for updating content without touching application logic.

### 1. Updating Personal Information

All personal details, biographies, and site metadata are located in `src/data/profile.ts` and `src/data/links.ts`.

#### Updating Bio, Roles & Location (`src/data/profile.ts`)
Open `src/data/profile.ts` in your text editor:

```typescript
export const profile = {
  name: "Emmanuel Wilson Fernando",
  firstName: "Emmanuel",
  handle: "Emman",
  tagline: "I build websites, run teams, and play guitar. Loudly.",
  typedLines: [
    "I build websites.",
    "I run teams.",
    "I play guitar.",
    "Loudly.",
  ],
  role: "Web developer · Project manager · Guitarist",
  school: "Information Systems @ Universitas Multimedia Nusantara (UMN)",
  location: "Tangerang, Indonesia",
  bio: [
    "I am an Information Systems student at UMN who specializes in modern frontend development and technical project leadership.",
    "When I am not writing TypeScript or coordinating deployment pipelines, you will find me performing live on stage with my guitar.",
  ],
  photo: "/me.jpg",                 // Path to your photo inside public/
  photoAlt: "Portrait of Emmanuel Wilson Fernando",
  siteTitle: "Emmanuel Wilson Fernando | Web developer, project manager & guitarist",
  siteDescription:
    "Portfolio of Emmanuel Wilson Fernando: Information Systems student at UMN, web developer (Next.js, React, TypeScript), project manager and guitarist.",
} as const;
```

#### Updating Social Media, Email & CV (`src/data/links.ts`)
Open `src/data/links.ts`:

```typescript
export const links = {
  email: "emmanuel.fernando@example.com",
  linkedin: "https://www.linkedin.com/in/emmanuel-fernando",
  github: "https://github.com/emmanfernand-web",
  instagram: "https://www.instagram.com/emmanfernand",
  cv: "/cv.pdf",                    // Place your actual PDF resume at public/cv.pdf
} as const;
```

#### Replacing Your Profile Picture
1. Save your portrait photo as `me.jpg` or `me.png` (ideal dimensions: 600×750px or 4:5 aspect ratio).
2. Copy it into the `public/` directory:
   ```bash
   cp /path/to/your/photo.jpg public/me.jpg
   ```
3. Update line 21 of `src/data/profile.ts`:
   ```typescript
   photo: "/me.jpg",
   ```

---

### 2. Adding a New Portfolio Project

Projects appear on both the **Homepage Setlist** and automatically generate their own **Case Study Pages** at `/projects/[slug]`.

#### Step 1: Prepare the Project Screenshot
- Capture a screenshot or create a preview graphic.
- **Recommended size**: 800×500px (16:10 aspect ratio) in `.webp`, `.png`, or `.jpg` format.
- Place the file inside `public/projects/`, e.g., `public/projects/my-new-app.webp`.

#### Step 2: Add Entry in `src/data/projects.ts`
Open `src/data/projects.ts` and add a new object to the `projects` array:

```typescript
{
  slug: "event-ticketing-system",         // URL path: /projects/event-ticketing-system
  track: "05",                            // Two-digit track number displayed on vinyl card
  title: "SoundStage Ticketing",          // Display title
  kind: "Full-Stack Web Application",     // Subtitle badge
  role: "Lead Full-Stack Developer",       // Your specific role
  year: "2026",                           // Year completed or launched
  accent: "cyan",                         // Theme accent: "magenta" | "cyan" | "amber" | "lime"
  summary:
    "A real-time concert ticketing platform with seat selection and QR check-in capabilities.",
  problem:
    "Local music venues struggled with physical ticket queues, resulting in high check-in bottlenecks and counterfeit passes.",
  whatIDid: [
    "Designed and developed the responsive web application using Next.js and Tailwind CSS.",
    "Integrated QR-code generation and validation for rapid door scanning.",
    "Implemented automated receipt and confirmation emails via SendGrid.",
    "Deployed the staging and production infrastructure on Vercel.",
  ],
  stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
  result: "Successfully handled ticket sales for 3 live campus events with over 1,200 attendees and zero server downtime.",
  liveUrl: "https://soundstage-tickets.vercel.app",  // Optional: omit or set to undefined if no live site
  repoUrl: "https://github.com/emmanfernand-web/soundstage-tickets", // Optional
  image: "/projects/my-new-app.webp",     // Path inside public/
  imageAlt: "Screenshot of the SoundStage Ticketing dashboard",
},
```

#### Field Reference Guide

| Field | Type | Required? | Description |
| :--- | :--- | :--- | :--- |
| `slug` | `string` | **Yes** | Unique URL-safe identifier (e.g., `my-project`). Determines `/projects/[slug]` URL. |
| `track` | `string` | **Yes** | Setlist track number (e.g., `"01"`, `"02"`, `"05"`). |
| `title` | `string` | **Yes** | Project name. |
| `kind` | `string` | **Yes** | Short descriptor (e.g., *"Official website"*, *"Landing page"*). |
| `role` | `string` | **Yes** | Your role on the project (e.g., *"Frontend Lead"*, *"Designer"*). |
| `year` | `string` | **Yes** | Year of completion (e.g., `"2026"`). |
| `accent` | `string` | **Yes** | Must be one of: `"magenta"`, `"cyan"`, `"amber"`, or `"lime"`. |
| `summary` | `string` | **Yes** | 1-2 sentence overview shown on the collapsed setlist card. |
| `problem` | `string` | **Yes** | The challenge or problem statement in the case study. |
| `whatIDid` | `string[]` | **Yes** | Array of bullet points describing your technical contributions. |
| `stack` | `string[]` | **Yes** | Technologies used (e.g., `["React", "TypeScript"]`). |
| `result` | `string` | **Yes** | Metric or qualitative outcome achieved. |
| `liveUrl` | `string` | No | Public URL of the running website (opens in new tab). |
| `repoUrl` | `string` | No | Public GitHub repository URL. |
| `image` | `string` | **Yes** | File path relative to `public/` (e.g., `"/projects/demo.webp"`). |
| `imageAlt` | `string` | **Yes** | Screen-reader accessible image description. |

---

### 3. Editing or Removing Existing Projects

Open `src/data/projects.ts`:

- **To update an image**: Drop the new image into `public/projects/` and update the `image` property.
- **To add a missing live link**: Replace `liveUrl: undefined` with `liveUrl: "https://your-domain.com"`.
- **To reorder projects**: Move the object higher or lower in the array. Update the `track` strings (`"01"`, `"02"`, etc.) so the numbers remain sequential.
- **To remove a project**: Delete the entire `{ ... }` block from the array. Next.js will automatically remove the corresponding `/projects/[slug]` route upon the next build.

---

### 4. Updating Skills & Mixer Levels

The skills mixing console is powered by `src/data/skills.ts`.

Open `src/data/skills.ts`:

```typescript
export const skills = [
  { name: "Next.js", level: 88, group: "Code" },
  { name: "React", level: 90, group: "Code" },
  { name: "TypeScript", level: 82, group: "Code" },
  { name: "Tailwind CSS", level: 92, group: "Code" },
  { name: "Vercel / Deploy", level: 85, group: "Code" },
  { name: "Project Mgmt", level: 84, group: "People" },
  { name: "Leadership", level: 80, group: "People" },
  { name: "Guitar", level: 90, group: "Music" },
] as const;
```

#### Rules for Skills:
- `level`: Number from `0` to `100`. Controls both the fader knob height and how many of the 12 LED lights illuminate.
- `group`: Must be one of three categories:
  - `"Code"` (Cyan channel indicator)
  - `"People"` (Amber channel indicator)
  - `"Music"` (Magenta channel indicator)

---

### 5. Updating Tour Stops (Experience)

Work experience, committee roles, and music gigs are maintained in `src/data/tour.ts`.

Open `src/data/tour.ts`:

```typescript
import type { TourStop } from "@/types/content";

export const tour: TourStop[] = [
  {
    org: "MUFOMIC",
    city: "Main Stage",               // Creative "Tour City" moniker
    accent: "magenta",                 // "magenta" | "cyan" | "amber" | "lime"
    roles: [
      { title: "Lead Guitarist, INDIGOS", period: "2024 – Present" },
      { title: "Project Manager, Open Recruitment Gen 13", period: "Sep 2026" },
      { title: "Head of Guitar Selection", period: "Sep – Oct 2026" },
      { title: "Web Developer", period: "Sep 2026" },
    ],
  },
  {
    org: "Mentoring UMN 2026",
    city: "Code Room",
    accent: "cyan",
    roles: [
      { title: "Website Division Core Staff", period: "Jul – Sep 2026" }
    ],
  },
];
```

To add a new organization or company, duplicate a `{ org: ..., city: ..., accent: ..., roles: [...] }` block. The horizontal tour roadmap will dynamically calculate the new distance!

---

### 6. Updating Backstage Fun Facts

The 3D flip cards in the Backstage section are defined in `src/data/funFacts.ts`.

Open `src/data/funFacts.ts`:

```typescript
export const funFacts = [
  { front: "Main instrument?", back: "Electric guitar (Fender Stratocaster). Lead guitarist of INDIGOS." },
  { front: "Favourite stack?", back: "Next.js + TypeScript + Tailwind CSS, deployed on Vercel." },
  { front: "Secret skill?", back: "Can transcribe guitar solos by ear within 15 minutes." },
  { front: "Currently listening to", back: "Polyphia, Ichika Nito, and Japanese Math Rock." },
] as const;
```

---

### 7. Managing Website Images & Media

All static media files are served from the root `/public` directory.

- **Profile Picture**: `public/me.jpg` or `public/me.png` (referenced as `"/me.jpg"` in `profile.ts`).
- **Resume / Curriculum Vitae**: `public/cv.pdf` (referenced as `"/cv.pdf"` in `links.ts`).
- **Project Images**: Store inside `public/projects/filename.webp` (referenced as `"/projects/filename.webp"` in `projects.ts`).

#### Image Optimization Best Practices
- **Format**: Prefer `.webp` or `.png` for raster screenshots.
- **Resolution**: 800px width by 500px height is ideal for project cards.
- **SVGs vs Raster**: The custom `ProjectImage` component (`src/components/ui/ProjectImage.tsx`) automatically detects `.svg` filenames and disables Next.js server image optimization (`unoptimized={true}`). Raster images (`.png`, `.jpg`, `.webp`) are automatically converted, resized, and cached by Next.js for blazing fast performance.

---

### 8. Reordering Page Sections

The homepage order is declared declaratively in `src/app/(pages)/page.tsx`:

```tsx
export default function Home() {
  return (
    <Shell>
      <CurtainIntro />
      <HeroSection />
      <div className="hidden md:block">
        <GuitarStrings />
      </div>
      <SetlistSection />
      <TourSection />
      <BackstageSection />
      <div className="hidden md:block">
        <MixerSection />
      </div>
      <ContactSection />
    </Shell>
  );
}
```

To reorder sections, simply move the corresponding JSX component tags up or down. If you want to temporarily disable a section, comment it out.

---

## G. Customization Guide

### Colors and Theming (Tailwind v4)

Colors are controlled via CSS variables at the top of `src/app/globals.css`.

#### Dark Mode ("Stage Lights") vs Light Mode ("House Lights")

```css
/* Stage Lights (Dark Mode) */
:root,
:root[data-theme="dark"] {
  --stage: #0b0614;         /* Deep stage background */
  --stage-2: #150b26;       /* Card surfaces */
  --stage-3: #20123a;       /* Elevated dialogs/faders */
  --ink: #f6f0ff;           /* Main text color */
  --muted: #b3a5cf;         /* Secondary text */
  --line: #3a2766;          /* Borders and dividers */
  --magenta: #ff2e93;       /* Electric neon pink */
  --cyan: #19e3ff;          /* Stage neon cyan */
  --amber: #ffb800;         /* Spotlight yellow */
  --lime: #b6ff3b;          /* Accent green */
  --on-accent: #0b0614;     /* Text on bright accents */
  color-scheme: dark;
}

/* House Lights (Light Mode) */
:root[data-theme="light"] {
  --stage: #fff3dc;         /* Warm vintage paper background */
  --stage-2: #ffe7b8;       /* Warm parchment card */
  --stage-3: #ffd98a;       /* Darker parchment */
  --ink: #1a0b2e;           /* Deep purple-black text */
  --muted: #5b4a78;         /* Subdued purple text */
  --line: #1a0b2e;          /* Bold ink borders */
  --magenta: #c4005f;
  --cyan: #00677f;
  --amber: #8a5300;
  --lime: #3d6b00;
  --on-accent: #fff3dc;
  color-scheme: light;
}
```

To adjust any accent color across the entire site, simply modify the hex value in `globals.css`.

---

### Typography & Google Fonts

Fonts are configured in `src/app/layout.tsx` using `next/font/google`:

```typescript
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const marker = Permanent_Marker({ variable: "--font-marker", subsets: ["latin"], weight: "400" });
```

- **Anton** (`--font-display`): Used for giant poster headings, numbers, and vinyl labels.
- **Space Grotesk** (`--font-sans`): Clean, modern sans-serif for body copy and readable text.
- **Permanent Marker** (`--font-marker`): Handwritten marker font for badges, notes, and callouts.

---

### Guitar Synth Tuning & Chords

To change the guitar notes or chords, edit `src/lib/audio.ts`:

- **Open Strings (`OPEN_STRINGS`)**: Controls the note frequencies (in Hertz) for the 6 strings.
- **Intro Chord (`E_MAJOR`)**: Array of frequencies plucked when opening the curtains or triggering the easter egg:
  ```typescript
  export const E_MAJOR = [82.41, 123.47, 164.81, 207.65, 246.94, 329.63];
  ```

---

### Song Duration & Timecode

The fake song length in the top scroll progress bar is set in `src/components/layout/SongProgressBar.tsx`:

```typescript
const SONG_SECONDS = 3 * 60 + 33; // 3 minutes 33 seconds
```

---

### Easter Egg Configurations

Trigger keywords and key sequences are defined in `src/components/layout/EasterEgg.tsx`:

```typescript
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const WORD = "rock";
```

You can change `WORD` to any secret password you prefer!

---

## H. Git and GitHub Workflow

The repository is hosted on GitHub at:
`https://github.com/emmanfernand-web/emman-porto.git`

### Standard Content Update Workflow

When making quick content updates (e.g., adding a project or editing your bio):

1. **Check your current status**:
   ```bash
   git status
   ```

2. **Pull the latest remote changes**:
   ```bash
   git pull origin main
   ```

3. **Stage your modified files**:
   ```bash
   # Stage specific data files
   git add src/data/projects.ts public/projects/
   
   # Or stage all changes
   git add .
   ```

4. **Commit with a descriptive message**:
   ```bash
   git commit -m "content: add SoundStage project and update bio"
   ```

5. **Push to GitHub**:
   ```bash
   git push origin main
   ```

---

### Branch-Based Feature Workflow

When making substantial layout changes or adding major new features:

1. **Create and switch to a new branch**:
   ```bash
   git checkout -b feature/audio-recorder
   ```

2. **Make your changes, test them locally**, and commit:
   ```bash
   git add .
   git commit -m "feat: add interactive recording pedalboard"
   ```

3. **Push the branch to GitHub**:
   ```bash
   git push -u origin feature/audio-recorder
   ```

4. **Merge back to `main`**:
   Once verified or reviewed via GitHub Pull Request:
   ```bash
   git checkout main
   git pull origin main
   git merge feature/audio-recorder
   git push origin main
   ```

5. **Delete the feature branch locally**:
   ```bash
   git branch -d feature/audio-recorder
   ```

---

## I. Deployment Guide

### Deploying to Vercel

This project is tailored for zero-configuration deployment on **Vercel**.

#### Automatic Git Deployment (Recommended)
1. Push your repository to GitHub (`main` branch).
2. Go to [Vercel](https://vercel.com/) and log into your account.
3. Click **Add New... → Project**.
4. Select `emman-porto` from your GitHub repositories and click **Import**.
5. Framework Preset will automatically detect **Next.js**.
6. Leave Root Directory as `./` and build settings default (`npm run build`).
7. Click **Deploy**.

**Continuous Deployment (CI/CD)**: Every time you run `git push origin main`, Vercel will automatically trigger a production build and update your live website within 60–90 seconds.

---

### Environment Variables

The project does **not** require any private database or API keys. 

However, it uses one system environment variable automatically supplied by Vercel:
- `VERCEL_PROJECT_PRODUCTION_URL`: Automatically provided by Vercel's environment. Used in `src/app/layout.tsx` and `src/app/sitemap.ts` to construct canonical metadata URLs.
- If you deploy outside Vercel or want to override the canonical domain manually, you can set an environment variable in `.env.local` or your hosting dashboard:
  ```env
  VERCEL_PROJECT_PRODUCTION_URL=your-custom-domain.com
  ```

---

### Custom Domain Setup

1. In your Vercel Dashboard, navigate to **Project Settings → Domains**.
2. Enter your custom domain (e.g., `emmanuel.dev` or `emman.my.id`).
3. Follow the DNS instructions provided by Vercel:
   - For Apex domain (`example.com`): Add an `A` record pointing to `76.76.21.21`.
   - For Subdomain (`www.example.com`): Add a `CNAME` record pointing to `cname.vercel-dns.com`.
4. Vercel will automatically provision a free SSL/TLS certificate.

---

## J. Troubleshooting

### 1. Build Failure: `Failed to fetch Anton from Google Fonts`
- **Symptom**: `npm run build` fails with `[next]/internal/font/google/... Error: next/font: error: Failed to fetch Anton from Google Fonts`.
- **Cause**: Next.js downloads Google Fonts at build time. If your machine is offline, behind a strict firewall/proxy, or running in an isolated sandbox, the request fails.
- **Solution**: Ensure your computer has active internet access when building. Alternatively, configure your proxy environment variables (`HTTP_PROXY` / `HTTPS_PROXY`).

### 2. Audio Not Playing When Plucking Strings
- **Cause**: Modern web browsers block audio playback until the user explicitly interacts with the page (Autoplay Policy).
- **Solution**:
  - Click the **"Start the show"** button on the curtain intro, OR
  - Click the **Sound Toggle** icon in the header (change from 🔇 to 🔊).
  - Verify that your operating system or browser tab is not muted.
  - Note: If your system has `prefers-reduced-motion` enabled, audio synthesis is automatically disabled for comfort.

### 3. Missing Project Images (Broken Image Icon)
- **Cause**: The path in `projects.ts` does not match the actual filename inside `public/`.
- **Solution**: Ensure the path starts with a leading slash `/` and matches exact casing:
  - If file is at `public/projects/demo.png`, the property must be: `image: "/projects/demo.png"`.
  - Avoid relative paths like `../public/demo.png`.

### 4. Curtain Intro Doesn't Appear (Skipped on Refresh)
- **Cause**: Once you click through the intro, `localStorage.getItem("gig-intro-seen")` is set to `"1"`.
- **Solution**:
  - Click the **"Replay intro"** link in the website footer, OR
  - Clear your browser's local storage in DevTools (Application → Local Storage → Clear `gig-intro-seen`), OR
  - Open the site in an Incognito / Private window.

### 5. Port 3000 Already in Use
- **Symptom**: `Error: listen EADDRINUSE: address already in use :::3000`.
- **Solution**: Either terminate the existing process running on port 3000:
  ```bash
  npx kill-port 3000
  ```
  Or run Next.js on an alternate port:
  ```bash
  npm run dev -- -p 3001
  ```

### 6. Git Push Rejected (Non-fast-forward)
- **Cause**: Remote changes exist on GitHub that have not been pulled to your local machine.
- **Solution**:
  ```bash
  git pull --rebase origin main
  git push origin main
  ```

---

## K. Maintenance Checklist

Use this handy checklist whenever you update your portfolio.

### When Adding a New Project:
- [ ] Added project screenshot to `public/projects/` (800×500px recommended).
- [ ] Created new object entry in `src/data/projects.ts`.
- [ ] Assigned a unique `slug` (kebab-case).
- [ ] Assigned sequential `track` number (`"01"`, `"02"`, etc.).
- [ ] Added valid `accent` (`"magenta"`, `"cyan"`, `"amber"`, or `"lime"`).
- [ ] Filled out Problem, What I Did, Stack, and Result.
- [ ] Tested live link and repository link (or set to `undefined` if none).
- [ ] Ran `npm run dev` and checked both homepage card and `/projects/[slug]` route.

### Before Committing Changes:
- [ ] Ran `npm run lint` (0 errors reported).
- [ ] Tested site in dark mode ("Stage lights") and light mode ("House lights").
- [ ] Checked responsive layout on mobile viewport.
- [ ] Verified that no placeholder `TODO` strings remain in the edited files.

### After Deploying to Production:
- [ ] Visited live production URL.
- [ ] Verified that the new project appears on the setlist.
- [ ] Tested the live project link and case study accordion.
- [ ] Verified that CV download works from the contact ticket.
- [ ] Verified that email copy button triggers clipboard copy and confetti.

---

## L. License and Credits

### License
This portfolio is private intellectual property (`"private": true` in `package.json`). All personal branding, custom graphic assets, and copywriting belong to **Emmanuel Wilson Fernando**.

You are free to explore the codebase for personal inspiration and educational purposes.

### Credits & Acknowledgments
- **Design & Concept**: "The Gig Night" rock performance theme created for **Emmanuel Wilson Fernando**.
- **Next.js**: Framework by [Vercel](https://vercel.com/).
- **Framer Motion**: Animation library by [Motion](https://www.framer.com/motion/).
- **Karplus-Strong Algorithm**: Procedural acoustic plucked string synthesis based on the 1983 Kevin Karplus & Alex Strong digital synthesis research.
- **Fonts**: [Anton](https://fonts.google.com/specimen/Anton), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), and [Permanent Marker](https://fonts.google.com/specimen/Permanent+Marker) via Google Fonts.
