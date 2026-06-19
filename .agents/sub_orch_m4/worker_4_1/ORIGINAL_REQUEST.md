## 2026-06-18T22:04:45Z
Objective:
Optimize next.config.ts, migrate middleware to proxy, fix TypeScript check errors in test files, and run build/lint verification for Milestone 4.1.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks:
1. Review the explorer findings at `/Users/umurey/Downloads/RSM/.agents/sub_orch_m4/explorer_4_1/analysis.md`.
2. Optimize `next.config.ts` for Vercel deployment by enabling React Strict Mode, disabling poweredByHeader, and setting recommended security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy).
3. Migrate `middleware.ts` to `proxy.ts` in the root directory to fix the Next.js 16 deprecation warning. Ensure the proxy export is correct (either named or default export is fine, matching Next.js 16 requirements). Remove `middleware.ts` after migrating.
4. Fix all compilation errors in the following test files so that `npx tsc --noEmit` compiles cleanly:
   - `components/ui/__tests__/verify_all.tsx`
   - `components/ui/__tests__/verify_forms_accordions.tsx`
   - `components/ui/__tests__/verify_portal_and_karriere.tsx`
   Ensure you resolve:
   - Required children prop errors in `React.createElement`.
   - The Hook `call` signature error.
   - The boolean comparison types overlap error in state variables (declare their types explicitly as `boolean`).
5. Run `npx tsc --noEmit`, `npm run lint`, and `npm run build` to verify that there are zero warnings, zero TypeScript errors, and a successful production build.
6. Write a summary of your changes to `/Users/umurey/Downloads/RSM/.agents/sub_orch_m4/worker_4_1/changes.md` and your final verification results and handoff report to `/Users/umurey/Downloads/RSM/.agents/sub_orch_m4/worker_4_1/handoff.md`. Include the commands run and outputs.
7. Send a message to the parent (conversation ID 5db7f2dd-bdf0-4a0e-9ced-a58ae6a6b092) with a concise summary of changes and a link to your handoff report.
