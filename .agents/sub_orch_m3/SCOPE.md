# Scope: Milestone 3 — Secondary Page Assembly

## Architecture
Translate the remaining HTML prototype files into Next.js Server Components under `app/[locale]/` with strict compliance to `RULES.md` and `TOKENS.md`:
- Pure `next-intl` localization: no hardcoded strings in components. Extract all texts into namespaces under `messages/de.json`.
- Modern Academic Glassmorphism styling (rounded corners, slate/white background, hellblau accents, glassmorphism shadows).
- Absolute image ban: render `<MediaSlot />` for any visual boxes.
- Animation wrappers: use `<Reveal />` for scrolling fades/reveals.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 3.1 | Karriere Page (`app/[locale]/karriere/page.tsx`) | Translate `Karriere.dc.html` detailing jobs list, accordion click behaviors (interactive accordion client components), FAQs, and HR application pathways. | None | DONE |
| 3.2 | Portal Page (`app/[locale]/portal/page.tsx`) | Translate `Portal.dc.html` detailing a high-security zero-trust portal login form, including client-side form validation and feedback state. | 3.1 | DONE |
| 3.3 | Impressum Page (`app/[locale]/impressum/page.tsx`) | Translate `Impressum.dc.html` including corporate layout blocks for legal entities, regulatory Kammer registration, and copyright notices. | 3.2 | DONE |

## Interface Contracts
- Pages export default server component functions:
  - `export default async function Page({ params }: { params: { locale: string } })` (with Promise-based params).
- Client component isolation:
  - Portal login form interactive logic must live in a client component under `components/portal/LoginForm.tsx` or similar.
  - Karriere job items and FAQs interactive logic must live in client component wrappers like `components/karriere/HRJobSection.tsx` or similar.
- Localization:
  - Add namespaces: `Karriere`, `Portal`, `Impressum` to `messages/de.json`.
- Stylings:
  - Tailwind v4 classes only. No inline styles.
