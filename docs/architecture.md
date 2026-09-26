# Architecture

Content Room accepts a `ContentArtifact` from URL, upload, paste, or demo input. The creator workflow is content understanding → DNA → contextual audience → simulation events → audience intelligence → strategy → Version B → same-audience retest.

The UI depends only on `SimulationEngine`; third-party runtimes are hidden behind adapters.
