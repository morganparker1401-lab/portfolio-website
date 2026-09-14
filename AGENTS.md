# Morgan Parker portfolio

Single-page portfolio site. Vite + React 19 + TypeScript, Tailwind CSS v4, Motion for animation, Bodoni Moda bundled via @fontsource. Deployed to GitHub Pages at https://morgan-parker.net by `.github/workflows/deploy.yml` on every push to `main`.

## Commands

```sh
pnpm install --frozen-lockfile   # Node 24, pnpm 11 (see .nvmrc / packageManager)
pnpm dev                         # local preview
pnpm lint                        # oxlint
pnpm build                       # tsc -b && vite build -> dist/
pnpm preview                     # serve dist/
```

The CI workflow runs lint and build with a frozen lockfile. If you add or remove a dependency, do it with `pnpm add` / `pnpm remove` so `pnpm-lock.yaml` is updated in the same change, otherwise the deploy fails.

## Where things live

- `src/App.tsx`: page content and section order, plus the IntersectionObserver that fades text in.
- `src/ui.tsx`: shared building blocks: `Screen` (one viewport-tall snap stop), `ScrollSection` (fading full-height section), `Eyebrow`, `SectionHeading`, `TextLink`, and the shared `H2` class string.
- `src/SiteHeader.tsx`: sticky header. Inline links from 761px up, wordmark plus menu button below.
- `src/Project.tsx`: `Project` (one featured-work entry) and its media panels (`MediaPanel`, `PortraitVideo`, `LandscapeVideo`).
- `src/PhoneSlideshow.tsx`: Legal Center Live carousel.
- `src/site.ts`: `navLinks` and the `asset()` helper. Always reference files in `public/` through `asset()` so the Vite base URL is applied.
- `src/index.css`: the Tailwind theme (colors, fonts, breakpoints, `--spacing-fold`) and the small set of global rules utilities cannot express (scroll snapping on `html`, focus ring, selection, the JS-toggled fade classes).
- `index.html`: title, description, favicon link, canonical URL, Open Graph and Twitter tags.
- `public/images/`: WebP only, plus `og-image.jpg` (1200x630 JPEG kept for link previews). `public/videos/`: MP4. `public/documents/`: résumé PDF.
- `README.md`: human-facing overview. Keep its file list and hosting section accurate when structure changes.

## Styling rules

- Layout and typography are Tailwind utility classes on the elements. Do not add component classes to `index.css` for things utilities can express. Custom CSS is only for global behaviour and for classes that JavaScript toggles.
- Design tokens are in `@theme` in `index.css`. Use them by name: `text-red`, `bg-cream`, `text-muted`, `border-line`, `font-serif`, `text-body` (14px body size), `min-h-fold` (viewport height below the header).
- Breakpoints are the site's own, not Tailwind defaults: `sm` = 601px, `md` = 761px, `lg` = 901px, `xl` = 1600px. Phone is `max-sm:`, tablet is `sm:max-lg:`, desktop is `lg:`. `md` exists only for the header's menu-button switch.
- Exact pixel values from the design are kept as arbitrary values (`py-[100px]`, `text-[clamp(...)]`). Use the spacing scale only where it is exactly equal (4px steps).
- `--header-height` (76px, 68px on phones) is a plain CSS variable on `:root` and feeds both the snap stops' `scroll-margin-top` and `--spacing-fold`.
- When a shared component needs a different margin, tracking, or color per use, pass it via `className`; the base class strings deliberately leave those out to avoid two conflicting utilities on one element.

## Scroll behaviour

- `html` has `scroll-snap-type: y mandatory`. Every `ScrollSection` and `Screen` is `snap-start snap-always scroll-mt-(--header-height)` and at least `min-h-fold` tall, so each fills the viewport below the header.
- The header offset is `scroll-margin-top` on the snap stops, never `scroll-padding-top` on `html`. Firefox sizes the free-scroll range of an oversized section with scroll-padding subtracted but measures it from the unpadded box, so with scroll-padding it rests one header height past the section's bottom (seen in the September 2026 sweep). scroll-margin is exact in Firefox, Chromium and WebKit, and anchor links honour it too.
- Sections taller than the viewport (Featured work) rely on the CSS rule that a snap area larger than the snapport lets the user rest anywhere inside it and snap to its top or bottom edge. Do not add snap alignment to the projects inside it.
- The hero plus the red strip, and the contact section plus the footer, are grouped in a `Screen` so neither the strip nor the footer is skipped by snapping.
- Snapping is off below 601px and under `prefers-reduced-motion`. Keep it that way unless the owner asks.
- `scroll-behavior: smooth` also drives the anchor links in the header.

## Correctness sweep

When asked to sweep the site, or after any non-trivial change, run through this list. It is what was done in the September 2026 sweep and caught real problems each time.

1. `pnpm lint && pnpm build` must pass clean. The build runs `tsc -b`, so type errors fail it.
2. Inspect the generated CSS in `dist/assets/*.css` for every arbitrary or unusual utility you introduced (`grep -F` the expected declaration). Tailwind silently drops classes it cannot parse. Also confirm the order of `max-*` variants: `max-lg` rules must appear before `max-md` before `max-sm` so phone overrides win.
3. Dependencies: every package in `package.json` must be imported somewhere. Remove unused ones with `pnpm remove`.
4. Assets: every file in `public/` must be referenced; delete orphans. Images are WebP at no more than 2x their largest display size; `width`/`height` attributes on `<img>` must match the file's real dimensions (`file` or `identify` prints them). Videos keep `preload="metadata"`.
5. `index.html`: favicon linked, description present, Open Graph and Twitter tags present with absolute URLs on https://morgan-parker.net.
6. Markup consistency: repeated structures must come from one component (projects, experience roles, eyebrows, text links). Counts and labels must derive from data, not be hard-coded next to it.
7. Accessibility: `aria-labelledby` on sections, `aria-expanded`/`aria-controls` on the menu button, Escape closes the menu and returns focus, skip link target is focusable, decorative arrows are `aria-hidden`, images have real alt text, hover-only styles are wrapped in `@media (hover: hover)` (Tailwind does this by default).
8. Responsive: reason through every rule at phone (<601), tablet (601 to 900) and desktop (901+) widths. Text with forced `<br>` breaks is a bug outside headlines; body copy must wrap naturally with a `max-w`.
9. Scroll: confirm each section is a full-height snap stop, that oversized sections can be scrolled through and rest exactly on their bottom edge (ask the owner to run `document.getElementById('about').getBoundingClientRect().top - innerHeight` at rest; it should be 0), and that anchor links land under the header. Test in Firefox as well as Chromium; their snap implementations differ.
10. Report findings to the owner with the question tool before applying anything that changes the design or removes something, with a recommended option listed first. Pure bug fixes can be applied directly and listed in the summary.

## Working agreements

- No headless browser or screenshot tooling in this environment. The owner does all visual checks in a real browser; ask them for a measurement or screenshot when you need one (they can paste a console snippet result).
- Do not commit or push unless asked. Enabling GitHub Pages or changing DNS is the owner's action.
- Image conversion is done from the terminal with Nix: `nix shell nixpkgs#libwebp nixpkgs#imagemagick --command ...` (`cwebp -q 85`, `magick` for resizing and crops).
- Analytics is deliberately not set up yet (shelved September 2026). Candidates evaluated: GoatCounter, Cloudflare Web Analytics, Umami Cloud. Any of them is a single script tag in `index.html`.
- The owner's copy (names, dates, wording, em dashes inside the body text) is content, not a style issue. Leave it unless asked.
