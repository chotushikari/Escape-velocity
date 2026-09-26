# Sprint 9 — Same Audience / Version B Re-simulation

## TASK

Implement the controlled re-simulation of Version B against the same synthetic audience population.

## CORE PRINCIPLE

The A/B rehearsal must change the content while holding the audience as constant as possible.

UI language:

> SAME AUDIENCE / NEW CONTENT

## OBJECTIVE

Given:

- AudienceDefinition A
- stable Persona IDs
- Version A
- Version B

run:

```text
Version A → Simulation
Version B → Simulation
```

using the same audience population.

## REQUIREMENTS

Persist/reconstruct:

- audience seed
- agent IDs
- archetype assignment
- stable behavioral attributes
- relevant context

Only content variant should change.

## OUTPUT

Produce two SimulationResults with:

- common audience ID
- variant ID
- comparable metrics
- comparable event schema

## UI

Show:

```text
SAME AUDIENCE
NEW CONTENT

Rehearsing Version B...

[progress]

100 / 100 agents
```

Then transition to comparison.

## CONSTRAINTS

- Do not imply this is a real randomized controlled trial.
- Do not claim actual real-world improvement.
- Label all differences as simulated.
- Do not silently regenerate the audience.
- If exact same-agent simulation is technically impossible for a provider, document the limitation and preserve the closest deterministic population equivalence.

## TESTS

- same audience IDs across variants
- different content IDs
- deterministic seed
- repeated run reproducibility where expected
- failed Version B simulation
- partial event failure

## BROWSER VERIFY

Complete Velloe A → B re-simulation.

## FINAL REPORT

Report how audience identity is preserved, tests, and limitations.
