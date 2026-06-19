# BRIEFING — 2026-06-18T14:04:38-07:00

## Mission
Convert remaining HTML prototypes to Next.js Server Components and ensure Vercel deployment readiness for RSM Systembau.

## 🔒 My Identity
- Archetype: Project Orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: /Users/umurey/Downloads/RSM/.agents/orchestrator
- Original parent: top-level
- Original parent conversation ID: f20f7869-b950-4ab8-ad4d-ac803d0c1bd9

## 🔒 My Workflow
- **Pattern**: Project
- **Scope document**: /Users/umurey/Downloads/RSM/PROJECT.md
1. **Decompose**: Decompose the task into milestones (e.g., scaffolding, component translation, next.config, verification).
2. **Dispatch & Execute** (pick ONE):
   - **Delegate (sub-orchestrator)**: Spawn a sub-orchestrator or worker for investigation/implementation.
3. **On failure** (in this order):
   - Retry: nudge stuck agent or re-send task
   - Replace: spawn fresh agent with partial progress
   - Skip: proceed without (only if non-critical)
   - Redistribute: split stuck agent's remaining work
   - Redesign: re-partition decomposition
   - Escalate: report to parent (sub-orchestrators only, last resort)
4. **Succession**: Self-succeed at 16 spawns, write handoff.md, spawn successor.
- **Work items**:
  1. Define project plan and architecture [pending]
  2. Implement helper components (<Reveal />) [pending]
  3. Translate HTML pages into Next.js components [pending]
  4. i18n infrastructure and translation extraction [pending]
  5. TypeScript error handling and verification [pending]
  6. Vercel deployment verification [pending]
- **Current phase**: 1
- **Current focus**: Define project plan and architecture

## 🔒 Key Constraints
- Never write, modify, or create source code files directly (delegating to subagents).
- Strict adherence to RULES.md (Next-intl for all text, slate-50/blue accent styling, round shapes, Framer Motion transitions with prefers-reduced-motion, MediaSlot for placeholders).
- Never reuse a subagent after it has delivered its handoff — always spawn fresh.

## Current Parent
- Conversation ID: f20f7869-b950-4ab8-ad4d-ac803d0c1bd9
- Updated: not yet

## Key Decisions Made
- [TBD]

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| sub_orch_m1 | self | Scaffolding & Shared Components | completed | 68f7e2ff-a3d9-45e2-b3a7-485ef2040288 |
| sub_orch_m2 | self | Core Page Assembly | completed | 8b167891-31f9-46d9-af57-1e29b50df03a |
| sub_orch_m3 | self | Secondary Page Assembly | completed | 90b0f287-f1bd-451e-b895-85a2f89d151c |
| sub_orch_m4 | self | Vercel Deployment Readiness | completed | 5db7f2dd-bdf0-4a0e-9ced-a58ae6a6b092 |

## Succession Status
- Succession required: no
- Spawn count: 4 / 16
- Pending subagents: none
- Predecessor: none
- Successor: not yet spawned

## Active Timers
- Heartbeat cron: task-65
- Safety timer: none
- On succession: kill all timers before spawning successor
- On context truncation: run `manage_task(Action="list")` — re-create if missing

## Artifact Index
- /Users/umurey/Downloads/RSM/.agents/ORIGINAL_REQUEST.md — Verbatim record of user request
- /Users/umurey/Downloads/RSM/agents/RULES.md — Formatting, design system, and code quality rules
