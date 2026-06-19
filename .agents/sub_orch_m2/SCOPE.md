# Scope: Milestone 2 — Core Page Assembly

## Architecture
This milestone covers the conversion of raw HTML prototype files for the core landing and corporate pages into Next.js Server Components.
All components must adhere strictly to the design rules in `RULES.md` and `TOKENS.md`:
- Pure `next-intl` localization: no hardcoded strings in components, extracting them into namespaces in `messages/de.json`.
- Modern Academic Glassmorphism styling (rounded corners, slate/white theme with elegant hellblau accents, glass shadow panels).
- Absolute image ban: render the custom `<MediaSlot />` helper for all image frames.
- Scroll reveals wrapped in `<Reveal />`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 2.1 | Home Page (`app/[locale]/page.tsx`) | Translate `Home.dc.html` including hero, statistics, Leistungen summary, nexus ecosystem, and 3D-BIM section. | None | PLANNED |
| 2.2 | Unternehmen Page (`app/[locale]/unternehmen/page.tsx`) | Translate `Unternehmen.dc.html` detailing corporate hierarchy, the "Symbiose der Giganten", and ESG goals. | 2.1 | PLANNED |
| 2.3 | Leistungen Page (`app/[locale]/leistungen/page.tsx`) | Translate `Leistungen.dc.html` showing Generalunternehmer details, TGA-Brandschutz, and Innenausbau. | 2.2 | PLANNED |
| 2.4 | Referenzen Page (`app/[locale]/referenzen/page.tsx`) | Translate `Referenzen.dc.html` with references grid (Villa Raab, EWS Frankfurt, etc.). | 2.3 | PLANNED |

## Interface Contracts
- Pages export default server component functions:
  - `export default async function Page({ params }: { params: { locale: string } })` (Note: for Next.js 16/15, params is a promise: `const { locale } = await params;`).
- Translation keys:
  - Extracted to namespaces in `/Users/umurey/Downloads/RSM/messages/de.json`: `Home`, `Unternehmen`, `Leistungen`, `Referenzen`.
- Stylings:
  - Tailwind v4 classes only. No inline `style="..."` attributes.
