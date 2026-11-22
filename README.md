# Vacation Rental Monorepo (`alquilertorremolinos.es`)

Scalable **npm workspaces** monorepo for managing tourist rental properties end-to-end: public direct-booking websites, channel manager integrations, dynamic pricing workflows, occupancy/revenue analytics, expense & vendor tracking, and annual tax preparation (Spanish IRPF / Renta).

The architecture is **multi-property from day one**—every domain entity is scoped by `propertyId` so additional apartments can be added without refactoring existing apps or integrations.

---

## Repository Layout

```text
alquilertorremolinos.es/
├── package.json              # Root npm workspaces ("apps/*", "packages/*") and root scripts
├── vercel.json               # Production deployment config for apps/web (output: apps/web/dist)
├── apps/
│   ├── web/                  # Public direct-booking website (alquilertorremolinos.es)
│   └── [admin/]              # Planned: private intranet (rates, stats, expenses, tax export, properties)
└── packages/
    ├── domain/               # Shared multi-property models & provider-agnostic interfaces
    ├── beds24/               # Beds24 API v2 channel manager adapter & CLI
    ├── [pricing/]            # Planned: weekly market-based pricing advisor & direct -15% calculator
    └── [finance/]            # Planned: occupancy/RevPAR analytics, expenses, vendor contracts & IRPF/Renta summary
```

### Active Workspaces

| Workspace | Package Name | Purpose | Documentation |
|---|---|---|---|
| `apps/web` | `@alquiler/web` | Public landing page & availability calendar SPA (Lit + Vite + Bootstrap 5) | [apps/web/README.md](./apps/web/README.md) |
| `packages/domain` | `@alquiler/domain` | Shared TypeScript types (`Property`, `DailyRate`, `BookingRecord`, `ExpenseRecord`, `VendorContract`, `AnnualTaxSummary`, `ChannelManagerAdapter`) | [packages/domain/README.md](./packages/domain/README.md) |
| `packages/beds24` | `@alquiler/beds24` | Beds24 API v2 client & CLI for reading/pushing rates, minimum stays, and bookings | [packages/beds24/README.md](./packages/beds24/README.md) |

### Project Context & Planning Docs

- **[.agent/architecture.md](./.agent/architecture.md)**: Architecture Decision Records (ADRs), domain rationale, and working guidelines for developers and AI agents.
- **[.agent/changelog.md](./.agent/changelog.md)**: Chronological record of project milestones and structural changes.
- **[TODO.md](./TODO.md)**: Pending manual owner actions (Vercel dashboard check, Beds24 onboarding, OTA setup).

---

## Quick Start & Root Commands

Requires **Node.js 20+** and **npm 10+**.

```bash
# Install all workspace dependencies
npm install

# Run the public website locally (apps/web)
npm run dev

# Build the public website (used by Vercel -> apps/web/dist)
npm run build

# Build all shared packages (domain, beds24, ...)
npm run build:packages

# Build packages + public website
npm run build:all

# Typecheck all packages
npm run typecheck

# Run website i18n unit tests
npm run test:i18n

# Run Beds24 CLI (after npm run build:packages)
npm run beds24:cli -- status
```

---

## Distribution & Pricing Strategy (Torremolinos)

### Channel Priority & Estimated Market Share (Costa del Sol Apartments)

