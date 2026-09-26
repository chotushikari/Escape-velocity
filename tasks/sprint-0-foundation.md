# TASK: Sprint 0 foundation

## CONTEXT

See `AGENTS.md`, `docs/product.md`, and the existing Content Room demo.

## OBJECTIVE

Establish a shared contract and documentation foundation without breaking zero-key demo mode.

## ACCEPTANCE CRITERIA

- [x] Shared content and simulation contracts exist in `packages/contracts`.
- [x] Legacy imports re-export the shared contracts.
- [x] Product, journey, validation, UI/UX, API, and demo documentation exists.
- [x] Contract validation is applied to all API routes.

## CONSTRAINTS

- Preserve deterministic demo behavior.
- Never make the product Velloe-specific.

## TESTS

- Run `npm run typecheck` and `npm run build`.

## FINAL REPORT

The foundation is in place; API-boundary validation is the next completion item.
