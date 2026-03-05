import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './calendar/calendar-view.ts';
import { TranslationService } from '../services/translation-service';
import { contactConfig } from '../config/contact-config';
import { pricingConfig } from '../config/pricing-config';
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
    });

    this.addEventListener('selection-error', (e: any) => {
      this._selectionError = e.detail.message || '';
      this._alternatives = e.detail.alternatives || [];
    });
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

  private _handleWhatsAppClick() {
    console.log('WhatsApp booking clicked');
  }

  render() {
    return html`
      <div class="card p-4 rounded-4 shadow-lg border-opacity-25 border mb-4">
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

        ${this._startDate && this._endDate && !this._selectionError ? html`
          <div class="bg-light p-3 rounded mb-4 shadow-sm border">
            <h6 class="fw-bold mb-3 border-bottom pb-2">${TranslationService.l.cal_summary_title}</h6>
            <div class="d-flex justify-content-between mb-2 small">
              <span class="text-muted">${TranslationService.l.cal_summary_dates}:</span>
              <span class="fw-medium">
                ${this._startDate.toLocaleDateString(TranslationService.currentLang)} - ${this._endDate.toLocaleDateString(TranslationService.currentLang)}
              </span>
            </div>
            <div class="d-flex justify-content-between mb-2 small">
              <span class="text-muted">${TranslationService.l.cal_summary_nights}:</span>
              <span class="fw-medium">${this._nights}</span>
            </div>

            ${(() => {
              let discountLabel = '';
              let discountMultiplier = 1;

              if (this._nights >= 30) {
                discountLabel = TranslationService.l.cal_summary_discount_monthly;
                discountMultiplier = pricingConfig.discounts.monthly;
              } else if (this._nights >= 14) {
                discountLabel = TranslationService.l.cal_summary_discount_monthly;
                discountMultiplier = pricingConfig.discounts.biweekly;
              } else if (this._nights >= 7) {
                discountLabel = TranslationService.l.cal_summary_discount_weekly;
                discountMultiplier = pricingConfig.discounts.weekly;
              }

              if (discountMultiplier < 1) {
                const discountPercent = Math.round((1 - discountMultiplier) * 100);
                const discountAmount = Math.round(this._totalPrice * (1 - discountMultiplier));
                const finalPrice = this._totalPrice - discountAmount;

                return html`
                  <div class="d-flex justify-content-between mb-2 small">
                    <span class="text-muted">${TranslationService.l.cal_summary_subtotal}:</span>
                    <span class="fw-medium font-monospace">${this._totalPrice}€</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2 small text-success fw-bold">
                    <span>${discountLabel} (-${discountPercent}%):</span>
                    <span>-${discountAmount}€</span>
                  </div>
                  <div class="d-flex justify-content-between pt-2 mt-2 border-top">
                    <span class="fw-bold">${TranslationService.l.cal_summary_total}:</span>
                    <span class="fw-bold fs-5 text-primary">${finalPrice}€</span>
                  </div>
                `;
              }

              return html`
                <div class="d-flex justify-content-between pt-2 mt-2 border-top">
                  <span class="fw-bold">${TranslationService.l.cal_summary_total}:</span>
                  <span class="fw-bold fs-5 text-primary">${this._totalPrice}€</span>
                </div>
              `;
            })()}
          </div>
        ` : ''}

        <div class="d-grid gap-3 mb-4">
          ${(() => {
            const startStr = this._startDate ? this._startDate.toLocaleDateString('es-ES') : '';
            const endStr = this._endDate ? this._endDate.toLocaleDateString('es-ES') : '';
            
            let discountLabel = '';
            let discountMultiplier = 1;

            if (this._nights >= 30) {
              discountLabel = TranslationService.l.cal_summary_discount_monthly;
              discountMultiplier = pricingConfig.discounts.monthly;
            } else if (this._nights >= 14) {
              discountLabel = TranslationService.l.cal_summary_discount_monthly;
              discountMultiplier = pricingConfig.discounts.biweekly;
            } else if (this._nights >= 7) {
              discountLabel = TranslationService.l.cal_summary_discount_weekly;
              discountMultiplier = pricingConfig.discounts.weekly;
            }

            const discountAmount = Math.round(this._totalPrice * (1 - discountMultiplier));
            const finalPrice = this._totalPrice - discountAmount;

            let message = `Hola, se ha solicitado la reserva para el alojamiento ubicado en: ${TranslationService.l.prop_location}.`;
            if (this._startDate && this._endDate) {
              const discountStr = discountMultiplier < 1 
                ? `\nSubtotal: ${this._totalPrice}€\n${discountLabel} (-${Math.round((1-discountMultiplier)*100)}%): -${discountAmount}€` 
                : '';
              
              message = `Hola, me gustaría reservar el alojamiento en ${TranslationService.l.prop_location}\n\nResumen de reserva:\nFechas: ${startStr} a ${endStr}\nNoches: ${this._nights}${discountStr}\nPrecio total: ${finalPrice}€`;
            }
            
            const encodedMsg = encodeURIComponent(message);
            const waUrl = `https://wa.me/${contactConfig.whatsapp}?text=${encodedMsg}`;
            
            return html`
              <a 
                href="${waUrl}" 
                target="_blank"
                class="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill shadow-sm ${!this._startDate || !this._endDate ? 'disabled opacity-50' : ''}" 
                @click="${this._handleWhatsAppClick}"
                aria-disabled="${!this._startDate || !this._endDate}"
              >
                <i class="bi bi-whatsapp fs-5"></i> ${TranslationService.l.cal_btn_whatsapp}
              </a>
            `;
          })()}
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
                  <a href="mailto:${contactConfig.email}" class="text-decoration-none d-flex align-items-center gap-2">
                    <i class="bi bi-envelope"></i> ${contactConfig.email}
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
