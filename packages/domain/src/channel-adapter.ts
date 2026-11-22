import type { BookingRecord } from './bookings.js';
import type { PropertyId } from './property.js';
import type { DailyRate, DateRange, RateUpdate } from './rates.js';

export interface UpdateRatesResult {
  propertyId: PropertyId;
  dryRun: boolean;
  updatedCount: number;
  updates: RateUpdate[];
}

/**
 * Provider-agnostic contract for Channel Manager / PMS integrations
 * (e.g. Beds24, AvaiBook, Smoobu).
 */
export interface ChannelManagerAdapter {
  readonly providerName: string;

  /** Checks connectivity and credentials against the provider API. */
  healthCheck(): Promise<{ ok: boolean; message: string }>;

  /** Fetches nightly rates, minimum stays, and availability for a date range. */
  getDailyRates(propertyId: PropertyId, range: DateRange): Promise<DailyRate[]>;

  /**
   * Pushes rate and/or minimum-stay updates for a property.
   * Implementations MUST support dryRun=true to preview changes safely before writing.
   */
  updateDailyRates(
    propertyId: PropertyId,
    updates: RateUpdate[],
    options?: { dryRun?: boolean }
  ): Promise<UpdateRatesResult>;

  /** Fetches reservations in a date range for availability and financial/tax reporting. */
  getBookings(propertyId: PropertyId, range: DateRange): Promise<BookingRecord[]>;
}
