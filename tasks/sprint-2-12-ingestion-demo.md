# TASK: Ingestion and deterministic demo

## CONTEXT

Read `AGENTS.md`, `docs/product.md`, `docs/demo.md`, and `docs/api-contracts.md`.

## OBJECTIVE

Provide honest URL/media/manual ingestion and a reliable one-click Velloe demonstration.

## ACCEPTANCE CRITERIA

- [x] Importer boundary covers Instagram, LinkedIn, X, YouTube, Web, and Manual.
- [x] URL behavior never implies inaccessible content was extracted.
- [x] Direct media preview and manual fallback work.
- [x] Velloe demo is deterministic, one-click, and zero-key/network.

## CONSTRAINTS

- No platform scraping or fabricated metadata.
- Use shared contracts.

## TESTS

- `npm run typecheck`
- `npm run build`

## FINAL REPORT

Metadata-only URL importers identify context without scraping restricted content.
Direct image/video URLs preview in place; uploaded media and pasted copy create local
manual artifacts. The Velloe presentation controller uses only deterministic local
state and the existing no-key demo simulation path. No actual Velloe post URL was
present in the supplied project materials, so the fixture is explicitly marked as
synthetic until a verified URL and permitted copy are supplied.
