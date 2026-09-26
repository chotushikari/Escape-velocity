# Sprint 4 — Contextual Audience Engine

## TASK

Build the contextual synthetic-audience construction system.

## CORE PRINCIPLE

The audience must be generated from the content and context.

Do NOT permanently reduce the product to:

- students
- creators
- professionals

Those are only possible archetypes.

## OBJECTIVE

Given:

- ContentArtifact
- ContentDNA
- optional target-audience hypothesis
- product/category context

construct an audience definition and synthetic population.

## ARCHETYPE LIBRARY

Create a reusable archetype library containing examples such as:

- Skeptic
- Power User
- Casual Scroller
- Trend Follower
- Creator
- Early Adopter
- Price Sensitive User
- Practical User
- Community Builder
- Professional
- Student
- Entertainer
- Researcher
- Brand Loyalist
- Curious Explorer
- Busy User
- Value Seeker
- Social Sharer
- Silent Consumer

Do not force every archetype into every simulation.

## OUTPUT

The engine should produce:

```text
AudienceDefinition
- rationale
- selected archetypes
- weights
- population size
- grounding signals
- confidence/evidence status

Persona
- archetype
- goals
- motivations
- objections
- behavioral tendencies
- content sensitivity
- action tendencies
```

## IMPORTANT CREDIBILITY RULE

Synthetic personas are a simulation layer.

Do not say:

> 100 people think this.

Say:

> 100 synthetic audience agents simulated.

## POPULATION

Make population size configurable.

The Velloe demo may use 100 agents.

Use deterministic seeds where useful so the same audience can be reconstructed for Version B.

## UI

Show:

```text
THE ROOM

Building a contextual audience...

100 SYNTHETIC AUDIENCE AGENTS

[archetype cards/nodes]

Why these agents?
...
```

## CONSTRAINTS

- Do not claim statistical representativeness.
- Do not fabricate demographic precision.
- Keep archetypes behaviorally meaningful.
- Separate audience construction from simulation.
- Preserve stable agent IDs for A/B re-simulation.

## TESTS

Test:

- different content types
- same content produces stable seeded audience
- different content can produce different archetype weights
- invalid audience input
- population size limits
- deterministic seed behavior

## BROWSER VERIFY

Test Velloe content → audience construction → rendered audience.

## FINAL REPORT

Report architecture, population strategy, determinism, tests, browser verification, and credibility limitations.
