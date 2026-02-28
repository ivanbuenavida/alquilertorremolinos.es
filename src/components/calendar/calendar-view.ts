import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { CalendarService, type DayInfo, type CalendarEvent } from '../../services/calendar-service';

@customElement('calendar-view')
export class CalendarView extends LitElement {
  @state() private _currentDate = new Date();
  @state() private _days: DayInfo[] = [];
  @state() private _loading = true;

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }

    .calendar-container {
      background: white;
      border-radius: 16px;
      overflow: hidden;
    }

    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem;
      border-bottom: 1px solid #efefef;
      background: linear-gradient(to bottom, #ffffff, #fcfcfc);
    }

    .month-title {
      font-weight: 700;
      font-size: 1.1rem;
      color: #222;
    }

    .nav-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .nav-btn:hover {
      background: #f7f7f7;
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0.5rem 0;
      text-align: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: #717171;
      text-transform: uppercase;
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background: #efefef;
      border-bottom: 1px solid #efefef;
    }

    .day {
      background: white;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4px;
      position: relative;
      cursor: default;
      transition: all 0.2s;
    }

    .day.not-current {
      color: #ddd;
    }

    .day.busy {
      background: #fafafa;
      color: #b0b0b0;
      text-decoration: line-through;
    }

    .day.busy .status-dot {
      background: #ff385c;
    }

    .day.available {
      cursor: pointer;
    }

    .day.available:hover {
      box-shadow: inset 0 0 0 2px #222;
      z-index: 10;
    }

    .day-number {
      font-size: 0.9rem;
      font-weight: 600;
    }

    .day-price {
      font-size: 0.7rem;
      color: #717171;
      margin-top: 2px;
    }

    .day.busy .day-price {
      visibility: hidden;
    }

    .today-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      border: 2px solid #222;
      border-radius: 50%;
      z-index: 0;
      display: none;
    }

    .day.is-today .day-number {
      color: white;
      background: var(--primary-dark);
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      z-index: 1;
    }

    .status-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--primary);
      margin-top: 4px;
    }

    .legend {
      display: flex;
      gap: 1.5rem;
      padding: 1rem;
      font-size: 0.8rem;
      color: #717171;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .dot.busy { background: #ff385c; }
    .dot.available { background: #008a05; }

    .loading-overlay {
      padding: 3rem;
      text-align: center;
      color: #717171;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._generateCalendar();
  }

  private async _generateCalendar() {
    this._loading = true;
    
    const year = this._currentDate.getFullYear();
    const month = this._currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Calculate start and end for the grid (including padding from prev/next months)
    const start = new Date(firstDayOfMonth);
    start.setDate(start.getDate() - (start.getDay() === 0 ? 6 : start.getDay() - 1)); // Start on Monday

    const end = new Date(lastDayOfMonth);
    end.setDate(end.getDate() + (7 - (end.getDay() === 0 ? 7 : end.getDay()))); // End on Sunday

    const busyEvents = await CalendarService.getBusyDays(start, end);
    
    const days: DayInfo[] = [];
    const curr = new Date(start);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    while (curr <= end) {
      const isBusy = this._checkIfBusy(curr, busyEvents);
      const price = CalendarService.getPriceForDate(curr);
      
      days.push({
        date: new Date(curr),
        isBusy,
        price,
        isCurrentMonth: curr.getMonth() === month,
        isToday: curr.getTime() === today.getTime()
      });
      
      curr.setDate(curr.getDate() + 1);
    }

    this._days = days;
    this._loading = false;
  }

  private _checkIfBusy(date: Date, events: CalendarEvent[]): boolean {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const dTime = d.getTime();

    return events.some(event => {
      const start = new Date(event.start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(event.end);
      end.setHours(0, 0, 0, 0);
      
      return dTime >= start.getTime() && dTime < end.getTime();
    });
  }

  private _nextMonth() {
    this._currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() + 1, 1);
    this._generateCalendar();
  }

  private _prevMonth() {
    this._currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() - 1, 1);
    this._generateCalendar();
  }

  private _formatMonth(date: Date) {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  render() {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return html`
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="nav-btn" @click="${this._prevMonth}">
            <i class="bi bi-chevron-left"></i>
          </button>
          <div class="month-title">${this._formatMonth(this._currentDate)}</div>
          <button class="nav-btn" @click="${this._nextMonth}">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>

        <div class="weekdays">
          ${weekDays.map(day => html`<div>${day}</div>`)}
        </div>

        ${this._loading 
          ? html`<div class="loading-overlay">
              <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
              <span class="ms-2">Loading values...</span>
            </div>`
          : html`
            <div class="days-grid">
              ${this._days.map(day => html`
                <div class="day ${day.isCurrentMonth ? 'current' : 'not-current'} ${day.isBusy ? 'busy' : 'available'} ${day.isToday ? 'is-today' : ''}">
                  <span class="day-number">${day.date.getDate()}</span>
                  <span class="day-price">${day.price}€</span>
                  <div class="status-dot"></div>
                </div>
              `)}
            </div>
          `
        }

        <div class="legend">
          <div class="legend-item">
            <span class="dot available"></span>
            <span>Available</span>
          </div>
          <div class="legend-item">
            <span class="dot busy"></span>
            <span>Occupied</span>
          </div>
        </div>
      </div>
    `;
  }
}
