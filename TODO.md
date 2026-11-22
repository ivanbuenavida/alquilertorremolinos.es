# Manual TODO & Owner Checklist

Action items that require manual login, third-party dashboards, or credentials and could not be executed automatically from the local environment.

---

## 1. Vercel Deployment Verification (Priority: Immediate)

`vercel.json` has been updated and pushed to GitHub (`buildCommand: "npm run build"`, `outputDirectory: "apps/web/dist"`), which triggers an automatic Vercel deployment. Because the Vercel CLI is not installed/authenticated in this local environment, verify the following in the **Vercel Dashboard**:

- [ ] Open the project in Vercel Dashboard → **Deployments** and confirm the latest `master` build succeeded.
- [ ] Go to **Settings → Build and Deployment** and make sure **Root Directory** is empty (`.`) and **Build Command** / **Output Directory** are NOT manually overridden with old values (they should defer to `vercel.json`, or match `npm run build` and `apps/web/dist`).
- [ ] Visit `https://www.alquilertorremolinos.es/` and verify the site loads normally and the calendar scrolls through **December 2027**.

---

## 2. Channel Manager Setup — Beds24 (Priority: High)

- [ ] Sign up for **Beds24** (14-day free trial) and create the property + room unit for `torremolinos-centro`.
- [ ] Connect **Booking.com** in Beds24 (`Settings → Channel Manager → Booking.com`) and authorize Beds24 as Connectivity Provider in Booking.com Extranet.
- [ ] Generate a **Beds24 API v2 token** (`Settings → Apps & Integrations → API`).
- [ ] Copy `packages/beds24/.env.example` to `packages/beds24/.env` and fill in:
  - `BEDS24_API_TOKEN`
  - `BEDS24_ROOM_ID`
- [ ] Test connectivity from the repo root:
  ```bash
  npm run build:packages
  BEDS24_API_TOKEN=... BEDS24_ROOM_ID=... npm run beds24:cli -- status
  ```

---

## 3. OTA Channel Accounts for Torremolinos (Priority: Medium)

- [ ] **Booking.com:** Complete the free **Travel Proud** training (~10 min in Booking Extranet) to enable the LGBTQ+ welcoming badge/filter in Torremolinos.
- [ ] **Vrbo:** Create your listing on Vrbo (automatically distributes to FeWo-direkt in Germany, Abritel in France, and Vrbo UK/NL) and link it in Beds24 via two-way API.
- [ ] **misterb&b:** Create your listing and connect two-way **iCal** links with Beds24 (0 EUR extra channel fee in Beds24) so calendar availability stays synced; set event-week prices (Pride, Mad Bear Beach, Wonder Gay, etc.) in misterb&b.
- [ ] *(Optional later)* Decide whether to add **Airbnb**, **HomeToGo**, or **Expedia** in Beds24 to boost low-season occupancy.

---

## 4. Next Automation Milestones (Once Beds24 Is Connected)

- [ ] Set up the weekly AI pricing review workflow (comparing Torremolinos listings + events) and push approved rates via `@alquiler/beds24` (`dryRun: true` preview first).
- [ ] Decide whether to re-enable live prices on `apps/web` using a Vercel Serverless endpoint (`api/rates.ts`) serving cached Beds24 rates with the **-15% direct discount**.
- [ ] Add `packages/finance` to track deductible expenses, purchases, contractor invoices, and generate the annual Spanish **IRPF / Renta** summary from Beds24 bookings.
