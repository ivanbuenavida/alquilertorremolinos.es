import type {
  BookingRecord,
  ChannelManagerAdapter,
  DailyRate,
  DateRange,
  DistributionChannel,
  PropertyId,
  RateUpdate,
  UpdateRatesResult,
} from '@alquiler/domain';
import type { Beds24Config } from './config.js';

interface Beds24CalendarDay {
  from?: string;
  to?: string;
  price1?: number;
  minStay?: number;
  numAvail?: number;
}

interface Beds24BookingApiItem {
  id?: number | string;
  channel?: string;
  apiReference?: string;
  status?: string;
  arrival?: string;
  departure?: string;
  numAdult?: number;
  numChild?: number;
  price?: number;
  commission?: number;
}

function mapBeds24Channel(raw?: string): DistributionChannel {
  const normalized = (raw ?? '').toLowerCase();
  if (normalized.includes('booking')) return 'booking';
  if (normalized.includes('vrbo') || normalized.includes('homeaway') || normalized.includes('fewo')) return 'vrbo';
  if (normalized.includes('airbnb')) return 'airbnb';
  if (normalized.includes('expedia')) return 'expedia';
  if (normalized.includes('mister')) return 'misterbnb';
  if (normalized.includes('hometogo')) return 'hometogo';
  if (normalized.includes('holidu')) return 'holidu';
  if (!normalized || normalized.includes('direct')) return 'direct';
  return 'other';
}

function daysBetween(checkIn: string, checkOut: string): number {
  const start = Date.parse(checkIn);
  const end = Date.parse(checkOut);
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 0;
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

export class Beds24Client implements ChannelManagerAdapter {
  readonly providerName = 'beds24';
  private readonly config: Beds24Config;

  constructor(config: Beds24Config) {
    this.config = config;
  }

  private getRoomId(propertyId: PropertyId): number {
    const roomId = this.config.roomMap[propertyId];
    if (!roomId) {
      throw new Error(
        `No Beds24 roomId configured for property "${propertyId}". Check BEDS24_ROOM_ID or BEDS24_ROOM_MAP.`
      );
    }
    return roomId;
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    if (!this.config.apiToken) {
      throw new Error('Missing BEDS24_API_TOKEN. Configure your environment before calling Beds24 API v2.');
    }

    const response = await fetch(`${this.config.baseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        token: this.config.apiToken,
        ...(init?.headers ?? {}),
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Beds24 API error (${response.status}): ${errorBody}`);
    }

    return (await response.json()) as T;
  }

  async healthCheck(): Promise<{ ok: boolean; message: string }> {
    if (!this.config.apiToken) {
      return {
        ok: false,
        message: 'BEDS24_API_TOKEN is not set. Add it to your environment to enable Beds24 API v2.',
      };
    }

    try {
      await this.request('/authentication/details');
      return { ok: true, message: 'Connected to Beds24 API v2 successfully.' };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async getDailyRates(propertyId: PropertyId, range: DateRange): Promise<DailyRate[]> {
    const roomId = this.getRoomId(propertyId);
    const params = new URLSearchParams({
      roomId: String(roomId),
      startDate: range.from,
      endDate: range.to,
      includePrices: 'true',
      includeMinStay: 'true',
      includeNumAvail: 'true',
    });

    const payload = await this.request<{ data?: Array<{ calendar?: Beds24CalendarDay[] }> }>(
      `/inventory/rooms/calendar?${params.toString()}`
    );

    const calendarEntries = payload.data?.[0]?.calendar ?? [];
    const results: DailyRate[] = [];

    for (const entry of calendarEntries) {
      if (!entry.from) continue;
      const start = new Date(`${entry.from}T00:00:00Z`);
      const end = new Date(`${(entry.to ?? entry.from)}T00:00:00Z`);

      for (let cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
        const isoDate = cursor.toISOString().slice(0, 10);
        results.push({
          propertyId,
          date: isoDate,
          price: Number(entry.price1 ?? 0),
          currency: 'EUR',
          minNights: Number(entry.minStay ?? 1),
          available: Number(entry.numAvail ?? 0) > 0,
        });
      }
    }

    return results;
  }

  async updateDailyRates(
    propertyId: PropertyId,
    updates: RateUpdate[],
    options: { dryRun?: boolean } = {}
  ): Promise<UpdateRatesResult> {
    const dryRun = options.dryRun ?? true;
    const roomId = this.getRoomId(propertyId);

    if (dryRun || updates.length === 0) {
      return {
        propertyId,
        dryRun: true,
        updatedCount: updates.length,
        updates,
      };
    }

    const calendarPayload = updates.map((item) => ({
      from: item.date,
      to: item.date,
      ...(item.price !== undefined ? { price1: item.price } : {}),
      ...(item.minNights !== undefined ? { minStay: item.minNights } : {}),
      ...(item.available !== undefined ? { numAvail: item.available ? 1 : 0 } : {}),
    }));

    await this.request('/inventory/rooms/calendar', {
      method: 'POST',
      body: JSON.stringify([{ roomId, calendar: calendarPayload }]),
    });

    return {
      propertyId,
      dryRun: false,
      updatedCount: updates.length,
      updates,
    };
  }

  async getBookings(propertyId: PropertyId, range: DateRange): Promise<BookingRecord[]> {
    const roomId = this.getRoomId(propertyId);
    const params = new URLSearchParams({
      roomId: String(roomId),
      arrivalFrom: range.from,
      arrivalTo: range.to,
    });

    const payload = await this.request<{ data?: Beds24BookingApiItem[] }>(
      `/bookings?${params.toString()}`
    );

    return (payload.data ?? []).map((item) => {
      const checkIn = item.arrival ?? '';
      const checkOut = item.departure ?? '';
      const grossAmountEur = Number(item.price ?? 0);
      const commissionEur = Number(item.commission ?? 0);

      return {
        id: String(item.id ?? ''),
        propertyId,
        channel: mapBeds24Channel(item.channel),
        externalBookingId: item.apiReference,
        status: item.status === 'cancelled' ? 'cancelled' : 'confirmed',
        checkIn,
        checkOut,
        nights: daysBetween(checkIn, checkOut),
        guests: Number(item.numAdult ?? 0) + Number(item.numChild ?? 0),
        grossAmountEur,
        commissionEur,
        netAmountEur: Math.max(0, grossAmountEur - commissionEur),
        currency: 'EUR',
      };
    });
  }
}
