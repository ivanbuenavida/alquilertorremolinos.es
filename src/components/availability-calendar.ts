import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './calendar/calendar-view.ts';
import { TranslationService } from '../services/translation-service';

@customElement('availability-calendar')
export class AvailabilityCalendar extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String })
  whatsappNumber = '';

  @property({ type: String })
  paypalLink = '';

  @state() private _startDate: Date | null = null;
  @state() private _endDate: Date | null = null;

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
    
    // Listen for range selection from child calendar-view
    this.addEventListener('range-selected', (e: any) => {
      this._startDate = e.detail.start;
      this._endDate = e.detail.end;
    });
  }

  private _handleWhatsAppClick() {
    console.log('WhatsApp booking clicked');
  }

  private _handlePayPalClick() {
    console.log('PayPal booking clicked');
  }

  render() {
    return html`
      <div class="card p-4 border-primary border-opacity-25 shadow-sm">
        <h4 class="fw-bold d-flex align-items-center gap-2 mb-4">
          <i class="bi bi-calendar-check text-primary"></i> 
          ${TranslationService.l.cal_title}
        </h4>
        
        <div class="mb-4">
          <calendar-view></calendar-view>
        </div>

        <div class="d-grid gap-3">
          ${(() => {
            const startStr = this._startDate ? this._startDate.toLocaleDateString('es-ES') : '';
            const endStr = this._endDate ? this._endDate.toLocaleDateString('es-ES') : '';
            const message = `Hola, se ha solicitado la reserva de los días ${startStr} a ${endStr} para el alojamiento en Plaza de Andalucía en Torremolinos.`;
            const encodedMsg = encodeURIComponent(message);
            const waUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMsg}`;
            
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
          <button 
            class="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill shadow-sm" 
            type="button"
            @click="${this._handlePayPalClick}"
          >
            <i class="bi bi-paypal fs-5"></i> ${TranslationService.l.cal_btn_paypal}
          </button>
        </div>
      </div>
    `;
  }
}
