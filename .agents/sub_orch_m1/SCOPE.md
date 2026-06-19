# Scope: Milestone 1 — Scaffolding & Shared Components

## Architecture
- Setup scroll animation component `<Reveal />` under `components/ui/Reveal.tsx`.
- Review existing `<MediaSlot />` under `components/ui/MediaSlot.tsx` to ensure it follows the mesh-gradient and Lucide-icon requirements from `RULES.md`.
- Verify app shell layouts (`components/layout/Header.tsx`, `components/layout/Footer.tsx`) to make sure all hardcoded text is eliminated and translated using next-intl.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1.1 | Implement `<Reveal />` component | Create the scroll animation component using `framer-motion` with `prefers-reduced-motion` handling. | None | DONE |
| 1.2 | Audit existing components | Check `MediaSlot`, `Header`, and `Footer` for i18n rules compliance. | 1.1 | DONE |

## Interface Contracts
### `<Reveal />`
- Props: `children: React.ReactNode`, `className?: string`, `delay?: number`, `direction?: 'up' | 'down' | 'left' | 'right' | 'none'`
- Behavior: Uses Framer Motion to fade and slide in content when it is in view. Must check media query `(prefers-reduced-motion: reduce)` to disable animation and just do a simple opacity fade (or immediate rendering) to comply with RULES.md.
