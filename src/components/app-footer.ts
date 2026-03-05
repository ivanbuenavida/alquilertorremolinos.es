import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';
import { AnalyticsService } from '../services/analytics-service';
import { contactConfig } from '../config/contact-config';

@customElement('app-footer')
export class AppFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }
  
  private _handleWaFooterClick() {
    AnalyticsService.trackContact('WhatsApp Footer');
  }

  render() {
    const footerWaMsg = encodeURIComponent(TranslationService.l.footer_whatsapp_msg);
    const footerWaUrl = `https://wa.me/${contactConfig.whatsapp}?text=${footerWaMsg}`;

    return html`
      <footer class="bg-dark text-white text-center py-4 mt-5">
        <div class="container">
          <div class="mb-3">
            <a href="${footerWaUrl}" @click="${this._handleWaFooterClick}" target="_blank" class="text-white text-decoration-none d-inline-flex align-items-center gap-2" style="opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
              <i class="bi bi-whatsapp fs-5"></i> ${TranslationService.l.footer_whatsapp}
            </a>
          </div>
          <p class="mb-0 text-white-50 small">&copy; ${new Date().getFullYear()} ${TranslationService.l.nav_brand}. ${TranslationService.l.footer_rights}</p>
        </div>
      </footer>
    `;
  }
}
