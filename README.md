# Startease

Bilingual SaaS agency content in the original OneFin landing page. The original section structure, layout, colors, responsive breakpoints, and scroll scenes are retained. Persian is at `/fa`; English is at `/en`.

## Development

```sh
npm ci
npm run dev
npm run lint
npm run build -- --webpack
```

## Branches

- `main` and `codex/landing-backup`: original OneFin snapshot (`49fd342`).
- `codex/saas-agency`: original presentation with Startease content. The earlier redesign is superseded.

## Content and images

- `lib/onefin-content.json`: Persian and English copy keyed by original section/text.
- `lib/adapt-onefin.tsx`: adapts content, image slots, and links while retaining the original component trees.
- `components/onefin/`: original section markup and interactions.
- `app/reference.css` and `app/globals.css`: original presentation styles, unchanged from the backup.
- `app/agency-content.css`: Persian typography, language control, inquiry dialog styles, and card entrance behavior.
- `public/agency-content/`: conceptual product/design/development illustrations for the existing image slots.
- `public/projects/`: screenshots of the owner-supplied Gym4me and Take Me to Iran websites.

The portfolio reuses the original four-card layout for Gym4me, TMTI, a second Gym4me product view, and a future collaboration slot. Change the Blog entries, image mappings, and destinations in the content files when another project is ready. Existing `/[lang]/work/[slug]` URLs redirect to the actual project website.

The original testimonial cards now introduce the team's work and approach, without invented testimonials, employee identities, or results. To add portraits, place approved images under `public/team/` and set the three paths in `lib/team-portraits.ts`. Replace the corresponding role/name/description entries in the Testimonials copy with approved member details. Portraits retain the original card image frames.

## Contact

Contact buttons open a project brief dialog addressed to `hamidyeganeh82@gmail.com`. It validates the form and opens the visitor's email application with the prepared brief; the visitor sends it there. It does not claim delivery. The brief can also be downloaded as text. The landing currently uses email mode; the optional webhook API from the earlier version is not connected or configured.

Set `SITE_URL` to the final public origin when deploying to enable canonical URLs and language alternatives. Runtime fonts and images are local. The Vazirmatn license is in `public/fonts/OFL-Vazirmatn.txt`.

## Visual references

Mobbin research informed the earlier iteration: [Instrument](https://mobbin.com/sites/sections/05811dd7-a07a-41ae-9fa7-192b8eede1b1), [Wild](https://mobbin.com/sites/sections/c18cb634-beea-4af7-8d3a-08211610a68b), and [Analogue Agency](https://mobbin.com/sites/sections/1d822f31-3963-417c-afeb-3c5deb144cfc). The final direction follows the owner's correction to preserve the original design and change its content.

`docs/content-qa/` contains the restored presentation. `docs/agency-qa/` records the superseded redesign; `docs/visual-qa/` records the original reference.
