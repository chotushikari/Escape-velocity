# Sprint 10 — Before vs After Comparison

## TASK

Build the final comparison experience for Version A vs Version B.

## OBJECTIVE

Answer:

> DID THE ROOM CHANGE?

## METRICS

Compare:

- attention
- clarity
- trust
- share intent
- save intent
- comment intent
- follow intent
- click intent
- purchase intent where relevant

Only display metrics that are meaningful for the content.

## UI

Use a clean comparison:

```text
DID THE ROOM CHANGE?

                 VERSION A     VERSION B

Attention            64           79
Clarity              51           74
Trust                53           68
Share intent         27           41
Save intent          31           46
```

Every metric must be labelled:

> Simulated change

## AUDIENCE SHIFT

Show which segments changed most.

Example:

```text
Curious Explorer     +12
Skeptic                +8
Practical User        +5
```

Do not use a “winner” framing.

Explain what changed and why.

## INTERPRETATION

Use deterministic calculations for deltas.

The AI may provide a concise explanation grounded in the deltas and previous evidence.

## CONSTRAINTS

- No real-world performance claims.
- No fabricated significance.
- No overall score/ranking pretending to be scientific validation.
- Avoid visually implying certainty.

## TESTS

- correct deltas
- zero changes
- negative changes
- missing metrics
- mismatched populations
- mismatched content variants

## BROWSER VERIFY

Test full Velloe journey through comparison.

## FINAL REPORT

Report comparison logic, UI, tests, and browser verification.
