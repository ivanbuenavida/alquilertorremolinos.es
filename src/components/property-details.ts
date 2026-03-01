import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('property-details')
export class PropertyDetails extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  data: any;

  @state()
  private _showFullHostDesc = false;

  private _toggleHostDesc() {
    this._showFullHostDesc = !this._showFullHostDesc;
  }

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  render() {
    if (!this.data) return html``;

    return html`
      <!-- Header -->
      <div class="mb-5">
        <h1 class="display-4 fw-bold mb-3 text-dark">${TranslationService.l.hero_title}</h1>
        <a href="https://www.google.es/maps/place/36%C2%B037'26.6%22N+4%C2%B029'55.0%22W/@36.6240061,-4.4986878,3a,75y,116.03h,96.76t/data=!3m8!1e1!3m6!1sCIABIhA86cI1tJLhg2xzb0l3RATT!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAFfmt2al4HgBHCoJQRpoZCfVYSs4TfsFs7jPmOLPz6o3o3JEpsUL4n1Xg_EfnaibYaJ7yTx3SD3bLlsN7ZaUCIh2Z_8Ko_awhsbGxNSOP1TYkqgjkUUIZVjh_WfieFatJUVO4g-El3KgRGJuqX-n%3Dw900-h600-k-no-pi-6.756274244445322-ya253.22037494810303-ro0-fo100!7i8192!8i4096!4m5!3m4!8m2!3d36.6240556!4d-4.4986111!10e5" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-body fs-5 d-flex align-items-center gap-2">
          <i class="bi bi-geo-alt-fill text-primary"></i> 
          <span>${TranslationService.l.prop_location}</span>
        </a>
      </div>

      <!-- Host Card -->
      <div class="card p-4 bg-light border-0 rounded-4 mb-5">
        <div class="d-flex flex-row align-items-center gap-4 mb-3">
          <img src="${this.data.host.image || '/logo.svg'}" alt="Host" class="rounded-circle border border-white border-4 shadow-sm" width="80" height="80" style="object-fit: cover;">
          <div>
            <h4 class="mb-1 fw-bold text-dark">${TranslationService.l.prop_host_prefix}: ${this.data.host.name}</h4>
            <span class="badge bg-primary rounded-pill px-3 py-2 small opacity-75">${this.data.host.experience}</span>
          </div>
        </div>
        <div>
          <p class="fs-6 text-body lh-lg mb-2" style="white-space: pre-line; ${!this._showFullHostDesc ? 'display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;' : ''}">
            ${TranslationService.l.prop_host_description}
          </p>
          <button class="btn btn-link p-0 text-decoration-none fw-bold text-primary" @click="${this._toggleHostDesc}">
            ${this._showFullHostDesc ? TranslationService.l.prop_show_less : TranslationService.l.prop_read_more}
          </button>
        </div>
      </div>

      <hr class="my-5 opacity-25">

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
