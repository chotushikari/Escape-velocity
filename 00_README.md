# Content Room — Codex Sprint Prompt Pack

This pack contains standalone, copy-paste-ready Codex prompts for building Content Room.

## Product

Content Room is a synthetic-audience rehearsal environment for **any content**:
social posts, videos, ads, campaigns, landing pages, emails, articles, scripts, product announcements, and creative concepts.

Core loop:

ANY CONTENT
→ CONTENT DNA
→ CONTEXTUAL AUDIENCE
→ SIMULATION
→ WHAT HAPPENED?
→ WHY?
→ CREATIVE DIRECTOR
→ VERSION B
→ SAME AUDIENCE
→ RE-SIMULATION
→ BEFORE vs AFTER

Velloe is the **demo scenario**, not the product scope. The demo uses a real Velloe social-media post/post URL to make the product concrete.

## Engineering approach

The prompts follow the AI-native engineering playbook:

READ → INSPECT → PLAN → IMPLEMENT → TEST → BROWSER VERIFY → REPORT

Each task is intentionally scoped. Do not ask Codex to build the entire product in one shot.

## Open-source / platform choices

- Next.js + TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide
- Framer Motion where useful
- Vercel AI SDK / structured outputs
- OASIS / CAMEL-AI as the primary reusable social-simulation foundation
- MiroFish as architectural/reference inspiration, not as a clone
- Vercel deployment
- Deterministic demo fallback
- Local/SQLite or lightweight persistence for the MVP
- Supabase only when persistence materially requires it

## Parallel worktrees

Recommended branches/worktrees:

- `worktree/foundation`
- `worktree/ui`
- `worktree/ingestion`
- `worktree/simulation`
- `worktree/intelligence`
- `worktree/demo`

Do not allow parallel agents to invent incompatible contracts. Sprint 0 establishes shared contracts first.

## Required fallback hierarchy

LIVE PROVIDER → FALLBACK PROVIDER → DETERMINISTIC DEMO

The Velloe demo must remain runnable without external API keys or a functioning OASIS deployment.

## Credibility rules

- Synthetic agents are not real people.
- Never present simulation as a survey.
- Never claim fabricated accuracy or real-world lift.
- Label metrics as simulated.
- Validation must be explicit.
- If a real benchmark does not yet exist, say so.
- Recommendations must point back to simulation evidence.

## Prompt order

1. 00 — Foundation / Repository Brain
2. 01 — Design System + UI Shell
3. 02 — Content Ingestion
4. 03 — Content DNA
5. 04 — Contextual Audience Engine
6. 05 — Simulation Engine + OASIS Adapter
7. 06 — Live Room
8. 07 — Reaction Intelligence + WHY
9. 08 — Creative Director + Version B
10. 09 — Same-Audience Re-simulation
11. 10 — A/B Comparison
12. 11 — Validation + Evaluation
13. 12 — Velloe 90-Second Demo Mode
14. 13 — Final Audit + Deployment

## Important

Each Codex run must inspect the current repository before editing. If the repository has diverged from the assumptions in a prompt, preserve the current working architecture and update the plan rather than blindly overwriting it.
