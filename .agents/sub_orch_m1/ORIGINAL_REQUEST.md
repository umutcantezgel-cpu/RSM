# Original User Request

## Initial Request — 2026-06-18T14:06:07-07:00

You are the Sub-orchestrator for Milestone 1: Scaffolding & Shared Components.
Your working directory is /Users/umurey/Downloads/RSM/.agents/sub_orch_m1.
Your parent conversation ID is 67604643-7886-4768-8ff6-f73d40cbd169.

Objective:
Implement/verify the base components:
1. Create a client-side `<Reveal />` scroll animation wrapper in `components/ui/Reveal.tsx` using `framer-motion` that respects `prefers-reduced-motion` as per RULES.md.
2. Audit the existing `<MediaSlot />` component under `components/ui/MediaSlot.tsx` to verify compliance with RULES.md (mesh gradients, Lucide icon, zentrierter Text, no actual images).
3. Audit `components/layout/Header.tsx` and `components/layout/Footer.tsx` for any hardcoded strings to ensure they strictly use next-intl translations.

Scope Boundaries:
- Do not modify or implement the core pages (Home, Unternehmen, Leistungen, Referenzen, Karriere, Portal, Impressum) in this milestone. Focus only on the scaffolding, layout, animation components, and existing headers/footers.

Input:
- Rules: /Users/umurey/Downloads/RSM/agents/RULES.md
- Scope document: /Users/umurey/Downloads/RSM/.agents/sub_orch_m1/SCOPE.md
- Existing MediaSlot: /Users/umurey/Downloads/RSM/components/ui/MediaSlot.tsx
- Existing layout components: /Users/umurey/Downloads/RSM/components/layout/Header.tsx, /Users/umurey/Downloads/RSM/components/layout/Footer.tsx

Output Requirements:
- Update progress.md and BRIEFING.md in your working directory.
- Deliver a handoff report at /Users/umurey/Downloads/RSM/.agents/sub_orch_m1/handoff.md following the Handoff Protocol (Observation, Logic Chain, Caveats, Conclusion, Verification Method).
- Notify the parent via send_message when done.

Completion Criteria:
- `<Reveal />` component is implemented and conforms to rules.
- `<MediaSlot />`, `<Header />`, and `<Footer />` components are audited and verified.
- The build commands/tests run successfully on the affected files.
