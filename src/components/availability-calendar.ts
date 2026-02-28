import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './calendar/calendar-view';
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

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
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
          <a 
            href="https://wa.me/${this.whatsappNumber}" 
            target="_blank"
            class="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill shadow-sm" 
            @click="${this._handleWhatsAppClick}"
          >
            <i class="bi bi-whatsapp fs-5"></i> ${TranslationService.l.cal_btn_whatsapp}
          </a>
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
