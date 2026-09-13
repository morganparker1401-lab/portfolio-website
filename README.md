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

- `src/App.tsx`: page content, navigation, project order, and section animations.
- `src/index.css`: styles and responsive layouts. Later rules include the refinements made during design.
- `src/PhoneSlideshow.tsx`: Legal Center Live phone carousel.
- `src/main.tsx`: app entry and locally bundled Bodoni Moda font imports.
- `public/images/`: portrait, graphics, carousel slides, and video cover images.
- `public/videos/`: three MP4 projects with optimized startup metadata.
- `public/documents/morgan-parker-resume.pdf`: current résumé download.
- `index.html`: page title and description.

Page order: Home → Brand Storytelling → Featured Work → About Me → Experience and Skills → Contact.

Featured work order: General Advertising → Legal Center Live → Less Than Two Weeks → Email Header → Tyler Florence.

Stack: Vite, React, TypeScript, Tailwind CSS, Motion, and Bodoni Moda. Fonts are served with the site. Dependencies and their versions are recorded in package.json and pnpm-lock.yaml.

Check desktop and mobile spacing, video controls and sound, carousel navigation, fade animations, contact links, and résumé download. Earlier Chromium checks confirmed playback, carousel controls, download, and narrow layouts; later visual adjustments should receive a final review. Automated WebKit testing could not run because its test engine crashed, so Safari still needs manual review.

## Validate the latest changes

```sh
pnpm lint
pnpm build
pnpm preview
```

The build creates `dist/`. `pnpm preview` serves that production build locally; it is not a production web server.

## Future hosting (after Morgan approves)

This is a static site. Host the contents of `dist/` on a static website host. Relative asset paths are configured in vite.config.ts. No publishing or deployment is performed by the commands above. Keep the source folder to make future changes, then rebuild after edits.

The ZIP excludes node_modules, build output, local environment files, and Git history. Please return edited source or a Git branch so future changes can be reconciled with Morgan’s working copy.
