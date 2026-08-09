# Devansh Agrawal — Portfolio

Premium dark cinematic portfolio for a backend engineer. Built as an interactive operating-system experience around production systems, architecture, and impact.

## Stack

- Next.js 16 · TypeScript · Tailwind CSS 4
- Framer Motion · Lenis · Lucide

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

Edit `src/data/content.ts` for experience, systems, tech constellation, metrics, and social links.

Resume opens from the Google Drive link in `site.resume` (`src/data/content.ts`).

## Structure

```
src/
  app/                 # layout, page, global styles
  components/
    layout/            # loader, nav, lenis, spotlight, progress
    sections/          # intro → contact experiences
    ui/                # magnetic buttons, tilt cards, counters
  data/content.ts      # all portfolio content
```
