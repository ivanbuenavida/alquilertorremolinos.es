import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { CalendarService, type DayInfo, type CalendarEvent } from '../../services/calendar-service';
import { TranslationService } from '../../services/translation-service';

@customElement('calendar-view')
export class CalendarView extends LitElement {
  @state() private _currentDate = new Date();
  @state() private _days: DayInfo[] = [];
  @state() private _loading = true;

  static styles = css`
    :host {
      display: block;
      font-family: 'Outfit', sans-serif;
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
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #efefef;
      background: white;
    }

    .month-title {
      font-weight: 700;
      font-size: 1rem;
      color: var(--primary-dark);
      margin: 0;
      text-align: center;
      flex-grow: 1;
    }

    .nav-btn {
      background: #f7f7f7;
      border: 1px solid #efefef;
      width: 32px;
      height: 32px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      color: var(--primary-dark);
    }

    .nav-btn:hover:not(:disabled) {
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-color: var(--primary);
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
      justify-content: center;
      gap: 2rem;
      padding: 1.25rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--primary-dark);
      border-top: 1px solid #efefef;
      background: #fafafa;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .dot.available { background: var(--primary); }
    .dot.busy { background: var(--secondary); }

    .loading-overlay {
      padding: 3rem;
      text-align: center;
      color: #717171;
    }

    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .month-label {
      text-transform: capitalize;
    }
  `;

  private _minDate = new Date();
  private _maxDate = new Date();

  constructor() {
    super();
    const now = new Date();
    this._minDate = new Date(now.getFullYear(), now.getMonth(), 1);
    this._minDate.setHours(0, 0, 0, 0);
    
    this._maxDate = new Date(this._minDate);
    this._maxDate.setMonth(this._maxDate.getMonth() + 24); // Allow looking up to 2 years ahead
    
    // Set initial view to current month start
    this._currentDate = new Date(this._minDate);

    // Re-render when language changes
    window.addEventListener('language-changed', () => {
      this._generateCalendar();
      this.requestUpdate();
    });
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
    
    // Grid alignment: Start on Monday of the first week of the month
    const start = new Date(firstDayOfMonth);
    const startDay = start.getDay(); 
    const offset = startDay === 0 ? 6 : startDay - 1;
    start.setDate(start.getDate() - offset);

    // End on Sunday of the last week of the month
    const end = new Date(lastDayOfMonth);
    const endDay = end.getDay();
    const endOffset = endDay === 0 ? 0 : 7 - endDay;
    end.setDate(end.getDate() + endOffset);
    end.setHours(23, 59, 59, 999);

    // Now we fetch events only for the range visible in this specific month view
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
  
  private _canGoNext() {
    const next = new Date(this._currentDate);
    next.setMonth(next.getMonth() + 1);
    return next <= this._maxDate;
  }

  private _canGoPrev() {
    const prev = new Date(this._currentDate);
    prev.setMonth(prev.getMonth() - 1);
    return prev >= this._minDate;
  }

  private _nextMonth() {
    if (!this._canGoNext()) return;
    this._currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() + 1, 1);
    this._generateCalendar();
  }

  private _prevMonth() {
    if (!this._canGoPrev()) return;
    this._currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() - 1, 1);
    this._generateCalendar();
  }

  private _formatMonth(date: Date) {
    const langMap: any = { 'es': 'es-ES', 'en': 'en-US', 'de': 'de-DE', 'fr': 'fr-FR', 'nl': 'nl-NL' };
    const locale = langMap[TranslationService.currentLang] || 'es-ES';
    return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  }

  render() {
    const lang = TranslationService.currentLang;
    const weekDaysMap: any = {
      'es': ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
      'en': ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      'de': ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      'fr': ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
      'nl': ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
    };
    const weekDays = weekDaysMap[lang] || weekDaysMap['es'];

    return html`
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="nav-btn" @click="${this._prevMonth}" ?disabled="${!this._canGoPrev()}">
            <i class="bi bi-chevron-left"></i>
          </button>
          <div class="month-title month-label">${this._formatMonth(this._currentDate)}</div>
          <button class="nav-btn" @click="${this._nextMonth}" ?disabled="${!this._canGoNext()}">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>

        <div class="weekdays">
          ${weekDays.map((day: string) => html`<div>${day}</div>`)}
        </div>

        ${this._loading 
          ? html`<div class="loading-overlay">
              <div class="spinner-border spinner-border-sm" role="status"></div>
              <span class="ms-2">${TranslationService.l.cal_loading}</span>
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
            <span>${TranslationService.l.cal_legend_available}</span>
          </div>
          <div class="legend-item">
            <span class="dot busy"></span>
            <span>${TranslationService.l.cal_legend_occupied}</span>
          </div>
        </div>
      </div>
    `;
  }
}
