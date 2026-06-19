# BRIEFING — 2026-06-18T21:55:00Z

## Mission
Verify the implementation, styling compliance, types, next-intl integration, and layout structure of the newly implemented Karriere, Portal, and Impressum pages/components.

## 🔒 My Identity
- Archetype: reviewer
- Roles: reviewer, critic
- Working directory: /Users/umurey/Downloads/RSM/.agents/reviewer_m3_1
- Original parent: 90b0f287-f1bd-451e-b895-85a2f89d151c
- Milestone: Milestone 3
- Instance: 1 of 1

## 🔒 Key Constraints
- Review-only — do NOT modify implementation code
- Pure next-intl integration (absolutely no user-visible strings hardcoded in JSX)
- Conformance with RULES.md and TOKENS.md (no inline styles, Tailwind v4, no excessive rounded corners, no hellblau/cyan accents, no glassmorphism/shadows)
- Accessible touch target spacing (min-h-[44px] for interactive elements) and proper outlines/focus states
- Correct use of <Reveal /> and <MediaSlot /> component (strictly no <img> tags)
- Compile successfully via `npm run build` and `npm run lint` without any warnings/errors

## Current Parent
- Conversation ID: 90b0f287-f1bd-451e-b895-85a2f89d151c
- Updated: 2026-06-18T21:55:00Z

## Review Scope
- **Files to review**:
  - `app/[locale]/karriere/page.tsx`
  - `app/[locale]/portal/page.tsx`
  - `app/[locale]/impressum/page.tsx`
  - `components/karriere/HRJobSection.tsx`
  - `components/karriere/HRJobAccordionItem.tsx`
  - `components/karriere/FAQAccordion.tsx`
  - `components/karriere/FAQAccordionItem.tsx`
  - `components/portal/LoginForm.tsx`
  - `messages/de.json`
- **Interface contracts**: PROJECT.md, RULES.md, TOKENS.md
- **Review criteria**: correctness, styling, typescript types, next-intl integration, touch targets, Reveal/MediaSlot usage, build/lint compliance

## Key Decisions Made
- Concluded the review with a verdict of REQUEST_CHANGES.
- Identified violations of TOKENS.md (hardcoded hex colors, invalid slate-650/slate-450 text classes, non-standard fractional spacing classes `w-8.5`/`w-4.5`/`h-4.5`).
- Identified violations of Rule 5 of RULES.md (under-sized touch targets for checkbox label and forgot password link in `LoginForm.tsx`).

## Artifact Index
- `/Users/umurey/Downloads/RSM/.agents/reviewer_m3_1/handoff.md` — Handoff and Review Report

## Review Checklist
- **Items reviewed**: All requested pages and components
- **Verdict**: REQUEST_CHANGES
- **Unverified claims**: Production code compiles successfully, but tests in the workspace (`components/ui/__tests__/*`) fail to build/lint.

## Attack Surface
- **Hypotheses tested**: Checked for invalid/no-op Tailwind CSS classes, accessibility touch target heights, and checked for hardcoded strings.
- **Vulnerabilities found**: Invalid color classes (`text-slate-650`, `text-slate-450`) and width/height classes (`w-8.5`, `w-4.5`, `h-4.5`) resulting in styling loss in production. Non-compliant touch targets (<44px) on form elements.
- **Untested angles**: API integrations or backend responses.
