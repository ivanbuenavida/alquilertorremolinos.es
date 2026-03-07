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

  render() {
    if (!this.host) return html``;

    return html`
      <section class="mb-5">
        <h3 class="fw-semibold text-dark mb-4">${TranslationService.l.host_title}</h3>
        <div class="row gx-5">
          <div class="col-md-4 mb-4 mb-md-0">
            <div class="card bg-white shadow-sm border rounded-4 text-center p-4 mb-0">
              <img src="${this.host.image || '/logo.svg'}" class="rounded-circle mx-auto mb-3" width="100" height="100" style="object-fit:cover;" alt="Anfitrión - ${this.host.name}">
              <h4 class="fw-bold mb-1">${this.host.name}</h4>
              <p class="text-muted small mb-0"><i class="bi bi-award-fill text-dark"></i> ${TranslationService.l.host_superhost}</p>
            </div>
          </div>
          <div class="col-md-8">
            <p class="text-body mb-4" style="font-size: 1.1rem; line-height: 1.6; white-space: pre-line;">
              ${TranslationService.l.prop_host_description}
            </p>
            
            <div class="d-flex flex-wrap gap-x-5 gap-y-3 align-items-center pt-4 border-top mt-2" style="column-gap: 2.5rem; row-gap: 1rem;">
              <div class="d-flex align-items-center text-body fs-6">
                <i class="bi bi-mortarboard me-2 fs-5"></i>
                <span>${TranslationService.l.host_study}</span>
              </div>
              <div class="d-flex align-items-center text-body fs-6">
                <i class="bi bi-chat-quote me-2 fs-5"></i>
                <span>${this.host.name === 'Iván Benavides' ? 'Alegre, cuidadoso, atento' : 'Alegre, puntual, simpática'}</span>
              </div>
              <div class="ms-md-auto text-secondary fst-italic small mt-1 mt-md-0">
                ${TranslationService.l.host_languages}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
