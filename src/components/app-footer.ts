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

  private _handleCallClick(e: Event) {
    e.preventDefault();
    AnalyticsService.trackContact('Call Footer');
    // Decode base64 '+34614449890'
    const phone = atob('KzM0NjE0NDQ5ODkw');
    window.location.href = `tel:${phone}`;
  }

  render() {
    const msgEs = TranslationService.getLabelsFor('es').footer_whatsapp_msg;
    const msgSelected = TranslationService.l.footer_whatsapp_msg;
    const footerWaMsg = encodeURIComponent(TranslationService.formatWhatsAppMessage(msgSelected, msgEs));
    const footerWaUrl = `https://wa.me/${contactConfig.whatsapp}?text=${footerWaMsg}`;

    return html`
      <footer class="bg-dark text-white text-center py-4 mt-5">
        <div class="container">
          <div class="mb-3 d-inline-flex align-items-center gap-3 flex-wrap justify-content-center">
            <a href="${footerWaUrl}" @click="${this._handleWaFooterClick}" target="_blank" class="text-white text-decoration-none d-inline-flex align-items-center gap-2" style="opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
              <i class="bi bi-whatsapp fs-5"></i> ${TranslationService.l.footer_whatsapp}
            </a>
            <span class="text-white-50">|</span>
            <a href="#" @click="${this._handleCallClick}" class="text-white text-decoration-none d-inline-flex align-items-center gap-2" style="opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
              <i class="bi bi-telephone fs-5"></i>
              <span>+34 614 <span style="display:none">bots</span>44 98 90</span>
            </a>
          </div>
          <p class="mb-0 text-white-50 small">&copy; ${new Date().getFullYear()} ${TranslationService.l.nav_brand}. ${TranslationService.l.footer_rights}</p>
        </div>
      </footer>
    `;
  }
}
