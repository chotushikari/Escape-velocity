# Deployment

## Demo-only deployment

Deploy the Next.js app to Vercel with no environment variables. The deterministic
demo and local fallback remain fully usable without OASIS or any model API.

## Optional live OASIS deployment

1. Create a Railway service from this repository.
2. Configure its Dockerfile path as `services/oasis/Dockerfile`.
3. Set `GROQ_API_KEY` only in Railway and set
   `OASIS_MODEL=llama-3.3-70b-versatile` (or an enabled compatible model).
4. Deploy and generate a public domain. Confirm `GET /ready` returns 200.
5. In Vercel Production variables, set `SIMULATION_ENGINE=oasis` and
   `OASIS_SERVICE_URL=https://your-railway-domain`.
6. Redeploy Vercel and test the UI. Any service error must return the local
   fallback rather than expose an OASIS failure to the creator.

## Safety

- Never place provider keys in Git, Vercel client variables, or content input.
- Rotate a key that was pasted into a chat.
- Do not enable generic server-side URL fetching until allowlists, DNS/IP checks,
  size limits, timeouts, and content-type checks are implemented.
