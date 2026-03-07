import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';
import { AnalyticsService } from '../services/analytics-service';
import { contactConfig } from '../config/contact-config';

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
    const mapUrl = contactConfig.googleMapsUrl;

    return html`
      <section class="mb-5">
        <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-1 mb-4">
          <h3 class="fw-semibold mb-0 text-dark">${TranslationService.l.map_title}</h3>
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" 
             @click="${() => AnalyticsService.trackMapClick()}"
             class="text-decoration-underline text-dark fw-medium small">
            ${TranslationService.l.prop_location}
          </a>
        </div>
        <div class="rounded-4 overflow-hidden border shadow-sm" style="height: 400px; background-color: #f8f9fa;" @click="${() => AnalyticsService.trackMapClick()}">
          <iframe src="https://maps.google.com/maps?q=36.62410380467056,-4.498605617816638&hl=${TranslationService.currentLang}&z=17&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    `;
  }
}
