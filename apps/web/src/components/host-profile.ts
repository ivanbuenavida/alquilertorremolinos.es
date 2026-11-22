import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('host-profile')
export class HostProfile extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  host: any;

  constructor() {
    super();
    window.addEventListener('language-changed', () => {
      this.requestUpdate();
    });
  }

  render() {
    if (!this.host) return html``;

    return html`
      <section class="mb-5">
        <div class="row gx-4 gx-lg-5">
          <div class="col-md-4 mb-4 mb-md-0">
            <div class="card bg-white shadow-sm border rounded-4 text-center p-4 mb-0">
              <img src="${this.host.image || '/logo.svg'}" class="mx-auto mb-3" width="100" height="100" style="object-fit:contain;" alt="${this.host.name}">
              <h4 class="fw-bold mb-1">${this.host.name}</h4>
              <p class="text-success small mb-0"><i class="bi bi-patch-check-fill"></i> ${TranslationService.l.host_superhost}</p>
            </div>
          </div>
          <div class="col-md-8">
            <h3 class="fw-semibold text-dark">${TranslationService.l.host_title}</h3>
            <p class="text-body mb-4" style="font-size: 1.1rem; line-height: 1.6;">
              ${TranslationService.l.prop_host_description}
            </p>
            
            <div class="row pt-4 border-top mt-2 gap-y-2">
              <div class="col-md-6 d-flex align-items-center text-body fs-6">
                <i class="bi bi-shield-check me-2 fs-5 text-success"></i>
                <span>${TranslationService.l.host_qualities_ivan}</span>
              </div>
              <div class="col-md-6 d-flex align-items-center text-body fs-6">
                <i class="bi bi-translate me-2 fs-5 text-primary"></i>
                <span>${TranslationService.l.host_languages}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
