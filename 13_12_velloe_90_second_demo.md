# Sprint 12 — Velloe 90-Second Demo Mode

## TASK

Build a deterministic, polished one-click Velloe demonstration that communicates the entire Content Room thesis in approximately 90 seconds.

## IMPORTANT

Velloe is the demonstration subject.

The underlying product remains generic for any content.

## DEMO STORY

```text
REAL VELLOE POST
→ CONTENT DNA
→ CONTEXTUAL AUDIENCE
→ THE ROOM IS LIVE
→ WHAT HAPPENED?
→ WHY?
→ CREATIVE DIRECTOR
→ VERSION B
→ SAME AUDIENCE
→ RE-SIMULATION
→ DID THE ROOM CHANGE?
```

## 90-SECOND TIMELINE

### 0–10s
Show the actual Velloe post.

Narrative:
> “This is a real piece of content.”

### 10–20s
Content DNA.

### 20–35s
Contextual audience construction.

### 35–50s
Live Room simulation.

### 50–62s
“What happened?” and “Why?”

### 62–73s
Creative Director and Version B.

### 73–88s
Same audience / new content / re-simulation.

### 88–90s
Before vs after and closing line:

> We don't just generate content. We let you rehearse it.

## DEMO CONTROLLER

Implement a deterministic demo state machine:

```text
INTRO
→ CONTENT
→ DNA
→ AUDIENCE
→ SIMULATION
→ INSIGHTS
→ STRATEGY
→ VERSION_B
→ RESIMULATION
→ COMPARISON
→ COMPLETE
```

Allow:

- automatic progression
- pause
- next
- restart
- jump to stage for debugging

## DEMO FIXTURES

Create a complete Velloe fixture containing:

- imported content
- Content DNA
- audience definition
- personas
- simulation events
- aggregated insights
- WHY evidence
- Creative Director recommendation
- Version B
- Version B simulation
- comparison

All fixture values must be clearly synthetic/demo data.

Do not pretend fixture metrics are observed Velloe performance.

## FAILSAFE

If any live provider fails during demo mode, continue using deterministic fixtures.

## UI

Optimize the demo for visual storytelling:

- strong transitions
- no dead time
- no unexplained loading
- clear stage indicators
- simulation centerpiece
- evidence
- before/after

## CONSTRAINTS

Do not add unrelated product features.

Do not replace the generic architecture with Velloe-specific logic.

## TESTS

- full automatic demo
- pause/resume
- restart
- stage navigation
- provider failure
- missing API keys
- mobile/desktop

## BROWSER VERIFY

Run the complete demo from a clean browser session.

Verify no console errors.

Capture screenshots at key moments if useful.

## FINAL REPORT

Report demo state machine, fixtures, timing, fallback behavior, tests, browser verification, and any remaining risk to the 90-second flow.
