# Architecture

Content Room is a small, adapter-based application. It is deliberately not a
microservice system: Next.js owns the creator experience, orchestration, and the
zero-key product; a Python service exists only for optional OASIS runs.

```text
Creator
  -> Next.js UI
  -> Application API
      -> Content engine -> Content DNA
      -> Audience engine -> preserved personas
      -> SimulationEngine
          -> DemoSimulationEngine (always available)
          -> LocalSimulationEngine (fallback)
          -> OasisSimulationEngine -> FastAPI/OASIS (optional)
      -> deterministic analytics -> segments, disagreements, evidence
      -> strategy engine -> Version B
      -> same audience -> re-simulation -> simulated comparison
```

## Boundaries

- `packages/contracts` owns shared schemas and TypeScript domain shapes.
- `lib/importers` turns URLs, uploads, paste, and fixtures into a normalized
  content artifact. It must never imply blocked platform content was extracted.
- `lib/engines` owns the `SimulationEngine` boundary. UI code consumes only
  Content Room events and never imports OASIS.
- `app/api` validates all untrusted request payloads at the boundary.
- `services/oasis` is a containerized optional adapter. It returns a strict
  Content Room event envelope, not OASIS internals.

## Reliability hierarchy

`live provider / OASIS -> local engine -> deterministic demo`.

The application remains useful with no key, network, database, URL extraction,
or Python service. All numerical results are labelled **Simulated** and are
hypotheses for real-world validation.

## Deployment

Vercel hosts the Next.js application. Railway hosts the optional FastAPI/OASIS
container. Because OASIS declares Python 3.10–3.11 support, the container uses
Python 3.11 even though local developer machines may use other versions.
