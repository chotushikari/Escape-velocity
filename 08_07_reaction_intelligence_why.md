# Sprint 7 — Reaction Intelligence + WHY

## TASK

Turn raw simulation events into deterministic aggregate intelligence and an evidence-linked WHY experience.

## OBJECTIVE

Answer:

1. What happened?
2. Who reacted differently?
3. Where does the audience disagree?
4. Why?
5. What evidence supports the insight?

## AGGREGATION

Create deterministic calculations for:

- attention rate
- ignore rate
- clarity
- trust
- positive/negative response
- share intent
- save intent
- comment intent
- follow intent
- click intent
- purchase intent

Avoid arbitrary weighting unless documented.

## SEGMENT ANALYSIS

Calculate performance by selected audience archetype/cluster.

Identify:

- strongest segment
- weakest segment
- largest disagreement
- largest friction
- most common reason

## WHY MODEL

The AI may summarize evidence, but the evidence set must be computed deterministically first.

The AI should receive only the relevant structured evidence.

Example:

```text
WHY DID THE ROOM REACT THIS WAY?

BIGGEST SIGNAL
...

AUDIENCE SPLIT
...

TOP FRICTIONS
...

SUPPORTING SIMULATED REACTIONS
...
```

## EVIDENCE LINKING

Every important recommendation should be traceable to:

- metric
- segment
- simulation event subset
- or observed disagreement

Do not allow unsupported AI claims.

## CONFIDENCE

Implement a transparent confidence concept based on available evidence such as:

- sample size
- cross-archetype consistency
- evidence completeness
- model agreement
- validation availability

Do not present invented statistical confidence.

## CONSTRAINTS

- Deterministic aggregation first.
- AI explains; it does not invent the underlying metrics.
- Clearly label simulation.
- No real-world lift claims.

## TESTS

Create golden aggregation fixtures and regression cases.

Test:

- all agents identical
- extreme disagreement
- empty events
- missing fields
- small population
- mixed archetypes

## BROWSER VERIFY

Run Velloe → simulation → intelligence → WHY.

## FINAL REPORT

Report metrics, evidence model, AI explanation boundary, tests, and browser verification.
