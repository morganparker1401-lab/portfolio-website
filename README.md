# Morgan Parker — Portfolio

Private review handoff, September 13, 2026. Nothing has been published. This ZIP contains the editable website source and all media, including Morgan’s latest résumé. Please review locally; coordinate with Morgan before publishing.

## Start a local review

Install Node.js 24, then open a terminal in this extracted folder (the one containing package.json).

If pnpm is not installed:

```sh
npm install -g pnpm@11.19.0
```

Then:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local address printed by Vite. The preview runs only while the terminal is running; Ctrl+C stops it. Do not double-click index.html: this source requires the Vite server. Initial dependency installation needs an internet connection. No API keys, Adobe subscription, or backend setup is required.

## Review and edit

- `src/App.tsx`: page content, section order, and the text fade-in behavior.
- `src/ui.tsx`: shared pieces (`Screen`, `ScrollSection`, `Eyebrow`, `SectionHeading`, `TextLink`).
- `src/SiteHeader.tsx`: sticky header, inline links on wider screens, menu button below 761px.
- `src/Project.tsx`: featured-work entry and its media panels.
- `src/PhoneSlideshow.tsx`: Legal Center Live phone carousel.
- `src/site.ts`: navigation links and the `asset()` helper for files in `public/`.
- `src/index.css`: design tokens (colors, fonts, breakpoints) and the global scroll behavior. Layout and typography are Tailwind utility classes in the components.
- `src/main.tsx`: app entry and locally bundled Bodoni Moda font imports.
- `public/images/`: portrait, graphics, carousel slides, and video cover images (WebP), plus `og-image.jpg` for link previews.
- `public/videos/`: three MP4 projects with optimized startup metadata.
- `public/documents/morgan-parker-resume.pdf`: current résumé download.
- `index.html`: page title, description, favicon, and social preview tags.

Breakpoints: phone below 601px, tablet 601 to 900px, desktop 901px and up. Scroll snapping is on from 601px up and off for reduced-motion users.

Page order: Home → Brand Storytelling → Featured Work → About Me → Experience and Skills → Contact.

Featured work order: General Advertising → Legal Center Live → Less Than Two Weeks → Email Header → Tyler Florence.

Stack: Vite, React, TypeScript, Tailwind CSS, Motion, and Bodoni Moda. Fonts are served with the site. Dependencies and their versions are recorded in package.json and pnpm-lock.yaml.

Check desktop and mobile spacing, video controls and sound, carousel navigation, fade animations, contact links, and résumé download.

## Validate the latest changes

```sh
pnpm lint
pnpm build
pnpm preview
```

The build creates `dist/`. `pnpm preview` serves that production build locally; it is not a production web server.

## Hosting

The site is a static build deployed by GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages on every push to `main`, served at https://morgan-parker.net. The workflow runs `pnpm lint` and `pnpm build` and publishes `dist/`. Keep the source folder to make future changes; pushing to `main` rebuilds and redeploys automatically.
