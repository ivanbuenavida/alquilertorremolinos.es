# `@alquiler/beds24` — Beds24 API v2 Channel Manager Package

Zero-dependency TypeScript client and CLI for **Beds24 API v2**, implementing the `ChannelManagerAdapter` contract from `@alquiler/domain`.

Designed so rates, minimum stays, availability, and bookings can be inspected or updated programmatically across connected OTA channels (Booking.com, Vrbo, Airbnb, Expedia, HomeToGo) from one central place.

---

## Features

- Implements `ChannelManagerAdapter` (`healthCheck`, `getDailyRates`, `updateDailyRates`, `getBookings`).
- Supports **single-property** (`BEDS24_ROOM_ID`) and **multi-property** (`BEDS24_ROOM_MAP`) configurations.
- **Safe by default:** `updateDailyRates()` defaults to `dryRun: true` so rate changes are always previewed before writing to live channels.
- Normalizes Beds24 bookings into `@alquiler/domain` `BookingRecord` objects (gross amount, commission, net payout) ready for analytics and tax reporting.

---

## Setup

1. Create a Beds24 account and connect your desired channels (e.g. Booking.com + Vrbo via API; misterb&b via iCal).
2. Generate an **API v2 token** in Beds24 (`Settings > Apps & Integrations > API`).
3. Copy `.env.example` to `.env` (never commit `.env`) and fill in your values:

```env
BEDS24_API_TOKEN=your_beds24_v2_token_here
BEDS24_BASE_URL=https://beds24.com/api/v2
BEDS24_DEFAULT_PROPERTY_ID=torremolinos-centro
BEDS24_ROOM_ID=123456

# Optional multi-property mapping:
# BEDS24_ROOM_MAP={"torremolinos-centro":123456,"second-apartment":789012}
```

---

## Commands

Build packages first from the monorepo root:

```bash
npm run build:packages
```

Then run the CLI (with your environment variables loaded):

```bash
# Check API v2 token and configured properties
npm run beds24:cli -- status

# Fetch nightly rates & availability for a date range
npm run beds24:cli -- rates --from 2027-06-01 --to 2027-06-30 --property torremolinos-centro

# Fetch bookings for revenue/tax reporting
npm run beds24:cli -- bookings --from 2026-01-01 --to 2026-12-31 --property torremolinos-centro
```

---

## Notes on Channel Sync

- **Booking.com, Vrbo, Airbnb, Expedia, HomeToGo:** synced via Beds24 two-way API (rates, minimum stays, and availability).
- **misterb&b:** Beds24 does not have a native two-way API link for misterb&b; connect it using two-way **iCal** inside Beds24 for calendar availability (0 EUR extra fee) and update misterb&b rates manually for peak/event weeks.
