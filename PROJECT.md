# Project: RSM Systembau Next.js Design Relaunch

## Architecture
We are refactoring raw HTML files from `RSM Systembau Design-Relaunch/` into clean, fully-typed Next.js Server Components.
Key guidelines from `RULES.md`:
- Pure i18n using `next-intl` (no hardcoded text in components).
- Modern Academic Glassmorphism: rounded edges (`rounded-3xl`, `rounded-[2rem]`, `rounded-full`), soft background colors (`bg-slate-50`, `bg-gray-100`), elegant hellblau accent styling, floating glass panels with `backdrop-blur-2xl`.
- Absolute image ban: Use `<MediaSlot />` architecture for all images.
- Smooth scroll animations via `<Reveal />` wrapper supporting `prefers-reduced-motion`.
- TypeScript strict mode compliance and error-free Vercel build output.

## Code Layout
- `app/[locale]/page.tsx` - Home Route
- `app/[locale]/unternehmen/page.tsx` - Unternehmen Route
- `app/[locale]/leistungen/page.tsx` - Leistungen Route
- `app/[locale]/referenzen/page.tsx` - Referenzen Route
- `app/[locale]/karriere/page.tsx` - Karriere Route
- `app/[locale]/portal/page.tsx` - Portal Route
- `app/[locale]/impressum/page.tsx` - Impressum Route
- `components/ui/Reveal.tsx` - Scroll Reveal wrapper component
- `components/ui/MediaSlot.tsx` - Shared Media Slot component

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Scaffolding & Shared Components | Implement `<Reveal />` scroll animation component, audit/update existing `<MediaSlot />` and headers/footers for alignment with RULES.md. | None | DONE |
| 2 | Core Page Assembly | Translate Home, Unternehmen, Leistungen, and Referenzen HTML pages into Next.js pages under `app/[locale]/` with full translation extraction in `messages/de.json`. | M1 | DONE |
| 3 | Secondary Page Assembly | Translate Karriere, Portal, and Impressum HTML pages into Next.js pages under `app/[locale]/` with translation extraction. | M2 | DONE |
| 4 | Vercel Deployment Readiness | Fix all ESLint / TypeScript errors, optimize next.config.ts, and ensure `npm run build` succeeds completely. | M3 | DONE |

## Interface Contracts
### `<Reveal />`
- Props: `children: React.ReactNode`, `className?: string`, `delay?: number`, `direction?: 'up' | 'down' | 'left' | 'right' | 'none'`
- Behavior: Uses `framer-motion` to fade and slide in content on scroll via `whileInView`. Respects user's `prefers-reduced-motion` settings.

### `<MediaSlot />`
- Props: `label: string`, `className?: string`
- Behavior: Implements placeholder box with soft mesh gradient, zentriertem Text, and elegant hellblau Lucide icon.
