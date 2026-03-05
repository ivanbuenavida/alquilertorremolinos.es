import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

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
    const shareData = {
      title: 'Alquiler Torremolinos',
      text: 'Mira este alojamiento en Torremolinos',
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      }
      
      if ((window as any).gtag) {
        (window as any).gtag('event', 'share', {
          'content_type': 'property',
          'item_id': 'alquiler_torremolinos'
        });
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  }

  render() {
    return html`
      <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 class="fs-2 fw-semibold mb-2 text-dark">${TranslationService.l.hero_title}</h1>
          <div class="d-flex flex-wrap align-items-center gap-2 text-body fs-6">
            <a href="https://www.google.es/maps/place/36%C2%B037'26.6%22N+4%C2%B029'55.0%22W/@36.6240061,-4.4986878,3a,75y,116.03h,96.76t/data=!3m8!1e1!3m6!1sCIABIhA86cI1tJLhg2xzb0l3RATT!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAFfmt2al4HgBHCoJQRpoZCfVYSs4TfsFs7jPmOLPz6o3o3JEpsUL4n1Xg_EfnaibYaJ7yTx3SD3bLlsN7ZaUCIh2Z_8Ko_awhsbGxNSOP1TYkqgjkUUIZVjh_WfieFatJUVO4g-El3KgRGJuqX-n%3Dw900-h600-k-no-pi-6.756274244445322-ya253.22037494810303-ro0-fo100!7i8192!8i4096!4m5!3m4!8m2!3d36.6240556!4d-4.4986111!10e5" target="_blank" rel="noopener noreferrer" class="text-decoration-underline text-body fw-medium d-flex align-items-center gap-1">
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
