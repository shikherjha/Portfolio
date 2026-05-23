# Backend Deployment

## Services

Use two Railway services from the same repository and Dockerfile.

1. **API service**
   - Builder: Dockerfile
   - Dockerfile path: `backend/Dockerfile`
   - Config file: `railway.json`
   - Start command: leave default
   - Variables:
     - `DATABASE_URL` from the Railway Postgres service
     - `FIRECRAWL_API_KEY` if you want GFG scraping
     - `SOLVED_FLOOR_MAIN=900`
     - `SOLVED_FLOOR_ALT=200`
     - `CRON_SECRET` optional, only needed if using the HTTP refresh endpoint
     - Do not set `SERVICE_ROLE`, or set `SERVICE_ROLE=api`

2. **Cron refresh service**
   - Same repo and Dockerfile path: `backend/Dockerfile`
   - Config file: `railway.cron.json`
   - Start command: leave default
   - Cron schedule suggestion: `0 */6 * * *`
   - Attach the same Railway Postgres service so it receives `DATABASE_URL`
   - Variables:
     - `SERVICE_ROLE=cron` or `service_role=cron`
     - `SOLVED_FLOOR_MAIN=900`
     - `SOLVED_FLOOR_ALT=200`
     - `FIRECRAWL_API_KEY` if you want GFG scraping

## Runtime Logic

The public API route `GET /api/cp-stats/aggregated` reads cached stats from Postgres. If the cache is empty, it performs a one-time live fetch and writes the result.

The Docker image starts through `entrypoint.py`. If `SERVICE_ROLE=cron` or `service_role=cron`, it runs `refresh_stats.py`; otherwise it starts the FastAPI app. The cron service fetches current stats for `main`, `alt`, and `combined`, then updates the `cp_stats_cache` table. This keeps Vercel page loads fast because users normally hit cached data instead of triggering scrapers.

## Local Development

For local DB-backed testing, paste Railway's public Postgres connection string into:

```env
DATABASE_PUBLIC_URL=postgresql://...
```

Railway's private `DATABASE_URL` host only works inside Railway. If `DATABASE_PUBLIC_URL` is blank locally, the backend still runs and falls back to live fetching without persistent cache.

Vercel needs:

```env
VITE_API_URL=https://your-railway-api-domain
VITE_RESUME_URL=https://drive.google.com/file/d/1QoQ5ulen1owO0S8qCClXUdUPqjKBgWR_/view?usp=sharing
```
