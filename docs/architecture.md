# Architecture

Content Room accepts a `ContentArtifact` from URL, upload, paste, or demo input. The creator workflow is content understanding → DNA → contextual audience → simulation events → audience intelligence → strategy → Version B → same-audience retest.

The UI depends only on `SimulationEngine`; third-party runtimes are hidden behind adapters.

For actual OASIS runs, deploy `services/oasis` as a Python/FastAPI container and point `OASIS_SERVICE_URL` at it. Vercel hosts the Next.js product; the OASIS service is independently deployable and falls back to local simulation when unavailable.
