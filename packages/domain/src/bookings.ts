import type { DistributionChannel, PropertyId } from './property.js';
import type { ISODate } from './rates.js';

export type BookingStatus = 'confirmed' | 'cancelled' | 'inquiry' | 'blocked';

export interface BookingRecord {
  id: string;
  propertyId: PropertyId;
  channel: DistributionChannel;
  externalBookingId?: string;
  status: BookingStatus;
  checkIn: ISODate;
  checkOut: ISODate;
  nights: number;
  guests?: number;
  /** Gross amount paid by the guest before platform commissions (EUR). */
  grossAmountEur: number;
  /** Commission charged by the OTA platform (EUR). */
  commissionEur: number;
  /** Net payout received by the host (EUR). */
  netAmountEur: number;
  currency: 'EUR';
}
