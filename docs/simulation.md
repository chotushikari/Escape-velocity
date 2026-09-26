# Simulation

Each run models exposure, attention, interpretation, decision, and action. The local engine produces structured events for STOP, IGNORE, LIKE, COMMENT, SHARE, SAVE, FOLLOW, CLICK, BUY, and REJECT. Version A and B use deterministic personas so comparisons use the same audience population.

Each final-action event has a `simulationId`, stable `personaId`, `contentVariantId`, ordered `step`, simulation timestamp, stage, action, rationale, and bounded simulated signals. `personaId` is Content Room's normalized agent identifier; no OASIS agent types are exposed to the UI.

The OASIS service is an optional production adapter. It returns an explicit `OASIS` envelope only after it can read supported agent action telemetry from the OASIS run database. If that telemetry is absent or malformed, it fails closed and the web route uses the local engine. Content Room deterministically maps an observed OASIS action to its cross-platform display scores; it does not present those score mappings as OASIS measurements or human evidence.
