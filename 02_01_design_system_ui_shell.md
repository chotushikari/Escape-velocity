# Sprint 1 — Premium Design System + UI Shell

## TASK

Build the Content Room application shell and premium visual system.

Do not implement the full simulation logic yet.

## CONTEXT

Content Room should feel like a premium AI research/control-room product rather than a generic SaaS dashboard.

Visual references:
- Linear
- Apple
- Notion
- Perplexity
- MiroFish-like simulation energy

Do not clone any existing interface.

The primary user promise is:

> Rehearse before you publish.

The homepage CTA should communicate:

> Put content in the Room.

## OBJECTIVE

Create a polished, responsive shell that can host the complete Content Room workflow.

## REQUIRED EXPERIENCE

Landing page:

```text
CONTENT ROOM

Rehearse before you publish.

Put any piece of content in front of a
simulated audience and see what happens.

[ Paste a URL or drop your content... ]

Social Post · Video · Ad · Campaign
Landing Page · Email · Script · Launch

[ Put it in the Room ]
```

Application navigation should communicate:

```text
CONTENT → AUDIENCE → ROOM → INTELLIGENCE → STRATEGY → COMPARISON
```

## COMPONENTS

Create reusable components for:

- AppShell
- StageNavigation
- Panel
- SectionHeader
- ArtifactCard
- MetricCard
- StatusBadge
- ProgressTimeline
- AgentNode
- SimulationCanvas
- Drawer
- Modal
- Button
- Tooltip
- LoadingState
- EmptyState
- ErrorState

Use shadcn/ui primitives where appropriate.

## VISUAL REQUIREMENTS

- dark-first
- premium typography
- restrained color palette
- subtle borders
- strong spacing system
- high information density without clutter
- smooth transitions
- no gratuitous animation
- accessible contrast
- responsive desktop/mobile
- keyboard-friendly interactive elements

The simulation should eventually be the visual centerpiece.

## CONSTRAINTS

- Do not hard-code simulation results.
- Do not build fake backend logic.
- Do not create a generic admin dashboard.
- Do not introduce a heavy visualization framework unless necessary.
- Keep components composable.
- Do not change domain contracts.

## TESTS

- component tests where practical
- TypeScript
- lint
- build

## BROWSER VERIFY

Verify:

1. landing page loads
2. primary CTA is visible
3. navigation is coherent
4. responsive behavior at desktop and mobile
5. no console errors
6. no obvious overflow/layout defects
7. loading/error/empty components render

Take screenshots if useful.

## FINAL REPORT

Report implemented UI, changed files, tests, browser findings, and known visual limitations.
