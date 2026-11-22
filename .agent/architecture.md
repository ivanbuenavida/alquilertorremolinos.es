# Architecture & Decisions (`.agent/architecture.md`)

This document captures **why** the repository is structured the way it is so any future developer or AI agent can understand the project goals, constraints, and technical decisions without needing prior chat history.

---

## 1. Project Vision

This repository started as a single landing page for a vacation apartment in Torremolinos (`alquilertorremolinos.es`), and is now structured as a **scalable vacation-rental monorepo** intended to grow into a complete owner toolkit covering:

1. **Public direct-booking website(s)** (`apps/web`, and potentially additional property sites).
2. **Channel manager & OTA distribution** (`packages/beds24`, behind a provider-agnostic interface in `packages/domain`).
3. **Pricing automation** (weekly market/event suggestions approved by the owner + `-15%` direct-booking discount relative to Booking.com).
4. **Property operations & finance** (future `packages/finance` + `apps/admin` for occupancy/RevPAR statistics, deductible expenses, purchases, contractor/vendor management, and Spanish IRPF / Renta annual tax summaries).
5. **Multi-property support** (all domain models require `propertyId` from day one so adding a second apartment requires config, not a rewrite).

---

## 2. Key Architecture Decisions (ADRs)

### ADR-001: Native npm Workspaces (`apps/*` + `packages/*`)
- **Decision:** Use native `npm workspaces` with `apps/*` for deployable applications and `packages/*` for reusable libraries/CLIs.
- **Why:** Zero extra build-system tooling overhead (no Nx/Turborepo needed at this scale), standard industry layout, clean isolation between the public website and backend/CLI packages, and easy independent deployment of future apps (e.g. `apps/admin`) on Vercel.

### ADR-002: Public Website (`apps/web`) Kept Unmodified
- **Decision:** Move the existing Lit + Vite + Bootstrap 5 app verbatim into `apps/web/` and update `vercel.json` (`outputDirectory: "apps/web/dist"`, `buildCommand: "npm run build"`).
- **Why:** Protects production stability while enabling monorepo expansion. `vercel.json` also reserves `/api/*` in its SPA rewrite rule so future Vercel Serverless endpoints (e.g. `/api/rates` fetching cached Beds24 rates without exposing API keys to the browser) can be added cleanly.

### ADR-003: Provider-Agnostic Domain Layer (`@alquiler/domain`)
- **Decision:** Centralize shared TypeScript types (`Property`, `DailyRate`, `BookingRecord`, `ExpenseRecord`, `VendorContract`, `AnnualTaxSummary`) and `ChannelManagerAdapter` inside `packages/domain`.
- **Why:** Prevents lock-in to any single channel manager (Beds24 today, AvaiBook/Smoobu/etc. if ever switched) and ensures finance, pricing, admin, and channel packages speak the same multi-property schema.

### ADR-004: Beds24 API v2 as Central Channel Manager (`@alquiler/beds24`)
- **Decision:** Integrate with **Beds24 API v2** instead of scraping Booking.com or building a custom OTA scraper.
- **Why:**
  - Booking.com and Airbnb restrict Connectivity APIs to certified partners; scraping Extranet portals breaks frequently (2FA/CAPTCHA/DOM changes), violates ToS (account ban risk), and risks publishing wrong instant-book prices.
  - Beds24 is the lowest-cost certified channel manager for 1 unit (~18–20 EUR/month, 0% booking commission, ~0.65 EUR/month per extra channel) and includes an open REST API v2 in the base plan—ideal for AI-assisted rate updates via CLI/API.
  - Direct Booking.com iCal only syncs blocked dates, never prices; Beds24 unifies both calendar and rates across channels.

### ADR-005: Weekly AI-Assisted Pricing Instead of Paid Dynamic Pricing (PriceLabs)
- **Decision:** Do not pay for PriceLabs initially; instead use weekly AI-assisted research on Torremolinos comparable listings and local events, then push owner-approved rate updates through `@alquiler/beds24`.
- **Why:** For a single apartment, owner-approved weekly adjustments save ~240 EUR/year while still keeping rates competitive. `updateDailyRates()` in `@alquiler/beds24` defaults to `dryRun: true` as a safety guardrail against accidental live rate overwrites.

### ADR-006: Torremolinos Channel Mix
- **Decision:** Prioritize **Booking.com** (with free *Travel Proud* badge), **Vrbo** (automatically syndicates to FeWo-direkt, Abritel, Vrbo UK/NL), and **misterb&b** (connected via two-way iCal at 0 EUR extra Beds24 fee, high yield during Torremolinos LGBTQ+ festivals). **Airbnb**, **HomeToGo**, and **Expedia** remain optional add-ons if additional low-season fill is needed.

---

## 3. Current State of `apps/web` Pricing & Calendar

- **Calendar booking window:** Open from today through **December 31, 2027** (`apps/web/src/components/calendar/calendar-view.ts`).
- **Availability sync:** Currently reads occupied dates from two Google Calendars (personal + imported Booking.com iCal) via `apps/web/src/services/calendar-service.ts`.
- **Pricing visibility:** Prices are intentionally **hidden** in the public UI (since commit `1014664`); `apps/web/src/config/pricing-config.ts` is only used internally for dynamic minimum-stay validation and GA4 analytics until live `-15%` direct pricing via Beds24 is enabled.

---

## 4. Working Guidelines for Future Agents

1. **Language policy:** All code, comments, identifiers, READMEs, `.agent/` docs, and commit messages MUST be in **English**.
2. **Never commit secrets:** Keep API keys/tokens in gitignored `.env` files and document required variables in `.env.example`.
3. **Preserve `apps/web` stability:** Always run `npm run build:all`, `npm run typecheck`, and `npm run test:i18n` before committing.
4. **Dry-run first for live rates:** Never call `Beds24Client.updateDailyRates(..., { dryRun: false })` without first previewing the exact dates/prices and getting explicit owner confirmation.
5. **Keep docs synchronized:** When adding a new app or package, create its own `README.md` and register it in the root `README.md` and `.agent/changelog.md`.
