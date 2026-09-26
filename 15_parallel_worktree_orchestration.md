# Parallel Codex Worktrees — Orchestration Prompt

## TASK

Set up and coordinate parallel Codex worktrees for Content Room without allowing agents to conflict over architecture or contracts.

## OBJECTIVE

Use parallel implementation for independent work while preserving one source of truth.

## WORKTREES

Recommended:

```text
worktree/foundation
worktree/ui
worktree/ingestion
worktree/simulation
worktree/intelligence
worktree/demo
```

## OWNERSHIP

### foundation

Owns:
- AGENTS.md
- docs
- shared contracts
- project configuration

### ui

Owns:
- web UI
- design system
- visual components
- page layouts
- animation

### ingestion

Owns:
- ContentImporter
- URL parsing
- platform adapters
- manual fallback
- normalization

### simulation

Owns:
- SimulationEngine
- OASIS adapter
- local engine
- demo engine
- simulation events

### intelligence

Owns:
- Content DNA
- audience engine
- aggregation
- insights
- WHY
- Creative Director
- Version B
- comparison

### demo

Owns:
- Velloe fixtures
- demo controller
- deterministic timeline
- demo orchestration

## CONTRACT RULE

Before parallel implementation begins, foundation must define shared interfaces.

If a worktree needs a contract change:

1. document the proposed change
2. check dependencies
3. modify the contract deliberately
4. update affected worktrees
5. run integration verification

Do not silently fork interfaces.

## GIT RULES

Use:

- small commits
- clear commit messages
- no unrelated changes
- no generated junk
- no secret files

Examples:

```text
feat: add content importer contract
feat: add room visualization
feat: add OASIS simulation adapter
fix: handle importer timeout
test: add simulation regression cases
ui: improve comparison screen
```

## MERGE ORDER

Preferred:

```text
foundation
↓
ui + ingestion + simulation
↓
intelligence
↓
demo
↓
integration
↓
final audit
```

## INTEGRATOR PROMPT

After each branch is ready:

> Inspect the branch against the current main branch. Review the diff, check contract compatibility, run tests/typecheck/build, merge only if the branch satisfies its acceptance criteria, then run the primary user flow. If conflicts occur, preserve product contracts and existing working behavior. Do not solve conflicts by blindly choosing one side.

## FAILURE RULE

If two agents produce conflicting architecture:

STOP.

Do not merge both and patch symptoms.

Inspect:
- product.md
- architecture.md
- api-contracts.md
- AGENTS.md

Choose the smallest coherent design consistent with the documented product.

## FINAL REQUIREMENT

The integrated main branch must always remain runnable.
