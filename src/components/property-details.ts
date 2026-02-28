import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PropertyData } from '../data/mock-data';

@customElement('property-details')
export class PropertyDetails extends LitElement {
  createRenderRoot() { return this; }

  @property({ type: Object })
  data!: PropertyData;

  render() {
    if (!this.data) return html`<div class="spinner-border text-primary" role="status"></div>`;

    return html`
      <div class="card p-4 h-100">
        <h1 class="h2 fw-bold mb-1">${this.data.title}</h1>
        <p class="text-muted"><i class="bi bi-geo-alt-fill me-1"></i>${this.data.location}</p>
        
        <hr class="my-4">
        
        <div class="d-flex align-items-center">
          <i class="bi bi-person-circle fs-1 text-primary me-3"></i>
          <div>
            <h5 class="mb-0 fw-bold">Hosted by ${this.data.host.name}</h5>
            <small class="text-muted">${this.data.host.description}</small>
          </div>
        </div>

        <hr class="my-4">

        <h4 class="fw-bold mb-3">About this place</h4>
        <p class="text-body text-break" style="line-height: 1.8;">
          ${this.data.description}
        </p>

        <hr class="my-4">

        <h4 class="fw-bold mb-4">What this place offers</h4>
        <div class="row g-4">
          ${this.data.amenities.map(amenity => html`
            <div class="col-sm-6 d-flex align-items-center gap-3">
              <i class="bi ${amenity.icon} amenity-icon mb-0 text-primary"></i> <span class="fw-medium">${amenity.name}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
