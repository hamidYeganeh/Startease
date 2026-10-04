# Startease

A Persian/English agency website for Startease, built with Next.js 16 App Router and React 19.

## Run

```sh
npm ci
npm run dev
```

The root redirects to `/fa`. English is at `/en`. Production checks:

```sh
npm run lint
node --test scripts/verify-inquiry.mjs
npm run build -- --webpack
npm start
```

## Branches

- `main`: preserved original OneFin landing page.
- `codex/landing-backup`: the same original snapshot.
- `codex/saas-agency`: bilingual Startease redesign.

## Projects and team

Edit `lib/content.ts`. Adding an item to `projects` automatically creates its portfolio card, filter count, and detail pages in both languages. Put project screenshots under `public/projects/`. Current projects are the owner-supplied Gym4me and Take Me to Iran (TMTI). Their screenshots were captured from their public websites; descriptions reflect the publicly visible features. No business results, customer endorsements, or delivery metrics are invented.

Add approved team members to the `team` array and portraits under `public/team/`:

```ts
{
  name: { fa: 'نام واقعی عضو', en: 'Member name' },
  role: { fa: 'نقش واقعی', en: 'Role' },
  bio: { fa: 'معرفی کوتاه', en: 'Short introduction' },
  image: '/team/member.jpg',
  url: 'https://example.com/profile', // optional
}
```

Cards support an arbitrary number of members and crop portraits consistently. Without approved member details, the team section shows three anonymous portrait placeholders with collaboration principles, not fictional employee profiles.

## Contact

The default contact is `hamidyeganeh82@gmail.com`, supplied by the owner. The form validates inputs, prepares a project brief, and opens the visitor's email application. The visitor must send the email there. It does **not** claim an email has been sent. The prepared brief can also be downloaded as UTF-8 text.

Optional server delivery is implemented in `app/api/inquiry/route.ts`. To enable it, configure these variables before building:

- `INQUIRY_WEBHOOK_URL`: an HTTPS endpoint you control that accepts JSON and returns a successful HTTP status only after accepting the inquiry.
- `INQUIRY_WEBHOOK_TOKEN`: optional bearer token for that endpoint; server-only.
- `CONTACT_EMAIL`: optional override for the displayed address and mailto fallback.
- `SITE_URL`: the final public site origin (e.g. `https://your-domain.com`), used for canonical URLs, language alternatives, and project social previews. No unverified Startease domain is hard-coded.

The webhook payload contains `source`, `name`, `email`, `service`, `message`, `budget`, and `locale`. Configure provider-side rate limits and spam protection for a public webhook deployment. The handler enforces origin, body size, field validation, honeypot validation, an eight-second delivery timeout, and no redirects. It does not log inquiry contents. It reports delivery failures instead of showing a false success message. No webhook credentials or service have been configured in this repository.

## Design and assets

The new design keeps the lavender/purple direction of the original while focusing on project work, services, collaboration, and inquiries. The hero mark and service illustrations are SVG/CSS. All runtime fonts and project images are local. Persian uses Vazirmatn (license in `public/fonts/OFL-Vazirmatn.txt`); Latin typography reuses the original project's local Geist font.

Mobbin was used for layout research, not as a source of client work or portfolio images:

- [Instrument: selected work](https://mobbin.com/sites/sections/05811dd7-a07a-41ae-9fa7-192b8eede1b1)
- [Wild: project previews](https://mobbin.com/sites/sections/c18cb634-beea-4af7-8d3a-08211610a68b)
- [Analogue Agency: people](https://mobbin.com/sites/sections/1d822f31-3963-417c-afeb-3c5deb144cfc)

`docs/agency-qa/` contains desktop/mobile screenshots of the redesign. `docs/visual-qa/`, `components/onefin/`, and `app/reference.css` document the preserved original and are not imported into the new landing page.
