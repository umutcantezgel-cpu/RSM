# Original User Request

## Initial Request — 2026-06-18T14:47:55-07:00

You are the Sub-orchestrator for Milestone 3: Secondary Page Assembly.
Your working directory is /Users/umurey/Downloads/RSM/.agents/sub_orch_m3.
Your parent conversation ID is 67604643-7886-4768-8ff6-f73d40cbd169.

Objective:
Translate 3 raw HTML pages into clean Next.js Server Components under app/[locale]/:
1. Translate `Karriere.dc.html` -> `app/[locale]/karriere/page.tsx` (with interactive jobs and FAQs lists).
2. Translate `Portal.dc.html` -> `app/[locale]/portal/page.tsx` (with interactive login form and validation feedback).
3. Translate `Impressum.dc.html` -> `app/[locale]/impressum/page.tsx`.

Requirements:
- Strict compliance with RULES.md and TOKENS.md.
- Absolutely no inline styles. Use Tailwind CSS v4 styling only (rounded borders, light theme, hellblau accents, glassmorphism shadows).
- Absolutely no images or <img> tags. Use the <MediaSlot /> component.
- Extract all text strings into namespaces in messages/de.json and retrieve them via next-intl.
- Use the client-side <Reveal /> wrapper for soft scroll animations.
- Safe hydration and proper TypeScript types (strict checks must pass).

Input:
- Rules: /Users/umurey/Downloads/RSM/agents/RULES.md
- Tokens: /Users/umurey/Downloads/RSM/docs/TOKENS.md
- Scope document: /Users/umurey/Downloads/RSM/.agents/sub_orch_m3/SCOPE.md
- Prototypes: /Users/umurey/Downloads/RSM/RSM Systembau Design-Relaunch/ (Karriere.dc.html, Portal.dc.html, Impressum.dc.html)

Output Requirements:
- Update progress.md and BRIEFING.md in your working directory.
- Deliver a handoff report at /Users/umurey/Downloads/RSM/.agents/sub_orch_m3/handoff.md.
- Notify the parent via send_message when done.

Completion Criteria:
- All 3 pages compile, render correctly, and display their content dynamically using translations.
- Interactive controls (FAQs accordion, job accordion, login form validation) function properly on the client side with zero hydration mismatch warnings.
- Production build passes (`npm run build`) with zero linting or TypeScript compilation errors.
- Verification checks are run and approved by a Forensic Auditor.

## Follow-up — 2026-06-18T15:00:34-07:00

Resume work at /Users/umurey/Downloads/RSM/.agents/sub_orch_m3. Read handoff.md, BRIEFING.md, ORIGINAL_REQUEST.md, and progress.md for current state.
Your task is to verify that Milestone 3 is complete and notify the parent agent (conversation ID: 67604643-7886-4768-8ff6-f73d40cbd169) with the final handoff details.
Your parent is 67604643-7886-4768-8ff6-f73d40cbd169 — use this ID for all status reporting (send_message).
- Verification checks are run and approved by a Forensic Auditor.
