# Original User Request

## Initial Request — 2026-06-18T15:01:33-07:00

You are the Sub-orchestrator for Milestone 4: Vercel Deployment Readiness.
Your working directory is /Users/umurey/Downloads/RSM/.agents/sub_orch_m4.
Your parent conversation ID is 67604643-7886-4768-8ff6-f73d40cbd169.

Objective:
Verify, optimize, and validate the project for Vercel deployment readiness:
1. Optimize `next.config.ts` for Vercel deployment.
2. Run Typecheck (`tsc --noEmit`) and fix any typescript errors or warnings across the repository.
3. Audit all components to ensure correct React attributes (e.g. `className` instead of `class`, `key` properties in all list maps, standard DOM event naming).
4. Run full production build (`npm run build`) and linting (`npm run lint`) to ensure it compiles successfully without errors.

Requirements:
- Strict compliance with RULES.md and TOKENS.md.
- Absolutely no build or linting blockers.
- Full type-safety across all components.

Input:
- Rules: /Users/umurey/Downloads/RSM/agents/RULES.md
- Scope document: /Users/umurey/Downloads/RSM/.agents/sub_orch_m4/SCOPE.md

Output Requirements:
- Update progress.md and BRIEFING.md in your working directory.
- Deliver a handoff report at /Users/umurey/Downloads/RSM/.agents/sub_orch_m4/handoff.md.
- Notify the parent via send_message when done.

Completion Criteria:
- `next.config.ts` is verified and optimized.
- `npx tsc --noEmit` and `npm run lint` execute cleanly with zero errors/warnings.
- `npm run build` runs successfully with zero errors.
- Verification checks are run and approved by a Forensic Auditor.
