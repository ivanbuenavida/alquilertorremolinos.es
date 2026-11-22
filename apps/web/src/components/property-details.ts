import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('property-details')
export class PropertyDetails extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  data: any;



  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  render() {
    if (!this.data) return html``;

    return html`
      <!-- Header removed and moved to my-app.ts -->

      <!-- Host Card removed, now in full-width section -->

      <!-- Description -->
      <div class="mb-5">
        <h3 class="fw-bold mb-4 text-dark">${TranslationService.l.prop_about}</h3>
        <p class="fs-5 text-body text-justify lh-lg">
          ${TranslationService.l.prop_description}
        </p>
      </div>

      <!-- Amenities -->
      <div class="mb-5">
        <h3 class="fw-bold mb-4 text-dark">${TranslationService.l.amen_offers}</h3>
        <div class="row g-4 overflow-hidden">
          ${this.data.amenities.map((amenity: any) => html`
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
