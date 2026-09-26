# TASK: Simulation and validation architecture

## CONTEXT

Read `AGENTS.md`, `docs/simulation.md`, `docs/validation.md`, and `docs/open-source.md`.

## OBJECTIVE

Harden the OASIS adapter, local/demo fallback, same-audience handling, and no-key evaluation path.

## ACCEPTANCE CRITERIA

- [x] Structured events conform to shared contracts.
- [x] OASIS failures cannot crash the UI.
- [x] Same audience is preserved for Version B.
- [x] No-key demo remains deterministic.
- [x] Validation claims remain honest and documented.

## CONSTRAINTS

- OASIS details must not reach UI code.
- Do not fabricate accuracy evidence.

## TESTS

- Typecheck/build and relevant Python compile/eval command.

## FINAL REPORT

- Validated OASIS response envelope and fail-closed database telemetry extraction.
- Local/demo events use stable IDs and simulation timestamps; Version B accepts the same `sameAudienceId`.
- Added no-key Python contract checks. OASIS runtime and model integration remain deployment-time verification work.

List changed behavior, test results, and remaining risks.
