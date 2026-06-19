## 2026-06-18T21:08:25Z
You are the Worker for Milestone 1: Scaffolding & Shared Components.
Your working directory is `/Users/umurey/Downloads/RSM/.agents/worker_m1`.

Objective:
Implement and verify all base component requirements for Milestone 1.

Tasks:
1. Implement `<Reveal />` in `components/ui/Reveal.tsx` exactly as designed by the Explorers. Use `framer-motion` (v12.40.0), client-side (`"use client"`), strict types, zero JSX literals, and respect `prefers-reduced-motion` with a hydration-safe post-mount activation (using `useState`/`useEffect` hooks).
2. Audit `components/ui/MediaSlot.tsx`. Wrap the placeholder text brackets in JSX braces (e.g., `{[ PLATZHALTER: ${label} ]}`) to satisfy `react/jsx-no-literals` and ensure compliance with all design rules.
3. Remove all hardcoded strings in layout components and integrate `next-intl` translations:
   - In `components/layout/Header.tsx`: Replace hardcoded logo text ("R", "RT HOLDING", "GROUP") with translation keys from the `Header` namespace.
   - In `components/layout/Footer.tsx`: Replace hardcoded logo text ("R") and navigation link labels ("Start", "Unternehmen", etc.) with translation keys. You can load both the `Header` and `Footer` translation namespaces.
   - In `messages/de.json`: Add corresponding translations:
     - Under `Header`: add `"brand_logo_symbol": "R"`, `"brand_holding_name": "RT HOLDING"`, and `"brand_holding_sub": "GROUP"`.
     - Under `Footer`: add `"brand_logo_symbol": "R"`.
4. Ensure TypeScript strict mode compiles perfectly.
5. Run the build (`npm run build`) and lint (`npm run lint` or `npx eslint`) commands to make sure that there are no type errors, ESLint errors, or build errors.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Output Requirements:
- Write your changes and handoff report to `/Users/umurey/Downloads/RSM/.agents/worker_m1/changes.md` and `/Users/umurey/Downloads/RSM/.agents/worker_m1/handoff.md`.
- Report back with a message containing build/lint outputs and exact modifications.
