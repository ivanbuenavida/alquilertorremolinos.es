import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { CalendarService, type DayInfo, type CalendarEvent } from '../../services/calendar-service';
import { TranslationService } from '../../services/translation-service';

@customElement('calendar-view')
export class CalendarView extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private _currentDate = new Date();
  @state() private _days: DayInfo[] = [];
  @state() private _loading = true;
  
  // Selection state
  @state() private _startDate: Date | null = null;
  @state() private _endDate: Date | null = null;

  private _minDate = new Date();
  private _maxDate = new Date();

  constructor() {
    super();
    const now = new Date();
    this._minDate = new Date(now.getFullYear(), now.getMonth(), 1);
    this._minDate.setHours(0, 0, 0, 0);
    
    this._maxDate = new Date(this._minDate);
    this._maxDate.setMonth(this._maxDate.getMonth() + 24); 
    
    this._currentDate = new Date(this._minDate);

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
    
    const start = new Date(firstDayOfMonth);
    const startDay = start.getDay(); 
    const offset = startDay === 0 ? 6 : startDay - 1;
    start.setDate(start.getDate() - offset);

    const end = new Date(lastDayOfMonth);
    const endDay = end.getDay();
    const endOffset = endDay === 0 ? 0 : 7 - endDay;
    end.setDate(end.getDate() + endOffset);
    end.setHours(23, 59, 59, 999);

    const busyEvents = await CalendarService.getBusyDays(start, end);
    const days: DayInfo[] = [];
    const curr = new Date(start);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    while (curr <= end) {
      days.push({
        date: new Date(curr),
        isBusy: this._checkIfBusy(curr, busyEvents),
        price: CalendarService.getPriceForDate(curr),
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

  private _handleDayClick(date: Date, isBusy: boolean) {
    if (isBusy) return;

    const clickedTime = date.getTime();

    if (!this._startDate || (this._startDate && this._endDate)) {
      this._startDate = new Date(date);
      this._endDate = null;
    } else {
      const startTime = this._startDate.getTime();
      
      if (clickedTime < startTime) {
        this._startDate = new Date(date);
      } else if (clickedTime === startTime) {
        this._startDate = null;
      } else {
        // Enforce max 30 days
        const diffDays = Math.ceil((clickedTime - startTime) / (1000 * 60 * 60 * 24));
        if (diffDays > 30) {
          alert('La reserva máxima es de 30 días');
          return;
        }

        // Check for busy days in between
        const hasBusyDaysBetween = this._days.some(d => {
          const t = d.date.getTime();
          return t > startTime && t < clickedTime && d.isBusy;
        });

        if (hasBusyDaysBetween) {
          alert('El rango seleccionado contiene días ya reservados');
          return;
        }

        this._endDate = new Date(date);
      }
    }

    this.dispatchEvent(new CustomEvent('range-selected', {
      detail: { start: this._startDate, end: this._endDate },
      bubbles: true,
      composed: true
    }));
  }

  private _isDateSelected(date: Date) {
    const time = date.getTime();
    if (this._startDate && time === this._startDate.getTime()) return true;
    if (this._endDate && time === this._endDate.getTime()) return true;
    return false;
  }

  private _isDateInRange(date: Date) {
    if (!this._startDate || !this._endDate) return false;
    const time = date.getTime();
    return time > this._startDate.getTime() && time < this._endDate.getTime();
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
      <div class="bg-white rounded-4 overflow-hidden shadow-none border">
        <!-- Header -->
        <div class="d-flex align-items-center justify-content-between p-3 border-bottom bg-white">
          <button class="btn btn-light rounded-circle p-1 d-flex align-items-center justify-content-center" 
                  @click="${this._prevMonth}" ?disabled="${!this._canGoPrev()}" style="width: 32px; height: 32px;">
            <i class="bi bi-chevron-left small"></i>
          </button>
          <div class="fw-bold text-dark text-capitalize px-2">${this._formatMonth(this._currentDate)}</div>
          <button class="btn btn-light rounded-circle p-1 d-flex align-items-center justify-content-center" 
                  @click="${this._nextMonth}" ?disabled="${!this._canGoNext()}" style="width: 32px; height: 32px;">
            <i class="bi bi-chevron-right small"></i>
          </button>
        </div>

        <!-- Weekdays -->
        <div class="grid-7 py-2 bg-light border-bottom text-center small fw-bold text-muted">
          ${weekDays.map((day: string) => html`<div>${day}</div>`)}
        </div>

        <!-- Days Grid -->
        <div class="position-relative">
          ${this._loading 
            ? html`<div class="d-flex align-items-center justify-content-center p-5 text-muted small">
                <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                <span>${TranslationService.l.cal_loading}</span>
              </div>`
            : html`
              <div class="grid-7 bg-light gap-px">
                ${this._days.map(day => {
                  const isSelected = this._isDateSelected(day.date);
                  const isInRange = this._isDateInRange(day.date);
                  
                  return html`
                    <div class="bg-white aspect-ratio-1 d-flex flex-column align-items-center justify-content-center p-1 
                                ${!day.isCurrentMonth ? 'opacity-25' : ''} 
                                ${day.isBusy ? 'bg-light-subtle text-decoration-line-through text-muted' : 'cursor-pointer'}
                                ${isSelected ? 'bg-primary text-white' : ''}
                                ${isInRange ? 'bg-primary-subtle' : ''}
                                position-relative"
                         style="min-height: 50px;"
                         @click="${() => this._handleDayClick(day.date, day.isBusy)}">
                      
                      <span class="small fw-bold ${day.isToday && !isSelected ? 'text-primary' : ''}">
                        ${day.date.getDate()}
                      </span>
                      
                      ${!day.isBusy && day.isCurrentMonth 
                        ? html`<span class="${isSelected ? 'text-white' : 'text-muted'}" style="font-size: 0.65rem;">${day.price}€</span>` 
                        : ''
                      }

                      ${!isSelected && !isInRange ? html`
                        <div class="rounded-circle position-absolute bottom-0 mb-1 ${day.isBusy ? 'bg-danger' : 'bg-primary'}" 
                             style="width: 4px; height: 4px;"></div>
                      ` : ''}
                    </div>
                  `;
                })}
              </div>
            `
          }
        </div>

        <!-- Legend -->
        <div class="d-flex justify-content-center gap-4 p-3 bg-light border-top small fw-bold text-dark">
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-primary" style="width: 10px; height: 10px;"></span>
            <span>${TranslationService.l.cal_legend_available}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="rounded-circle bg-danger" style="width: 10px; height: 10px;"></span>
            <span>${TranslationService.l.cal_legend_occupied}</span>
          </div>
        </div>
      </div>
    `;
  }
}
