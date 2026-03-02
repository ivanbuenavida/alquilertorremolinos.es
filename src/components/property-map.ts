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
    return html`
      <section class="mb-5">
        <h3 class="fw-semibold mb-4 text-dark">${TranslationService.l.map_title}</h3>
        <div class="rounded-4 overflow-hidden border" style="height: 400px; background-color: #f8f9fa;">
          <iframe src="https://maps.google.com/maps?q=36.62410380467056,-4.498605617816638&hl=${TranslationService.currentLang}&z=17&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    `;
  }
}
