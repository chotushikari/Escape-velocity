# TASK: Ingestion and deterministic demo

## CONTEXT

Read `AGENTS.md`, `docs/product.md`, `docs/demo.md`, and `docs/api-contracts.md`.

## OBJECTIVE

Provide honest URL/media/manual ingestion and a reliable one-click Velloe demonstration.

## ACCEPTANCE CRITERIA

- [ ] Importer boundary covers Instagram, LinkedIn, X, YouTube, Web, and Manual.
- [ ] URL behavior never implies inaccessible content was extracted.
- [ ] Direct media preview and manual fallback work.
- [ ] Velloe demo is deterministic, one-click, and zero-key/network.

## CONSTRAINTS

- No platform scraping or fabricated metadata.
- Use shared contracts.

## TESTS

- `npm run typecheck`
- `npm run build`

## FINAL REPORT

List changed behavior, test results, and remaining risks.
