import type { PropertyId } from './property.js';

/** Calendar date formatted as YYYY-MM-DD in local property timezone. */
export type ISODate = string;

export interface DateRange {
  from: ISODate;
  to: ISODate;
}

export interface DailyRate {
  propertyId: PropertyId;
  date: ISODate;
  /** Standard OTA price per night (e.g. Booking.com base rate) in EUR. */
  price: number;
  currency: 'EUR';
  minNights: number;
  available: boolean;
}

export interface RateUpdate {
  date: ISODate;
  price?: number;
  minNights?: number;
  available?: boolean;
}

export interface DirectPricingPolicy {
  /** Percentage discount on the direct website relative to OTA prices (e.g. 15 = -15%). */
  discountPercent: number;
  /** Optional minimum floor price in EUR to prevent accidental underpricing. */
  floorPriceEur?: number;
}

/**
 * Computes the direct-booking nightly rate from an OTA rate.
 */
export function calculateDirectRate(
  otaPriceEur: number,
  policy: DirectPricingPolicy
): number {
  const discounted = Math.round(otaPriceEur * (1 - policy.discountPercent / 100));
  if (policy.floorPriceEur !== undefined) {
    return Math.max(discounted, policy.floorPriceEur);
  }
  return discounted;
}
