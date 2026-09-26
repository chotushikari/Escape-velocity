# Sprint 13 — Final Principal Engineer Audit + Deployment

## TASK

Act as the final principal engineer immediately before a high-stakes technical demo.

Do NOT add new features unless a critical issue requires them.

Find and fix problems that could cause:

- demo failure
- incorrect results
- broken user flows
- security problems
- deployment failures
- obvious technical weaknesses
- misleading AI behavior
- poor reliability

## STEP 1 — REPOSITORY AUDIT

Inspect:

- architecture
- dependencies
- environment configuration
- API boundaries
- simulation adapter
- AI integrations
- error handling
- tests
- documentation
- demo fixtures

Identify unnecessary complexity and inconsistencies.

## STEP 2 — BUILD VERIFICATION

Run:

- tests
- typecheck
- lint
- production build

Fix critical failures.

Do not hide failures.

## STEP 3 — PRIMARY USER JOURNEY

From a clean state test:

```text
landing
→ Velloe URL/content
→ Content DNA
→ audience
→ Room
→ insights
→ WHY
→ Creative Director
→ Version B
→ same audience
→ re-simulation
→ comparison
```

Also verify generic manual content still works.

## STEP 4 — AI AUDIT

Verify:

- structured output
- schema validation
- model failure handling
- malformed output handling
- timeouts
- fallback
- prompt-injection resistance
- imported-content isolation
- tool permissions
- no secret leakage

## STEP 5 — SIMULATION AUDIT

Verify:

- OASIS adapter boundary
- local fallback
- demo fallback
- stable audience identity
- event validation
- deterministic demo behavior
- no claims that synthetic agents are real people

## STEP 6 — SECURITY

Check:

- secrets not committed
- external URL validation
- SSRF considerations for URL importers
- unsafe tool execution
- input limits
- API exposure
- sensitive data leakage

## STEP 7 — UX AUDIT

Check:

- first impression
- visual hierarchy
- content preview
- loading states
- error states
- simulation clarity
- evidence clarity
- comparison clarity
- responsive layout
- accessibility
- reduced motion
- console errors

## STEP 8 — DEMO RELIABILITY

The primary demo must work without relying on a fragile external service.

Verify:

```text
LIVE PROVIDER
→ FALLBACK
→ DETERMINISTIC DEMO
```

The Velloe demo must complete even if external AI/simulation services are unavailable.

## STEP 9 — PRODUCTION DEPLOYMENT

Deploy early enough to catch:

- environment-variable errors
- build errors
- serverless constraints
- CORS/network problems
- API limits
- runtime incompatibilities

Verify the production URL from a clean browser.

## STEP 10 — JUDGE INSPECTION TEST

Pretend the evaluator has only:

```text
GitHub
+
Demo
+
README
```

Within 60 seconds they should understand:

- what it does
- who it is for
- why it matters
- where AI is used
- what is technically interesting
- why the results are framed responsibly
- how it could become production software

## FINAL REPORT

Produce:

### Implemented
- ...

### Files changed
- ...

### Tests
- ...

### Build
- ...

### Browser verification
- ...

### Deployment
- ...

### Security
- ...

### Demo readiness
- ...

### Critical remaining risks
- ...

### Recommended final fixes
- ...

### Things that should NOT be changed before submission
- ...

Do not claim success unless verified.

## FINAL SUBMISSION PROTOCOL

Use a feature freeze.

Then:

T−30:
Feature freeze.

T−25:
tests + typecheck + build.

T−20:
deploy.

T−15:
perform complete demo.

T−10:
record demo video if needed.

T−7:
verify GitHub, README, deployment, screenshots, demo, submission materials.

T−3:
open everything in a clean browser.

T−0:
submit.
