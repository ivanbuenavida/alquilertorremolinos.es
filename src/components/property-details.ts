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
      <div class="property-header mb-4">
        <h1 class="display-5 fw-bold mb-2">${TranslationService.l.hero_title}</h1>
        <p class="text-muted fs-5">
          <i class="bi bi-geo-alt-fill me-2"></i>${this.data.location}
        </p>
      </div>

      <div class="host-info d-flex align-items-center gap-3 p-3 bg-light rounded-4 mb-4">
        <img src="${this.data.host.image}" alt="Host" class="rounded-circle" width="56" height="56">
        <div>
          <h5 class="mb-0 fw-bold">${TranslationService.l.prop_host_prefix}: ${this.data.host.name}</h5>
          <small class="text-muted">${this.data.host.experience}</small>
        </div>
      </div>

      <hr class="my-4 opacity-10">

      <div class="description mb-5">
        <h4 class="fw-bold mb-3">${TranslationService.l.prop_about}</h4>
        <p class="lead" style="font-size: 1.1rem; line-height: 1.7; color: #444;">
          ${this.data.description}
        </p>
      </div>

      <div class="amenities">
        <h4 class="fw-bold mb-4">${TranslationService.l.amen_offers}</h4>
        <div class="row g-4">
          ${this.data.amenities.map((amenity: any) => html`
            <div class="col-md-6">
              <div class="d-flex align-items-center gap-3">
                <div class="amenity-icon-wrapper">
                  <i class="bi ${amenity.icon} fs-4"></i>
                </div>
                <span class="fs-6 fw-medium text-dark">${TranslationService.translateAmenity(amenity.icon)}</span>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
