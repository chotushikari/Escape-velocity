# Content Room

Content Room is a hackathon demo for pre-publication synthetic audience simulation. Paste social content, choose a platform and audience, and receive reactions from 100 behavioral personas, segment disagreement, and a concrete revised version.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Demo mode

The default simulation is deterministic and works without an API key, so the core demo is reliable offline and on free hosting. It deliberately labels results as simulated behavioral personas, not real survey data.

## Optional provider configuration

Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` (or OpenRouter settings) before adding a live semantic-provider integration. No keys are required for the shipped demo path.

## Project structure

- `app/page.tsx` — interactive product experience
- `app/api/*` — analysis, simulation, and strategy route handlers
- `lib/simulation.ts` — persona creation, deterministic simulation, aggregation, and strategy fallback
- `lib/types.ts` — product data models
