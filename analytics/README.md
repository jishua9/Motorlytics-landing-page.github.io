# Analytics (self-hosted Umami)

The site is already wired for Umami. The tracking script in `app/layout.tsx`
only renders when two build-time repo Variables are set, so **nothing tracks
until you finish the steps below**. `NEXT_PUBLIC_*` values are public (they ship
in the page), so use repo **Variables**, not Secrets.

## 1. Run Umami on the homelab

```bash
# on the homelab, next to docker-compose.yml
printf 'DB_PASSWORD=%s\nAPP_SECRET=%s\n' \
  "$(openssl rand -hex 16)" "$(openssl rand -base64 32)" > .env
docker compose up -d
```

Umami is now on `http://<homelab>:3000`. Log in with `admin` / `umami` and
change the password immediately (Settings -> Profile).

## 2. Add the website

Settings -> Websites -> Add website -> name it and set the domain to
`motorlytics.com.au`. Copy the generated **Website ID** (a UUID) — you need it
in step 4.

## 3. Expose it on a NEUTRAL first-party subdomain (Cloudflare Tunnel)

Serve Umami from a subdomain of motorlytics.com.au so the tracker is
first-party. **Do not** use `analytics.` / `stats.` / `metrics.` — ad-blocker
lists match those keywords. Use something neutral like `t.motorlytics.com.au`.

With a Cloudflare Tunnel (cloudflared) already on the homelab:

```bash
cloudflared tunnel route dns <tunnel-name> t.motorlytics.com.au
# map the hostname to the local service in your tunnel config:
#   ingress:
#     - hostname: t.motorlytics.com.au
#       service: http://localhost:3000
#     - service: http_status:404
```

Now `https://t.motorlytics.com.au/p.js` serves the (renamed) tracker.

## 4. Switch it on in the site

Repo Settings -> Secrets and variables -> Actions -> **Variables** -> New:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_UMAMI_SRC` | `https://t.motorlytics.com.au/p.js` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | `<the UUID from step 2>` |

Then re-run the **Deploy to GitHub Pages** workflow (Actions tab -> Run
workflow), or push any commit. The build bakes the values in and the tracker
starts reporting. Verify in the Umami dashboard (Realtime) by loading the site.

## 5. Optional: defeat the last of the ad-blockers

The neutral subdomain + renamed `/p.js` already dodges most filters, but the
collect endpoint is still `/api/send`, which some strict lists catch. To also
rename the endpoint, put a small reverse proxy (Cloudflare Worker or Nginx) in
front of Umami that serves the script under a custom name and rewrites the
collect path. Reference implementation:
https://github.com/elliott-diy/Umami-Proxy

## Maintenance

- Upgrade: `docker compose pull && docker compose up -d` (Umami runs its DB
  migrations automatically on start).
- Backup: it's a single Postgres volume (`umami-db`) — `pg_dump` it on a cron.
