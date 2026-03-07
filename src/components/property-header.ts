import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';
import { shareService } from '../services/share-service';

import { contactConfig } from '../config/contact-config';

@customElement('property-header')
export class PropertyHeader extends LitElement {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  async _handleShare() {
    await shareService.share({
      title: 'Alquiler Torremolinos',
      text: 'Mira este alojamiento en Torremolinos',
      url: window.location.href,
    }, 'Enlace copiado al portapapeles');
  }

  render() {
    return html`
      <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 class="fs-2 fw-semibold mb-2 text-dark">${TranslationService.l.hero_title}</h1>
          <div class="d-flex flex-wrap align-items-center gap-2 text-body fs-6">
            <a href="${contactConfig.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="text-decoration-underline text-body fw-medium d-flex align-items-center gap-1">
              <i class="bi bi-geo-alt-fill"></i> 
              <span>${TranslationService.l.prop_location}</span>
            </a>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-dark d-flex align-items-center gap-2 px-3 py-2 rounded-3 border-dark border-opacity-25 shadow-sm hover-elevated" @click="${this._handleShare}">
            <i class="bi bi-box-arrow-up"></i>
            <span class="d-none d-md-inline">${TranslationService.l.img_btn_share}</span>
          </button>
        </div>
      </div>
    `;
  }
}
