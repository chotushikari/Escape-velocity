# OASIS companion service

This is the actual Python integration point for CAMEL OASIS. Run it on a container host (Railway, Render, Cloud Run, or Fly.io), not inside the Vercel Next.js deployment.

```bash
cd services/oasis
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt
$env:OPENAI_API_KEY="..."
.venv/Scripts/uvicorn app.main:app --reload
```

## Railway deployment

1. Create a Railway project and select **Deploy from GitHub repo**.
2. In the new service's variables, set `RAILWAY_DOCKERFILE_PATH=services/oasis/Dockerfile`.
3. Set `GROQ_API_KEY` to a newly generated Groq key. Do not set it in GitHub, Vercel, or source code.
4. Set `OASIS_MODEL=llama-3.3-70b-versatile` (or another enabled Groq chat model).
5. Deploy, generate a public domain, and wait for `GET /ready` to report `ready`.
6. In Vercel, set `SIMULATION_ENGINE=oasis` and `OASIS_SERVICE_URL=https://your-railway-domain` for Production, then redeploy.

The service maps `GROQ_API_KEY` to OASIS's OpenAI-compatible backend using `https://api.groq.com/openai/v1`. If the service is unavailable, returns an invalid payload, or cannot expose genuine OASIS action telemetry, Content Room automatically uses its local simulation engine.

`GET /health` is a liveness/configuration check. `GET /ready` returns HTTP 200 only when OASIS is installed and a model key is available; configure Railway's health check to use `/ready`.

`POST /simulate` returns `{ engine: "OASIS", audienceId, events }`. Action values are read from OASIS persistence. OASIS does not natively emit Content Room's attention, clarity, trust, or intent fields, so those are deterministic, documented mappings of the observed action. They are simulated signals, not measured human outcomes.

## No-key verification

The container includes no-key contract checks; they do not call a model or run OASIS:

```bash
python -m unittest discover services/oasis/tests
```
