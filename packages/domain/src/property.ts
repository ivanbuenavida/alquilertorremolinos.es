/** Unique internal slug identifying a rental property (e.g. "torremolinos-centro"). */
export type PropertyId = string;

/** Supported distribution channels for tourist rentals. */
export type DistributionChannel =
  | 'direct'
  | 'booking'
  | 'vrbo'
  | 'misterbnb'
  | 'airbnb'
  | 'expedia'
  | 'hometogo'
  | 'holidu'
  | 'other';

/** How a channel syncs with the central channel manager. */
export type ChannelSyncMode = 'api' | 'ical' | 'manual';

export interface PropertyChannelMapping {
  channel: DistributionChannel;
  externalListingId?: string;
  syncMode: ChannelSyncMode;
  /** Optional markup percentage applied to this channel relative to the direct base rate. */
  markupPercent?: number;
  enabled: boolean;
}

export interface Property {
  id: PropertyId;
  name: string;
  city: string;
  country: string;
  currency: 'EUR';
  maxGuests: number;
  bedrooms: number;
  touristLicenseId?: string;
  channels: PropertyChannelMapping[];
}
