# Changelog - Alquiler Torremolinos

## [2026-11-22] - Scalable Monorepo Restructuring & 2027 Calendar Opening

### Added
- **Monorepo Workspaces (`npm workspaces`):** Reorganized repository into `apps/*` and `packages/*` to support multiple apps, channel managers, analytics, expenses/contractors, and future properties.
- **`@alquiler/domain` (`packages/domain`):** Added zero-dependency multi-property domain models (`Property`, `DailyRate`, `calculateDirectRate`, `BookingRecord`, `ExpenseRecord` with IRPF proration flag, `VendorContract`, `AnnualTaxSummary`, and `ChannelManagerAdapter`).
- **`@alquiler/beds24` (`packages/beds24`):** Added Beds24 API v2 adapter and CLI (`status`, `rates`, `bookings`) with safe `dryRun: true` default for rate updates and multi-property `BEDS24_ROOM_MAP` support.
- **Dedicated Documentation:** Added root monorepo `README.md`, per-workspace READMEs (`apps/web/README.md`, `packages/domain/README.md`, `packages/beds24/README.md`), `.agent/architecture.md` (ADRs & agent guidelines), and `TODO.md` (manual owner actions).

### Changed
- **Calendar Availability Window:** Extended online calendar limit from September 30, 2026 to **December 31, 2027** across `calendar-view.ts` and all 9 language translation files.
- **Public Web Relocation:** Moved existing website verbatim into `apps/web/` without modifying application source code.
- **Vercel Configuration:** Updated `vercel.json` to deploy `apps/web/dist` via root `npm run build`.

---

## [2026-02-28] - Premium Booking Experience & Theming

### Added
- **Google Calendar Integration:** Created `CalendarService` to fetch availability from the Google Calendar API.
- **Dynamic Pricing:** Implemented logic to calculate daily prices based on seasonality (high/mid season) and weekend surcharges.
- **Premium Calendar Component:** Built `CalendarView` from scratch using Lit and CSS Grid, featuring an Airbnb-inspired aesthetic.
- **Brand Identity:** Integrated `logo.svg` into the navbar.
- **Modern Typography:** Added Google Font "Outfit" for a cleaner, more premium feel.
- **Environment Configuration:** Added `.env.example` to manage API keys and Calendar IDs.

### Changed
- **Airbnb-style Layout:** Updated `my-app.ts` with a more professional structure.
- **Theming System:** Refactored CSS to use CSS variables (`:root`) based on the colors extracted from `logo.svg` (#1D7874, #CE7D55, #003D4D).
- **Component Refactoring:** `AvailabilityCalendar` now uses the new `CalendarView` instead of static placeholders.

### Technical Improvements
- **Componentization:** All new UI elements are fully modular.
- **Global Theme Support:** The entire application's color scheme can now be changed by modifying a few variables in `index.css`.
