# `@alquiler/domain` — Shared Vacation Rental Domain Models

Zero-dependency TypeScript package containing the core domain types, pricing helpers, and provider-agnostic interfaces shared across all apps and packages in the monorepo.

Everything is scoped by `propertyId` so the repository supports **multiple tourist rental properties** natively.

---

## Modules

- **`property.ts`**: `PropertyId`, `Property`, `DistributionChannel`, `ChannelSyncMode`, `PropertyChannelMapping`.
- **`rates.ts`**: `ISODate`, `DateRange`, `DailyRate`, `RateUpdate`, `DirectPricingPolicy`, and `calculateDirectRate()` (e.g. applying the `-15%` direct-booking discount with an optional floor price).
- **`bookings.ts`**: `BookingStatus`, `BookingRecord` (including gross revenue, platform commission, and net payout).
- **`finance.ts`**: `ExpenseCategory`, `ExpenseRecord` (with `prorateByRentedDays` for Spanish IRPF / Renta), `VendorContract` (cleaning, maintenance, utilities, software), and `AnnualTaxSummary`.
- **`channel-adapter.ts`**: `ChannelManagerAdapter` interface implemented by channel manager packages such as `@alquiler/beds24`.

---

## Commands

```bash
# Build TypeScript declarations and ESM output to dist/
npm run build --workspace=@alquiler/domain

# Typecheck without emitting files
npm run typecheck --workspace=@alquiler/domain
```

---

## Usage Example

```ts
import { calculateDirectRate, type DailyRate } from '@alquiler/domain';

const bookingRate: DailyRate = {
  propertyId: 'torremolinos-centro',
  date: '2027-07-15',
  price: 180,
  currency: 'EUR',
  minNights: 5,
  available: true,
};

const directPriceEur = calculateDirectRate(bookingRate.price, {
  discountPercent: 15,
  floorPriceEur: 70,
});
// -> 153 EUR
```
