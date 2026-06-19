## 2026-06-18T21:06:51Z
You are Explorer 2.
Objective:
Explore the project to design the `<Reveal />` scroll animation component at `components/ui/Reveal.tsx` using `framer-motion`.
Specifically:
1. Verify if `framer-motion` is installed and check its version.
2. Explore how `useReducedMotion` or other hooks from `framer-motion` are used, or how they should be used to disable layout/motion animations when `prefers-reduced-motion: reduce` is active.
3. Design the interface (props and types) for `<Reveal />` as specified in `SCOPE.md` (props: `children: React.ReactNode`, `className?: string`, `delay?: number`, `direction?: 'up' | 'down' | 'left' | 'right' | 'none'`).
4. Detail the animation variants for each direction. When `prefers-reduced-motion` is active, it must degrade gracefully (e.g., immediate fade-in without movement or immediate render).
5. Ensure the component is client-side (`"use-client"`).
6. Verify compliance with `RULES.md` and check if there are any style or ESLint rules that need to be met (like no JSX literals, strict TypeScript).
7. Do NOT write any code or edit any source files (your role is read-only exploration).

Scope Boundaries:
- Do not modify or implement the core pages. Do not write or edit any source code files.

Input Information:
- Project rules: `/Users/umurey/Downloads/RSM/agents/RULES.md`
- Scope document: `/Users/umurey/Downloads/RSM/.agents/sub_orch_m1/SCOPE.md`

Output Requirements:
- Your working directory is `/Users/umurey/Downloads/RSM/.agents/explorer_m1.1_2`.
- Write an analysis report to `/Users/umurey/Downloads/RSM/.agents/explorer_m1.1_2/analysis.md`.
- Deliver `handoff.md` in your working directory.
- Send a message back to the sub-orchestrator (conversation ID: 68f7e2ff-a3d9-45e2-b3a7-485ef2040288) with the summary and path to your analysis.

Completion Criteria:
- Recommended implementation plan for `<Reveal />` meeting all criteria.
- Full verification of constraints and framer-motion availability.
