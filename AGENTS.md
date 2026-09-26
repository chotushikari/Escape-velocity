# Content Room engineering rules

The canonical product definition is [docs/product.md](docs/product.md). Read it
and the relevant documents in `docs/` before changing the product.

## Non-negotiable rules

- Content Room is a synthetic-audience rehearsal environment for arbitrary content;
  Velloe is demo content only.
- Results are hypotheses, never survey findings, guarantees, or accuracy claims.
  Every metric must be labelled **Simulated**.
- Preserve the same synthetic audience when comparing Version A and Version B.
- Keep the deterministic, zero-key `DemoSimulationEngine` and Velloe demo path
  working at all times.
- Use validated structured AI output only for semantic reasoning. Use deterministic
  code for aggregation, routing, metrics, and population management.
- OASIS/CAMEL-AI is the production simulation foundation behind an adapter;
  MiroFish is inspiration only.
- Shared shapes live only in `packages/contracts`. Do not create competing types.
- Keep the experience dark-first, original, responsive, and centred on a live-room
  visualization rather than fabricated chat transcripts.

## Required workflow

READ → INSPECT → PLAN → IMPLEMENT → TEST → BROWSER VERIFY → REPORT.

Every task must be recorded in `tasks/` using the task template in
`docs/product.md`. Deploy early, keep free/no-key fallbacks, and document every
open-source dependency in `docs/open-source.md`.
