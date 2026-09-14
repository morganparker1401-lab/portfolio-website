# Morgan Parker — Portfolio

Personal portfolio for Morgan Parker, marketing major at the Neeley School of Business, Texas Christian University. A single-page site with brand storytelling, featured work, background, experience, and contact details.

Live at [morgan-parker.net](https://morgan-parker.net).

## Stack

- [Vite](https://vite.dev) with React 19 and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) for layout and typography, with the site's palette, fonts, and breakpoints defined as theme tokens
- [Motion](https://motion.dev) for the fade and carousel animations
- Bodoni Moda, bundled with the site via `@fontsource/bodoni-moda`
- Hosted on GitHub Pages, deployed by GitHub Actions

## Getting started

Requires Node.js 24 and pnpm 11 (`.nvmrc` and the `packageManager` field pin the versions). A Nix dev shell is included: `nix develop` provides both.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local address Vite prints. The site needs the dev server or a build; opening `index.html` directly will not work.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server with hot reload |
| `pnpm lint` | Run oxlint |
| `pnpm build` | Type-check and build to `dist/` |
| `pnpm preview` | Serve the production build locally |

## Project structure

```
index.html              Title, description, favicon, social preview tags
src/
  main.tsx              Entry point and font imports
  App.tsx               Page content and section order
  ui.tsx                Shared pieces: Screen, ScrollSection, Eyebrow, SectionHeading, TextLink
  SiteHeader.tsx        Sticky header; inline links on wide screens, menu button on narrow ones
  Project.tsx           Featured-work entry and its media panels
  PhoneSlideshow.tsx    Legal Center Live phone carousel
  site.ts               Navigation links and the asset() helper for files in public/
  index.css             Theme tokens and the few global rules (scroll snapping, focus, fade classes)
public/
  images/               Portrait, graphics, carousel slides, video covers (WebP), og-image.jpg
  videos/               Featured-work MP4s
  documents/            Résumé PDF
  favicon.svg
.github/workflows/
  deploy.yml            Build and deploy to GitHub Pages on push to main
AGENTS.md               Conventions and checklists for AI coding assistants (CLAUDE.md imports it)
```

## How the page works

- **Sections** are full-height scroll-snap stops. The home screen (hero plus the red strip) and the contact screen (contact plus footer) are grouped so nothing is skipped. Featured work is taller than a screen and scrolls freely inside, snapping to its top or bottom edge. Snapping is off below 601px and for users who prefer reduced motion.
- **Breakpoints** are the site's own: phone below 601px, tablet 601 to 900px, desktop 901px and up. The header switches to a menu button below 761px.
- **Text fades in** as it scrolls into view via an IntersectionObserver in `App.tsx`. Headings and paragraphs are picked up automatically; other elements opt in with `data-fade`.
- **Assets** in `public/` are referenced through `asset()` so the Vite base URL is applied.

## Editing content

- Copy and section order: `src/App.tsx`
- Featured-work entries: the `Project` list in `src/App.tsx`; media files go in `public/videos/` and `public/images/video-covers/`
- Carousel slides: `public/images/legal-center/` and the captions in `src/PhoneSlideshow.tsx`
- Résumé: replace `public/documents/morgan-parker-resume.pdf`
- Colors, fonts, breakpoints: the `@theme` block in `src/index.css`
- Page title, description, link-preview image: `index.html`

Images are stored as WebP. To convert new ones from the terminal:

```sh
nix shell nixpkgs#libwebp --command cwebp -q 85 input.png -o output.webp
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which installs dependencies with a frozen lockfile, runs lint and build, and publishes `dist/` to GitHub Pages. The custom domain is configured in the repository's Pages settings, with DNS at Namecheap pointing to GitHub's Pages addresses.

If you add or remove a dependency, use `pnpm add` or `pnpm remove` so `pnpm-lock.yaml` changes with it; otherwise the frozen-lockfile install in CI fails.
