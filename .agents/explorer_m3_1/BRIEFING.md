# BRIEFING — 2026-06-18T14:50:00-07:00

## Mission
Analyze the prototype `RSM Systembau Design-Relaunch/Karriere.dc.html` and design a precise translation plan for it under `app/[locale]/karriere/page.tsx`.

## 🔒 My Identity
- Archetype: explorer
- Roles: Read-only investigator, analyzer
- Working directory: /Users/umurey/Downloads/RSM/.agents/explorer_m3_1
- Original parent: 90b0f287-f1bd-451e-b895-85a2f89d151c
- Milestone: Karriere Page Translation Plan

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Analyze exact styling, MediaSlot, Reveal, and dynamic content guidelines
- Draft next-intl translation namespace `Karriere` for `messages/de.json`
- Design interface/structure for `components/karriere/HRJobSection.tsx` and `components/karriere/FAQAccordion.tsx` (with client isolation)
- Outline Tailwind CSS v4 classes for styling following "Modern Academic Glassmorphism"

## Current Parent
- Conversation ID: 90b0f287-f1bd-451e-b895-85a2f89d151c
- Updated: 2026-06-18T14:55:00-07:00

## Investigation State
- **Explored paths**:
  - `agents/RULES.md` — Visual guidelines and rules.
  - `docs/TOKENS.md` — Tailwind CSS v4 design tokens.
  - `RSM Systembau Design-Relaunch/Karriere.dc.html` — Original carrier/job page prototype.
  - `messages/de.json` — Existing i18n dictionary.
  - `app/[locale]/layout.tsx`, `app/[locale]/unternehmen/page.tsx` — Layout and page integration reference.
  - `components/ui/Reveal.tsx` and `components/ui/MediaSlot.tsx` — Base component functionality.
- **Key findings**:
  - Prototype specifies single-select accordion behaviors for job lists and FAQ items.
  - Next.js 16 requires asynchronous resolution of parameter object `params: Promise<{ locale: string }>`.
  - Next-intl dictionary supports array structures.
  - Client component boundaries are best placed at individual card/accordion item levels rather than section/page level.
- **Unexplored areas**:
  - Real integration under `app/[locale]/karriere/page.tsx` (delegated to implementation agent).

## Key Decisions Made
- Mapped all inline styles from `Karriere.dc.html` to compliant Tailwind CSS v4 utilities.
- Placed interactive boundaries at `HRJobAccordionItem` and `FAQAccordionItem` client components to keep the main sections server-side.
- Extracted and structured the `Karriere` next-intl namespace translation keys.
- Structured animations to conditionally disable motions on `prefers-reduced-motion` using Framer Motion's `useReducedMotion()`.

## Artifact Index
- `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_messages_de_addition.json` — JSON fragment containing the new translation namespace.
- `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_page.tsx` — Translation of the prototype page.
- `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_HRJobSection.tsx` — Server component section for open job roles.
- `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_HRJobAccordionItem.tsx` — Client component accordion item for job description toggle.
- `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_FAQAccordion.tsx` — Server component section for FAQ block.
- `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/proposed_FAQAccordionItem.tsx` — Client component accordion item for FAQ question toggle.
- `/Users/umurey/Downloads/RSM/.agents/explorer_m3_1/handoff.md` — Handoff report.
