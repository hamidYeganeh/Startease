# Startease redesign verification

Checked on 2026-10-04.

- Persian and English homepages render with `lang=fa, dir=rtl` and `lang=en, dir=ltr` respectively.
- The root redirects to `/fa`.
- All six localized homepage/project routes are prerendered successfully.
- Browser checks covered 320px, 390px, 768px, and desktop layout. Mobile and tablet checks found no horizontal overflow after correcting project-card minimum sizing.
- Both real project screenshots load. Project filters show only the matching project and restore both with All work.
- Gym4me's project link opens its detail page; language switching retains the same project path; its outbound link points to the supplied site.
- The mobile menu opens, closes after navigation, and updates `aria-expanded`.
- FAQ disclosure expands and shows its answer.
- Required name/email/message fields reject an empty form and accept valid sample input.
- The contact address is the owner's supplied Gmail address. No test inquiry was sent. Default delivery opens the visitor's email application; direct server delivery is optional and unconfigured.
- Five isolated inquiry-handler tests verify input boundaries, origin checks, payload limits, missing delivery configuration, valid delivery payloads, Persian fields, and upstream failures. Network delivery is mocked.
- ESLint, production build (including TypeScript), and `git diff --check` pass.
- Browser error log contained no errors during the final check.

`fa-desktop.png`, `en-desktop.png`, `fa-mobile.png`, and `en-mobile.png` show the final landing page. `work-desktop.png` shows the real project cards.

Team portraits and approved names are intentionally pending. Anonymous illustration cards are ready to be replaced through the `team` data in `lib/content.ts`. The final public domain is also pending; set `SITE_URL` before production deployment to emit canonical and alternate-language metadata and absolute social previews.
