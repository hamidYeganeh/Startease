# OneFin · Next.js

Reconstruction of https://onefin.framer.website/ with Next.js App Router, React, original local media and native browser interactions.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production:

```sh
npm run build -- --webpack
npm start
```

Webpack was verified in this workspace. The default Turbopack production build encounters the host sandbox's process/port restriction while evaluating PostCSS.

## Structure

- `app/page.tsx`: homepage composition.
- `components/onefin/`: separate components for all homepage sections.
- `components/onefin/PageInteractions.tsx`: scroll effects, reveals, menu, videos, pricing, FAQ and download dialog.
- `components/onefin/scroll-scenes.ts`: continuous investment-card interpolation and the download composition's entrance sequence.
- `app/reference.css`: source presentation rules, breakpoints and local fonts.
- `app/globals.css`: native interaction states, animations and accessibility.
- `public/onefin/`: original images, SVG sprite, fonts and WebM clips.
- `docs/visual-qa/` and `design-qa.md`: captured comparisons and validation.

Only the homepage is implemented. Links to separate article, careers, contact and other source pages retain their original destinations. App-store links and QR retain the reference site's sample content.

`scripts/import-reference.cjs` is an optional one-time extraction utility, not a build/runtime dependency. It expects captured source HTML and downloaded assets as described in the script. Normal development and deployment require neither those temporary captures nor access to Framer.

## Verified

- `npm run lint`
- `npx next build --webpack` (including TypeScript)
- Desktop/mobile visual comparison and primary interactive states.
