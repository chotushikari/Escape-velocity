# TASK: Simulation and validation architecture

## CONTEXT

Read `AGENTS.md`, `docs/simulation.md`, `docs/validation.md`, and `docs/open-source.md`.

## OBJECTIVE

Harden the OASIS adapter, local/demo fallback, same-audience handling, and no-key evaluation path.

## ACCEPTANCE CRITERIA

- [ ] Structured events conform to shared contracts.
- [ ] OASIS failures cannot crash the UI.
- [ ] Same audience is preserved for Version B.
- [ ] No-key demo remains deterministic.
- [ ] Validation claims remain honest and documented.

## CONSTRAINTS

- OASIS details must not reach UI code.
- Do not fabricate accuracy evidence.

## TESTS

- Typecheck/build and relevant Python compile/eval command.

## FINAL REPORT

List changed behavior, test results, and remaining risks.
