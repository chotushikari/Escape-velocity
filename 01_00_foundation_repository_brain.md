# Sprint 0 — Foundation / Repository Brain

## TASK

Initialize the Content Room repository as an AI-native engineering project and establish the product, architecture, contracts, task system, evaluation structure, and Codex operating rules.

Do NOT build the complete application yet.

## CONTEXT

Content Room is a synthetic-audience rehearsal environment for any content.

Core flow:

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

The hackathon demo uses a real Velloe social-media post/post URL, but Velloe is only a demo scenario.

Read:
- `AGENTS.md` if it exists
- `README.md`
- existing package configuration
- existing source code
- relevant repository docs

If this is a new repository, create the foundation.

## OBJECTIVE

Create a repository that becomes the source of truth for both humans and Codex.

## REQUIRED DELIVERABLES

Create:

```text
AGENTS.md
README.md

docs/
  product.md
  user-journey.md
  architecture.md
  simulation.md
  validation.md
  ui-ux.md
  open-source.md
  api-contracts.md
  demo.md
  decisions.md

tasks/
  001-foundation.md
  002-design-system.md
  003-content-ingestion.md
  004-content-dna.md
  005-audience-engine.md
  006-simulation-engine.md
  007-live-room.md
  008-intelligence.md
  009-strategy.md
  010-version-b.md
  011-validation.md
  012-demo-mode.md
  013-final-audit.md

evals/
  golden.json
  regression.json
  adversarial.json

tests/
scripts/
```

Use the exact product intent from this prompt.

## AGENTS.md REQUIREMENTS

Include rules for:

- inspect before changing
- product docs are authoritative
- architecture boundaries
- small changes
- no speculative features
- deterministic code where possible
- model output is untrusted
- structured AI output validation
- external input validation
- tests/typecheck/lint/build
- browser verification
- security
- completion reports
- no false claims of completion

## CONTRACTS

Define the initial domain contracts without overengineering:

```text
ContentArtifact
ContentDNA
AudienceDefinition
PersonaArchetype
Persona
SimulationEvent
SimulationResult
AudienceInsight
CreativeRecommendation
ContentVariant
ComparisonResult
ValidationResult
```

Keep contracts provider-agnostic.

## ARCHITECTURE

Document these boundaries:

```text
UI
 ↓
Application API
 ↓
Content Engine
Audience Engine
Simulation Engine
Analytics Engine
Strategy Engine
Validation Layer
 ↓
External Providers
```

Simulation must use an adapter:

```text
SimulationEngine
├── OasisSimulationEngine
├── LocalSimulationEngine
└── DemoSimulationEngine
```

## CONSTRAINTS

- Do not build a complex database first.
- Do not build microservices unless required.
- Do not hard-code Velloe into the domain model.
- Do not make OASIS a mandatory runtime dependency for every demo path.
- Do not copy MiroFish code without reviewing licensing.
- Do not invent validation statistics.
- Do not add authentication unless the current product actually requires it.
- Prefer simple typed interfaces.

## TESTS

At minimum:

- repository starts/builds
- TypeScript configuration works
- contracts compile
- no obvious broken imports

## BROWSER VERIFY

If an app exists, start it and verify the existing entry point. Do not build UI in this sprint.

## FINAL REPORT

Report:

1. What was created
2. Files created/changed
3. Architecture decisions
4. Contracts created
5. Tests
6. Verification
7. Open risks
8. Recommended next sprint
