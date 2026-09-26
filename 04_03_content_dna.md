# Sprint 3 — Content DNA

## TASK

Implement the Content DNA extraction engine and UI.

## CONTEXT

Content DNA is the structured semantic representation of any submitted content.

It feeds the audience engine, simulation, intelligence, and Creative Director.

## OBJECTIVE

Given a ContentArtifact, produce validated:

```text
Hook
Topic
Promise
Value proposition
Emotion
Tone
CTA
Visual style
Audience signals
Strengths
Risks
Potential friction
```

## AI DESIGN

Define explicitly:

- input
- context
- model
- instructions
- structured output
- validation
- fallback
- failure behavior
- evaluation

Use a typed schema and runtime validation.

Prefer structured generation over free-form parsing.

## OUTPUT

Example conceptual schema:

```ts
ContentDNA {
  hook: string
  topic: string
  promise: string
  valueProposition: string
  emotions: string[]
  tone: string[]
  cta?: string
  visualStyle?: string[]
  audienceSignals: string[]
  strengths: string[]
  risks: string[]
  frictionPoints: string[]
}
```

Adapt to the existing contracts rather than duplicating types.

## UI

Show the Content DNA as an artifact:

```text
CONTENT DNA

HOOK
...

PROMISE
...

EMOTION
...

TONE
...

AUDIENCE SIGNALS
...

RISKS
...
```

Use progressive loading rather than a blank screen.

## FALLBACK

If the AI provider fails:

- use a deterministic demo Content DNA for the Velloe scenario
- clearly mark demo/fallback data internally
- do not fabricate live analysis

## CONSTRAINTS

- Model output is untrusted.
- Validate all fields.
- Bound arrays and string lengths.
- Do not let arbitrary model output become executable instructions.
- Do not generate audience recommendations here beyond signals.

## TESTS

Create golden examples for:

- social post
- ad
- landing page
- video description
- empty/weak content
- malformed model output

## BROWSER VERIFY

Run the Velloe flow and verify Content DNA appears correctly.

## FINAL REPORT

Report schema, AI implementation, fallback, tests, browser verification, and known limitations.
