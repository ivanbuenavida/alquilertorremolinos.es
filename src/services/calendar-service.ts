import { pricingConfig } from '../config/pricing-config';

export interface CalendarEvent {
  start: string;
  end: string;
  summary: string;
}

export interface DayInfo {
  date: Date;
  isBusy: boolean;
  price: number;
  season: 'low' | 'mid' | 'high';
  isCurrentMonth: boolean;
  isToday: boolean;
}

export class CalendarService {
  // ⚠️ PASTE YOUR GOOGLE CALENDAR DATA HERE
  // These keys are restricted by domain in the Google Cloud Console.
  private static API_KEY = 'AIzaSyAaIkxaKDZnma_1mfYJXZ0TXISiL3NrE5o';
  private static CALENDAR_ID = 'c_d03a807d6b2067a8380983f831efe4cba0a5b5340d7044bc47a9c03e6283c703@group.calendar.google.com';

  private static _eventCache: { [key: string]: CalendarEvent[] } = {};

  static async getBusyDays(start: Date, end: Date): Promise<CalendarEvent[]> {
    if (!this.API_KEY || !this.CALENDAR_ID || this.API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn('Google Calendar API Key or ID not properly configured. Using mock data.');
      return this.getMockBusyDays(start, end);
    }

    // Cache key based on month/year to avoid redundant calls
    const cacheKey = `${start.getFullYear()}-${start.getMonth()}-${end.getFullYear()}-${end.getMonth()}`;
    if (this._eventCache[cacheKey]) return this._eventCache[cacheKey];

    try {
      // We set time to 00:00:00Z for consistency
      const timeMin = start.toISOString();
      const timeMax = end.toISOString();
      
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.CALENDAR_ID)}/events?key=${this.API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const events = data.items.map((item: any) => ({
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date,
        summary: item.summary
      }));

      this._eventCache[cacheKey] = events;
      return events;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [];
    }
  }

  static getPriceAndSeasonForDate(date: Date): { price: number, season: 'low' | 'mid' | 'high' } {
    const month = date.getMonth(); // 0-indexed
    const dayOfWeek = date.getDay(); // 0 is Sunday
    
    // Check if it's a holiday
    const specificDateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const recurringDateString = specificDateString.substring(5); // MM-DD
    const isHoliday = pricingConfig.holidays.includes(specificDateString) || 
                      pricingConfig.holidays.includes(recurringDateString);

    let price = pricingConfig.basePrice;
    let season: 'low' | 'mid' | 'high' = 'low';

    // Determine seasonal base price
    if (isHoliday || pricingConfig.highSeasonMonths.includes(month)) {
      price = price * pricingConfig.highSeasonMultiplier;
      season = 'high';
    } else if (pricingConfig.midSeasonMonths.includes(month)) {
      price = price * pricingConfig.midSeasonMultiplier;
      season = 'mid';
    }

    // Weekend surcharge (or if holiday, charge as weekend)
    if (isHoliday || dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
      price = price * pricingConfig.weekendMultiplier;
    }

    return { price: Math.round(price), season };
  }

  private static getMockBusyDays(_start: Date, _end: Date): CalendarEvent[] {
    // Generate some mock busy days for demonstration
    const busyDays: CalendarEvent[] = [];
    const today = new Date();
    
    // Add a 5-day booking starting in 3 days
    const start1 = new Date(today);
    start1.setDate(today.getDate() + 3);
    const end1 = new Date(start1);
    end1.setDate(start1.getDate() + 5);

    busyDays.push({
      start: start1.toISOString().split('T')[0],
      end: end1.toISOString().split('T')[0],
      summary: 'Reserved'
    });

    // Add another booking next month
    const start2 = new Date(today);
    start2.setMonth(today.getMonth() + 1);
    start2.setDate(10);
    const end2 = new Date(start2);
    end2.setDate(start2.getDate() + 4);

    busyDays.push({
      start: start2.toISOString().split('T')[0],
      end: end2.toISOString().split('T')[0],
      summary: 'Reserved'
    });

    return busyDays;
  }
}
