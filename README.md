# Shoaib.studio — Portfolio Website

Premium Awwwards-level portfolio for **Shoaib Maqsood** — ERP & HRM Implementer, Dashboard Specialist, 2D/3D Design Studio.

Built with Next.js 15, TypeScript, TailwindCSS, Framer Motion, GSAP, and Lenis smooth scroll.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# → Open http://localhost:3000

# 3. Build for production
npm run build
npm run start
```

---

## Editing Content

**All content lives in one file:**

```
content/siteData.ts
```

Open that file and edit the exported objects:

| Object | What it controls |
|---|---|
| `brand` | Name, email, social links |
| `nav` | Navigation items |
| `hero` | Hero headline, rotating words, tagline, CTAs, stats |
| `about` | About heading and body paragraphs |
| `services` | Service cards (add/remove freely) |
| `projects` | Project cards and modal content |
| `skillCategories` | Skill groups and individual skills |
| `contact` | Contact heading and form fields |
| `footer` | Copyright and tagline |

No UI components need to be touched for content updates.

---

## Project Structure

```
shoaib-studio/
├── app/
│   ├── globals.css          # Design tokens, base styles
│   ├── layout.tsx           # Root layout, fonts, metadata
│   └── page.tsx             # Page composition
│
├── components/
│   ├── effects/
│   │   ├── CustomCursor.tsx    # Magnetic cursor ring + dot
│   │   ├── GrainOverlay.tsx    # Film grain texture
│   │   └── ScrollProgress.tsx  # Top progress bar
│   │
│   ├── layout/
│   │   ├── LoadingScreen.tsx   # Cinematic intro counter
│   │   ├── Navigation.tsx      # Sticky nav + mobile menu
│   │   └── Footer.tsx          # Site footer
│   │
│   ├── motion/
│   │   ├── FadeIn.tsx          # Scroll-triggered fade
│   │   ├── MagneticButton.tsx  # Magnetic hover effect
│   │   └── TextReveal.tsx      # Line + char reveal animations
│   │
│   └── sections/
│       ├── Hero.tsx            # Full-screen cinematic hero
│       ├── About.tsx           # About + identity card
│       ├── Services.tsx        # Capabilities list
│       ├── Projects.tsx        # Project cards + modal
│       ├── Skills.tsx          # Skills grid + marquee
│       └── Contact.tsx         # Contact form + links
│
├── content/
│   └── siteData.ts          # ← EDIT ALL CONTENT HERE
│
├── hooks/
│   ├── useLenis.ts          # Lenis smooth scroll init
│   └── useMousePosition.ts  # Mouse tracking
│
├── lib/
│   ├── animations.ts        # Shared easing + variants
│   └── utils.ts             # cn() and helpers
│
└── public/                  # Static assets
```

---

## Deploying to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Add environment variables from `.env.example` if needed

That's it. Your site will be live at `your-project.vercel.app`.

**Custom domain:** In Vercel project settings → Domains → add `shoaib.studio`.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework, App Router, SSG |
| TypeScript | Type safety |
| TailwindCSS | Utility-first styling |
| Framer Motion | Component animations |
| GSAP | (Available via `@gsap/react` for complex scroll sequences) |
| Lenis | Smooth scrolling |
| Lucide React | Minimal icons |

---

## Adding Real Project Images

Replace the abstract geometric placeholders in `Projects.tsx`:

1. Add images to `public/images/`
2. In `content/siteData.ts`, add an `image` field to each project
3. In `components/sections/Projects.tsx`, replace the gradient div with `<Image>`

---

## Performance Notes

- Fonts loaded via `next/font/google` — zero layout shift
- Animations use `will-change` and `transform` only — GPU accelerated
- Lenis + Framer Motion are loaded client-side only
- All images should use `next/image` for automatic optimization

---

*Shoaib.studio — Crafting intelligent systems with precision.*
