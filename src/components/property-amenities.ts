import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('property-amenities')
export class PropertyAmenities extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array })
  amenities: any[] = [];

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  render() {
    if (!this.amenities) return html``;

    return html`
      <div class="mb-5">
        <h3 class="fw-bold mb-4 text-dark">${TranslationService.l.amen_offers}</h3>
        <div class="row g-4 overflow-hidden">
          ${this.amenities.map((amenity: any) => html`
            <div class="col-md-6">
              <div class="d-flex align-items-center gap-4 p-3 rounded-4 border bg-white shadow-sm h-100">
                <div class="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-4" style="width: 52px; height: 52px; min-width: 52px;">
                  <i class="bi ${amenity.icon} fs-4"></i>
                </div>
                <span class="fs-6 fw-bold text-dark">${TranslationService.translateAmenity(amenity.icon)}</span>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
