import { pricingService, type Season } from './pricing-service';

export interface CalendarEvent {
  start: string;
  end: string;
}

export interface DayInfo {
  date: Date;
  isBusy: boolean;
  price: number;
  season: Season;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

export interface CalendarProvider {
  getBusyDays(start: Date, end: Date): Promise<CalendarEvent[]>;
}

export class GoogleCalendarProvider implements CalendarProvider {
  private static API_KEY = 'AIzaSyAaIkxaKDZnma_1mfYJXZ0TXISiL3NrE5o';
  private static CALENDAR_ID = 'c_d03a807d6b2067a8380983f831efe4cba0a5b5340d7044bc47a9c03e6283c703@group.calendar.google.com';
  private _eventCache: { [key: string]: CalendarEvent[] } = {};

  async getBusyDays(start: Date, end: Date): Promise<CalendarEvent[]> {
    if (!GoogleCalendarProvider.API_KEY || !GoogleCalendarProvider.CALENDAR_ID || GoogleCalendarProvider.API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn('Google Calendar API Key or ID not properly configured. Using mock data.');
      return this.getMockBusyDays(start, end);
    }

    const cacheKey = `${start.getFullYear()}-${start.getMonth()}-${end.getFullYear()}-${end.getMonth()}`;
    if (this._eventCache[cacheKey]) return this._eventCache[cacheKey];

    try {
      const timeMin = start.toISOString();
      const timeMax = end.toISOString();
      
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GoogleCalendarProvider.CALENDAR_ID)}/events?key=${GoogleCalendarProvider.API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const events = data.items.map((item: any) => ({
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date
      }));

      this._eventCache[cacheKey] = events;
      return events;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [];
    }
  }

  private getMockBusyDays(_start: Date, _end: Date): CalendarEvent[] {
    const busyDays: CalendarEvent[] = [];
    const today = new Date();
    
    const start1 = new Date(today);
    start1.setDate(today.getDate() + 3);
    const end1 = new Date(start1);
    end1.setDate(start1.getDate() + 5);

    busyDays.push({
      start: start1.toISOString().split('T')[0],
      end: end1.toISOString().split('T')[0]
    });

    const start2 = new Date(today);
    start2.setMonth(today.getMonth() + 1);
    start2.setDate(10);
    const end2 = new Date(start2);
    end2.setDate(start2.getDate() + 4);

    busyDays.push({
      start: start2.toISOString().split('T')[0],
      end: end2.toISOString().split('T')[0]
    });

    return busyDays;
  }
}

export class CalendarService {
  private provider: CalendarProvider;

  constructor(provider: CalendarProvider = new GoogleCalendarProvider()) {
    this.provider = provider;
  }

  async getBusyDays(start: Date, end: Date): Promise<CalendarEvent[]> {
    return this.provider.getBusyDays(start, end);
  }

  getPriceAndSeasonForDate(date: Date): { price: number, season: Season } {
    return pricingService.getPriceAndSeasonForDate(date);
  }
}

export const calendarService = new CalendarService();
