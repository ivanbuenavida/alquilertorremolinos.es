import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './calendar/calendar-view.ts';
import { TranslationService } from '../services/translation-service';
import { AnalyticsService } from '../services/analytics-service';
import { shareService } from '../services/share-service';
import { contactConfig } from '../config/contact-config';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('availability-calendar')
export class AvailabilityCalendar extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() private _startDate: Date | null = null;
  @state() private _endDate: Date | null = null;
  @state() private _nights: number = 0;
  @state() private _totalPrice: number = 0;
  @state() private _errorType: 'min_nights' | 'overlap' | 'past_or_invalid' | null = null;
  @state() private _errorParams: any = {};
  @state() private _alternatives: {start: Date, end: Date}[] = [];

  private get _selectionError(): string {
    if (!this._errorType) return '';
    if (this._errorType === 'min_nights') {
      return TranslationService.l.cal_err_min_nights(this._errorParams.reserved, this._errorParams.min);
    }
    if (this._errorType === 'overlap') {
      return TranslationService.l.cal_err_overlap;
    }
    if (this._errorType === 'past_or_invalid') {
      return TranslationService.l.cal_err_overlap; // fallback error translation
    }
    return '';
  }

  private _clearError() {
    this._errorType = null;
    this._errorParams = {};
  }

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
    
    // Listen for range selection from child calendar-view
    this.addEventListener('range-selected', (e: any) => {
      this._startDate = e.detail.start;
      this._endDate = e.detail.end;
      this._nights = e.detail.nights || 0;
      this._totalPrice = e.detail.totalPrice || 0;
      this._clearError();
      this._alternatives = [];
      
      // TRACKING: Interest in specific dates
      AnalyticsService.trackDateSelection(this._nights, this._totalPrice);
      
      this._updateUrlWithDates();
    });

    this.addEventListener('selection-error', (e: any) => {
      this._errorType = e.detail.type || null;
      this._errorParams = e.detail.params || {};
      this._alternatives = e.detail.alternatives || [];
      
      // TRACKING: Why aren't they booking? (Too few nights? Occupied?)
      if (this._errorType) {
        AnalyticsService.trackAvailabilityError('booking_restriction', this._selectionError);
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._parseUrlParams();
  }

  private async _parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const checkinStr = params.get('checkin');
    const checkoutStr = params.get('checkout');

    if (checkinStr && checkoutStr) {
      setTimeout(async () => {
        const calendarView = this.querySelector('calendar-view') as any;
        if (calendarView) {
          try {
            // Parse YYYY-MM-DD components directly to construct a local Date, avoiding timezone shifts
            const [startYear, startMonth, startDay] = checkinStr.split('-').map(Number);
            const start = new Date(startYear, startMonth - 1, startDay);
            start.setHours(0,0,0,0);

            const [endYear, endMonth, endDay] = checkoutStr.split('-').map(Number);
            const end = new Date(endYear, endMonth - 1, endDay);
            end.setHours(0,0,0,0);
            
            if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
              await calendarView.setRange(start, end);
            }
          } catch (e) {
            console.error('Error parsing URL dates', e);
          }
        }
      }, 500);
    }
  }

  private _applyAlternative(alt: {start: Date, end: Date}) {
    const calendarView = this.renderRoot.querySelector('calendar-view') as any;
    if (calendarView) {
      calendarView._startDate = alt.start;
      calendarView._endDate = null;
      // We simulate clicks or just set the dates and trigger calculation
      calendarView._handleDayClick(alt.end, false);
      
      // Update local state just in case event takes time or we want immediate feedback
      this._clearError();
      this._alternatives = [];
    }
  }

  private _resetSelection() {
    this._startDate = null;
    this._endDate = null;
    this._nights = 0;
    this._totalPrice = 0;
    this._clearError();
    this._alternatives = [];
    
    const calendarView = this.renderRoot.querySelector('calendar-view') as any;
    if (calendarView) {
      calendarView.resetSelection();
    }
    this._updateUrlWithDates();
  }

  private _formatDateLocal(date: Date): string {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private _updateUrlWithDates() {
    const url = new URL(window.location.href);
    if (this._startDate && this._endDate) {
      url.searchParams.set('checkin', this._formatDateLocal(this._startDate));
      url.searchParams.set('checkout', this._formatDateLocal(this._endDate));
    } else {
      url.searchParams.delete('checkin');
      url.searchParams.delete('checkout');
    }
    window.history.replaceState({}, '', url.toString());
  }

  private _handleWhatsAppClick(e: Event) {
    e.preventDefault();
    AnalyticsService.trackLead(this._totalPrice, this._nights);
    const message = this._buildWhatsAppMessage();
    const waNumber = atob(contactConfig.whatsappBase64);
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  private _handleCallClick(e: Event) {
    e.preventDefault();
    AnalyticsService.trackContact('Call Calendar');
    const phone = atob(contactConfig.phoneBase64).replace(/\s+/g, '');
    window.location.href = `tel:${phone}`;
  }

  private _handleGeneralWaClick(e: Event) {
    e.preventDefault();
    AnalyticsService.trackContact('WhatsApp Calendar Accordion');
    const waNumber = atob(contactConfig.whatsappBase64);
    window.open(`https://wa.me/${waNumber}`, '_blank');
  }

  private async _handleShareClick() {
    const propertyTitle = TranslationService.l.app_property_title;
    const locale = TranslationService.currentLang;
    const startStr = this._startDate?.toLocaleDateString(locale) || '';
    const endStr = this._endDate?.toLocaleDateString(locale) || '';
    const datesStr = `${startStr} - ${endStr}`;
    
    // Construct URL with dates
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('lang', TranslationService.currentLang);
    if (this._startDate) url.searchParams.set('checkin', this._formatDateLocal(this._startDate));
    if (this._endDate) url.searchParams.set('checkout', this._formatDateLocal(this._endDate));

    await shareService.share({
      title: TranslationService.l.cal_share_title,
      text: TranslationService.l.cal_share_text(propertyTitle, datesStr),
      url: url.toString()
    });
  }

  private _buildWhatsAppMessage() {
    const locale = TranslationService.currentLang;
    const l = TranslationService.l;

    const buildMessage = (labels: any, lang: string, urlLang: string) => {
      const s = this._startDate ? this._startDate.toLocaleDateString(lang) : '';
      const e = this._endDate ? this._endDate.toLocaleDateString(lang) : '';
      
      // Construct URL with dates and correct language
      const webUrl = new URL(window.location.origin + window.location.pathname);
      webUrl.searchParams.set('lang', urlLang);
      if (this._startDate) webUrl.searchParams.set('checkin', this._formatDateLocal(this._startDate));
      if (this._endDate) webUrl.searchParams.set('checkout', this._formatDateLocal(this._endDate));

      let msg = `${labels.wa_hello}, ${labels.wa_interest} ${labels.prop_location}\n- Web: ${webUrl.toString()}`;
      
      if (this._startDate && this._endDate) {
        msg = `${labels.wa_hello}, ${labels.wa_would_like} ${labels.prop_location}\n- Web: ${webUrl.toString()}\n\n${labels.cal_summary_title}:\n${labels.cal_summary_dates}: ${s} ${labels.wa_date_to} ${e}\n${labels.cal_summary_nights}: ${this._nights}`;
      }
      return msg;
    };

    const messageEs = buildMessage(TranslationService.getLabelsFor('es'), 'es-ES', 'es');
    const messageSelected = buildMessage(l, locale, locale);
    return TranslationService.formatWhatsAppMessage(messageSelected, messageEs);
  }

  render() {
    return html`
      <div class="card p-3 p-md-4 rounded-4 shadow-lg border-opacity-25 border mb-4">
        <h4 class="fw-bold d-flex align-items-center gap-2 mb-4">
          <i class="bi bi-calendar-check text-primary"></i> 
          ${TranslationService.l.cal_title}
        </h4>
        
        <div class="mb-4">
          <calendar-view></calendar-view>
        </div>
        
        <!-- Legend -->
        <div class="d-flex flex-wrap gap-3 justify-content-center mb-4 small border-bottom pb-3">
          <div class="d-flex align-items-center gap-2">
            <span class="d-inline-block rounded bg-success-subtle border border-success" style="width: 14px; height: 14px;"></span>
            <span class="text-muted fw-semibold">${TranslationService.l.cal_legend_available}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="d-inline-block rounded bg-danger-subtle border border-danger" style="width: 14px; height: 14px;"></span>
            <span class="text-muted fw-semibold">${TranslationService.l.cal_legend_occupied}</span>
          </div>
        </div>

        ${this._selectionError ? html`
          <div class="alert alert-danger py-3 small mb-4 shadow-sm border-0" role="alert">
            <div class="d-flex align-items-center mb-2 fw-medium">
              <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i> 
              ${this._selectionError}
            </div>
            
            ${this._alternatives && this._alternatives.length > 0 ? html`
              <div class="mt-3 pt-3 border-top border-danger border-opacity-25">
                <p class="mb-2 fw-bold text-dark"><i class="bi bi-magic me-1"></i> ${TranslationService.l.cal_suggested_dates}</p>
                <div class="d-flex flex-wrap gap-2">
                  ${this._alternatives.map(alt => html`
                    <button class="btn btn-sm btn-outline-danger fw-medium rounded-pill hover-scale" 
                            @click="${() => this._applyAlternative(alt)}">
                      ${alt.start.toLocaleDateString(TranslationService.currentLang, {day: 'numeric', month: 'short'})} - 
                      ${alt.end.toLocaleDateString(TranslationService.currentLang, {day: 'numeric', month: 'short'})}
                    </button>
                  `)}
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}

        ${this._startDate ? html`
          <div class="bg-light p-3 rounded mb-4 shadow-sm border animate-fade-in">
            <h6 class="fw-bold mb-3 border-bottom pb-2 d-flex align-items-center justify-content-between">
              <span class="d-flex align-items-center gap-2">
                <i class="bi bi-info-circle-fill text-primary"></i>
                ${TranslationService.l.cal_summary_title}
              </span>
              <button class="btn btn-sm btn-link text-danger p-0 border-0 shadow-none" @click="${this._resetSelection}" title="${TranslationService.l.cal_summary_reset}">
                <i class="bi bi-x-circle-fill fs-5"></i>
              </button>
            </h6>
            
            <div class="row g-2 mb-2">
              <div class="col-6">
                <div class="p-2 bg-white rounded border border-opacity-50">
                  <div class="text-muted small-extra fw-bold text-uppercase pb-1">${TranslationService.l.cal_summary_checkin}</div>
                  <div class="fw-bold text-primary">${this._startDate.toLocaleDateString(TranslationService.currentLang)}</div>
                </div>
              </div>
              <div class="col-6">
                <div class="p-2 bg-white rounded border border-opacity-50">
                  <div class="text-muted small-extra fw-bold text-uppercase pb-1">${TranslationService.l.cal_summary_checkout}</div>
                  <div class="${this._endDate ? 'fw-bold text-primary' : 'small text-muted italic text-opacity-50'}">
                    ${this._endDate ? this._endDate.toLocaleDateString(TranslationService.currentLang) : TranslationService.l.cal_summary_select_checkout}
                  </div>
                </div>
              </div>
            </div>

            ${this._endDate ? html`
              <div class="d-flex justify-content-between mb-2 small mt-3">
                <span class="text-muted text-capitalize">${TranslationService.l.cal_summary_nights}:</span>
                <span class="fw-medium">${this._nights}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <div class="d-grid gap-3 mb-4">
          <a 
            href="#"
            class="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill shadow-sm" 
            @click="${this._handleWhatsAppClick}"
          >
            <i class="bi bi-whatsapp fs-5"></i> ${TranslationService.l.cal_btn_whatsapp}
          </a>

          <button 
            class="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill shadow-sm ${!this._startDate || !this._endDate ? 'disabled opacity-50' : ''}" 
            @click="${this._handleShareClick}"
            ?disabled="${!this._startDate || !this._endDate}"
          >
            <i class="bi bi-share fs-5"></i> ${TranslationService.l.cal_btn_share}
          </button>
        </div>

        <!-- Booking Policies Accordion -->
        <h6 class="fw-bold mb-3 d-flex align-items-center gap-2">
          <i class="bi bi-info-circle text-primary"></i> 
          ${TranslationService.l.pol_title}
        </h6>
        
        <div class="accordion accordion-flush bg-light rounded shadow-sm border" id="policiesAccordion">
          <!-- Cancellation Policy -->
          <div class="accordion-item bg-transparent">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent shadow-none fw-medium small py-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCancel">
                <i class="bi bi-shield-check me-2 text-primary"></i> ${TranslationService.l.pol_cancellation_title}
              </button>
            </h2>
            <div id="collapseCancel" class="accordion-collapse collapse" data-bs-parent="#policiesAccordion">
              <div class="accordion-body small text-muted pt-0 pb-3">
                ${TranslationService.l.pol_cancellation_desc}
              </div>
            </div>
          </div>

          <!-- Payment Policy -->
          <div class="accordion-item bg-transparent">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent shadow-none fw-medium small py-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePayment">
                <i class="bi bi-credit-card me-2 text-primary"></i> ${TranslationService.l.pol_payment_title}
              </button>
            </h2>
            <div id="collapsePayment" class="accordion-collapse collapse" data-bs-parent="#policiesAccordion">
              <div class="accordion-body small text-muted pt-0 pb-3">
                ${TranslationService.l.pol_payment_desc}
              </div>
            </div>
          </div>

          <!-- House Rules -->
          <div class="accordion-item bg-transparent">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent shadow-none fw-medium small py-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRules">
                <i class="bi bi-house-check me-2 text-primary"></i> ${TranslationService.l.pol_rules_title}
              </button>
            </h2>
            <div id="collapseRules" class="accordion-collapse collapse" data-bs-parent="#policiesAccordion">
              <div class="accordion-body small text-muted pt-0 pb-3">
                ${unsafeHTML(TranslationService.l.pol_rules_desc)}
              </div>
            </div>
          </div>

          <!-- Contact Options -->
          <div class="accordion-item bg-transparent">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent shadow-none fw-medium small py-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContact">
                <i class="bi bi-chat-dots me-2 text-primary"></i> ${TranslationService.l.pol_contact_title}
              </button>
            </h2>
            <div id="collapseContact" class="accordion-collapse collapse" data-bs-parent="#policiesAccordion">
              <div class="accordion-body small text-muted pt-0 pb-3">
                <p class="mb-2">${TranslationService.l.pol_contact_desc}</p>
                <div class="d-flex flex-column gap-2">
                  <a href="#" @click="${this._handleGeneralWaClick}" class="text-decoration-none text-success d-flex align-items-center gap-2">
                    <i class="bi bi-whatsapp"></i> WhatsApp
                  </a>
                  <a href="#" 
                     class="text-decoration-none d-flex align-items-center gap-2"
                     @click="${this._handleCallClick}">
                    <i class="bi bi-telephone"></i>
                    <span>+34 614 <span style="display:none">bots</span>44 98 90</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
