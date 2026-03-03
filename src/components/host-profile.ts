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
        <div class="row g-5">
          <div class="col-md-4">
            <div class="card bg-white shadow-sm border rounded-4 text-center p-4">
              <img src="${this.host.image || '/logo.svg'}" class="rounded-circle mx-auto mb-3" width="100" height="100" style="object-fit:cover;" alt="Host">
              <h4 class="fw-bold mb-1">${this.host.name}</h4>
              <p class="text-muted small mb-0"><i class="bi bi-award-fill text-dark"></i> ${TranslationService.l.host_superhost}</p>
            </div>
            <div class="mt-4 px-2">
              <ul class="list-unstyled text-body fs-6 gap-3 d-flex flex-column">
                <li><i class="bi bi-mortarboard me-3 fs-5"></i> ${TranslationService.l.host_study}</li>
                <li><i class="bi bi-chat-quote me-3 fs-5"></i> ${this.host.name === 'Iván Benavides' ? 'Alegre, cuidadoso, atento' : 'Alegre, puntual, simpática'}</li>
              </ul>
            </div>
          </div>
          <div class="col-md-8">
            <p class="text-body mb-0" style="font-size: 1.1rem; line-height: 1.6; white-space: pre-line;">
              ${TranslationService.l.prop_host_description}
            </p>
            <p class="text-secondary mt-3 fst-italic">
              ${TranslationService.l.host_languages}
            </p>
          </div>
        </div>
      </section>
    `;
  }
}
