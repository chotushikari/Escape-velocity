# Open-source research and reuse decisions

Research was verified on 2026-09-26. Decisions below distinguish code reuse from
conceptual inspiration.

| Candidate | What it solves | License / runtime | Decision |
| --- | --- | --- | --- |
| [CAMEL OASIS](https://github.com/camel-ai/oasis) | LLM-driven social-agent graphs, profiles, action environments, persistence | Apache-2.0; `camel-oasis` v0.2.5 declares Python `>=3.10,<3.12`; model provider required for live runs | **ADAPT THROUGH ADAPTER.** Use only behind the Python service. Keep a deterministic fallback because live runs have cost, latency, and version risk. |
| [MiroFish](https://github.com/666ghj/MiroFish) | Seed-to-world-to-simulation-to-report product workflow | AGPL-3.0; full application/runtime | **REFERENCE ONLY.** Its workflow and replay ideas are useful, but copying or linking code would impose AGPL obligations inappropriate for this independently licensed app. |
| [Vercel AI SDK](https://ai-sdk.dev) | Provider registry and schema-constrained structured output | MIT; Node/edge compatible depending on provider | **ADOPT WHEN LIVE SEMANTIC PROVIDERS ARE ENABLED.** It supports Zod-backed object output. Do not add a provider dependency until keys and the first live semantic task are in scope. |
| [shadcn/ui](https://ui.shadcn.com) | Copy-owned accessible UI primitives | MIT; React/Tailwind | **ADOPT SELECTIVELY.** Use for future accessible primitives; avoid a wholesale visual reset of the working original control-room UI. |
| [Ollama](https://ollama.com) | Local model runtime | Local runtime; operator-managed models | **OPTIONAL ADAPTER.** Suitable for development/self-hosting, not a dependable public demo dependency. |
| Open Graph / oEmbed | Public page and YouTube metadata where allowed | Protocol/provider terms vary | **ADAPT.** Use only allowlisted, bounded fetches with SSRF controls. Platform pages that block extraction must fall back to pasted copy. |

## Recommended reuse map

```text
OASIS         -> optional social simulation foundation
Zod           -> contract and untrusted-output validation
Vercel        -> web deployment
Railway       -> optional Python/OASIS deployment
MiroFish      -> product-flow and visualization reference only
Ollama        -> optional local provider path
```

## Risks checked

- OASIS is active and Apache-2.0, but its strict Python support window makes
  Python 3.11 the deployment baseline.
- MiroFish is AGPL-3.0: no source, assets, or derivative implementation may be
  copied into Content Room without accepting AGPL obligations.
- Structured model output must still be validated at runtime; JSON-only output
  is insufficient.
- Social platforms commonly restrict scraping and authenticated API access.
  Content Room must disclose extraction status and retain manual input.
