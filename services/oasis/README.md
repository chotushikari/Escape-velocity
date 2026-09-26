# OASIS companion service

This is the actual Python integration point for CAMEL OASIS. Run it on a container host (Railway, Render, Cloud Run, or Fly.io), not inside the Vercel Next.js deployment.

```bash
cd services/oasis
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt
$env:OPENAI_API_KEY="..."
.venv/Scripts/uvicorn app.main:app --reload
```

Set `SIMULATION_ENGINE=oasis` and `OASIS_SERVICE_URL` in the web deployment. If this service is unavailable, Content Room automatically uses its local simulation engine.