| Priority | Channel | Sync with Beds24 | Notes |
|---|---|---|---|
| **1 (Essential)** | **Booking.com** *(enable Travel Proud badge)* | Two-way API (rates + calendar) | ~45–55% of OTA demand in Torremolinos across UK, NL, DE, FR, Nordics, and Spain. |
| **2 (Recommended)** | **Vrbo** *(distributes to FeWo-direkt, Abritel, Vrbo UK/NL)* | Two-way API (rates + calendar) | ~8–12% share; strong family demand from Germany, France, UK, and Netherlands with longer stays. |
| **3 (Niche High-Yield)** | **misterb&b** | iCal (calendar only; manual rates) | Key LGBTQ+ platform in Torremolinos; high ROI during local festivals (Pride, Mad Bear Beach, Wonder Gay, Delice Dream, Matrix). 0 EUR extra Beds24 channel fee. |
| **4 (Optional High-Volume)** | **Airbnb** | Two-way API (rates + calendar) | ~25–35% share; strong lever if higher winter/low-season occupancy is needed. |
| **5 (Optional Extra)** | **HomeToGo** / **Expedia** | Two-way API (rates + calendar) | HomeToGo for DE/NL/BE; Expedia for UK flight+stay packages. |

> **Recommended starter stack:** **Beds24 + Booking.com + Vrbo + misterb&b** (~19.20 EUR/month in Beds24 fees, 0% channel manager commission).

### Direct Booking Pricing (`-15%`) & Weekly Rate Workflow

1. **Single source of truth:** Beds24 centralizes calendar availability and OTA base rates across connected channels.
2. **Direct website discount:** Direct bookings via `alquilertorremolinos.es` avoid OTA commissions, so direct rates apply a **-15% discount** relative to Booking.com (`calculateDirectRate` in `@alquiler/domain`). Under the EU Digital Markets Act (DMA), narrow rate parity clauses no longer prevent lower direct prices in Spain/EU.
3. **Weekly AI-assisted rate review (no PriceLabs needed for 1 unit):** Every week, comparable apartments in Torremolinos and upcoming local events/holidays are reviewed to propose updated nightly rates. Once approved, updates are pushed via `@alquiler/beds24` (always previewed with `dryRun: true` first).
4. **Future web price sync:** When ready to display live prices on `apps/web`, add a Vercel Serverless endpoint under `api/rates.ts` that reads cached rates from `@alquiler/beds24` server-side (keeping API tokens private) and returns the `-15%` direct rates.

---

## Vercel Deployment

[vercel.json](./vercel.json) is pre-configured for the monorepo:

- **Build Command:** `npm run build` (runs `@alquiler/web` build)
- **Output Directory:** `apps/web/dist`
- **SPA Rewrites:** All non-file routes rewrite to `/index.html`, while `/api/*` is reserved for future Vercel Serverless Functions.

> If Vercel Dashboard project settings override *Build Command* or *Output Directory*, leave them unset (or match `vercel.json`) so Vercel reads `vercel.json` directly.

Future apps (such as `apps/admin` or a second property site) can be deployed as separate Vercel projects pointing to the same Git repository with their own build command and output directory.

---

## Conventions for Scaling the Monorepo

1. **Keep apps isolated:** Public websites and internal dashboards live under `apps/<app-name>` and must not couple directly to provider-specific code.
2. **Share contracts via `@alquiler/domain`:** Every new package (`packages/pricing`, `packages/finance`, `packages/avaibook`, etc.) should depend on `@alquiler/domain` so data models stay consistent across properties, bookings, expenses, vendor contracts, and tax reports.
3. **No secrets in Git:** Every app or package using external credentials provides a `.env.example` file; real `.env` files are gitignored.
4. **Dedicated documentation:** Every app under `apps/*` and every package under `packages/*` must maintain its own `README.md`.
5. **Safe mutations by default:** Any script or adapter that writes live OTA prices or calendar availability must default to `dryRun: true` until explicitly confirmed.

---

## Roadmap

- [x] Monorepo setup (`apps/web`, `packages/domain`, `packages/beds24`) without altering public website source code
- [ ] Connect live Beds24 API v2 credentials and sync Booking.com + Vrbo + misterb&b (iCal)
- [ ] Weekly competitor & event pricing advisor (`packages/pricing`)
- [ ] Expense ledger, vendor/contractor registry, occupancy stats, and annual Spanish IRPF/Renta exporter (`packages/finance`)
- [ ] Private admin dashboard (`apps/admin`) and optional multi-property onboarding
