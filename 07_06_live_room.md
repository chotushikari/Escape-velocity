# Sprint 6 — Live Room Visualization

## TASK

Build the visual simulation room that turns structured simulation events into a compelling but credible live experience.

## OBJECTIVE

Make the simulation understandable in seconds without turning it into fake AI theatre.

## CORE SCREEN

```text
THE ROOM IS LIVE

100 SYNTHETIC AUDIENCE AGENTS

[agent visualization]

WATCHING → INTERPRETING → REACTING → DECIDING

ATTENTION
TRUST
CLARITY
SHARE
SAVE
...
```

## VISUALIZATION

Show:

- contextual agent nodes
- archetype clusters
- content artifact at center
- state transitions
- aggregate counters
- meaningful reaction excerpts
- simulation progress

Do not render 100 chat bubbles.

Use animation selectively.

## AGENT STATES

At minimum:

```text
IDLE
WATCHING
INTERPRETING
REACTING
DECIDING
COMPLETED
```

Map these to visual states.

## REAL-TIME BEHAVIOR

The UI should consume structured SimulationEvents and progressively update the room.

If live streaming is unavailable, simulate progressive event arrival from a deterministic event sequence.

## ACCESSIBILITY

Provide:

- reduced-motion behavior
- text equivalents
- meaningful labels
- non-color-only status indicators

## CONSTRAINTS

- Do not fabricate “live” external data.
- Clearly label synthetic simulation.
- Avoid excessive motion.
- Avoid performance-heavy DOM rendering for hundreds of agents.
- Keep the content artifact visually dominant.

## TESTS

- event-to-state mapping
- event ordering
- empty events
- malformed events
- completed simulation
- reduced-motion behavior

## BROWSER VERIFY

Verify:

1. room opens
2. agents appear
3. state transitions occur
4. metrics update
5. simulation completes
6. no console errors
7. no obvious layout jank

## FINAL REPORT

Report visual system, event handling, performance decisions, tests, and browser findings.
