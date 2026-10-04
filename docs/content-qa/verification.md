# Restored-template verification

- `app/globals.css` and `app/reference.css` match the original `49fd342` snapshot exactly.
- Original OneFin section markup, layout data, and scroll scenes are reused.
- `npm run lint` passed.
- `npm run build -- --webpack` passed, including TypeScript and both locales.
- Browser checks: English and Persian at 390px, Persian at 320px and 1280px; no horizontal document overflow at mobile widths.
- Mobile menu opens/closes; contact dialog opens with the supplied email; language switching works; FAQ toggles its expanded state.
- Portfolio links point to Gym4me and Take Me to Iran. No broken loaded images were found. Footer destinations checked against their labels.
- Screenshots capture the restored Persian hero and portfolio. Inquiry delivery was not attempted; the form uses the visitor's email application.
