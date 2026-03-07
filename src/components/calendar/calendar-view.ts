import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { CalendarService, type DayInfo, type CalendarEvent } from '../../services/calendar-service';
import { TranslationService } from '../../services/translation-service';
import { pricingConfig } from '../../config/pricing-config';
import { contactConfig } from '../../config/contact-config';

@customElement('calendar-view')
export class CalendarView extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private _currentDate = new Date();
  @state() private _days: DayInfo[] = [];
  @state() private _loading = true;
  @state() private _showLimitMsg = false;
  
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
    
    // Hard cap strictly at September 30th, 2026
    this._maxDate = new Date(2026, 8, 30, 23, 59, 59); // 8 is September (0-indexed)
    
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
      const { price, season } = CalendarService.getPriceAndSeasonForDate(curr);
      days.push({
        date: new Date(curr),
        isBusy: this._checkIfBusy(curr, busyEvents),
        price,
        season,
        isCurrentMonth: curr.getMonth() === month,
        isToday: curr.getTime() === today.getTime(),
        isPast: curr.getTime() < today.getTime()
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
    if (!this._canGoNext()) {
      // If we are in September (8) and try to go next, show message
      if (this._currentDate.getMonth() === 8) {
        this._showLimitMsg = true;
      }
      return;
    }
    this._showLimitMsg = false;
    this._currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() + 1, 1);
    this._generateCalendar();
  }

  private _prevMonth() {
    if (!this._canGoPrev()) return;
    this._showLimitMsg = false;
    this._currentDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() - 1, 1);
    this._generateCalendar();
  }

  private async _handleDayClick(date: Date, isBusy: boolean) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Block selection of past dates, and dates beyond maxDate
    if (isBusy || date.getTime() < today.getTime() || date.getTime() > this._maxDate.getTime()) return;

    const clickedTime = date.getTime();

    if (!this._startDate || (this._startDate && this._endDate)) {
      this._startDate = new Date(date);
      this._endDate = null;
      this._showLimitMsg = false;
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
          this._showLimitMsg = true;
          return;
        }

        // Determine min nights based on start date's season
        const startMonth = this._startDate!.getMonth();
        let requiredMinNights = pricingConfig.minNights.low;
        if (pricingConfig.highSeasonMonths.includes(startMonth)) {
          requiredMinNights = pricingConfig.minNights.high;
        } else if (pricingConfig.midSeasonMonths.includes(startMonth)) {
          requiredMinNights = pricingConfig.minNights.mid;
        }

        // Enforce dynamic min nights
        if (diffDays < requiredMinNights) {
          this.dispatchEvent(new CustomEvent('selection-error', {
            detail: { message: TranslationService.l.cal_err_min_nights(requiredMinNights) },
            bubbles: true,
            composed: true
          }));
          return;
        }

        // Check for busy days in between using actual events
        const busyEvents = await CalendarService.getBusyDays(new Date(startTime), new Date(clickedTime));
        const hasBusyDaysBetween = this._checkIfBusyRange(new Date(startTime), diffDays, busyEvents);

        if (hasBusyDaysBetween) {
          const alternatives = await this._findAlternativeDates(startTime, clickedTime, requiredMinNights);
          this.dispatchEvent(new CustomEvent('selection-error', {
            detail: { message: TranslationService.l.cal_err_overlap, alternatives },
            bubbles: true,
            composed: true
          }));
          this._endDate = null;
          return;
        }

        this._endDate = new Date(date);
      }
    }

    // Clear error if there's no error at this point
    this.dispatchEvent(new CustomEvent('selection-error', {
      detail: { message: '' },
      bubbles: true,
      composed: true
    }));

    // Calculate total price if both dates are selected
    let totalPrice = 0;
    if (this._startDate && this._endDate) {
      const pStart = this._startDate.getTime();
      const pEnd = this._endDate.getTime();
      this._days.forEach(d => {
        const t = d.date.getTime();
        if (t >= pStart && t < pEnd) {
          totalPrice += d.price;
        }
      });
      // Fallback calculation for days outside loaded month (if navigating)
      // Since days array contains at least the current view, we might need a more robust way 
      // but assuming they select within loaded or nearby days. Actually let's use a loop.
    }

    // A better way to calculate total price for the range
    if (this._startDate && this._endDate) {
      totalPrice = 0;
      let curr = new Date(this._startDate);
      while (curr < this._endDate) {
        totalPrice += CalendarService.getPriceAndSeasonForDate(curr).price;
        curr.setDate(curr.getDate() + 1);
      }
    }

    const diffDays = this._startDate && this._endDate 
      ? Math.ceil((this._endDate.getTime() - this._startDate.getTime()) / (1000 * 60 * 60 * 24)) 
      : 0;

    this.dispatchEvent(new CustomEvent('range-selected', {
      detail: { 
        start: this._startDate, 
        end: this._endDate,
        nights: diffDays,
        totalPrice: totalPrice
      },
      bubbles: true,
      composed: true
    }));
  }

  resetSelection() {
    this._startDate = null;
    this._endDate = null;
    this._showLimitMsg = false;
    this.dispatchEvent(new CustomEvent('range-selected', {
      detail: { 
        start: null, 
        end: null, 
        nights: 0, 
        totalPrice: 0 
      },
      bubbles: true,
      composed: true
    }));
  }

  private async _findAlternativeDates(startMillis: number, endMillis: number, minNights: number): Promise<{start: Date, end: Date}[]> {
    const durationDays = Math.ceil((endMillis - startMillis) / (1000 * 60 * 60 * 24));
    const targetDays = Math.max(durationDays, minNights);
    
    const today = new Date();
    today.setHours(0,0,0,0);
    const busyEvents = await CalendarService.getBusyDays(today, this._maxDate);
    
    const alternatives: {start: Date, end: Date}[] = [];
    const baseStart = new Date(startMillis);

    // Look forward
    let curr = new Date(baseStart);
    let attempts = 0;
    while (alternatives.length < 2 && attempts < 90) {
      if (!this._checkIfBusyRange(curr, targetDays, busyEvents)) {
        const altEnd = new Date(curr);
        altEnd.setDate(altEnd.getDate() + targetDays);
        if (altEnd.getTime() <= this._maxDate.getTime()) {
           alternatives.push({ start: new Date(curr), end: altEnd });
        }
      }
      curr.setDate(curr.getDate() + 1);
      attempts++;
    }

    // Look backward
    curr = new Date(baseStart);
    curr.setDate(curr.getDate() - 1);
    attempts = 0;
    while (alternatives.length < 3 && attempts < 90) {
      if (curr.getTime() >= today.getTime()) {
        if (!this._checkIfBusyRange(curr, targetDays, busyEvents)) {
          const altEnd = new Date(curr);
          altEnd.setDate(altEnd.getDate() + targetDays);
          alternatives.unshift({ start: new Date(curr), end: altEnd });
        }
      }
      curr.setDate(curr.getDate() - 1);
      attempts++;
    }
    
    return alternatives.slice(0, 3);
  }

  private _checkIfBusyRange(start: Date, days: number, events: CalendarEvent[]): boolean {
    const startMs = start.getTime();
    for (let i = 0; i < days; i++) {
        const d = new Date(startMs + i * 24 * 60 * 60 * 1000);
        d.setHours(0,0,0,0);
        const dTime = d.getTime();
        const isBusyDay = events.some(event => {
          const es = new Date(event.start);
          es.setHours(0, 0, 0, 0);
          const ee = new Date(event.end);
          ee.setHours(0, 0, 0, 0);
          return dTime >= es.getTime() && dTime < ee.getTime();
        });
        if (isBusyDay) return true;
    }
    return false;
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
                  
                  // Use conditional classes to avoid background conflicts
                  let bgClass = 'bg-white';
                  if (day.isCurrentMonth && !day.isBusy && !isSelected && !isInRange) {
                    if (day.season === 'high') bgClass = 'bg-info bg-opacity-10'; // Subtle blue for high season
                    else if (day.season === 'mid') bgClass = 'bg-warning bg-opacity-10'; // Subtle yellow for mid season
                  }

                  if (day.isBusy) {
                    bgClass = 'bg-light-subtle text-decoration-line-through text-muted';
                  } else if (day.date.getTime() > this._maxDate.getTime()) {
                    bgClass = 'bg-light-subtle text-muted opacity-50';
                  } else if (isSelected) {
                    bgClass = 'bg-primary text-white shadow-sm z-1';
                  } else if (isInRange) {
                    bgClass = 'bg-primary-subtle z-0';
                  }

                  const isSelectable = !day.isBusy && !day.isPast && day.date.getTime() <= this._maxDate.getTime();
                  
                  return html`
                    <div class="aspect-ratio-1 d-flex flex-column align-items-center justify-content-center p-1 user-select-none
                                ${(!day.isCurrentMonth || !isSelectable) && !day.isBusy ? 'opacity-25' : ''} 
                                ${isSelectable ? 'cursor-pointer' : ''}
                                ${bgClass}
                                position-relative"
                         style="min-height: 50px; ${isSelectable ? 'cursor: pointer;' : 'cursor: default;'} ${isSelected ? 'border-radius: 8px;' : ''}"
                         @click="${() => this._handleDayClick(day.date, day.isBusy)}">
                      
                      <span class="small fw-bold">
                        ${day.date.getDate()}
                      </span>

                      ${!isSelected && !isInRange && isSelectable ? html`
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

        ${this._showLimitMsg ? html`
          <div class="p-3 bg-light border-top border-bottom animate-fade-in">
            <div class="alert alert-info mb-0 py-2 small d-flex flex-column align-items-center gap-2 border-0 bg-transparent text-center">
              <div class="d-flex align-items-center gap-2">
                <span>${TranslationService.l.cal_limit_reach_msg}</span>
              </div>
              <a href="https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(TranslationService.l.cal_wa_limit_msg(this._maxDate.toLocaleDateString(({ 'es': 'es-ES', 'en': 'en-US', 'de': 'de-DE', 'fr': 'fr-FR', 'nl': 'nl-NL' } as any)[TranslationService.currentLang] || 'es-ES')))}" 
                 target="_blank" 
                 class="btn btn-outline-success btn-sm rounded-pill px-3 fw-bold mt-1">
                <i class="bi bi-whatsapp me-1"></i> WhatsApp
              </a>
            </div>
          </div>
        ` : ''}

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
