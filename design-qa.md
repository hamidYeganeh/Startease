# OneFin visual QA

final result: passed

## Follow-up: browser comments 1 and 2

The user's 683 px captures exposed two P2 issues missed by the first pass: discontinuous investment variants and download content frozen in off-screen entrance positions. Both are resolved.

- Investment cards now interpolate position, perspective depth, rotation and opacity from continuous scroll progress. Flex alignment no longer switches between variants. A short frame-rate-independent settling filter smooths wheel input and stops requesting frames at rest. Browser samples at scrollY 12855, 12941 and 13084 produced progress 0.4427, 0.7543 and 1.2723, with distinct intermediate transforms. Returning to 12941 returned progress to 0.7546. Desktop 1440 × 1000 was also checked. Evidence: `docs/visual-qa/investments-between.png`.
- The download section now runs its original entrance toward the measured centered endpoints for all three text lines, the phone, logo and social icons. At 390 px, the large composition scales to fit; Confidence measures x=16.17 to 373.84 and is fully within the viewport.
- The skip link now hides relative to its own height and appears only with keyboard focus.
- Fresh source and implementation captures at **683 × 750 CSS px, DPR 1, 683 × 750 screenshot pixels**, in the same tab with the CTA section aligned to the viewport top, were compared together. Source: `docs/visual-qa/source-cta-683.png`; implementation: `docs/visual-qa/local-cta-683.png`; combined full-view and focused composition evidence: `docs/visual-qa/cta-683-comparison.png`. No density normalization was needed. The settled typography, spacing, palette, original media and copy match; the reference's floating promotional badges remain intentionally omitted.
- ESLint and `next build --webpack`, including TypeScript/static prerendering, passed after these changes.

Follow-up final result: passed.

## Targets and evidence

Source: https://onefin.framer.website/, homepage captured 2026-10-04.
Implementation: http://127.0.0.1:3000/.

| State | Source | Implementation | Combined comparison |
| --- | --- | --- | --- |
| Desktop hero, settled, scroll 0 | `docs/visual-qa/source-desktop.png` | `docs/visual-qa/local-desktop.png` | `docs/visual-qa/desktop-comparison.png` |
| Mobile hero, menu closed | `docs/visual-qa/source-mobile.png` | `docs/visual-qa/local-mobile.png` | `docs/visual-qa/mobile-comparison.png` |
| Mobile integrations, settled fan | Left half | Right half | `docs/visual-qa/integrations-comparison.png` |

Source is on the left in all combined images. Both artifacts were opened in the same browser tab and viewport, with the original font files loaded.

Desktop CSS viewport: 1440 × 1000; devicePixelRatio 1.7. Both raw screenshots are 1440 × 1000; the in-app browser captured the visible content at 847 × 588 with unused surrounding pixels. Both were identically cropped to 847 × 588, without unequal resizing. Hero height measured 1305.9006 CSS px in both implementations.

Mobile CSS viewport: 390 × 844; devicePixelRatio 1.7. Both raw captures are 390 × 844; visible regions were identically cropped to 230 × 497. Integrations measured 683.0055 CSS px high in both. The screenshots had different scroll offsets, so the section top was aligned before producing its 460 × 402 combined crop. These support visual comparison, not an unscaled 1:1 pixel-diff certification.

The integrations crop is the focused comparison for logo geometry, artwork crop, display wrapping and body text. Hero comparisons were examined closely for navbar alignment, heading weight and CTA sizing. Other sections were inspected while scrolling: benefits, about, statistics, spend/payment stages, investment cards, testimonials, pricing, blog, FAQ, download and footer.

## Findings and comparison history

1. **Resolved P1 — root geometry.** An initial wrapper constrained the layout. Source root classes and full-width geometry were restored, with semantic main using `display: contents`. Post-fix evidence: desktop/mobile comparisons.
2. **Resolved P2 — hero artwork angles.** Original card rotations were restored and retained in scroll transforms. Post-fix evidence: both hero comparisons.
3. **Resolved P2 — integration fan.** Original server markup overlapped the logos without runtime animation. Measured source transform endpoints now animate on intersection, including separate mobile offsets. Post-fix evidence: integrations comparison.
4. **Resolved P2 — mobile menu and icons.** Contact width, close-icon geometry and local SVG references corrected. Expanded menu and original store icons were checked in the browser.
5. **Resolved P2 — header after hot reload.** A mutable variant selector could lose the navbar reference. Stable component attributes and initial state synchronization restore the expanded header at scroll 0. Post-fix evidence: final desktop comparison.
6. **Resolved P2 — active numbers.** Spend/payment states now include the matching number. Smart Categorization was verified with number 2, its description and its video.

No actionable P0/P1/P2 mismatch remains in the compared states.

## Required fidelity surfaces

- **Fonts:** original local Roboto Condensed and Geist files, weights, line heights, tracking and breakpoints. Hero and integrations wrapping agree in compared captures.
- **Spacing/layout:** original section geometry, grids, radii, padding and sticky containers. Desktop hero and mobile integration heights agree. Navbar/contact alignment corrected.
- **Colors/tokens:** original palette, gradients, opacity, borders and shadows. Native selected states use the source colors.
- **Assets:** original source images, SVG paths, WebM clips, fonts and QR served locally. No generated replacements or substitute illustrations. Inspection found no completed broken images or remote image/video URLs.
- **Copy:** original homepage copy and pricing retained. Annual prices are $6.49/$12.49; monthly prices are $7.99/$14.99. Separate-page links retain source destinations.

## Interaction and technical checks

- Mobile menu opens/closes, includes full-width contact and exposes expanded state.
- Spend selection changes active number, description and video.
- Annual billing changes prices and switch state; keyboard activation verified.
- FAQ opens the selected answer and closes others; keyboard activation verified.
- Download dialog displays the original QR/store badges; close button verified, Escape handling and focus restoration implemented.
- Hero/about/payment/investment/testimonial scroll behavior, integration reveal and repeating strips implemented without Framer scripts.
- Reduced-motion rules disable continuous CSS animation and keep text readable.
- No implementation console errors observed. One retained browser error came from the reference's `framer.com/edit/init.mjs`; that script is absent here.
- ESLint passed. Webpack production compilation, TypeScript and prerendering passed. Default Turbopack build encountered the host's PostCSS process/port restriction.

## Expected differences and residual limits

- Framer's floating template-purchase/hosting widgets are omitted.
- Continuous media/ticker phases differ between captures. Native interpolation recreates observed motion; exact Framer spring physics and timing are not certified frame-by-frame (P3 refinement).
- Reference QR initially failed to display in-browser; its original asset is served locally and renders here.
- Direct screenshot comparison covered 1440 px desktop and 390 px mobile. Other widths use source responsive rules; every browser/viewport combination has not been exhaustively tested.
- Separate linked pages remain outside the homepage scope.

## Implementation checklist

- [x] Original local assets/fonts
- [x] Separate Next.js section components
- [x] Responsive layout and primary interactions
- [x] Combined matched-state comparisons
- [x] Post-fix evidence
- [x] Lint and production build
