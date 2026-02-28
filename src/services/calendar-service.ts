export interface CalendarEvent {
  start: string;
  end: string;
  summary: string;
}

export interface DayInfo {
  date: Date;
  isBusy: boolean;
  price: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export class CalendarService {
  // ⚠️ PASTE YOUR GOOGLE CALENDAR DATA HERE
  // These keys are restricted by domain in the Google Cloud Console.
  private static API_KEY = 'AIzaSyAaIkxaKDZnma_1mfYJXZ0TXISiL3NrE5o';
  private static CALENDAR_ID = 'YOUR_CALENDAR_ID_HERE';

  // Pricing configuration - could be moved to a settings file
  private static BASE_PRICE = 85;
  private static SEASONAL_PRICES = {
    high: [5, 6, 7, 8], // June to Sept
    mid: [3, 4, 9, 10], // April, May, Oct, Nov
  };

  static async getBusyDays(start: Date, end: Date): Promise<CalendarEvent[]> {
    if (!this.API_KEY || !this.CALENDAR_ID) {
      console.warn('Google Calendar API Key or ID not found. Using mock data.');
      return this.getMockBusyDays(start, end);
    }

    try {
      const timeMin = start.toISOString();
      const timeMax = end.toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${this.CALENDAR_ID}/events?key=${this.API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.items.map((item: any) => ({
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date,
        summary: item.summary
      }));
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [];
    }
  }

  static getPriceForDate(date: Date): number {
    const month = date.getMonth(); // 0-indexed
    const dayOfWeek = date.getDay(); // 0 is Sunday

    let price = this.BASE_PRICE;

    if (this.SEASONAL_PRICES.high.includes(month)) {
      price = 150;
    } else if (this.SEASONAL_PRICES.mid.includes(month)) {
      price = 110;
    }

    // Weekend surcharge
    if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
      price += 20;
    }

    return price;
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
