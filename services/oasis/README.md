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
5. Deploy, generate a public domain, and wait for `GET /health` to report `ready`.
6. In Vercel, set `SIMULATION_ENGINE=oasis` and `OASIS_SERVICE_URL=https://your-railway-domain` for Production, then redeploy.

The service maps `GROQ_API_KEY` to OASIS's OpenAI-compatible backend using `https://api.groq.com/openai/v1`. If the service is unavailable, Content Room automatically uses its local simulation engine.
