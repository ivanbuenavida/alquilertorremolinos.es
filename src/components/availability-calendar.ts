import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './calendar/calendar-view.ts';
import { TranslationService } from '../services/translation-service';
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
    });

    this.addEventListener('selection-error', (e: any) => {
      this._selectionError = e.detail.message || '';
    });
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
          <div class="alert alert-danger py-2 small mb-4" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i> ${this._selectionError}
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
            <div class="d-flex justify-content-between pt-2 mt-2 border-top">
              <span class="fw-bold">${TranslationService.l.cal_summary_total}:</span>
              <span class="fw-bold fs-5 text-primary">${this._totalPrice}€</span>
            </div>
          </div>
        ` : ''}

        <div class="d-grid gap-3 mb-4">
          ${(() => {
            const startStr = this._startDate ? this._startDate.toLocaleDateString('es-ES') : '';
            const endStr = this._endDate ? this._endDate.toLocaleDateString('es-ES') : '';
            
            let message = `Hola, se ha solicitado la reserva para el alojamiento ubicado en: ${TranslationService.l.prop_location}.`;
            if (this._startDate && this._endDate) {
              message = `Hola, me gustaría reservar el alojamiento en ${TranslationService.l.prop_location}\n\nResumen de reserva:\nFechas: ${startStr} a ${endStr}\nNoches: ${this._nights}\nPrecio total: ${this._totalPrice}€`;
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
