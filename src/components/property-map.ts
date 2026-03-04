import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('property-map')
export class PropertyMap extends LitElement {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  render() {
    const mapUrl = "https://www.google.es/maps/place/36%C2%B037'26.6%22N+4%C2%B029'55.0%22W/@36.6240061,-4.4986878,3a,75y,116.03h,96.76t/data=!3m8!1e1!3m6!1sCIABIhA86cI1tJLhg2xzb0l3RATT!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAFfmt2al4HgBHCoJQRpoZCfVYSs4TfsFs7jPmOLPz6o3o3JEpsUL4n1Xg_EfnaibYaJ7yTx3SD3bLlsN7ZaUCIh2Z_8Ko_awhsbGxNSOP1TYkqgjkUUIZVjh_WfieFatJUVO4g-El3KgRGJuqX-n%3Dw900-h600-k-no-pi-6.756274244445322-ya253.22037494810303-ro0-fo100!7i8192!8i4096!4m5!3m4!8m2!3d36.6240556!4d-4.4986111!10e5";

    return html`
      <section class="mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-semibold mb-0 text-dark">${TranslationService.l.map_title}</h3>
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="text-decoration-underline text-dark fw-medium small">
            ${TranslationService.l.prop_location}
          </a>
        </div>
        <div class="rounded-4 overflow-hidden border shadow-sm" style="height: 400px; background-color: #f8f9fa;">
          <iframe src="https://maps.google.com/maps?q=36.62410380467056,-4.498605617816638&hl=${TranslationService.currentLang}&z=17&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    `;
  }
}
