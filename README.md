# My4riLab

Portfolio and creative-coding playground of **4ri (Liri)** — Product Designer and Creative Front-End Developer.

A neo-brutalist, highly interactive site where the interface is treated as a material: it drips, glitches, falls, snaps back and reacts to every pointer movement.

## Overview

My4riLab is a single-page application that doubles as a portfolio and a lab. Instead of static case-study pages, most surfaces are small experiments in motion and interaction:

- **Paint-drip header** — a viscous, physics-driven drip that "paints" the Live Lab link into the navigation.
- **Glitch engine** — a canvas-based slice-displacement and scanline engine powering the hero portrait and the Souvenir Studio, where you can glitch your own image and export it.
- **Live Lab** — a gallery of small interaction experiments (spills, gravity, elastic curves, magnetic kerning, wormholes and more).
- **Projects** — a filterable index of selected work with motion-driven cards and a cursor-trail canvas.

The visual language is deliberately raw: heavy type, hard borders, flat acid accents and unapologetic motion.

## Tech Stack

| Area      | Tools                                        |
| --------- | -------------------------------------------- |
| UI        | React 19, TypeScript                         |
| Styling   | Tailwind CSS 4 + hand-written scoped CSS     |
| Motion    | Framer Motion, Canvas 2D                     |
| Routing   | React Router 7 (lazy-loaded routes)          |
| Tooling   | Vite 8, pnpm                                 |

## Features

- Physics-based motion: springs, gravity, elastic constraints and drag interactions
- Fluid paint-drip animation rendered with SVG paths
- Real-time image glitching on `<canvas>` with adjustable settings and masks
- Cursor-trail canvas and scroll-linked project cards
- Interaction gallery with resettable, self-contained experiments
- Route-level code splitting with a branded loading state
- Responsive layout and accessible labels on interactive elements

## Project Structure

```
src/
├── app/                  # App shell and router
├── components/
│   ├── layout/           # Header, wordmark
│   ├── motion/           # Cursor trail canvas, motion project card
│   ├── sections/         # Page sections (skills)
│   └── ui/               # Small presentational pieces
├── features/
│   ├── glitch/           # Glitch engine, hero image, Souvenir Studio
│   └── lab/              # Live Lab interaction stages
├── data/                 # Project content
├── pages/                # Route-level pages
└── styles/               # Global and Live Lab styles
public/                   # Static assets (favicon, lab icons)
```

## Local Setup

**Requirements:** Node.js 22+ and [pnpm](https://pnpm.io/).

```bash
# install dependencies
pnpm install

# start the dev server (http://localhost:8443)
pnpm dev

# type-check
pnpm exec tsc --noEmit

# production build
pnpm build

# preview the production build
pnpm preview
```

The dev and preview servers use port `8443` by default; override it with the `PORT` environment variable, e.g. `PORT=3000 pnpm dev`.

## Routes

| Path            | Page                   |
| --------------- | ---------------------- |
| `/`             | Home                   |
| `/projects`     | Projects index         |
| `/projects/:id` | Project detail         |
| `/about`        | About                  |
| `/lab`          | Live Lab (interactions) |

## Contact

Designed and built by **4ri (Liri)** — [its.liriani@gmail.com](mailto:its.liriani@gmail.com).
