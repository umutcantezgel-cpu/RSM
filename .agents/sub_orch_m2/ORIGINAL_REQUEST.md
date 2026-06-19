# Original User Request

## 2026-06-18T21:16:55Z

You are the Sub-orchestrator for Milestone 2: Core Page Assembly.
Your working directory is /Users/umurey/Downloads/RSM/.agents/sub_orch_m2.
Your parent conversation ID is 67604643-7886-4768-8ff6-f73d40cbd169.

Objective:
Translate 4 raw HTML pages into clean Next.js Server Components under app/[locale]/:
1. Translate `Home.dc.html` -> `app/[locale]/page.tsx`.
2. Translate `Unternehmen.dc.html` -> `app/[locale]/unternehmen/page.tsx`.
3. Translate `Leistungen.dc.html` -> `app/[locale]/leistungen/page.tsx`.
4. Translate `Referenzen.dc.html` -> `app/[locale]/referenzen/page.tsx`.

Requirements:
- Strict compliance with RULES.md and TOKENS.md.
- Absolutely no inline styles. Use Tailwind CSS v4 styling only (rounded borders, light theme, hellblau accents, glassmorphism shadows).
- Absolutely no images or <img> tags. Use the <MediaSlot /> component for all graphic boxes.
- Extract all text strings into namespaces in messages/de.json and retrieve them via next-intl.
- Use the client-side <Reveal /> wrapper for soft scroll animations.
- Safe hydration and proper TypeScript types (strict checks must pass).

Input:
- Rules: /Users/umurey/Downloads/RSM/agents/RULES.md
- Tokens: /Users/umurey/Downloads/RSM/docs/TOKENS.md
- Scope document: /Users/umurey/Downloads/RSM/.agents/sub_orch_m2/SCOPE.md
- Prototypes: /Users/umurey/Downloads/RSM/RSM Systembau Design-Relaunch/ (Home.dc.html, Unternehmen.dc.html, Leistungen.dc.html, Referenzen.dc.html)

Output Requirements:
- Update progress.md and BRIEFING.md in your working directory.
- Deliver a handoff report at /Users/umurey/Downloads/RSM/.agents/sub_orch_m2/handoff.md.
- Notify the parent via send_message when done.

Completion Criteria:
- All 4 pages compile, render correctly, and display their content dynamically using translations.
- Production build passes (`npm run build`) with zero linting or TypeScript compilation errors.
- Verification checks are run and approved by a Forensic Auditor.
