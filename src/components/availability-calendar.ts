import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './calendar/calendar-view.ts';
import { TranslationService } from '../services/translation-service';
import { AnalyticsService } from '../services/analytics-service';
import { shareService } from '../services/share-service';
import { pricingService } from '../services/pricing-service';
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
  @state() private _selectionError: string = '';
  @state() private _alternatives: {start: Date, end: Date}[] = [];

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
    
    // Listen for range selection from child calendar-view
    this.addEventListener('range-selected', (e: any) => {
      this._startDate = e.detail.start;
      this._endDate = e.detail.end;
      this._nights = e.detail.nights || 0;
      this._totalPrice = e.detail.totalPrice || 0;
      this._selectionError = '';
      this._alternatives = [];
      
      // TRACKING: Interest in specific dates
      AnalyticsService.trackDateSelection(this._nights, this._totalPrice);
      
      this._updateUrlWithDates();
    });

    this.addEventListener('selection-error', (e: any) => {
      this._selectionError = e.detail.message || '';
      this._alternatives = e.detail.alternatives || [];
      
    // TRACKING: Why aren't they booking? (Too few nights? Occupied?)
      AnalyticsService.trackAvailabilityError('booking_restriction', this._selectionError);
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
            const start = new Date(checkinStr);
            start.setHours(0,0,0,0);
            const end = new Date(checkoutStr);
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
      this._selectionError = '';
      this._alternatives = [];
    }
  }

  private _resetSelection() {
    this._startDate = null;
    this._endDate = null;
    this._nights = 0;
    this._totalPrice = 0;
    this._selectionError = '';
    this._alternatives = [];
    
    const calendarView = this.renderRoot.querySelector('calendar-view') as any;
    if (calendarView) {
      calendarView.resetSelection();
    }
    this._updateUrlWithDates();
  }

  private _updateUrlWithDates() {
    const url = new URL(window.location.href);
    if (this._startDate && this._endDate) {
      url.searchParams.set('checkin', this._startDate.toISOString().split('T')[0]);
      url.searchParams.set('checkout', this._endDate.toISOString().split('T')[0]);
    } else {
      url.searchParams.delete('checkin');
      url.searchParams.delete('checkout');
    }
    window.history.replaceState({}, '', url.toString());
  }

  private _handleWhatsAppClick() {
    AnalyticsService.trackLead(this._totalPrice, this._nights);
    console.log('WhatsApp booking clicked');
  }

  private async _handleShareClick() {
    const propertyTitle = TranslationService.l.app_property_title;
    const locale = TranslationService.currentLang;
    const startStr = this._startDate?.toLocaleDateString(locale) || '';
    const endStr = this._endDate?.toLocaleDateString(locale) || '';
    const datesStr = `${startStr} - ${endStr}`;
    const priceDetails = this._calculatePriceDetails();
    const priceStr = `${priceDetails.finalPrice}€`;
    
    // Construct URL with dates
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('lang', TranslationService.currentLang);
    if (this._startDate) url.searchParams.set('checkin', this._startDate.toISOString().split('T')[0]);
    if (this._endDate) url.searchParams.set('checkout', this._endDate.toISOString().split('T')[0]);

    await shareService.share({
      title: TranslationService.l.cal_share_title,
      text: TranslationService.l.cal_share_text(propertyTitle, datesStr, priceStr),
      url: url.toString()
    });
  }

  private _calculatePriceDetails() {
    if (!this._startDate || !this._endDate) {
      return {
        subtotal: 0,
        longStayDiscountLabel: '',
        longStayPercent: 0,
        longStayDiscountAmount: 0,
        isEarlyBird: false,
        earlyBirdPercent: 0,
        earlyBirdDiscountAmount: 0,
        finalPrice: 0,
        depositAmount: 0,
        depositPercent: 0
      };
    }

    return pricingService.calculateBookingDetails(
      this._startDate,
      this._endDate,
      this._totalPrice,
      TranslationService
    );
  }

  private _getWhatsAppUrl(priceDetails: any) {
    const locale = TranslationService.currentLang;
    const l = TranslationService.l;

    const buildMessage = (labels: any, lang: string) => {
      const s = this._startDate ? this._startDate.toLocaleDateString(lang) : '';
      const e = this._endDate ? this._endDate.toLocaleDateString(lang) : '';
      
      let msg = `${labels.wa_hello}, ${labels.wa_request_prefix}: ${labels.prop_location} (${contactConfig.googleMapsUrl}).`;
      
      if (this._startDate && this._endDate) {
        let discountSection = '';
        if (priceDetails.longStayDiscountAmount > 0) {
          discountSection += `\n${priceDetails.longStayDiscountLabel} (-${priceDetails.longStayPercent}%): -${priceDetails.longStayDiscountAmount}€`;
        }
        if (priceDetails.isEarlyBird) {
          discountSection += `\n${labels.cal_summary_discount_early} (-${priceDetails.earlyBirdPercent}%): -${priceDetails.earlyBirdDiscountAmount}€`;
        }

        const discountStr = discountSection ? `\n${labels.cal_summary_subtotal}: ${priceDetails.subtotal}€${discountSection}` : '';
        const depositLine = `\n${labels.cal_summary_deposit(priceDetails.depositPercent)}: ${priceDetails.depositAmount}€`;
        
        msg = `${labels.wa_hello}, ${labels.wa_would_like} ${labels.prop_location}\n📍 ${contactConfig.googleMapsUrl}\n\n${labels.cal_summary_title}:\n${labels.cal_summary_dates}: ${s} ${labels.wa_date_to} ${e}\n${labels.cal_summary_nights}: ${this._nights}${discountStr}\n${labels.cal_summary_total}: ${priceDetails.finalPrice}€${depositLine}`;
      }
      return msg;
    };

    let message = buildMessage(l, locale);

    // If not in Spanish, append Spanish translation for the host
    if (locale !== 'es') {
      const labelsEs = TranslationService.getLabelsFor('es');
      const messageEs = buildMessage(labelsEs, 'es-ES');
      message += `\n\n---\n${l.wa_translation_prefix}\n${messageEs}`;
    }

    return `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  }

  render() {
    const priceDetails = this._calculatePriceDetails();

    return html`
      <div class="card p-3 p-md-4 rounded-4 shadow-lg border-opacity-25 border mb-4">
        <h4 class="fw-bold d-flex align-items-center gap-2 mb-4">
          <i class="bi bi-calendar-check text-primary"></i> 
          ${TranslationService.l.cal_title}
        </h4>
        
        <div class="mb-4">
          <calendar-view></calendar-view>
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
                <span class="text-muted">${TranslationService.l.cal_summary_nights}:</span>
                <span class="fw-medium">${this._nights}</span>
              </div>

              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-muted">${TranslationService.l.cal_summary_subtotal}:</span>
                <span class="fw-medium font-monospace">${priceDetails.subtotal}€</span>
              </div>

              ${priceDetails.longStayDiscountAmount > 0 ? html`
                <div class="d-flex justify-content-between mb-2 small text-success fw-bold">
                  <span>${priceDetails.longStayDiscountLabel} (-${priceDetails.longStayPercent}%):</span>
                  <span>-${priceDetails.longStayDiscountAmount}€</span>
                </div>
              ` : ''}

              ${priceDetails.isEarlyBird ? html`
                <div class="d-flex justify-content-between mb-2 small text-success fw-bold">
                  <span class="d-flex align-items-center gap-1">
                    ${TranslationService.l.cal_summary_discount_early} (-${priceDetails.earlyBirdPercent}%):
                    <span class="custom-tooltip">
                      <i class="bi bi-info-circle small" style="font-size: 0.8em; vertical-align: middle;"></i>
                      <span class="tooltip-text">${TranslationService.l.cal_summary_discount_early_info}</span>
                    </span>
                  </span>
                  <span>-${priceDetails.earlyBirdDiscountAmount}€</span>
                </div>
              ` : ''}

              <div class="d-flex justify-content-between pt-2 mt-2 border-top">
                <span class="fw-bold">${TranslationService.l.cal_summary_total}:</span>
                <span class="fw-bold fs-5 text-primary">${priceDetails.finalPrice}€</span>
              </div>

              <div class="d-flex justify-content-between mb-2 small mt-1 text-muted italic">
                <span class="d-flex align-items-center gap-1">
                  ${TranslationService.l.cal_summary_deposit(priceDetails.depositPercent)}
                  <span class="custom-tooltip">
                    <i class="bi bi-info-circle small" style="font-size: 0.8em; vertical-align: middle;"></i>
                    <span class="tooltip-text">${TranslationService.l.cal_summary_deposit_info}</span>
                  </span>:
                </span>
                <span class="fw-medium">${priceDetails.depositAmount}€</span>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <div class="d-grid gap-3 mb-4">
          <a 
            href="${this._getWhatsAppUrl(priceDetails)}" 
            target="_blank"
            class="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill shadow-sm ${!this._startDate || !this._endDate ? 'disabled opacity-50' : ''}" 
            @click="${this._handleWhatsAppClick}"
            aria-disabled="${!this._startDate || !this._endDate}"
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
                  <a href="https://wa.me/${contactConfig.whatsapp}" target="_blank" class="text-decoration-none text-success d-flex align-items-center gap-2">
                    <i class="bi bi-whatsapp"></i> WhatsApp
                  </a>
                  <a href="#" 
                     class="text-decoration-none d-flex align-items-center gap-2"
                     @click="${(e: Event) => { e.preventDefault(); window.location.href = `mailto:${contactConfig.emailUser}@${contactConfig.emailDomain}`; }}">
                    <i class="bi bi-envelope"></i>
                    <span>${contactConfig.emailUser}<span style="display:none">robots</span>@${contactConfig.emailDomain}</span>
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
