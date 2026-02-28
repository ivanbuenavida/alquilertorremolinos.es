import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('availability-calendar')
export class AvailabilityCalendar extends LitElement {
  createRenderRoot() { return this; }

  @property({ type: String })
  whatsappNumber = '';

  @property({ type: String })
  paypalLink = '';

  private _handleWhatsAppClick(e: Event) {
    if (!this.whatsappNumber) {
      e.preventDefault();
      alert('WhatsApp integration pending.');
      return;
    }
    // Proceed to intended link if populated
  }

  private _handlePayPalClick() {
    if (this.paypalLink) {
      window.open(this.paypalLink, '_blank');
    } else {
      alert('PayPal integration pending.');
    }
  }

  render() {
    return html`
      <div class="card p-4 border-primary border-opacity-25 shadow-sm">
        <h4 class="fw-bold d-flex align-items-center gap-2 mb-4">
          <i class="bi bi-calendar-check text-primary"></i> 
          Bookings & Availability
        </h4>
        
        <div class="rounded border p-3 text-center mb-4 bg-light">
          <!-- TODO: Consume Google Calendar API here, or use iframe embed within a responsive container -->
          <i class="bi bi-calendar3 display-4 text-muted mb-3 d-block opacity-50"></i>
          <p class="text-muted small fw-medium mb-1">Calendar Data Pending</p>
          <div class="badge bg-secondary mb-2">To Integrate</div>
          <p class="text-muted" style="font-size: 0.85rem;">
            You can embed your exact Google Calendar availability via API or iframe here.
          </p>
        </div>

        <div class="d-grid gap-3">
          <a 
            href="https://wa.me/${this.whatsappNumber}" 
            target="_blank"
            class="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill shadow-sm" 
            @click="${this._handleWhatsAppClick}"
          >
            <i class="bi bi-whatsapp fs-5"></i> Book via WhatsApp
          </a>
          <button 
            class="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold rounded-pill shadow-sm" 
            type="button"
            @click="${this._handlePayPalClick}"
          >
            <i class="bi bi-paypal fs-5"></i> Pay with PayPal
          </button>
        </div>
      </div>
    `;
  }
}
