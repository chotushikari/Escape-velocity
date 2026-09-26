# Railway + Groq deployment

Deploy the `services/oasis` Docker service from this repository on Railway. Configure the Dockerfile path as `services/oasis/Dockerfile`; Railway supports a custom Dockerfile path through `RAILWAY_DOCKERFILE_PATH`.

Set these Railway variables:

| Variable | Value |
| --- | --- |
| `RAILWAY_DOCKERFILE_PATH` | `services/oasis/Dockerfile` |
| `GROQ_API_KEY` | A newly generated secret from Groq Console |
| `OASIS_MODEL` | `llama-3.3-70b-versatile` |

After Railway exposes a public domain, visit `/health`. Then set these Vercel Production variables:

| Variable | Value |
| --- | --- |
| `SIMULATION_ENGINE` | `oasis` |
| `OASIS_SERVICE_URL` | Your Railway service URL, without a trailing slash |

Never commit a provider key. Rotate any key that has been pasted into a chat or committed to a repository.
