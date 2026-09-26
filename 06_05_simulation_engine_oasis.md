# Sprint 5 — Simulation Engine + OASIS Adapter

## TASK

Implement the simulation abstraction and integrate OASIS as the primary reusable simulation engine.

## CONTEXT

OASIS / CAMEL-AI is an open-source social simulation framework. Use it as an external engine through an adapter.

MiroFish is a conceptual/architectural reference; do not clone it.

## OBJECTIVE

Create:

```text
SimulationEngine
├── OasisSimulationEngine
├── LocalSimulationEngine
└── DemoSimulationEngine
```

The application must not depend directly on OASIS internals.

## CORE SIMULATION

Model:

```text
CONTENT EXPOSURE
→ ATTENTION
→ INTERPRETATION
→ RESPONSE
→ DECISION
→ ACTION
```

Possible actions:

```text
STOP
IGNORE
LIKE
COMMENT
SHARE
SAVE
FOLLOW
CLICK
BUY
REJECT
```

## SIMULATION EVENT

Create a validated event model containing enough information for deterministic aggregation:

```text
simulationId
agentId
contentVariantId
stage
attention
interpretation
emotion
trust
decision
action
reason
timestamp/step
```

Use an appropriate normalized representation rather than blindly copying this example.

## SAME-AUDIENCE REQUIREMENT

The engine must support re-running a new ContentVariant against the same population.

Stable agent IDs and stable audience configuration are required.

## DEMO ENGINE

Implement a deterministic simulation engine for the Velloe demo.

It must produce believable but explicitly simulated results.

Do not label demo results as real observations.

## OASIS

Add the adapter only after inspecting the current repository and verifying the compatible OASIS API/version.

Document:

- installation
- runtime assumptions
- provider/model requirements
- license
- failure behavior

## CONSTRAINTS

- OASIS is not the domain model.
- No OASIS-specific types in UI components.
- Do not make OASIS required for demo mode.
- Do not create a custom social network framework if OASIS already provides the capability.
- Do not run 100 expensive sequential LLM calls if batching/configuration can avoid it.

## TESTS

- event schema validation
- deterministic demo simulation
- stable agent IDs
- same-audience reconstruction
- malformed OASIS response
- OASIS unavailable fallback
- timeout handling

## BROWSER VERIFY

Run the Velloe demo in demo mode and confirm the simulation reaches a completed result.

## FINAL REPORT

Report adapter design, OASIS integration status, fallback status, tests, and exact commands used.
